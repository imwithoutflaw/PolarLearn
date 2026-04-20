from app.domain.polar_core import construct_mask


def test_construct_mask_returns_valid_shapes():
    N = 8
    K = 4
    design_ebn0_db = 2.0

    mask, info_positions, frozen_positions = construct_mask(
        N=N,
        K=K,
        design_ebn0_db=design_ebn0_db,
    )

    assert len(mask) == N
    assert len(info_positions) == K
    assert len(frozen_positions) == N - K

    assert sum(mask) == K
    assert set(info_positions).isdisjoint(set(frozen_positions))
    assert set(info_positions) | set(frozen_positions) == set(range(N))


def test_construct_mask_is_binary():
    mask, _, _ = construct_mask(
        N=8,
        K=4,
        design_ebn0_db=2.0,
    )

    assert all(bit in (0, 1) for bit in mask)


def test_construct_mask_marks_info_positions_with_ones():
    mask, info_positions, frozen_positions = construct_mask(
        N=8,
        K=4,
        design_ebn0_db=2.0,
    )

    for pos in info_positions:
        assert mask[pos] == 1

    for pos in frozen_positions:
        assert mask[pos] == 0