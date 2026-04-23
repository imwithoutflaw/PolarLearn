import base64
import hashlib
import hmac
import json
import secrets
import time


SECRET_KEY = "change-this-secret-key-in-production-please"
TOKEN_TTL_SECONDS = 60 * 60 * 24  # 24h


def hash_password(password: str, salt: str | None = None) -> str:
    if salt is None:
        salt = secrets.token_hex(16)

    derived = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        100_000,
    )
    return f"{salt}${derived.hex()}"


def verify_password(password: str, stored_hash: str) -> bool:
    try:
        salt, hashed = stored_hash.split("$", 1)
    except ValueError:
        return False

    recalculated = hash_password(password, salt)
    return hmac.compare_digest(recalculated, stored_hash)


def _b64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("utf-8")


def _b64url_decode(data: str) -> bytes:
    padding = "=" * (-len(data) % 4)
    return base64.urlsafe_b64decode(data + padding)


def create_token(payload: dict) -> str:
    data = payload.copy()
    data["exp"] = int(time.time()) + TOKEN_TTL_SECONDS

    raw = json.dumps(data, separators=(",", ":"), sort_keys=True).encode("utf-8")
    body = _b64url_encode(raw)

    signature = hmac.new(
        SECRET_KEY.encode("utf-8"),
        body.encode("utf-8"),
        hashlib.sha256,
    ).digest()

    return f"{body}.{_b64url_encode(signature)}"


def decode_token(token: str) -> dict | None:
    try:
        body, signature = token.split(".", 1)
    except ValueError:
        return None

    expected_signature = hmac.new(
        SECRET_KEY.encode("utf-8"),
        body.encode("utf-8"),
        hashlib.sha256,
    ).digest()

    if not hmac.compare_digest(_b64url_encode(expected_signature), signature):
        return None

    try:
        payload = json.loads(_b64url_decode(body).decode("utf-8"))
    except Exception:
        return None

    if int(payload.get("exp", 0)) < int(time.time()):
        return None

    return payload