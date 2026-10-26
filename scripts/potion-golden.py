"""Generate golden token ids and embeddings for the potion-base-8M gate.

Dev-time only: requires `tokenizers` and `numpy` in the local Python. The shipped
package stays pure TypeScript with three runtime dependencies.

Outputs:
  bench/fixtures/potion-golden.json          tokenizer golden (committed, CI-checked)
  bench/external/potion-embeddings-golden.json  embedding golden (dev-only, needs the 30 MB model)

Usage: python scripts/potion-golden.py <model-dir>
"""
import json
import sys
from pathlib import Path

import numpy as np
from tokenizers import Tokenizer

ROOT = Path(__file__).resolve().parent.parent
MODEL_DIR = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "bench/external/potion-base-8M"
TOKENIZER_OUT = ROOT / "bench/fixtures/potion-golden.json"
EMBEDDING_OUT = ROOT / "bench/external/potion-embeddings-golden.json"

# Tokenizer edge cases: casing, punctuation, accents, CJK, hyphenation, numbers,
# repeated whitespace, emoji, long words that must fall back to [UNK].
TEXTS = [
    "The quick brown fox jumps over the lazy dog.",
    "UNBELIEVABLE! How does JWT exp work?",
    "café naïve résumé — co-operate re-entrant",
    "auth/jwt.ts:Date.now() milliseconds",
    "数据库连接失败，请重试",
    "emoji 😀 and symbols @#$%^&*()",
    "   multiple     spaces\tand\nnewlines   ",
    "pneumonoultramicroscopicsilicovolcanoconiosis",
    "BM25 FTS5 SQLite WAL",
    "a",
    "",
    "What did I decide about the payment provider migration?",
    "I prefer dark mode and short commit messages.",
    "The user's sister's birthday is on March 3rd.",
    "supercalifragilisticexpialidocious",
    "C++ vs C# vs .NET 8",
    "email me at dev@example.com or call +1-555-0100",
    "hyphenated-word and snake_case and camelCase",
    "ÅNGSTRÖM İstanbul ﬁnancial",
    "1,234.56 USD 42% 3.14159",
]

tokenizer = Tokenizer.from_file(str(MODEL_DIR / "tokenizer.json"))
unk_id = tokenizer.token_to_id("[UNK]")
encodings = tokenizer.encode_batch(TEXTS, add_special_tokens=False)

# --- safetensors reader (mirrors the TS gate implementation) ---
raw = (MODEL_DIR / "model.safetensors").read_bytes()
header_len = int.from_bytes(raw[:8], "little")
header = json.loads(raw[8 : 8 + header_len].decode("utf-8"))
info = header["embeddings"]
assert info["dtype"] == "F32", info["dtype"]
start, end = info["data_offsets"]
matrix = np.frombuffer(raw[8 + header_len + start : 8 + header_len + end], dtype=np.float32)
matrix = matrix.reshape(info["shape"])

tokenizer_cases = []
embedding_cases = []
for text, encoding in zip(TEXTS, encodings):
    tokenizer_cases.append({"text": text, "tokens": encoding.tokens, "ids": encoding.ids})

    ids = [token_id for token_id in encoding.ids if token_id != unk_id]
    if ids:
        vec = matrix[np.array(ids, dtype=np.int64)].mean(axis=0)
        norm = float(np.linalg.norm(vec) + 1e-32)
        vec = (vec / norm).astype(np.float32)
    else:
        vec = np.zeros(matrix.shape[1], dtype=np.float32)
    embedding_cases.append({"text": text, "ids": ids, "embedding": [float(x) for x in vec]})

TOKENIZER_OUT.parent.mkdir(parents=True, exist_ok=True)
TOKENIZER_OUT.write_text(
    json.dumps(
        {
            "model": "minishlab/potion-base-8M",
            "revision": "bf8b056651a2c21b8d2565580b8569da283cab23",
            "unkId": unk_id,
            "dim": int(matrix.shape[1]),
            "vocab": int(matrix.shape[0]),
            "cases": tokenizer_cases,
        },
        indent=2,
        ensure_ascii=False,
    )
    + "\n",
    encoding="utf-8",
)

# Reduced vocabulary: only the pieces the golden cases actually use. This keeps the
# committed fixture small enough for CI to check real WordPiece behaviour without the
# 30 MB model or the full 29k-entry vocabulary.
model_section = json.loads((MODEL_DIR / "tokenizer.json").read_text(encoding="utf-8"))["model"]
used_tokens = {"[UNK]", "[PAD]"}
for case in tokenizer_cases:
    used_tokens.update(case["tokens"])
subset = {token: model_section["vocab"][token] for token in sorted(used_tokens)}
SUBSET_OUT = ROOT / "bench/fixtures/potion-vocab-subset.json"
SUBSET_OUT.write_text(
    json.dumps(
        {
            "model": "minishlab/potion-base-8M",
            "revision": "bf8b056651a2c21b8d2565580b8569da283cab23",
            "continuingPrefix": model_section.get("continuing_subword_prefix", "##"),
            "maxCharsPerWord": model_section.get("max_input_chars_per_word", 100),
            "vocab": subset,
        },
        indent=2,
        ensure_ascii=False,
    )
    + "\n",
    encoding="utf-8",
)

EMBEDDING_OUT.parent.mkdir(parents=True, exist_ok=True)
EMBEDDING_OUT.write_text(
    json.dumps(
        {
            "model": "minishlab/potion-base-8M",
            "revision": "bf8b056651a2c21b8d2565580b8569da283cab23",
            "dim": int(matrix.shape[1]),
            "cases": embedding_cases,
        },
        indent=2,
        ensure_ascii=False,
    )
    + "\n",
    encoding="utf-8",
)

print(f"tokenizer golden: {len(tokenizer_cases)} cases -> {TOKENIZER_OUT.relative_to(ROOT)}")
print(f"embedding golden: {len(embedding_cases)} cases -> {EMBEDDING_OUT.relative_to(ROOT)}")
print("sample:", encodings[1].tokens)
