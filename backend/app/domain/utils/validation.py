from app.core.exceptions import ValidationError


def is_power_of_two(value: int) -> bool:
    return value > 0 and (value & (value - 1)) == 0


def validate_code_params(N: int, K: int) -> None:
    if not is_power_of_two(N):
        raise ValidationError("N must be a positive power of two.")

    if K <= 0:
        raise ValidationError("K must be greater than 0.")

    if K > N:
        raise ValidationError("K must be less than or equal to N.")


def validate_info_bits(info_bits: list[int], K: int) -> None:
    if len(info_bits) != K:
        raise ValidationError("Length of info_bits must be equal to K.")

    if any(bit not in (0, 1) for bit in info_bits):
        raise ValidationError("info_bits must contain only 0 or 1.")


def validate_mask(mask: list[int], N: int) -> None:
    if len(mask) != N:
        raise ValidationError("Length of mask must be equal to N.")

    if any(bit not in (0, 1) for bit in mask):
        raise ValidationError("mask must contain only 0 or 1.")

    if sum(mask) <= 0:
        raise ValidationError("mask must contain at least one information position.")


def validate_llr(llr: list[float], N: int) -> None:
    if len(llr) != N:
        raise ValidationError("Length of llr must be equal to N.")

    for value in llr:
        if not isinstance(value, (int, float)):
            raise ValidationError("llr must contain only numeric values.")


def validate_ebn0_points(points: list[float]) -> None:
    if len(points) == 0:
        raise ValidationError("ebn0_points_db must not be empty.")

    for value in points:
        if not isinstance(value, (int, float)):
            raise ValidationError("ebn0_points_db must contain only numeric values.")


def validate_frames(frames: int) -> None:
    if frames <= 0:
        raise ValidationError("frames must be greater than 0.")