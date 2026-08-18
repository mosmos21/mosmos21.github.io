import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// User page (mosmos21.github.io) is served from the domain root.
export default defineConfig({
  base: "/",
  plugins: [tailwindcss()],
});
