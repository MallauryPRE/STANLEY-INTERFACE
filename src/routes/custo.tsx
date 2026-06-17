import { createFileRoute } from "@tanstack/react-router";
import { FullScreen, ScreenCusto } from "@/lib/wall-screens";

export const Route = createFileRoute("/custo")({
  head: () => ({ meta: [{ title: "Custo Exercice — Stanley Tour Contrôle" }] }),
  component: () => (
    <FullScreen n={6} title="Custo exercice" subtitle="Configuration">
      <ScreenCusto />
    </FullScreen>
  ),
});
