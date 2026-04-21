from pydantic import BaseModel, Field


class BerPointResponse(BaseModel):
    ebn0_db: float = Field(..., description="Simulated Eb/N0 point")
    ber: float | None = Field(..., description="Bit error rate, or null if not enough errors")
    bit_errors: int = Field(..., description="Total number of bit errors")
    total_bits: int = Field(..., description="Total number of processed information bits")


class BerResponse(BaseModel):
    N: int = Field(..., description="Code length")
    K: int = Field(..., description="Number of information bits")
    design_ebn0_db: float = Field(..., description="Design Eb/N0 in dB used for mask construction")
    results: list[BerPointResponse] = Field(..., description="BER results for each Eb/N0 point")
    explanation: str = Field(..., description="Short explanation of simulation settings")


class BerRequest(BaseModel):
    N: int = Field(..., description="Code length")
    K: int = Field(..., description="Number of information bits")
    design_ebn0_db: float = Field(..., description="Design Eb/N0 in dB for mask construction")
    ebn0_points_db: list[float] = Field(..., description="Eb/N0 points to simulate")
    bits_target: int = Field(..., description="Target number of processed information bits")
    min_err_plot: int = Field(..., description="Minimum number of errors required for a reliable plotted BER point")


class BerCompareItemRequest(BaseModel):
    N: int = Field(..., description="Code length")
    K: int = Field(..., description="Number of information bits")


class TheoreticalPointResponse(BaseModel):
    ebn0_db: float = Field(..., description="Eb/N0 point")
    ber: float = Field(..., description="Theoretical BER value")


class BerCompareSeriesResponse(BaseModel):
    N: int = Field(..., description="Code length")
    K: int = Field(..., description="Number of information bits")
    rate: float = Field(..., description="Code rate")
    results: list[BerPointResponse] = Field(..., description="Simulated BER points")


class BerCompareRequest(BaseModel):
    codes: list[BerCompareItemRequest] = Field(..., description="List of (N, K) code configurations")
    design_ebn0_db: float = Field(..., description="Design Eb/N0 in dB for mask construction")
    ebn0_points_db: list[float] = Field(..., description="Eb/N0 points to simulate")
    bits_target: int = Field(..., description="Target number of processed information bits")
    min_err_plot: int = Field(..., description="Minimum number of errors required for a reliable plotted BER point")


class BerCompareResponse(BaseModel):
    design_ebn0_db: float = Field(..., description="Design Eb/N0 in dB used for mask construction")
    ebn0_points_db: list[float] = Field(..., description="Eb/N0 points used in comparison")
    bits_target: int = Field(..., description="Target number of processed information bits")
    min_err_plot: int = Field(..., description="Minimum number of errors required for a reliable plotted BER point")
    series: list[BerCompareSeriesResponse] = Field(..., description="Simulation series for each code length")
    theoretical_uncoded_bpsk: list[TheoreticalPointResponse] = Field(
        ...,
        description="Reference uncoded BPSK theoretical BER curve",
    )
    explanation: str = Field(..., description="Short explanation of comparison settings")