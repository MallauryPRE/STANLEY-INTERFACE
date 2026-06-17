import { createFileRoute } from "@tanstack/react-router";
import { FullScreenVertical, ScreenSon } from "@/lib/wall-screens";

export const Route = createFileRoute("/son")({
  head: () => ({ meta: [{ title: "Pilotage Son — Stanley Tour Contrôle" }] }),
  component: () => (
    <FullScreenVertical n={9} title="Pilotage Son" subtitle="Ambiances sonores">
      <ScreenSon />
    </FullScreenVertical>
  ),
});
