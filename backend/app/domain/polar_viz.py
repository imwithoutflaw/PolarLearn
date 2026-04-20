from __future__ import annotations

import math
from typing import Dict, List, Sequence


def compute_stages(u: Sequence[int]) -> List[Dict]:
    """Return stage-by-stage vectors for butterfly visualization."""
    n = len(u)
    if n == 0 or (n & (n - 1)) != 0:
        raise ValueError("len(u) must be a non-zero power of two.")

    stages: List[Dict] = [{"stage": 0, "values": [int(b) & 1 for b in u]}]
    current = stages[0]["values"][:]
    levels = int(math.log2(n))

    for level in range(levels):
        step = 2 ** level
        block = step * 2
        nxt = current[:]
        for start in range(0, n, block):
            for i in range(start, start + step):
                nxt[i] = current[i] ^ current[i + step]
                nxt[i + step] = current[i + step]
        current = nxt
        stages.append({"stage": level + 1, "values": current[:]})

    return stages