import math
import random


def bpsk_modulate(bits: list[int]) -> list[float]:
    return [1.0 if bit == 0 else -1.0 for bit in bits]


def awgn_channel(symbols: list[float], sigma: float) -> list[float]:
    return [symbol + random.gauss(0.0, sigma) for symbol in symbols]


def compute_sigma_from_ebn0(ebn0_db: float, rate: float) -> float:
    ebn0_linear = 10 ** (ebn0_db / 10.0)
    return math.sqrt(1.0 / (2.0 * rate * ebn0_linear))


def compute_llr_from_received(received: list[float], sigma: float) -> list[float]:
    variance = sigma * sigma
    return [2.0 * y / variance for y in received]


def theoretical_uncoded_bpsk_ber(ebn0_db: float) -> float:
    ebn0_linear = 10 ** (ebn0_db / 10.0)
    return 0.5 * math.erfc(math.sqrt(ebn0_linear))