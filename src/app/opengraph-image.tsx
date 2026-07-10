import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const markData = await readFile(
    join(process.cwd(), "public/brand/aervonx-mark-light.png"),
  );
  const markSrc = `data:image/png;base64,${markData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0f1e",
          backgroundImage:
            "radial-gradient(circle at 78% 18%, rgba(201,162,79,0.22), transparent 55%), radial-gradient(circle at 10% 85%, rgba(69,92,134,0.28), transparent 50%)",
        }}
      >
        <img src={markSrc} width={140} height={136} alt="" />
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 86,
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: -2,
          }}
        >
          Aervon
          <span style={{ color: "#dcbb6e" }}>X</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 30,
            color: "#9fb0d0",
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
