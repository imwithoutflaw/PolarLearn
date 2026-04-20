class PolarLabError(Exception):
    """Base project exception."""


class ValidationError(PolarLabError):
    """Raised when input data is invalid."""