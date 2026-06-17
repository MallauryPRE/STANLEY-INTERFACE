import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar, BottomTicker, SCREENS } from "@/lib/wall-screens";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IA Stanley — Tour de Contrôle" },
      { name: "description", content: "Hub central de la tour de contrôle Stanley — 9 écrans dédiés." },
    ],
  }),
  component: Hub,
});

const PUBLIC_SCREENS = [
  { n: "A", slug: "accueil", title: "Accueil", subtitle: "Logo · OPCO Atlas", path: "/accueil" as const },
  { n: "B", slug: "scoreboard", title: "Scoreboard", subtitle: "Classement live", path: "/scoreboard" as const },
  { n: "C", slug: "challenges", title: "Challenges", subtitle: "Par catégorie", path: "/challenges" as const },
  { n: "D", slug: "chrono", title: "Chrono", subtitle: "Phase RÉSOLUTION", path: "/chrono" as const },
  { n: "E", slug: "resolutions", title: "Résolutions", subtitle: "Flux direct", path: "/resolutions" as const },
  { n: "F", slug: "reseau", title: "Carte réseau", subtitle: "Visuel attaques", path: "/reseau" as const },
  { n: "G", slug: "progression", title: "Progression", subtitle: "Heatmap équipes", path: "/progression" as const },
  { n: "H", slug: "acces", title: "Accès", subtitle: "URL · VPN · Support", path: "/acces" as const },
];

function Hub() {
  return (
    <div className="flex h-screen flex-col bg-[var(--bg-base)]">
      <TopBar />
      <main className="min-h-0 flex-1 overflow-auto p-6 space-y-10">

        {/* ─── TOUR DE CONTRÔLE ─────────────────────────────── */}
        <section>
          <div className="mb-4 flex items-center gap-4">
            <div>
              <div className="label-mono text-[color:var(--accent)]">RÉGIE · TOUR DE CONTRÔLE</div>
              <h1 className="font-display text-2xl font-bold text-[color:var(--text-high)]">
                Écrans opérateurs
              </h1>
            </div>
            <div className="ml-auto label-mono text-[color:var(--text-faint)]">
              {SCREENS.length} écrans
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SCREENS.map((s) => (
              <Link
                key={s.slug}
                to={s.path}
                className="panel panel-glow group flex flex-col gap-3 p-4 transition hover:border-[color:var(--accent)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="label-mono rounded-sm border border-[color:var(--accent)]/40 px-2 py-0.5 text-[color:var(--accent)]">
                      ÉCRAN {String(s.n).padStart(2, "0")}
                    </span>
                    {s.vertical && (
                      <span className="label-mono rounded-sm border border-[color:var(--sev-low)]/50 px-2 py-0.5 text-[color:var(--sev-low)]">
                        VERTICAL
                      </span>
                    )}
                  </div>
                  <span className="live-dot" />
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-[color:var(--text-high)]">{s.title}</div>
                  <div className="label-mono mt-0.5 text-[color:var(--text-faint)]">{s.subtitle}</div>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-border pt-2 font-mono text-xs text-[color:var(--text-muted)]">
                  <span>{s.path}</span>
                  <span className="text-[color:var(--accent)] transition group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── ÉCRANS PUBLICS / JOUEURS ─────────────────────── */}
        <section>
          <div className="mb-4 flex items-center gap-4">
            <div>
              <div className="label-mono text-[color:var(--flag)]">DIFFUSION · ÉCRANS PUBLICS</div>
              <h2 className="font-display text-2xl font-bold text-[color:var(--text-high)]">
                Mur spectateurs / Joueurs
              </h2>
            </div>
            <div className="ml-auto label-mono text-[color:var(--text-faint)]">
              {PUBLIC_SCREENS.length} écrans
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
            {PUBLIC_SCREENS.map((s) => (
              <Link
                key={s.slug}
                to={s.path}
                className="panel group flex flex-col gap-2 p-4 transition hover:border-[color:var(--flag)]"
                style={{ boxShadow: "inset 0 1px 0 rgba(74,222,128,0.04), 0 0 0 1px rgba(74,222,128,0.04)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="label-mono rounded-sm border border-[color:var(--flag)]/30 px-2 py-0.5 text-[color:var(--flag)]">
                    {s.n}
                  </span>
                  <span className="font-mono text-xs text-[color:var(--text-faint)] transition group-hover:text-[color:var(--flag)]">→</span>
                </div>
                <div>
                  <div className="font-display text-base font-bold text-[color:var(--text-high)]">{s.title}</div>
                  <div className="label-mono mt-0.5 text-[color:var(--text-faint)]">{s.subtitle}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>
      <BottomTicker />
    </div>
  );
}



