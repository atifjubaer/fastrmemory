---
name: fastr-vision
description: Multimodal visual memory skill for tagging and retrieving screenshots, UI diagrams, and error screens with hybrid vector and keyword search.
triggers:
  - fastr-vision
  - visual-memory
  - screenshot-search
  - image-tag
---

# FastrMemory Multimodal Vision Skill

Use this skill when multimodal AI agents (Claude 3.7 Sonnet, Gemini 2.5 Pro) inspect UI layouts, examine error screenshots, or review architectural diagrams.

## Operating Principles

1. **Tagging Visual Ground Truth**: When a user or test generates an image or screenshot artifact, call `fastr_vision_tag` with:
   - `filePath`: Local path to image
   - `description`: Detailed visual description of components, colors, and layout
   - `ocrText`: Exact error banners, HTTP codes, or code snippets visible in image
   - `memoryId`: Link to governing error trap or architectural rule
2. **Hybrid Visual Recall**: Before redesigning UI components or fixing visual regressions, call `fastr_vision_search` to find relevant screenshots and previous design patterns.

## MCP Invocation

```json
{
  "tool": "fastr_vision_tag",
  "arguments": {
    "filePath": "screenshots/modal-error.png",
    "description": "Modal error dialog showing HTTP 401 Unauthorized alert on checkout",
    "ocrText": "HTTP 401 Unauthorized. Access token expired.",
    "memoryId": "mem_009e4a7d"
  }
}
```

```json
{
  "tool": "fastr_vision_search",
  "arguments": {
    "query": "checkout modal error 401",
    "limit": 5
  }
}
```
