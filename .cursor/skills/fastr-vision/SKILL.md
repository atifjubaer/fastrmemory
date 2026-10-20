---
name: fastr-vision
description: Use when a screenshot, UI mockup, architecture diagram, or error screen should be remembered for later, or before fixing a visual bug or redesigning UI to find related images stored earlier. Tags images with descriptions and OCR text and searches them.
---

# FastrMemory: Visual Memory

## When to use
- The user shares a screenshot or diagram that explains a bug, design, or architecture.
- A test or tool produced an image worth keeping (visual regression, error dialog).
- You are about to change UI and want earlier screenshots or design references.

## 1. Tag an image
```js
fastr_vision_tag({
  filePath: "screenshots/checkout-401.png",
  description: "Checkout modal showing a red HTTP 401 banner above the pay button",
  ocrText: "HTTP 401 Unauthorized. Access token expired.",
  memoryId: "mem_009e4a7d",
  taskId: "act_checkout_fix"
})
```
- `description`: components, layout, colours, and what is wrong or notable.
- `ocrText`: exact visible text (error messages, codes, labels) to make keyword search work.
- `memoryId` / `taskId` (optional): link the governing trap or rule, and the related action.

## 2. Search images
```js
fastr_vision_search({ query: "checkout modal 401 error", limit: 5 })
```
Filter to images linked to one memory with `memoryId: "mem_009e4a7d"`.

## Rules
- Describe what is in the image; do not guess at content you cannot see.
- Do not tag images containing secrets or personal data.
