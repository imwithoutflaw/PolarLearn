from app.domain.services.ber_service import build_ber_response


def test_ber_service_returns_results_for_each_point():
    response = build_ber_response(
        N=8,
        K=4,
        design_ebn0_db=2.0,
        ebn0_points_db=[0.0, 1.0],
        bits_target=20,
        min_err_plot=2,
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
        bits_target=20,
        min_err_plot=2,
    )

    point = response.results[0]

    assert point.total_bits > 0
    assert point.bit_errors >= 0