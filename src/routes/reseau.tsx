import { createFileRoute } from "@tanstack/react-router";
import { FullScreen, ScreenNetwork } from "@/lib/wall-screens";

export const Route = createFileRoute("/reseau")({
  head: () => ({ meta: [{ title: "Carte réseau — IA Stanley CTF" }] }),
  component: () => (
    <FullScreen n={6} title="Carte réseau" subtitle="Visuel attaques">
      <ScreenNetwork />
    </FullScreen>
  ),
});
