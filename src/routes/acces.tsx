import { createFileRoute } from "@tanstack/react-router";
import { FullScreen, ScreenAccess } from "@/lib/wall-screens";

export const Route = createFileRoute("/acces")({
  head: () => ({ meta: [{ title: "Accès — IA Stanley CTF" }] }),
  component: () => (
    <FullScreen n={8} title="Accès" subtitle="URL · VPN · Support">
      <ScreenAccess />
    </FullScreen>
  ),
});
