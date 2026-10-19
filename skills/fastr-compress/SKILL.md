---
name: fastr-compress
description: Compresses markdown documentation, PR summaries, or prompt context to fit token budgets while strictly preserving headings, URLs, and code blocks.
triggers:
  - fastr-compress
  - compress-tokens
  - compact-context
  - compress-file
---

# FastrMemory Token Compression Skill

Use this skill when preparing context payloads, long PR descriptions, or large markdown documentation files for LLM prompt windows without exceeding token limits.

## Core Rules

1. **Heading Invariant**: Never drop or alter ATX (`#`, `##`, `###`) headings. They provide the structural skeleton for reasoning.
2. **Code Integrity**: Never truncate or modify fenced code blocks (` ``` `). Code must remain byte-for-byte compilable.
3. **Link Preservation**: Never drop URLs or Markdown links (`[text](url)`).
4. **Prose Compacting**: Strip conversational filler ("In this section...", "As previously noted..."), collapse consecutive duplicate list items, and eliminate redundant blank lines.
5. **Safety Backup**: Whenever compressing on-disk files, verify that `<file>.original.md` is preserved as a safety backup.

## MCP Invocation

```json
{
  "tool": "fastr_compress",
  "arguments": {
    "filePath": "docs/architecture.md",
    "dryRun": false
  }
}
```

Or compress in-memory strings directly:

```json
{
  "tool": "fastr_compress",
  "arguments": {
    "content": "# Title\n\nLong conversational text...",
    "dryRun": false
  }
}
```
