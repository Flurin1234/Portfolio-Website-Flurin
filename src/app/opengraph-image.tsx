import { ImageResponse } from "next/og";
import { content, site } from "@/content/site";

// Link preview for WhatsApp, LinkedIn & co.
export const alt = `${site.firstName} ${site.lastName} — Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { roles } = content.de;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0d0d12",
          color: "#ecebe7",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, opacity: 0.6 }}>
          <span>Portfolio</span>
          <span>Swisscom</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            {site.firstName} {site.lastName}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
            {roles.map((role, i) => (
              <div
                key={role}
                style={{
                  display: "flex",
                  padding: "12px 28px",
                  borderRadius: 999,
                  fontSize: 32,
                  background: i === 0 ? "#ff5a1f" : "transparent",
                  color: i === 0 ? "#0d0d12" : "#ecebe7",
                  border: i === 0 ? "2px solid #ff5a1f" : "2px solid rgba(236,235,231,0.35)",
                }}
              >
                {role}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", height: 6, width: 160, background: "#ff5a1f", borderRadius: 3 }} />
      </div>
    ),
    size,
  );
}
