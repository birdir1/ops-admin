# birdir1 Portfolio Store-Ready Tracker (Target: 2026-02-28)

## Date and Scope Lock
- Invalid date corrected: February 30 does not exist.
- Target locked to: 2026-02-28 (store upload ready for `1ben` and `1ndirim`).
- `1dovme` and `tar1f` are preparation scope only in this sprint.

## Architecture Lock
- Firebase cannot be moved fully into your Ubuntu server for production.
- Firebase and your server are complementary layers.
- Firebase model lock: one Firebase project per app (`1ndirim`, `1ben`, `1dovme`, `tar1f`).
- Canonical discount domain lock: `1ndirim.birdir1.com`.
- Single control center lock: web-based ops panel.

## Current Technical Snapshot
- `1ndirim/backend`: tests passing (15/15), audit fix applied.
- `1ndirim/bot`: tests passing.
- `1ndirim/admin-panel`: lint + production build passing, portfolio page added.
- `1ndirim/app`: test suite passing; analyze has warnings/info (no compile blocker).
- `1ben`: tests passing; analyze has warnings/info; package IDs migrated to `com.birdir1.oneben`.
- `1dovme`: package IDs moved to `com.birdir1.onedovme`, release signing + AAB ready.
- `tar1f`: skeleton + product brief + architecture notes created.

## Checklist (100 Steps)
Legend: `[x] done`, `[~] in_progress`, `[ ] pending`

