from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

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
    assert len(data["steps"]) > 0
    assert "step_type" in data["steps"][0]

    def test_ber_endpoint_success():
        response = client.post(
            "/api/ber/simulate",
            json={
                "N": 8,
                "K": 4,
                "design_ebn0_db": 2.0,
                "ebn0_points_db": [0.0, 1.0],
                "bits_target": 20,
                "min_err_plot": 2,
            },
        )

        assert response.status_code == 200
        data = response.json()

        assert data["N"] == 8
        assert data["K"] == 4
        assert len(data["results"]) == 2

    def test_ber_compare_endpoint_success():
        response = client.post(
            "/api/ber/compare",
            json={
                "codes": [
                    {"N": 8, "K": 4},
                    {"N": 16, "K": 8}
                ],
                "design_ebn0_db": 2.0,
                "ebn0_points_db": [0.0, 1.0],
                "bits_target": 20,
                "min_err_plot": 2
            },
        )

        assert response.status_code == 200
        data = response.json()

        assert "series" in data
        assert "theoretical_uncoded_bpsk" in data
        assert len(data["series"]) == 2
        assert len(data["theoretical_uncoded_bpsk"]) == 2