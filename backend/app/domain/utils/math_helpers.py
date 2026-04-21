import math
import random


def compute_sigma_from_ebn0(ebn0_db: float, rate: float) -> float:
    """
    For coded BPSK over AWGN:
        sigma^2 = 1 / (2 * R * Eb/N0)
    where Eb/N0 is linear and R = K/N.
    """
    ebn0_linear = 10 ** (ebn0_db / 10.0)
    sigma2 = 1.0 / (2.0 * rate * ebn0_linear)
    return math.sqrt(sigma2)


def bpsk_modulate(bits: list[int]) -> list[float]:
    """
    BPSK mapping:
        0 -> +1
        1 -> -1
    """
    return [1.0 if bit == 0 else -1.0 for bit in bits]


def awgn_channel(symbols: list[float], sigma: float, rng=None) -> list[float]:
    """
    Adds Gaussian noise with std = sigma.
    """
    if rng is None:
        rng = random
    return [symbol + rng.gauss(0.0, sigma) for symbol in symbols]


def compute_llr_from_received(received: list[float], sigma: float) -> list[float]:
    """
    LLR for BPSK over AWGN:
        LLR = 2y / sigma^2

    Positive LLR => more likely bit 0
    Negative LLR => more likely bit 1
    """
    sigma2 = sigma * sigma
    return [(2.0 * y) / sigma2 for y in received]


def theoretical_uncoded_bpsk_ber(ebn0_db: float) -> float:
    """
    Theoretical BER for uncoded BPSK over AWGN:
        BER = 0.5 * erfc(sqrt(Eb/N0))
    """
    ebn0_linear = 10 ** (ebn0_db / 10.0)
    return 0.5 * math.erfc(math.sqrt(ebn0_linear))