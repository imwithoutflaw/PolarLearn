from app.domain.services.ber_service import build_ber_compare_response


class CodeItem:
    def __init__(self, N, K):
        self.N = N
        self.K = K


def test_ber_compare_returns_multiple_series_and_theory():
    response = build_ber_compare_response(
        codes=[CodeItem(8, 4), CodeItem(16, 8)],
        design_ebn0_db=2.0,
        ebn0_points_db=[0.0, 1.0],
        frames=3,
    )

    assert len(response.series) == 2
    assert len(response.theoretical_uncoded_bpsk) == 2
    assert response.series[0].N == 8
    assert response.series[1].N == 16