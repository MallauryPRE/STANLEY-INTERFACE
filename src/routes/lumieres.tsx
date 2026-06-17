import { createFileRoute } from "@tanstack/react-router";
import { FullScreenVertical, ScreenLumieres } from "@/lib/wall-screens";

export const Route = createFileRoute("/lumieres")({
  head: () => ({ meta: [{ title: "Pilotage Lumières — Stanley Tour Contrôle" }] }),
  component: () => (
    <FullScreenVertical n={2} title="Pilotage Lumières" subtitle="Ambiances visuelles">
      <ScreenLumieres />
    </FullScreenVertical>
  ),
});
