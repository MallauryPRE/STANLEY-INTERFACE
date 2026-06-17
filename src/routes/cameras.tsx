import { createFileRoute } from "@tanstack/react-router";
import { FullScreen, ScreenCameras } from "@/lib/wall-screens";

export const Route = createFileRoute("/cameras")({
  head: () => ({ meta: [{ title: "6 Caméras IA — Stanley Tour Contrôle" }] }),
  component: () => (
    <FullScreen n={3} title="6 Caméras + IA" subtitle="Suivi attitudes & émotions">
      <ScreenCameras />
    </FullScreen>
  ),
});
