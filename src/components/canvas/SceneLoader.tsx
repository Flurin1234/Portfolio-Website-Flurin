"use client";

import dynamic from "next/dynamic";

// WebGL needs the browser, so skip server rendering
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function SceneLoader() {
  return <Scene />;
}
