---
name: fastr-compress
description: Use when a markdown file, PR description, or block of context is too long for the token budget you need to fit it into, or the user asks to shrink a doc. Compresses prose while preserving headings, code blocks, and links; always preview first.
---

# FastrMemory: Token Compression

## When to use
- A doc or context payload exceeds the budget you need it to fit.
- The user asks to compact a long markdown file.

Do not use it on source code or on files where exact wording matters (licences, legal text, changelogs).

## Steps
1. **Preview savings** without touching disk:
   ```js
   fastr_compress({ filePath: "docs/guide.md", dryRun: true })
   ```

2. **Compress the file** (writes `<file>.original.md` as a backup):
   ```js
   fastr_compress({ filePath: "docs/guide.md", dryRun: false })
   ```

3. **Or compress text in memory** (nothing written to disk; output is returned):
   ```js
   fastr_compress({ content: "# Title\n\nLong conversational text...", dryRun: false })
   ```

## Guarantees to verify
- ATX headings, fenced code blocks, URLs, and markdown links are kept intact.
- Filler phrases, duplicate list items, and extra blank lines are removed.
- Review any warnings in the result; restore from the `.original.md` backup if meaning was lost.
