---
name: fastr-handoff
description: Seamless multi-agent task handoff and session milestone synchronization.
---

# FastrMemory: Cross-Agent Session Handoff Protocol

## When to Execute
- When handing over work to another developer or AI agent (e.g. from Claude Code in terminal to Cursor in IDE).
- When ending a coding session or reaching a major milestone.

## Steps
1. Ensure all new code passes automated tests (`npm test`).
2. Call `fastr_handoff` with `action: 'save'` and `verifyStaging: true`:

```json
{
  "action": "save",
  "taskTitle": "Feature name or refactor milestone",
  "summary": "Concrete summary of what was completed, tested, and verified.",
  "nextStep": "Immediate bounded action for the resuming agent.",
  "activeFiles": ["src/path/to/file.ts"],
  "verifyStaging": true
}
```

3. When a new session resumes, inspect `fastr://session/handoff` or call `fastr_handoff({ action: "latest" })` to immediately pick up without lost context.
