---
name: fastr-plan-estimate
description: Use when the user asks how long or how risky a change will be, before committing to an estimate or plan for a migration, refactor, or bug fix, and again when that work finishes so the estimate can be closed with the actual result. Calibrates estimates against the project's own track record.
---

# FastrMemory: Calibrated Estimates and Risk

## When to use
- You are asked for an effort or time estimate.
- You are planning edits to files with a history of breakage.
- A previously estimated task is complete (close the prediction).

## 1. Check the base rate for this kind of work
```js
fastr_predict_baserate({ classTag: "migration" })
```
If history exists, multiply your inside-view estimate by the reported median ratio. Pick a stable `classTag` (for example `migration`, `refactor`, `bugfix`, `feature`) and reuse it.

## 2. Check pre-edit risk for the target files
```js
fastr_risk_predict({ targetFiles: ["src/db/schema.ts", "src/db/repository.ts"], module: "db" })
```
High risk means: read the traps (`fastr-memory` skill), plan smaller steps, and add tests first.

## 3. Record the estimate
```js
fastr_predict({
  action: "create",
  classTag: "migration",
  claimText: "Add bi-temporal columns to the actions table",
  estimateValue: 3,
  estimateUnit: "hours"
})
```
Note the returned prediction ID.

## 4. Close it when the work is done
```js
fastr_predict({ action: "close", predictionId: 12, actualValue: 5 })
```
List open predictions with `fastr_predict({ action: "list", classTag: "migration" })`.

## Rules
- Report the calibrated number, and say what the raw estimate was.
- Always close predictions; unclosed ones never improve future calibration.
