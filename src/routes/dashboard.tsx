import { createFileRoute } from "@tanstack/react-router";
import { FullScreen, ScreenDashboard } from "@/lib/wall-screens";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard Session — Stanley Tour Contrôle" }] }),
  component: () => (
    <FullScreen n={8} title="Dashboard session" subtitle="Vue globale">
      <ScreenDashboard />
    </FullScreen>
  ),
});
