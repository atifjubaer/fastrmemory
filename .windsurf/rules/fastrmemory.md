<!-- fastrmemory:start -->
## FastrMemory Autonomous Agent Discipline

Every AI coding agent operating in this repository MUST follow these cognitive rules:
1. **Pre-Edit Error Check & Trap Recall**: Before editing or creating files, call `fastr_trap_recall` with your target file paths (set `includeNeighbors: true`) to check for active `[TRAP]` warnings and 1-hop call-graph dependencies.
2. **Cognitive Recall**: At the start of ANY task, call `fastr_recall` with your query or objective to load relevant architectural decisions, active rules, and past lessons.
3. **Immediate Trap Logging**: The moment you diagnose a test failure, syntax bug, or library incompatibility, immediately call `fastr_trap_log` to save the lesson with a 2.0x recall boost.
4. **Session Verification**: When milestones are completed, call `fastr_handoff` with `verifyStaging: true` to graduate staging memories into verified rules.
<!-- fastrmemory:end -->
