import React from "react";
import TopBar from "../components/layout/TopBar.jsx";
import HomeCard from "../components/home/HomeCard.jsx";
import { navItems } from "../config/navItems.js";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #eef3fa 0%, #e9eff8 40%, #edf2f9 100%)",
        padding: 18,
        color: "#0f172a",
      }}
    >
      <TopBar />

      <main
        style={{
          maxWidth: 1240,
          margin: "28px auto 0",
          display: "grid",
          gap: 24,
        }}
      >
        <section
          style={{
            background: "#f8fbff",
            border: "1px solid #d8e3f2",
            borderRadius: 26,
            padding: "42px 40px 36px",
            boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <div style={{ maxWidth: 760 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: "#dbeafe",
                  color: "#1d4ed8",
                  fontWeight: 700,
                  fontSize: 13,
                  marginBottom: 18,
                }}
              >
                Polar Codes Laboratory
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 52,
                  lineHeight: 1.05,
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: "#0f172a",
                }}
              >
                PolarLearn
              </h1>

              <p
                style={{
                  margin: "16px 0 0",
                  color: "#475569",
                  fontSize: 18,
                  maxWidth: 780,
                  lineHeight: 1.7,
                }}
              >
                Interactive environment for polar code construction, encoding,
                SC decoding, BER simulation, and channel polarization
                visualization.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  marginTop: 22,
                }}
              >
                {["Mask Construction", "Encoder", "SC Decoder", "BER", "Polarization"].map(
                  (tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "10px 14px",
                        borderRadius: 999,
                        background: "#eef4ff",
                        border: "1px solid #cfe0ff",
                        color: "#334155",
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            <div
              style={{
                minWidth: 260,
                flex: "0 0 300px",
                background: "#184293",
                color: "#f8fbff",
                borderRadius: 22,
                padding: "22px 22px 20px",
                boxShadow: "0 16px 28px rgba(15, 46, 109, 0.22)",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  opacity: 0.75,
                  marginBottom: 14,
                }}
              >
                Project overview
              </div>

              <div
                style={{
                  display: "grid",
                  gap: 14,
                }}
              >
                <InfoRow label="Modules" value="5" />
                <InfoRow label="Focus" value="Polar codes" />
                <InfoRow label="Decoder" value="SC" />
                <InfoRow label="Channel" value="AWGN / BEC" />
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            background: "#f8fbff",
            border: "1px solid #d8e3f2",
            borderRadius: 26,
            padding: "30px 32px 34px",
            boxShadow: "0 14px 36px rgba(15, 23, 42, 0.06)",
          }}
        >
          <div style={{ marginBottom: 22 }}>
            <h2
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              Explore modules
            </h2>
            <p
              style={{
                margin: "10px 0 0",
                fontSize: 16,
                color: "#64748b",
                lineHeight: 1.6,
              }}
            >
              Choose a module to inspect polar code behavior step by step.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            {navItems.map((item) => (
              <HomeCard
                key={item.path}
                title={item.label}
                description={item.description}
                to={item.path}
              />
            ))}
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.35fr 1fr",
            gap: 24,
          }}
        >
          <div
            style={{
              background: "#f8fbff",
              border: "1px solid #d8e3f2",
              borderRadius: 26,
              padding: "28px 30px",
              boxShadow: "0 14px 36px rgba(15, 23, 42, 0.06)",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 24,
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              What you can do in this app
            </h3>

            <div
              style={{
                marginTop: 18,
                display: "grid",
                gap: 14,
              }}
            >
              {[
                "Construct information and frozen bit masks for selected code parameters.",
                "Visualize encoder stages and inspect the butterfly transformation.",
                "Follow SC decoding decisions step by step with tree and schedule views.",
                "Compare BER performance for multiple code lengths against theoretical BPSK.",
                "Explore the idea of channel polarization on a simple BEC example.",
              ].map((text) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    color: "#334155",
                    fontSize: 16,
                    lineHeight: 1.65,
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 999,
                      background: "#1d4ed8",
                      marginTop: 8,
                      flexShrink: 0,
                    }}
                  />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#f8fbff",
              border: "1px solid #d8e3f2",
              borderRadius: 26,
              padding: "28px 30px",
              boxShadow: "0 14px 36px rgba(15, 23, 42, 0.06)",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 24,
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              Suggested workflow
            </h3>

            <div style={{ marginTop: 18, display: "grid", gap: 14 }}>
              {[
                "1. Start with mask construction.",
                "2. Continue with encoder visualization.",
                "3. Inspect SC decoder decisions.",
                "4. Run BER simulations for selected code lengths.",
                "5. Use channel polarization demo for intuition.",
              ].map((step) => (
                <div
                  key={step}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 16,
                    background: "#f1f6ff",
                    border: "1px solid #d7e5ff",
                    color: "#334155",
                    fontSize: 15,
                    fontWeight: 600,
                    lineHeight: 1.5,
                  }}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        paddingBottom: 10,
        borderBottom: "1px solid rgba(255,255,255,0.14)",
      }}
    >
      <span style={{ opacity: 0.8, fontSize: 14 }}>{label}</span>
      <span style={{ fontWeight: 800, fontSize: 15 }}>{value}</span>
    </div>
  );
}