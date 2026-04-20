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