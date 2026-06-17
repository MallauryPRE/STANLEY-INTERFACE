import { createFileRoute } from "@tanstack/react-router";
import { FullScreen, ScreenScoreboard } from "@/lib/wall-screens";

export const Route = createFileRoute("/scoreboard")({
  head: () => ({ meta: [{ title: "Scoreboard — IA Stanley CTF" }] }),
  component: () => (
    <FullScreen n={2} title="Scoreboard" subtitle="Classement live">
      <ScreenScoreboard />
    </FullScreen>
  ),
});
