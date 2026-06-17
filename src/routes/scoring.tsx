import { createFileRoute } from "@tanstack/react-router";
import { FullScreen, ScreenScoring } from "@/lib/wall-screens";

export const Route = createFileRoute("/scoring")({
  head: () => ({ meta: [{ title: "Scoring — Stanley Tour Contrôle" }] }),
  component: () => (
    <FullScreen n={5} title="Écran de scoring" subtitle="Classement live">
      <ScreenScoring />
    </FullScreen>
  ),
});
