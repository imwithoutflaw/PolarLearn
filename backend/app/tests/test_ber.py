from app.domain.services.ber_service import build_ber_response


def test_ber_service_returns_results_for_each_point():
    response = build_ber_response(
        N=8,
        K=4,
        design_ebn0_db=2.0,
        ebn0_points_db=[0.0, 1.0],
        frames=5,
    )

    assert response.N == 8
    assert response.K == 4
    assert len(response.results) == 2


def test_ber_service_result_shapes_are_valid():
    response = build_ber_response(
        N=8,
        K=4,
        design_ebn0_db=2.0,
        ebn0_points_db=[0.0],
        frames=3,
    )

    point = response.results[0]

    assert point.total_frames == 3
    assert point.total_bits == 12
    assert 0.0 <= point.ber <= 1.0
    assert 0.0 <= point.fer <= 1.0