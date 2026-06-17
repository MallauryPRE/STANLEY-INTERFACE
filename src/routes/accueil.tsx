import { createFileRoute } from "@tanstack/react-router";
import { FullScreen, ScreenAccueil } from "@/lib/wall-screens";

export const Route = createFileRoute("/accueil")({
  head: () => ({ meta: [{ title: "Accueil — IA Stanley CTF" }] }),
  component: () => (
    <FullScreen n={1} title="Accueil" subtitle="Logo · Sponsors">
      <ScreenAccueil />
    </FullScreen>
  ),
});