1. [x] Create portfolio ownership matrix.
2. [x] Write product one-liner for each app.
3. [x] Open scope-freeze document.
4. [x] Lock 2026-02-28 delivery scope in writing.
5. [x] Lock "store-ready" definition with team.
6. [x] Assign responsibilities by role.
7. [x] Start daily 20-minute release standup.
8. [x] Create one shared issue board.
9. [x] Define blocker label standard.
10. [x] Publish "No secret in repo/docs" policy.
11. [x] Revoke exposed admin API key immediately.
12. [x] Generate new admin API key.
13. [x] Audit admin key-only access logs.
14. [x] Tighten root SSH access to key-based model.
15. [x] Remove live credentials from deploy docs.
16. [x] Remove hard dependency on live IP from docs.
17. [~] Rotate Firebase service account credentials.
18. [x] Move `.env` handling to secret manager standard.
19. [x] Add repo secret-scan rule.
20. [x] Add CI secret-leak check step.
21. [x] Apply backend high-vulnerability patch action.
22. [x] Run regression tests after audit fix.
23. [x] Update backend lockfile.
24. [x] Verify sensitive-data masking in production logs.
25. [x] Tighten admin endpoint rate-limit and CORS policy.
26. [x] Create canonical DNS records for `1ndirim`.
27. [x] Add `admin.1ndirim` A record.
28. [x] Add `api.1ndirim` A record.
29. [x] Extend Nginx vhosts for canonical hosts.
30. [x] Add 301 rules for legacy `1indirim` hosts.
31. [x] Renew SSL for new host set.
32. [x] Move backend host/referer checks to `1ndirim` standard.
33. [x] Move app API fallback URLs to `api.1ndirim`.
34. [x] Update store metadata URLs to canonical standard.
35. [x] Unify support/privacy/terms links.
36. [x] Connect legal route health checks to automation.
37. [x] Add domain smoke test script (`backend/scripts/domainSmokeTest.sh`).
38. [x] Set uptime monitoring.
39. [x] Set DNS + SSL expiry alerts.
40. [x] Persist domain decision in core docs.
41. [x] Close syntax/parse blockers in `1ndirim/app`.
42. [x] Fix `opportunity_card` compile issues.
43. [x] Fix `opportunity_card_enhanced` compile issues.
44. [x] Fix Discovery loader signature mismatch in widget tests.
45. [x] Reach `flutter analyze` clean baseline for `1ndirim/app`.
46. [x] Pass `flutter test` full suite for `1ndirim/app`.
47. [x] Verify golden tests pass in current suite.
48. [x] Generate Android release signing files for `1ndirim`.
49. [x] Enable Apple Sign-In entitlement in active iOS entitlements file.
50. [~] Validate APNs capability/push setup.
51. [ ] Validate FCM token flow on real device.
52. [ ] Validate Google Sign-In flow on real device.
53. [ ] Validate Apple Sign-In flow on real device.
54. [ ] Verify Crashlytics event arrival in dashboard.
55. [ ] Verify Analytics event flow.
56. [ ] Produce release build with production `.env`.
57. [x] Verify signed `appbundle` output.
58. [ ] Verify signed `ipa` output.
59. [x] Run backend health + campaigns + auth smoke tests.
60. [x] Run admin login + critical action smoke tests.
61. [x] Validate bot scheduler overlap lock behavior.
62. [x] Validate DB backup cron.
63. [x] Add rollback notes into release package.
64. [ ] Create `1ndirim` release candidate tag.
65. [ ] Collect internal tester approvals.
66. [x] Close `1ben` analyze error blockers (`home_screen`, `today_screen`).
67. [x] Fix missing import/type mismatch blockers.
68. [x] Clarify fake-auth MVP strategy in UI behavior.
69. [x] Simplify auth UI copy to avoid misleading claims.
70. [x] Move Android app id to `com.birdir1.oneben` standard.
71. [x] Move iOS bundle id to `com.birdir1.oneben` standard.
72. [x] Move release signing fully off debug for `1ben`.
73. [x] Decide Firebase integration path for `1ben` and align configs.
74. [x] Remove client-side hardcoded API key usage.
75. [x] Write backend-proxy migration plan for AI features.
76. [x] Update `1ben` privacy policy to product reality.
77. [ ] Produce `1ben` screenshot set.
78. [x] Produce `1ben` Play AAB.
79. [x] Produce `1ben` iOS build.
80. [ ] Get `1ben` internal test approval.
81. [x] Finalize Play Console app content.
82. [x] Complete Data Safety form using real data flow.
83. [x] Complete account deletion policy/flow checks.
84. [x] Update store listing copy to canonical domains.
85. [x] Finalize image assets (icon, feature graphic, screenshots).
86. [x] Prepare release notes.
87. [x] Write test-track rollout plan.
88. [x] Define production rollout percentage post-approval.
89. [x] Add ops portfolio page in admin panel as first control center.
90. [x] Connect ops data sources (GitHub/CI/health) incrementally.
91. [x] Open 4 app cards in ops panel.
92. [x] Add release/domain/store/build health indicators per card.
93. [x] Generate weekly automated status report.
94. [x] Decide real backend scope for `1dovme` MVP.
95. [x] Set `1dovme` package ID and release signing standards.
96. [x] Open backlog to replace in-memory storage with persistent layer.
97. [x] Create `tar1f` repo skeleton + product brief.
98. [~] Reserve `tar1f` domain and Firebase project (DNS done, Firebase project reservation pending).
99. [x] Bind `1dovme` and `tar1f` to Q2 release calendar.
100. [x] Start monthly tech-debt closure rhythm across portfolio.

## Acceptance Commands (Runbook)
- `cd /Users/shadow/birdir1/1ndirim/backend && npm test`
- `cd /Users/shadow/birdir1/1ndirim/backend && npm run smoke:domains`
- `cd /Users/shadow/birdir1/1ndirim/admin-panel && npm run lint && npm run build`
- `cd /Users/shadow/birdir1/1ndirim/app && flutter test --reporter compact`
- `cd /Users/shadow/birdir1/1ben && flutter test --reporter compact`
- `cd /Users/shadow/birdir1/1dovme/dovme_app && flutter analyze && flutter test --reporter compact`

## Immediate Next Milestone (2026-02-24 to 2026-02-28)
- Complete intentionally delayed `1ben` steps: 77 (screenshots) and 80 (internal approval).
- Complete Apple-account-dependent steps: 58 signed IPA, 53 Apple Sign-In real-device validation.
- Create `1ndirim` RC tag (64) and collect tester approvals (65).
- Finish Firebase reservation part of step 98 for `tar1f-prod`.
