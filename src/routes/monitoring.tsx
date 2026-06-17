import { createFileRoute } from "@tanstack/react-router";
import { FullScreen, ScreenMonitoring } from "@/lib/wall-screens";

export const Route = createFileRoute("/monitoring")({
  head: () => ({ meta: [{ title: "Monitoring Serveurs — Stanley Tour Contrôle" }] }),
  component: () => (
    <FullScreen n={4} title="Monitoring Serveurs" subtitle="État de calcul">
      <ScreenMonitoring />
    </FullScreen>
  ),
});
