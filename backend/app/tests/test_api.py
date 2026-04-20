from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_root_endpoint():
    response = client.get("/")

    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"


def test_mask_endpoint_success():
    response = client.post(
        "/api/mask/construct",
        json={
            "N": 8,
            "K": 4,
            "design_ebn0_db": 2.0,
        },
    )

    assert response.status_code == 200
    data = response.json()

    assert data["N"] == 8
    assert data["K"] == 4
    assert len(data["mask"]) == 8
    assert len(data["info_positions"]) == 4
    assert len(data["frozen_positions"]) == 4


def test_mask_endpoint_invalid_n():
    response = client.post(
        "/api/mask/construct",
        json={
            "N": 7,
            "K": 4,
            "design_ebn0_db": 2.0,
        },
    )

    assert response.status_code == 422
    assert "power of two" in response.json()["detail"]


def test_encoder_endpoint_success():
    response = client.post(
        "/api/encoder/run",
        json={
            "N": 8,
            "K": 4,
            "design_ebn0_db": 2.0,
            "info_bits": [1, 0, 1, 1],
        },
    )

    assert response.status_code == 200
    data = response.json()

    assert data["N"] == 8
    assert data["K"] == 4
    assert len(data["u_vector"]) == 8
    assert len(data["codeword"]) == 8
    assert len(data["stages"]) == 4


def test_encoder_endpoint_invalid_info_bits_length():
    response = client.post(
        "/api/encoder/run",
        json={
            "N": 8,
            "K": 4,
            "design_ebn0_db": 2.0,
            "info_bits": [1, 0],
        },
    )

    assert response.status_code == 422
    assert "Length of info_bits must be equal to K." == response.json()["detail"]


def test_decoder_endpoint_success():
    response = client.post(
        "/api/decoder/sc-run",
        json={
            "N": 8,
            "llr": [5.0, 4.0, -3.0, 2.0, -4.0, 3.0, -2.5, 1.5],
            "mask": [0, 0, 0, 1, 0, 1, 1, 1],
        },
    )

    assert response.status_code == 200
    data = response.json()

    assert "estimated_bits" in data
    assert "steps" in data
    assert len(data["estimated_bits"]) == 4


def test_decoder_endpoint_invalid_mask_length():
    response = client.post(
        "/api/decoder/sc-run",
        json={
            "N": 8,
            "llr": [5.0, 4.0, -3.0, 2.0, -4.0, 3.0, -2.5, 1.5],
            "mask": [0, 1],
        },
    )

    assert response.status_code == 422
    assert "Length of mask must be equal to N." == response.json()["detail"]

    def test_ber_endpoint_success():
        response = client.post(
            "/api/ber/simulate",
            json={
                "N": 8,
                "K": 4,
                "design_ebn0_db": 2.0,
                "ebn0_points_db": [0.0, 1.0],
                "frames": 3,
            },
        )

        assert response.status_code == 200
        data = response.json()

        assert data["N"] == 8
        assert data["K"] == 4
        assert len(data["results"]) == 2