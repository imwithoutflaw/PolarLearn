from app.domain.polar_core import sc_decode
from app.domain.services.decoder_service import build_decoder_response


def test_sc_decode_returns_only_information_bits():
    llr = [5.0, 4.0, -3.0, 2.0, -4.0, 3.0, -2.5, 1.5]
    mask = [0, 0, 0, 1, 0, 1, 1, 1]

    estimated_bits, steps = sc_decode(
        llr=llr,
        mask=mask,
        return_trace=True,
    )

    assert len(estimated_bits) == sum(mask)
    assert isinstance(steps, list)
    assert len(steps) > 0
    assert all("step_type" in step for step in steps)


def test_decoder_service_returns_expected_shape():
    response = build_decoder_response(
        N=8,
        llr=[5.0, 4.0, -3.0, 2.0, -4.0, 3.0, -2.5, 1.5],
        mask=[0, 0, 0, 1, 0, 1, 1, 1],
    )

    assert isinstance(response.estimated_bits, list)
    assert isinstance(response.steps, list)
    assert len(response.estimated_bits) == 4
    assert len(response.steps) > 0
    assert response.steps[0].step_type in ("leaf_decision", "combine")


def test_sc_decode_without_trace_returns_empty_steps():
    estimated_bits, steps = sc_decode(
        llr=[5.0, 4.0, -3.0, 2.0, -4.0, 3.0, -2.5, 1.5],
        mask=[0, 0, 0, 1, 0, 1, 1, 1],
        return_trace=False,
    )

    assert isinstance(estimated_bits, list)
    assert steps == []


def test_decoder_trace_contains_leaf_and_combine_steps():
    response = build_decoder_response(
        N=8,
        llr=[5.0, 4.0, -3.0, 2.0, -4.0, 3.0, -2.5, 1.5],
        mask=[0, 0, 0, 1, 0, 1, 1, 1],
    )

    step_types = [step.step_type for step in response.steps]

    assert "leaf_decision" in step_types
    assert "combine" in step_types