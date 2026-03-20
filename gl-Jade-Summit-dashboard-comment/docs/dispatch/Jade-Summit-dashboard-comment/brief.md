# Dispatch Brief: Dashboard Comment Test

## Task
Add a comment to the top of scripts/dashboard-server.js (after the shebang line) saying:
// Dispatch remote test 2026-03-20

## Files to Read First
- scripts/dashboard-server.js — the file to modify (add comment after line 1)

## What to Change
Add a single line comment after the `#!/usr/bin/env node` shebang:
```javascript
// Dispatch remote test 2026-03-20
```

## Gate Table
| Gate | Check |
|------|-------|
| Comment added | Line 2 of dashboard-server.js is `// Dispatch remote test 2026-03-20` |

## Wrap
If running locally, run /wrap when complete. If running on a remote cloud VM, run /remote-wrap (at .claude/skills/remote-wrap/SKILL.md) instead. Do NOT use /wrap on remote VMs.
