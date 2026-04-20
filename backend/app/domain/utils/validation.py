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