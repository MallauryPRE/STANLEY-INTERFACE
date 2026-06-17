import { createFileRoute } from "@tanstack/react-router";
import { FullScreen, ScreenProgression } from "@/lib/wall-screens";

export const Route = createFileRoute("/progression")({
  head: () => ({ meta: [{ title: "Progression — IA Stanley CTF" }] }),
  component: () => (
    <FullScreen n={7} title="Progression" subtitle="Heatmap équipes">
      <ScreenProgression />
    </FullScreen>
  ),
});
