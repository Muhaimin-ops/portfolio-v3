import { ImageResponse } from "next/og";

export const alt = "Mahmud Al Muhaimin — AI engineer and full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#f6f5f2",
          color: "#12151c",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 36, fontWeight: 700 }}>
          M<span style={{ color: "#8d918d" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: "-2px" }}>Mahmud Al Muhaimin</div>
          <div style={{ fontSize: 32, color: "#5b6070" }}>AI engineer · Full-stack developer · Dhaka, Bangladesh</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#5b6070" }}>muhaimin.dev</div>
      </div>
    ),
    size,
  );
}
