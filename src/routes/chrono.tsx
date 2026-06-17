import { createFileRoute } from "@tanstack/react-router";
import { FullScreen, ScreenChrono } from "@/lib/wall-screens";

export const Route = createFileRoute("/chrono")({
  head: () => ({ meta: [{ title: "Chrono — IA Stanley CTF" }] }),
  component: () => (
    <FullScreen n={4} title="Chrono" subtitle="Phase RÉSOLUTION">
      <ScreenChrono />
    </FullScreen>
  ),
});
