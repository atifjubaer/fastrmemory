---
name: fastr-architecture
description: FastrMemory systems architecture, zero-loss durability, and in-process SQLite WAL design.
---

# FastrMemory Architectural Principles & Standards

## Overview
FastrMemory is engineered from the ground up to eliminate the fragile daemon requirements and C++ native binary dependencies that plague legacy agent memory engines. Built natively on Node.js 24 (`node:sqlite`), it provides deterministic sub-millisecond retrieval with cryptographic durability.

## Architectural Pillars

### 1. In-Process SQLite WAL Engine
- Operates directly inside the agent's MCP process via `node:sqlite`.
- **Zero Mandatory Daemons**: Retrieval and storage never fail due to background daemon crashes, port conflicts, or network partitions.
- **WAL Mode (Write-Ahead Logging)**: Enables unlimited concurrent read operations with microsecond response times and immediate write consistency.

### 2. Triple-Stream Reciprocal Rank Fusion (RRF)
- Combines three complementary retrieval vectors:
  1. **Full-Text BM25**: Precise token and identifier matching.
  2. **Trigram Dense Vector**: Typo-tolerant semantic similarity without requiring heavy Python or ONNX runtimes.
  3. **Graph Associative Walk**: Bidirectional entity and dependency traversal.
- Fused via `RRF(d) = Σ 1 / (60 + r_i)`.

### 3. Bi-Temporal Provenance
- Every memory stores two time dimensions:
  - **Valid Time**: When the rule or fact is true in the project.
  - **Transaction Time**: When the memory was recorded into the database.
- Every commit or handoff is cryptographically hashed with SHA-256 to ensure an immutable audit trail.

### 4. Hybrid Background Service
- When real-time visual monitoring or remote HTTP APIs are needed, FastrMemory offers an optional detached daemon (`fastrmemory daemon start`).
- The daemon shares the exact same SQLite WAL database file without blocking or degrading the in-process stdio MCP channel.
