import { createFileRoute } from "@tanstack/react-router";
import { FullScreen, ScreenDeroule } from "@/lib/wall-screens";

export const Route = createFileRoute("/deroule")({
  head: () => ({ meta: [{ title: "Déroulé Exercice — Stanley Tour Contrôle" }] }),
  component: () => (
    <FullScreen n={7} title="Déroulé exercice" subtitle="Timeline live">
      <ScreenDeroule />
    </FullScreen>
  ),
});
