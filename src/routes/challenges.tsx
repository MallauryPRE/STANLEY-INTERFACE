import { createFileRoute } from "@tanstack/react-router";
import { FullScreen, ScreenChallenges } from "@/lib/wall-screens";

export const Route = createFileRoute("/challenges")({
  head: () => ({ meta: [{ title: "Challenges — IA Stanley CTF" }] }),
  component: () => (
    <FullScreen n={3} title="Challenges" subtitle="Par catégorie">
      <ScreenChallenges />
    </FullScreen>
  ),
});
