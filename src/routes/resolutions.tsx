import { createFileRoute } from "@tanstack/react-router";
import { FullScreen, ScreenResolutions } from "@/lib/wall-screens";

export const Route = createFileRoute("/resolutions")({
  head: () => ({ meta: [{ title: "Résolutions — IA Stanley CTF" }] }),
  component: () => (
    <FullScreen n={5} title="Résolutions" subtitle="Flux direct">
      <ScreenResolutions />
    </FullScreen>
  ),
});
