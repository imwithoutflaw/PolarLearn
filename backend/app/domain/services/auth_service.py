import json
import sqlite3
from pathlib import Path

from app.core.auth_utils import create_token, hash_password, verify_password


BASE_DIR = Path(__file__).resolve().parents[3]
DATA_DIR = BASE_DIR / "data"
DB_PATH = DATA_DIR / "auth.db"


def _get_connection() -> sqlite3.Connection:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_auth_db() -> None:
    conn = _get_connection()
    try:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE,
                username TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        conn.commit()
    finally:
        conn.close()


def register_user(email: str, username: str, password: str) -> dict:
    conn = _get_connection()
    try:
        existing = conn.execute(
            "SELECT id FROM users WHERE email = ? OR username = ?",
            (email, username),
        ).fetchone()

        if existing:
            raise ValueError("User with this email or username already exists")

        password_hash = hash_password(password)

        cursor = conn.execute(
            """
            INSERT INTO users (email, username, password_hash)
            VALUES (?, ?, ?)
            """,
            (email, username, password_hash),
        )
        conn.commit()

        user_id = cursor.lastrowid
        return {
            "id": user_id,
            "email": email,
            "username": username,
        }
    finally:
        conn.close()


def login_user(email: str, password: str) -> dict:
    conn = _get_connection()
    try:
        user = conn.execute(
            """
            SELECT id, email, username, password_hash
            FROM users
            WHERE email = ?
            """,
            (email,),
        ).fetchone()

        if not user:
            raise ValueError("Invalid email or password")

        if not verify_password(password, user["password_hash"]):
            raise ValueError("Invalid email or password")

        token = create_token(
            {
                "sub": str(user["id"]),
                "email": user["email"],
                "username": user["username"],
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": user["id"],
                "email": user["email"],
                "username": user["username"],
            },
        }
    finally:
        conn.close()


def get_user_by_id(user_id: int) -> dict | None:
    conn = _get_connection()
    try:
        user = conn.execute(
            """
            SELECT id, email, username
            FROM users
            WHERE id = ?
            """,
            (user_id,),
        ).fetchone()

        if not user:
            return None

        return {
            "id": user["id"],
            "email": user["email"],
            "username": user["username"],
        }
    finally:
        conn.close()