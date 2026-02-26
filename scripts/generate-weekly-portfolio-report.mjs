import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.cwd());
const dataPath = path.join(root, 'data', 'portfolio-apps.json');
const reportsDir = path.join(root, 'data', 'reports');

function nowDateUTC() {
  return new Date().toISOString().slice(0, 10);
}

function parseRepo(repoUrl) {
  const m = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/i);
  if (!m) return null;
  return { owner: m[1], repo: m[2].replace(/\.git$/i, '') };
}

async function fetchOk(url) {
  if (!url) return 'unknown';
  try {
    const res = await fetch(url, { method: 'GET' });
    return res.ok ? 'up' : 'down';
  } catch {
    return 'down';
  }
}

async function fetchCI(repoUrl) {
  const parsed = parseRepo(repoUrl);
  if (!parsed) return { status: null, conclusion: null, run_url: null };
  const res = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}/actions/runs?per_page=1`).catch(() => null);
  if (!res || !res.ok) return { status: null, conclusion: null, run_url: null };
  const json = await res.json();
  const run = json.workflow_runs?.[0];
  return { status: run?.status || null, conclusion: run?.conclusion || null, run_url: run?.html_url || null };
}

async function main() {
  const raw = await fs.readFile(dataPath, 'utf8');
  const apps = JSON.parse(raw);

  const rows = [];
  for (const app of apps) {
    const runtime = await fetchOk(app.health_url);
    const domain = await fetchOk(app.public_url || null);
    const ci = await fetchCI(app.repo_url);
    rows.push({
      app_id: app.app_id,
      status: app.status,
      build_health: app.build_health,
      store_health: app.store_health,
      runtime,
      domain: domain === 'up' ? 'green' : domain === 'down' ? 'red' : 'unknown',
      ci_status: ci.status,
      ci_conclusion: ci.conclusion,
      ci_run_url: ci.run_url,
    });
  }

  const date = nowDateUTC();
  await fs.mkdir(reportsDir, { recursive: true });
  const jsonOut = path.join(reportsDir, `weekly-status-${date}.json`);
  const mdOut = path.join(reportsDir, `weekly-status-${date}.md`);

  await fs.writeFile(jsonOut, JSON.stringify({ generated_at: new Date().toISOString(), apps: rows }, null, 2));

  const lines = [];
  lines.push(`# Weekly Portfolio Status - ${date}`);
  lines.push('');
  lines.push('| App | Product Status | Build | Store | Runtime | Domain | CI |');
  lines.push('|---|---|---|---|---|---|---|');
  for (const row of rows) {
    const ciText = row.ci_conclusion || row.ci_status || 'unknown';
    lines.push(`| ${row.app_id} | ${row.status} | ${row.build_health} | ${row.store_health} | ${row.runtime} | ${row.domain} | ${ciText} |`);
  }
  lines.push('');
  lines.push('## CI Links');
  for (const row of rows) {
    lines.push(`- ${row.app_id}: ${row.ci_run_url || 'n/a'}`);
  }

  await fs.writeFile(mdOut, `${lines.join('\n')}\n`);
  console.log(`Report generated:`);
  console.log(`- ${jsonOut}`);
  console.log(`- ${mdOut}`);
}

main().catch((err) => {
  console.error('Report generation failed:', err);
  process.exit(1);
});
