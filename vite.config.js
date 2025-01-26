import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const outDir = resolve(__dirname, "dist");

export default defineConfig({
  plugins: [react()],
  root: "src",
  base: "/init-tracker/",
  build: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    outDir,
  },
});
