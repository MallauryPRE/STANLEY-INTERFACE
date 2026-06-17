import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import stanleyLogo from "@/assets/stanley-logo.png";
import opcoAtlasLogo from "@/assets/opco-atlas-logo.png";

// ============== Data ==============
export const SPONSORS = ["OPCO ATLAS"];

export const TEAMS = [
  { rank: 1, tag: "0x", name: "0xDEADBEEF", solves: 37, last: "2 min", score: 14820 },
  { rank: 2, tag: "NG", name: "n3on_ghosts", solves: 35, last: "5 min", score: 13990 },
  { rank: 3, tag: "SU", name: "segfault_unit", solves: 33, last: "1 min", score: 13110 },
  { rank: 4, tag: "PB", name: "pwn_brigade", solves: 30, last: "12 min", score: 11740 },
  { rank: 5, tag: "CK", name: "cookie_kings", solves: 28, last: "8 min", score: 10905 },
  { rank: 6, tag: "RV", name: "rev_vipers", solves: 26, last: "3 min", score: 10220 },
  { rank: 7, tag: "FX", name: "forensix", solves: 24, last: "15 min", score: 9510 },
  { rank: 8, tag: "BM", name: "byte_me", solves: 22, last: "9 min", score: 8830 },
];

export const CHALLENGES = [
  { cat: "WEB", name: "Cookie Monster", pts: 150, diff: "EASY", solves: 248, status: "open" },
  { cat: "PWN", name: "Stack Smasher", pts: 420, diff: "HARD", solves: 31, status: "live" },
  { cat: "CRYPTO", name: "RSA Roulette", pts: 500, diff: "INSANE", solves: 7, status: "locked" },
  { cat: "FORENSICS", name: "Ghost in RAM", pts: 280, diff: "MEDIUM", solves: 64, status: "open" },
  { cat: "REVERSE", name: "Obfuscated", pts: 340, diff: "HARD", solves: 18, status: "live" },
  { cat: "WEB", name: "SSTI Garden", pts: 220, diff: "MEDIUM", solves: 92, status: "open" },
];

export const FEED = [
  { team: "0xDEADBEEF", chall: "Stack Smasher", pts: 420, first: true, t: "00:12" },
  { team: "segfault_unit", chall: "Cookie Monster", pts: 150, t: "00:34" },
  { team: "n3on_ghosts", chall: "Obfuscated", pts: 340, first: true, t: "01:02" },
  { team: "pwn_brigade", chall: "SSTI Garden", pts: 220, t: "01:18" },
  { team: "rev_vipers", chall: "Ghost in RAM", pts: 280, t: "01:45" },
  { team: "cookie_kings", chall: "Cookie Monster", pts: 150, t: "02:03" },
  { team: "byte_me", chall: "SSTI Garden", pts: 220, t: "02:21" },
];

const DIFF_COLOR: Record<string, string> = {
  EASY: "var(--flag)",
  MEDIUM: "var(--sev-medium)",
  HARD: "var(--sev-high)",
  INSANE: "var(--sev-critical)",
};

const CAT_COLOR: Record<string, string> = {
  WEB: "var(--accent)",
  CRYPTO: "var(--sev-low)",
  PWN: "var(--sev-critical)",
  FORENSICS: "var(--sev-high)",
  REVERSE: "var(--sev-medium)",
  MISC: "var(--text-muted)",
};

// ============== Hooks ==============
export function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);
  return now;
}

export function useCountdown(totalSeconds: number) {
  const [s, setS] = useState(totalSeconds);
  useEffect(() => {
    const i = setInterval(() => setS((x) => Math.max(0, x - 1)), 1000);
    return () => clearInterval(i);
  }, []);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return { h, m, sec, total: s };
}

// ============== Top bar ==============
export function TopBar({ screenNum, screenTitle }: { screenNum?: number; screenTitle?: string }) {
  const now = useNow();
  return (
    <header className="flex items-center justify-between border-b border-border bg-[var(--bg-surface)]/60 px-6 py-3 backdrop-blur">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[color:var(--accent)]/40 bg-[var(--bg-elevated)] transition hover:border-[color:var(--accent)]"
          aria-label="Retour au hub"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="var(--accent)" strokeWidth="2">
            <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z" />
          </svg>
        </Link>
        <div>
          <div className="label-mono text-[color:var(--accent)]">
            IA · STANLEY{screenNum ? ` · ÉCRAN ${String(screenNum).padStart(2, "0")}` : ""}
          </div>
          <div className="font-display text-lg font-bold leading-tight text-[color:var(--text-high)]">
            {screenTitle ?? "Mur Central · Régie CTF"}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="live-dot" />
          <span className="label-mono text-[color:var(--accent)]">EVENT LIVE</span>
        </div>
        <div className="font-mono text-sm text-[color:var(--text-muted)]">
          {now.toLocaleTimeString("fr-FR", { hour12: false })} · {now.toLocaleDateString("fr-FR")}
        </div>
      </div>
    </header>
  );
}

// ============== Bottom Ticker ==============
export function BottomTicker() {
  const items = [
    "▲ FIRST BLOOD — 0xDEADBEEF capture Stack Smasher (+420)",
    "● Nouveau challenge débloqué : RSA Roulette · CRYPTO · INSANE",
    "↯ Attaque DDoS détectée sur DB-01 — mitigée",
    "✓ 8 940 flags soumis depuis l'ouverture",
    "⏱ Phase finale dans 04:17:33",
  ];
  return (
    <div className="overflow-hidden border-t border-border bg-[var(--bg-surface)]/60 py-1.5">
      <div className="flex gap-12 whitespace-nowrap" style={{ animation: "ticker 45s linear infinite", width: "max-content" }}>
        {[...items, ...items].map((t, i) => (
          <span key={i} className="font-mono text-xs text-[color:var(--text-muted)]">{t}</span>
        ))}
      </div>
    </div>
  );
}

// ============== Screen shells ==============
function ScreenShell({ children }: { children: React.ReactNode }) {
  return <div className="relative h-full w-full p-6 md:p-10">{children}</div>;
}

// ============== 1. Accueil ==============
export function ScreenAccueil() {
  return (
    <ScreenShell>
      <div className="flex h-full flex-col items-center justify-between gap-6 py-2">
        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          <img
            src={stanleyLogo}
            alt="IA Stanley"
            className="max-h-[45vh] w-auto object-contain drop-shadow-[0_0_60px_rgba(46,230,214,0.4)]"
          />
          <div className="flex flex-col items-center gap-3">
            <div className="label-mono text-xs tracking-widest text-[color:var(--text-faint)]">PARTENAIRE OPCO</div>
            <div className="rounded-xl bg-white px-8 py-4 shadow-[0_0_40px_rgba(123,97,255,0.2)]">
              <img
                src={opcoAtlasLogo}
                alt="OPCO Atlas"
                className="h-16 w-auto object-contain"
              />
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden border-y border-border py-3">
          <div className="flex gap-12 whitespace-nowrap" style={{ animation: "ticker 30s linear infinite", width: "max-content" }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="label-mono text-base text-[color:var(--text-muted)]">
                ◆ OPCO ATLAS
              </span>
            ))}
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

// ============== 2. Scoreboard ==============
export function ScreenScoreboard() {
  return (
    <ScreenShell>
      <div className="flex h-full flex-col">
        <div className="label-mono grid grid-cols-[40px_1fr_100px_120px_140px] gap-4 border-b border-border pb-3 text-sm text-[color:var(--text-faint)]">
          <span>#</span><span>ÉQUIPE</span><span className="text-right">SOLVES</span><span className="text-right">LAST</span><span className="text-right">SCORE</span>
        </div>
        <div className="flex-1 divide-y divide-[color:var(--border)] overflow-hidden">
          {TEAMS.map((t) => {
            const top = t.rank === 1;
            return (
              <div
                key={t.rank}
                className="grid grid-cols-[40px_1fr_100px_120px_140px] items-center gap-4 py-4 font-mono text-lg"
                style={top ? { color: "var(--accent)" } : { color: "var(--text-body)" }}
              >
                <span className="font-bold">{String(t.rank).padStart(2, "0")}</span>
                <span className="flex items-center gap-3 truncate">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-sm bg-[var(--bg-elevated)] text-sm font-bold text-[color:var(--text-high)]">
                    {t.tag}
                  </span>
                  <span className="truncate">{t.name}</span>
                </span>
                <span className="text-right">{t.solves}</span>
                <span className="text-right text-[color:var(--text-muted)]">{t.last}</span>
                <span className="text-right font-bold">{t.score.toLocaleString("fr-FR")}</span>
              </div>
            );
          })}
        </div>
      </div>
    </ScreenShell>
  );
}

// ============== 3. Challenges ==============
export function ScreenChallenges() {
  return (
    <ScreenShell>
      <div className="grid h-full grid-cols-2 gap-4 md:grid-cols-3">
        {CHALLENGES.map((c) => (
          <div
            key={c.name}
            className="flex flex-col justify-between rounded-md border border-border bg-[var(--bg-elevated)]/60 p-5"
            style={c.status === "live" ? { borderColor: "color-mix(in oklab, var(--accent) 40%, transparent)" } : {}}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="label-mono text-sm" style={{ color: CAT_COLOR[c.cat] }}>{c.cat}</span>
              <span className="font-mono text-base font-bold text-[color:var(--text-high)]">{c.pts} PTS</span>
            </div>
            <div className="my-3 truncate font-display text-2xl font-semibold text-[color:var(--text-high)]">{c.name}</div>
            <div className="flex items-center justify-between">
              <span className="label-mono flex items-center gap-2 text-sm" style={{ color: DIFF_COLOR[c.diff] }}>
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: DIFF_COLOR[c.diff] }} />
                {c.diff}
              </span>
              <span className="font-mono text-sm text-[color:var(--text-muted)]">{c.solves} solves</span>
            </div>
          </div>
        ))}
      </div>
    </ScreenShell>
  );
}

// ============== 4. Chrono ==============
export function ScreenChrono() {
  const { h, m, sec, total } = useCountdown(4 * 3600 + 17 * 60 + 33);
  const pct = (total / (8 * 3600)) * 100;
  return (
    <ScreenShell>
      <div className="flex h-full flex-col items-center justify-center gap-8">
        <div className="label-mono text-base text-[color:var(--text-muted)]">TEMPS RESTANT · PHASE RÉSOLUTION</div>
        <div className="font-mono text-[clamp(80px,18vw,220px)] font-bold leading-none text-[color:var(--text-high)] tabular-nums" style={{ textShadow: "0 0 60px rgba(46,230,214,0.5)" }}>
          {String(h).padStart(2, "0")}<span className="text-[color:var(--accent)]">:</span>
          {String(m).padStart(2, "0")}<span className="text-[color:var(--accent)]">:</span>
          {String(sec).padStart(2, "0")}
        </div>
        <div className="grid w-full max-w-3xl grid-cols-3 gap-3 text-center label-mono text-[color:var(--text-faint)]">
          <span>HEURES</span><span>MINUTES</span><span>SECONDES</span>
        </div>
        <div className="w-full max-w-3xl">
          <div className="mb-2 flex justify-between label-mono text-[color:var(--text-muted)]">
            <span>PROGRESSION ÉVÉNEMENT</span><span>{Math.round(100 - pct)}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--bg-elevated)]">
            <div className="h-full rounded-full bg-[color:var(--accent)]" style={{ width: `${100 - pct}%`, boxShadow: "0 0 16px var(--accent)" }} />
          </div>
        </div>
        <div className="grid w-full max-w-3xl grid-cols-2 gap-4 pt-4">
          <Kpi label="JOUEURS ACTIFS" value="1 284" trend="+112" />
          <Kpi label="FLAGS CAPTURÉS" value="8 940" trend="+6%" />
        </div>
      </div>
    </ScreenShell>
  );
}

function Kpi({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div className="rounded-md border border-border bg-[var(--bg-elevated)]/60 p-4">
      <div className="label-mono text-sm text-[color:var(--text-faint)]">{label}</div>
      <div className="font-mono text-3xl font-bold text-[color:var(--text-high)]">{value}</div>
      <div className="font-mono text-xs text-[color:var(--flag)]">▲ {trend}</div>
    </div>
  );
}

// ============== 5. Résolutions ==============
export function ScreenResolutions() {
  return (
    <ScreenShell>
      <div className="flex h-full flex-col gap-3">
        {FEED.map((f, i) => (
          <div key={i} className="flex items-center gap-4 rounded-md border border-border bg-[var(--bg-elevated)]/40 px-5 py-4 font-mono text-lg">
            <span className="text-[color:var(--text-faint)]">{f.t}</span>
            {f.first && (
              <span className="label-mono rounded-sm px-2 py-1 text-sm" style={{ background: "color-mix(in oklab, var(--sev-critical) 18%, transparent)", color: "var(--sev-critical)" }}>
                FIRST BLOOD
              </span>
            )}
            <span className="truncate text-[color:var(--text-high)]">{f.team}</span>
            <span className="text-[color:var(--text-muted)]">→</span>
            <span className="truncate text-[color:var(--text-body)]">{f.chall}</span>
            <span className="ml-auto font-bold text-[color:var(--flag)]">+{f.pts}</span>
          </div>
        ))}
      </div>
    </ScreenShell>
  );
}

// ============== 6. Carte réseau ==============
export function ScreenNetwork() {
  const nodes = [
    { x: 50, y: 50, label: "CORE", core: true },
    { x: 15, y: 20, label: "WEB-01" },
    { x: 85, y: 22, label: "DB-01" },
    { x: 18, y: 80, label: "PWN-SRV" },
    { x: 82, y: 78, label: "CRY-VLT" },
    { x: 50, y: 12, label: "GW" },
    { x: 50, y: 88, label: "DMZ" },
  ];
  return (
    <ScreenShell>
      <div className="relative h-full w-full">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="atk" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="1" />
            </linearGradient>
          </defs>
          {nodes.slice(1).map((n, i) => (
            <line key={i} x1={50} y1={50} x2={n.x} y2={n.y} stroke="var(--border)" strokeWidth="0.2" />
          ))}
          {[1, 3, 5].map((idx) => {
            const n = nodes[idx];
            return (
              <line key={`a${idx}`} x1={n.x} y1={n.y} x2={50} y2={50} stroke="url(#atk)" strokeWidth="0.4">
                <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" repeatCount="indefinite" />
              </line>
            );
          })}
          {nodes.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r={n.core ? 2.5 : 1.4} fill={n.core ? "var(--accent)" : "var(--bg-elevated)"} stroke={n.core ? "var(--accent)" : "var(--accent-dim)"} strokeWidth="0.3" />
              {n.core && (
                <circle cx={n.x} cy={n.y} r={2.5} fill="none" stroke="var(--accent)" strokeWidth="0.2">
                  <animate attributeName="r" values="2.5;6;2.5" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="2.5s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0">
          {nodes.map((n, i) => (
            <span
              key={i}
              className="label-mono absolute -translate-x-1/2 translate-y-3 whitespace-nowrap text-sm"
              style={{ left: `${n.x}%`, top: `${n.y}%`, color: n.core ? "var(--accent)" : "var(--text-muted)" }}
            >
              {n.label}
            </span>
          ))}
        </div>
        <div className="absolute bottom-2 left-2 right-2 flex justify-between font-mono text-sm text-[color:var(--text-faint)]">
          <span>● 7 nodes</span>
          <span style={{ color: "var(--sev-critical)" }}>↯ 3 active attacks</span>
          <span>↑ 142 pkts/s</span>
        </div>
      </div>
    </ScreenShell>
  );
}

// ============== 7. Progression ==============
export function ScreenProgression() {
  const cats = ["WEB", "CRYPTO", "PWN", "FORENSICS", "REVERSE", "MISC"];
  const heat = (r: number, c: number) => ((r * 7 + c * 13) % 10) / 10;
  return (
    <ScreenShell>
      <div className="flex h-full flex-col">
        <div className="grid items-center gap-2 text-right label-mono text-sm text-[color:var(--text-faint)]" style={{ gridTemplateColumns: "180px repeat(6, 1fr)" }}>
          <span />
          {cats.map((c) => <span key={c} className="text-center">{c}</span>)}
        </div>
        <div className="mt-2 flex-1 space-y-2 overflow-hidden">
          {TEAMS.map((t, r) => (
            <div key={t.rank} className="grid items-center gap-2" style={{ gridTemplateColumns: "180px repeat(6, 1fr)" }}>
              <span className="truncate font-mono text-base text-[color:var(--text-body)]">{t.name}</span>
              {cats.map((_, c) => {
                const v = heat(r, c);
                return (
                  <div
                    key={c}
                    className="h-10 rounded-sm border border-border"
                    style={{
                      background: v > 0.15
                        ? `color-mix(in oklab, var(--accent) ${Math.round(v * 75)}%, var(--bg-elevated))`
                        : "var(--bg-elevated)",
                      boxShadow: v > 0.8 ? "0 0 14px var(--accent)" : "none",
                    }}
                    title={`${Math.round(v * 100)}%`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between font-mono text-sm text-[color:var(--text-faint)]">
          <span>0%</span>
          <div className="mx-3 h-2 flex-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--bg-elevated), var(--accent))" }} />
          <span>100%</span>
        </div>
      </div>
    </ScreenShell>
  );
}

// ============== 8. Accès ==============
export function ScreenAccess() {
  const cells = Array.from({ length: 17 * 17 }, (_, i) => {
    const x = i % 17, y = Math.floor(i / 17);
    const corner = (x < 3 && y < 3) || (x > 13 && y < 3) || (x < 3 && y > 13);
    const seed = (x * 31 + y * 17 + x * y) % 7;
    return corner || seed < 3;
  });
  return (
    <ScreenShell>
      <div className="grid h-full grid-cols-[auto_1fr] gap-10">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="rounded-md border border-border bg-white p-4">
            <div className="grid" style={{ gridTemplateColumns: "repeat(17, 14px)" }}>
              {cells.map((on, i) => (
                <div key={i} style={{ width: 14, height: 14, background: on ? "#080A0E" : "#ffffff" }} />
              ))}
            </div>
          </div>
          <div className="label-mono text-base text-[color:var(--text-faint)]">SCAN ME</div>
        </div>
        <div className="flex flex-col justify-center gap-4 font-mono text-lg">
          <AccessRow label="URL" value="ctf.stanley.io" accent />
          <AccessRow label="VPN" value="vpn.stanley.io:1194" />
          <AccessRow label="OPENVPN" value="openvpn --config stanley.ovpn" />
          <AccessRow label="DISCORD" value="discord.gg/stanley-ctf" />
          <AccessRow label="SUPPORT" value="#help-desk · salle B12" />
          <div className="mt-2 rounded-md border px-4 py-3" style={{ borderColor: "color-mix(in oklab, var(--accent) 30%, transparent)", background: "color-mix(in oklab, var(--accent) 8%, transparent)" }}>
            <div className="label-mono text-[color:var(--accent)]">FORMAT FLAG</div>
            <div className="font-mono text-2xl text-[color:var(--text-high)]">STANLEY{"{...}"}</div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

function AccessRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
      <span className="label-mono text-[color:var(--text-faint)]">{label}</span>
      <span className="truncate" style={{ color: accent ? "var(--accent)" : "var(--text-body)" }}>{value}</span>
    </div>
  );
}

// ============== Registry ==============
export const SCREENS = [
  { n: 1, slug: "accueil", title: "Accueil", subtitle: "Logo · OPCO Atlas", vertical: false, path: "/accueil" as const },
  { n: 2, slug: "lumieres", title: "Pilotage Lumières", subtitle: "Ambiances visuelles", vertical: true, path: "/lumieres" as const },
  { n: 3, slug: "cameras", title: "6 Caméras + IA", subtitle: "Suivi attitudes & émotions", vertical: false, path: "/cameras" as const },
  { n: 4, slug: "monitoring", title: "Monitoring Serveurs", subtitle: "État de calcul", vertical: false, path: "/monitoring" as const },
  { n: 5, slug: "scoring", title: "Écran de scoring", subtitle: "Classement live", vertical: false, path: "/scoring" as const },
  { n: 6, slug: "custo", title: "Custo exercice", subtitle: "Configuration", vertical: false, path: "/custo" as const },
  { n: 7, slug: "deroule", title: "Déroulé exercice", subtitle: "Timeline live", vertical: false, path: "/deroule" as const },
  { n: 8, slug: "dashboard", title: "Dashboard session", subtitle: "Vue globale", vertical: false, path: "/dashboard" as const },
  { n: 9, slug: "son", title: "Pilotage Son", subtitle: "Ambiances sonores", vertical: true, path: "/son" as const },
];

// ============== Full-screen wrapper (horizontal) ==============
export function FullScreen({ n, title, subtitle, children }: { n: number; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-[var(--bg-base)]">
      <TopBar screenNum={n} screenTitle={subtitle ? `${title} · ${subtitle}` : title} />
      <main className="min-h-0 flex-1 overflow-hidden">
        <div className="panel panel-glow mx-3 my-3 h-[calc(100%-1.5rem)]">{children}</div>
      </main>
      <BottomTicker />
    </div>
  );
}

// ============== Full-screen wrapper (vertical / portrait) ==============
export function FullScreenVertical({ n, title, subtitle, children }: { n: number; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-[var(--bg-base)]">
      <TopBar screenNum={n} screenTitle={subtitle ? `${title} · ${subtitle}` : title} />
      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="panel panel-glow mx-3 my-3 min-h-[calc(100%-1.5rem)]">{children}</div>
      </main>
      <BottomTicker />
    </div>
  );
}

// ============== T2 : Pilotage Lumières (VERTICAL) ==============
export function ScreenLumieres() {
  const [ambiance, setAmbiance] = useState("neutral");
  const [values, setValues] = useState({ scene: 85, entree: 60, podium: 100, back: 40 });

  const presets: Record<string, { label: string; color: string; values: typeof values }> = {
    neutral: { label: "Neutral", color: "#8A95A3", values: { scene: 70, entree: 50, podium: 70, back: 30 } },
    cyan_theme: { label: "Cyber Cyan", color: "#2EE6D6", values: { scene: 100, entree: 80, podium: 100, back: 60 } },
    tension: { label: "Tension", color: "#FF5470", values: { scene: 40, entree: 20, podium: 60, back: 80 } },
    victory: { label: "Victoire", color: "#4ADE80", values: { scene: 100, entree: 100, podium: 100, back: 100 } },
    warm: { label: "Warm", color: "#FF9F45", values: { scene: 80, entree: 60, podium: 90, back: 20 } },
    off: { label: "Extinction", color: "#59636F", values: { scene: 0, entree: 0, podium: 0, back: 0 } },
  };

  const zones = [
    { key: "scene" as const, label: "Scène principale", icon: "◉" },
    { key: "entree" as const, label: "Zone entrée", icon: "◈" },
    { key: "podium" as const, label: "Podium", icon: "▲" },
    { key: "back" as const, label: "Backlight", icon: "◐" },
  ];

  const applyPreset = (key: string) => {
    setAmbiance(key);
    setValues(presets[key].values);
  };

  return (
    <div className="flex h-full flex-col gap-5 p-6">
      <div>
        <div className="label-mono text-[color:var(--accent)]">TOUR CONTRÔLE · LUMIÈRES</div>
        <h2 className="font-display text-2xl font-bold text-[color:var(--text-high)] mt-1">Ambiances visuelles</h2>
      </div>

      {/* Presets */}
      <div>
        <div className="label-mono mb-3 text-[color:var(--text-faint)]">PRÉSETS AMBIANCE</div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(presets).map(([key, p]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className="flex items-center gap-3 rounded-md border px-4 py-3 text-left transition-all"
              style={{
                borderColor: ambiance === key ? p.color : "var(--border)",
                background: ambiance === key ? `color-mix(in oklab, ${p.color} 12%, var(--bg-elevated))` : "var(--bg-elevated)",
                boxShadow: ambiance === key ? `0 0 16px color-mix(in oklab, ${p.color} 30%, transparent)` : "none",
              }}
            >
              <span className="h-3 w-3 rounded-full shrink-0" style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }} />
              <span className="font-display text-sm font-semibold text-[color:var(--text-high)]">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Faders */}
      <div className="flex-1">
        <div className="label-mono mb-3 text-[color:var(--text-faint)]">CONTRÔLE MANUEL PAR ZONE</div>
        <div className="flex flex-col gap-4">
          {zones.map((z) => (
            <div key={z.key}>
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-sm text-[color:var(--text-body)]">
                  <span className="mr-2 text-[color:var(--accent)]">{z.icon}</span>{z.label}
                </span>
                <span className="label-mono text-[color:var(--accent)]">{values[z.key]}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={values[z.key]}
                onChange={(e) => setValues(v => ({ ...v, [z.key]: +e.target.value }))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(90deg, var(--accent) ${values[z.key]}%, var(--bg-elevated) ${values[z.key]}%)`,
                  accentColor: "var(--accent)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="rounded-md border border-[color:var(--border)] bg-[var(--bg-elevated)] p-4">
        <div className="flex items-center justify-between">
          <div className="label-mono text-[color:var(--text-faint)]">AMBIANCE ACTIVE</div>
          <span className="live-dot" />
        </div>
        <div className="mt-1 font-display text-lg font-bold" style={{ color: presets[ambiance].color }}>
          {presets[ambiance].label}
        </div>
      </div>
    </div>
  );
}

// ============== T3 : 6 Caméras + IA ==============
const EMOTIONS = [
  { cam: "CAM-01", zone: "Zone A", emotion: "Concentré", score: 87, color: "var(--flag)" },
  { cam: "CAM-02", zone: "Zone B", emotion: "Stressé", score: 72, color: "var(--sev-medium)" },
  { cam: "CAM-03", zone: "Entrée", emotion: "Engagé", score: 91, color: "var(--accent)" },
  { cam: "CAM-04", zone: "Podium", emotion: "Excité", score: 95, color: "var(--flag)" },
  { cam: "CAM-05", zone: "Zone C", emotion: "Neutre", score: 55, color: "var(--text-muted)" },
  { cam: "CAM-06", zone: "Vue large", emotion: "Tendu", score: 63, color: "var(--sev-high)" },
];

export function ScreenCameras() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const i = setInterval(() => setTick(t => t + 1), 3000); return () => clearInterval(i); }, []);
  const engagementGlobal = Math.round(EMOTIONS.reduce((a, e) => a + e.score, 0) / EMOTIONS.length);

  return (
    <div className="flex h-full flex-col gap-3 p-5">
      {/* KPI bandeau */}
      <div className="flex items-center gap-6">
        <div className="label-mono text-[color:var(--accent)]">IA VISION · 6 CAMÉRAS ACTIVES</div>
        <span className="live-dot" />
        <div className="ml-auto flex items-center gap-2">
          <span className="label-mono text-[color:var(--text-faint)]">ENGAGEMENT GLOBAL</span>
          <span className="font-mono text-2xl font-bold" style={{ color: engagementGlobal > 80 ? "var(--flag)" : "var(--sev-medium)" }}>
            {engagementGlobal}%
          </span>
        </div>
      </div>

      {/* Grille 2x3 */}
      <div className="grid flex-1 grid-cols-3 gap-3" style={{ gridTemplateRows: "1fr 1fr" }}>
        {EMOTIONS.map((cam, i) => {
          const pulse = (tick + i) % 3 === 0;
          return (
            <div
              key={cam.cam}
              className="relative overflow-hidden rounded-md border"
              style={{
                borderColor: pulse ? cam.color : "var(--border)",
                background: "var(--bg-elevated)",
                transition: "border-color 0.6s",
              }}
            >
              {/* Simulated feed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-full w-full overflow-hidden">
                  {/* Grid noise background */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }} />
                  {/* Scan line animation */}
                  <div className="absolute inset-x-0 h-8 opacity-10" style={{
                    background: "linear-gradient(180deg, transparent, var(--accent), transparent)",
                    animation: `scan ${2 + i * 0.3}s linear infinite`,
                  }} />
                  {/* Center icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 opacity-30" fill="none" stroke="var(--accent)" strokeWidth="1.5">
                      <path d="M15 10l4.553-2.277A1 1 0 0121 8.649v6.702a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                    </svg>
                    <span className="label-mono text-[color:var(--text-faint)]">LIVE FEED</span>
                  </div>
                </div>
              </div>

              {/* Overlays */}
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                <span className="label-mono rounded-sm bg-[var(--bg-base)]/80 px-2 py-0.5 text-[color:var(--accent)]">{cam.cam}</span>
                <span className="label-mono rounded-sm bg-[var(--bg-base)]/80 px-2 py-0.5 text-[color:var(--text-faint)]">{cam.zone}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-[var(--bg-base)] to-transparent px-3 pb-2 pt-6">
                <span className="font-mono text-sm font-bold" style={{ color: cam.color }}>{cam.emotion}</span>
                <span className="label-mono text-[color:var(--text-faint)]">{cam.score}%</span>
              </div>

              {/* Alerte */}
              {pulse && cam.score > 85 && (
                <div className="absolute inset-0 pointer-events-none rounded-md" style={{
                  boxShadow: `inset 0 0 20px color-mix(in oklab, ${cam.color} 25%, transparent)`,
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Alertes IA */}
      <div className="flex gap-3">
        {[
          { label: "Pic de stress détecté", zone: "Zone B", sev: "var(--sev-medium)" },
          { label: "Engagement maximal", zone: "Podium", sev: "var(--flag)" },
          { label: "Mouvement inhabituel", zone: "Entrée", sev: "var(--sev-high)" },
        ].map((a, i) => (
          <div key={i} className="flex flex-1 items-center gap-2 rounded-md border px-3 py-2" style={{ borderColor: a.sev, background: `color-mix(in oklab, ${a.sev} 8%, var(--bg-elevated))` }}>
            <span className="h-2 w-2 rounded-full shrink-0" style={{ background: a.sev }} />
            <span className="font-mono text-xs text-[color:var(--text-body)]">{a.label}</span>
            <span className="label-mono ml-auto text-[color:var(--text-faint)]">{a.zone}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============== T4 : Monitoring Serveurs ==============
const SERVERS = [
  { id: "WEB-01", cpu: 67, ram: 54, net: 142, status: "OK" },
  { id: "DB-01", cpu: 89, ram: 78, net: 31, status: "WARN" },
  { id: "PWN-SRV", cpu: 34, ram: 41, net: 87, status: "OK" },
  { id: "CRY-VLT", cpu: 12, ram: 22, net: 8, status: "OK" },
  { id: "GW", cpu: 55, ram: 38, net: 312, status: "OK" },
  { id: "DMZ", cpu: 94, ram: 82, net: 204, status: "CRIT" },
  { id: "AUTH-SRV", cpu: 28, ram: 33, net: 19, status: "OK" },
  { id: "LOG-SRV", cpu: 41, ram: 67, net: 56, status: "OK" },
];

function statusColor(s: string) {
  return s === "OK" ? "var(--flag)" : s === "WARN" ? "var(--sev-medium)" : "var(--sev-critical)";
}
function barColor(v: number) {
  return v > 85 ? "var(--sev-critical)" : v > 70 ? "var(--sev-medium)" : "var(--accent)";
}

export function ScreenMonitoring() {
  const [servers, setServers] = useState(SERVERS);
  useEffect(() => {
    const i = setInterval(() => {
      setServers(s => s.map(srv => ({
        ...srv,
        cpu: Math.min(99, Math.max(5, srv.cpu + (Math.random() - 0.5) * 8)),
        ram: Math.min(99, Math.max(10, srv.ram + (Math.random() - 0.5) * 4)),
        net: Math.max(1, srv.net + (Math.random() - 0.5) * 30),
      })));
    }, 2000);
    return () => clearInterval(i);
  }, []);

  const critCount = servers.filter(s => s.status === "CRIT").length;
  const warnCount = servers.filter(s => s.status === "WARN").length;

  return (
    <div className="flex h-full flex-col gap-4 p-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div>
          <div className="label-mono text-[color:var(--accent)]">INFRASTRUCTURE · MONITORING</div>
          <h2 className="font-display text-xl font-bold text-[color:var(--text-high)]">État des serveurs</h2>
        </div>
        <div className="ml-auto flex gap-3">
          {critCount > 0 && (
            <div className="flex items-center gap-2 rounded-md border px-3 py-1.5" style={{ borderColor: "var(--sev-critical)", background: "color-mix(in oklab, var(--sev-critical) 10%, var(--bg-elevated))" }}>
              <span className="live-dot" style={{ background: "var(--sev-critical)", boxShadow: "0 0 8px var(--sev-critical)" }} />
              <span className="label-mono text-[color:var(--sev-critical)]">{critCount} CRITIQUE{critCount > 1 ? "S" : ""}</span>
            </div>
          )}
          {warnCount > 0 && (
            <div className="flex items-center gap-2 rounded-md border px-3 py-1.5" style={{ borderColor: "var(--sev-medium)", background: "color-mix(in oklab, var(--sev-medium) 10%, var(--bg-elevated))" }}>
              <span className="label-mono text-[color:var(--sev-medium)]">{warnCount} WARN</span>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid flex-1 grid-cols-2 gap-3 lg:grid-cols-4">
        {servers.map((srv) => {
          const sc = statusColor(srv.status);
          return (
            <div
              key={srv.id}
              className="flex flex-col gap-3 rounded-md border p-4"
              style={{
                borderColor: srv.status !== "OK" ? sc : "var(--border)",
                background: srv.status !== "OK" ? `color-mix(in oklab, ${sc} 6%, var(--bg-elevated))` : "var(--bg-elevated)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-base font-bold text-[color:var(--text-high)]">{srv.id}</span>
                <span
                  className="label-mono rounded-full px-2 py-0.5 text-[10px]"
                  style={{ color: sc, background: `color-mix(in oklab, ${sc} 15%, transparent)` }}
                >
                  {srv.status}
                </span>
              </div>
              {[
                { label: "CPU", value: Math.round(srv.cpu) },
                { label: "RAM", value: Math.round(srv.ram) },
              ].map(m => (
                <div key={m.label}>
                  <div className="mb-1 flex justify-between">
                    <span className="label-mono text-[color:var(--text-faint)]">{m.label}</span>
                    <span className="font-mono text-xs" style={{ color: barColor(m.value) }}>{m.value}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[var(--bg-base)]">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${m.value}%`, background: barColor(m.value), boxShadow: m.value > 85 ? `0 0 8px ${barColor(m.value)}` : "none" }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-border pt-2">
                <span className="label-mono text-[color:var(--text-faint)]">NET</span>
                <span className="font-mono text-xs text-[color:var(--text-muted)]">{Math.round(srv.net)} pkts/s</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============== T5 : Écran de scoring ==============
export function ScreenScoring() {
  return (
    <div className="flex h-full flex-col p-5 gap-4">
      {/* Top KPIs */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "ÉQUIPES ACTIVES", value: "8", color: "var(--accent)" },
          { label: "FLAGS CAPTURÉS", value: "8 940", color: "var(--flag)" },
          { label: "CHALLENGES LIVE", value: "42", color: "var(--sev-low)" },
          { label: "TEMPS RESTANT", value: "04:17", color: "var(--sev-medium)" },
        ].map(k => (
          <div key={k.label} className="rounded-md border border-border bg-[var(--bg-elevated)] p-4 text-center">
            <div className="label-mono text-[color:var(--text-faint)]">{k.label}</div>
            <div className="font-mono text-3xl font-bold mt-1" style={{ color: k.color, textShadow: `0 0 20px ${k.color}` }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Podium top 3 */}
      <div className="flex items-end justify-center gap-4 py-2">
        {[TEAMS[1], TEAMS[0], TEAMS[2]].map((t, i) => {
          const heights = ["h-20", "h-28", "h-16"];
          const colors = ["var(--sev-low)", "var(--sev-medium)", "var(--sev-high)"];
          const ranks = [2, 1, 3];
          return (
            <div key={t.name} className="flex flex-col items-center gap-2">
              <span className="font-display text-sm font-bold text-[color:var(--text-high)]">{t.name}</span>
              <span className="font-mono text-lg font-bold" style={{ color: colors[i] }}>{t.score.toLocaleString("fr-FR")}</span>
              <div
                className={`${heights[i]} w-24 rounded-t-md flex items-center justify-center font-display text-2xl font-bold`}
                style={{ background: `color-mix(in oklab, ${colors[i]} 20%, var(--bg-elevated))`, borderTop: `2px solid ${colors[i]}`, color: colors[i] }}
              >
                #{ranks[i]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Full scoreboard */}
      <div className="flex-1 overflow-hidden">
        <div className="label-mono grid grid-cols-[40px_1fr_80px_100px_120px] gap-4 border-b border-border pb-2 text-[color:var(--text-faint)]">
          <span>#</span><span>ÉQUIPE</span><span className="text-right">SOLVES</span><span className="text-right">DERNIER</span><span className="text-right">SCORE</span>
        </div>
        <div className="divide-y divide-[color:var(--border)]">
          {TEAMS.map((t) => (
            <div
              key={t.rank}
              className="grid grid-cols-[40px_1fr_80px_100px_120px] items-center gap-4 py-2.5 font-mono text-sm"
              style={{ color: t.rank === 1 ? "var(--accent)" : "var(--text-body)" }}
            >
              <span className="font-bold">{String(t.rank).padStart(2, "0")}</span>
              <span className="flex items-center gap-2 truncate">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-sm bg-[var(--bg-base)] text-xs font-bold text-[color:var(--text-high)]">{t.tag}</span>
                <span className="truncate">{t.name}</span>
              </span>
              <span className="text-right">{t.solves}</span>
              <span className="text-right text-[color:var(--text-faint)]">{t.last}</span>
              <span className="text-right font-bold">{t.score.toLocaleString("fr-FR")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============== T6 : Custo de l'exercice ==============
const CHALLENGE_CONFIG = [
  { cat: "WEB", name: "Cookie Monster", pts: 150, active: true, unlocked: true },
  { cat: "PWN", name: "Stack Smasher", pts: 420, active: true, unlocked: true },
  { cat: "CRYPTO", name: "RSA Roulette", pts: 500, active: false, unlocked: false },
  { cat: "FORENSICS", name: "Ghost in RAM", pts: 280, active: true, unlocked: true },
  { cat: "REVERSE", name: "Obfuscated", pts: 340, active: true, unlocked: true },
  { cat: "WEB", name: "SSTI Garden", pts: 220, active: true, unlocked: true },
];

export function ScreenCusto() {
  const [challenges, setChallenges] = useState(CHALLENGE_CONFIG);
  const [duration, setDuration] = useState(480);
  const [multiplier, setMultiplier] = useState(1);
  const [log, setLog] = useState([
    "10:02:14 · Stack Smasher activé",
    "10:01:33 · Durée ajustée à 8h",
    "10:00:00 · Exercice démarré",
  ]);

  const toggle = (name: string, field: "active" | "unlocked") => {
    setChallenges(cs => cs.map(c => c.name === name ? { ...c, [field]: !c[field] } : c));
    const now = new Date().toLocaleTimeString("fr-FR", { hour12: false });
    setLog(l => [`${now} · ${name} ${field === "active" ? "basculé" : "déverrouillé"}`, ...l.slice(0, 9)]);
  };

  const CAT_C: Record<string, string> = { WEB: "var(--accent)", CRYPTO: "var(--sev-low)", PWN: "var(--sev-critical)", FORENSICS: "var(--sev-high)", REVERSE: "var(--sev-medium)", MISC: "var(--text-muted)" };

  return (
    <div className="grid h-full grid-cols-[1fr_280px] gap-4 p-5">
      <div className="flex flex-col gap-4">
        <div>
          <div className="label-mono text-[color:var(--accent)]">RÉGIE · CONFIGURATION</div>
          <h2 className="font-display text-xl font-bold text-[color:var(--text-high)]">Custo de l'exercice</h2>
        </div>

        {/* Params globaux */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md border border-border bg-[var(--bg-elevated)] p-4">
            <div className="label-mono text-[color:var(--text-faint)] mb-2">DURÉE EXERCICE (MIN)</div>
            <input type="number" value={duration} onChange={e => setDuration(+e.target.value)}
              className="w-full bg-transparent font-mono text-2xl font-bold text-[color:var(--text-high)] outline-none border-b border-[color:var(--accent)]" />
          </div>
          <div className="rounded-md border border-border bg-[var(--bg-elevated)] p-4">
            <div className="label-mono text-[color:var(--text-faint)] mb-2">MULTIPLICATEUR POINTS</div>
            <div className="flex items-center gap-3">
              {[0.5, 1, 1.5, 2].map(v => (
                <button key={v} onClick={() => setMultiplier(v)}
                  className="rounded-md border px-3 py-1.5 font-mono text-sm font-bold transition"
                  style={{
                    borderColor: multiplier === v ? "var(--accent)" : "var(--border)",
                    color: multiplier === v ? "var(--accent)" : "var(--text-muted)",
                    background: multiplier === v ? "color-mix(in oklab, var(--accent) 10%, var(--bg-base))" : "transparent",
                  }}>×{v}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Challenges */}
        <div className="flex-1 overflow-auto">
          <div className="label-mono mb-2 grid grid-cols-[1fr_80px_80px_80px] gap-3 text-[color:var(--text-faint)]">
            <span>CHALLENGE</span><span className="text-right">PTS</span><span className="text-center">ACTIF</span><span className="text-center">UNLOCK</span>
          </div>
          <div className="divide-y divide-[color:var(--border)]">
            {challenges.map(c => (
              <div key={c.name} className="grid grid-cols-[1fr_80px_80px_80px] items-center gap-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="label-mono text-[10px] rounded-sm px-1.5 py-0.5" style={{ color: CAT_C[c.cat], background: `color-mix(in oklab, ${CAT_C[c.cat]} 12%, transparent)` }}>{c.cat}</span>
                  <span className="font-display text-sm font-semibold text-[color:var(--text-high)]">{c.name}</span>
                </div>
                <span className="text-right font-mono text-sm text-[color:var(--text-muted)]">{c.pts}</span>
                <div className="flex justify-center">
                  <button onClick={() => toggle(c.name, "active")}
                    className="h-5 w-9 rounded-full transition-all"
                    style={{ background: c.active ? "var(--flag)" : "var(--bg-base)", border: `1px solid ${c.active ? "var(--flag)" : "var(--border)"}` }}>
                    <span className="block h-3.5 w-3.5 rounded-full bg-white transition-all mx-0.5" style={{ transform: c.active ? "translateX(16px)" : "translateX(0)" }} />
                  </button>
                </div>
                <div className="flex justify-center">
                  <button onClick={() => toggle(c.name, "unlocked")}
                    className="label-mono rounded-sm px-2 py-0.5 text-[10px] transition"
                    style={{ color: c.unlocked ? "var(--flag)" : "var(--text-faint)", background: c.unlocked ? "color-mix(in oklab, var(--flag) 12%, transparent)" : "var(--bg-base)" }}>
                    {c.unlocked ? "OPEN" : "LOCK"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Log */}
      <div className="flex flex-col gap-3 border-l border-border pl-4">
        <div className="label-mono text-[color:var(--text-faint)]">JOURNAL MODIFICATIONS</div>
        <div className="flex flex-1 flex-col gap-2 overflow-auto">
          {log.map((entry, i) => (
            <div key={i} className="rounded-md bg-[var(--bg-elevated)] p-2.5 font-mono text-xs text-[color:var(--text-muted)]">{entry}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============== T7 : Déroulé de l'exercice ==============
const TIMELINE_EVENTS = [
  { t: "14:32", type: "blood", team: "0xDEADBEEF", chall: "Stack Smasher", pts: 420, label: "FIRST BLOOD" },
  { t: "14:28", type: "unlock", chall: "RSA Roulette", label: "UNLOCK" },
  { t: "14:21", type: "capture", team: "n3on_ghosts", chall: "Obfuscated", pts: 340, label: "CAPTURE" },
  { t: "14:18", type: "alert", msg: "Attaque DDoS détectée sur DB-01 — mitigée", label: "ALERTE" },
  { t: "14:10", type: "capture", team: "segfault_unit", chall: "Cookie Monster", pts: 150, label: "CAPTURE" },
  { t: "14:05", type: "capture", team: "pwn_brigade", chall: "SSTI Garden", pts: 220, label: "CAPTURE" },
  { t: "14:01", type: "alert", msg: "Phase 2 démarrée — nouveaux challenges disponibles", label: "SYSTÈME" },
  { t: "13:58", type: "capture", team: "rev_vipers", chall: "Ghost in RAM", pts: 280, label: "CAPTURE" },
  { t: "13:52", type: "blood", team: "cookie_kings", chall: "Cookie Monster", pts: 150, label: "FIRST BLOOD" },
  { t: "13:45", type: "unlock", chall: "Stack Smasher", label: "UNLOCK" },
  { t: "13:00", type: "alert", msg: "Exercice démarré — 8 équipes enregistrées", label: "SYSTÈME" },
];

const EVENT_STYLE: Record<string, { color: string; icon: string }> = {
  blood: { color: "var(--sev-critical)", icon: "▲" },
  unlock: { color: "var(--sev-low)", icon: "◆" },
  capture: { color: "var(--flag)", icon: "✓" },
  alert: { color: "var(--sev-medium)", icon: "!" },
};

export function ScreenDeroule() {
  const [filter, setFilter] = useState("all");
  const filters = ["all", "blood", "capture", "unlock", "alert"];
  const filtered = filter === "all" ? TIMELINE_EVENTS : TIMELINE_EVENTS.filter(e => e.type === filter);

  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-center gap-4">
        <div>
          <div className="label-mono text-[color:var(--accent)]">RÉGIE · TIMELINE</div>
          <h2 className="font-display text-xl font-bold text-[color:var(--text-high)]">Déroulé de l'exercice</h2>
        </div>
        <div className="ml-auto flex gap-2">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="label-mono rounded-md px-3 py-1.5 transition"
              style={{
                background: filter === f ? "color-mix(in oklab, var(--accent) 15%, var(--bg-elevated))" : "var(--bg-elevated)",
                color: filter === f ? "var(--accent)" : "var(--text-faint)",
                border: `1px solid ${filter === f ? "var(--accent)" : "var(--border)"}`,
              }}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto pl-8">
        {/* Timeline line */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-[color:var(--border)]" />

        <div className="flex flex-col gap-1">
          {filtered.map((ev, i) => {
            const s = EVENT_STYLE[ev.type];
            return (
              <div key={i} className="relative flex items-start gap-4 py-2">
                {/* Dot */}
                <div className="absolute -left-5 mt-1 flex h-4 w-4 items-center justify-center rounded-full border text-[10px]"
                  style={{ borderColor: s.color, background: `color-mix(in oklab, ${s.color} 15%, var(--bg-base))`, color: s.color }}>
                  {s.icon}
                </div>

                <div className="flex flex-1 items-start gap-4 rounded-md border border-border bg-[var(--bg-elevated)] px-4 py-3"
                  style={{ borderColor: i === 0 ? s.color : undefined }}>
                  <span className="font-mono text-sm text-[color:var(--text-faint)] shrink-0">{ev.t}</span>
                  <span className="label-mono rounded-sm px-2 py-0.5 text-[10px] shrink-0"
                    style={{ color: s.color, background: `color-mix(in oklab, ${s.color} 12%, transparent)` }}>{ev.label}</span>
                  <div className="flex-1 font-mono text-sm text-[color:var(--text-body)]">
                    {ev.msg ?? (
                      <span>
                        {ev.team && <span className="text-[color:var(--text-high)] font-bold">{ev.team} </span>}
                        {ev.chall && <span>→ {ev.chall} </span>}
                        {ev.pts && <span className="font-bold" style={{ color: "var(--flag)" }}>+{ev.pts}</span>}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============== T8 : Dashboard full session ==============
export function ScreenDashboard() {
  const totalFlags = TEAMS.reduce((a, t) => a + t.solves, 0);
  const catBreakdown = [
    { cat: "WEB", count: 68, color: "var(--accent)" },
    { cat: "PWN", count: 31, color: "var(--sev-critical)" },
    { cat: "CRYPTO", count: 7, color: "var(--sev-low)" },
    { cat: "FORENSICS", count: 64, color: "var(--sev-high)" },
    { cat: "REVERSE", count: 18, color: "var(--sev-medium)" },
  ];
  const total = catBreakdown.reduce((a, c) => a + c.count, 0);

  return (
    <div className="grid h-full grid-rows-[auto_1fr_1fr] gap-3 p-5">
      {/* KPIs */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: "JOUEURS ACTIFS", value: "1 284", trend: "+112", color: "var(--accent)" },
          { label: "FLAGS CAPTURÉS", value: String(totalFlags), trend: "+6%", color: "var(--flag)" },
          { label: "CHALLENGES LIVE", value: "42", trend: "3 locked", color: "var(--sev-low)" },
          { label: "FIRST BLOODS", value: "12", trend: "ce tour", color: "var(--sev-critical)" },
          { label: "TEMPS ÉCOULÉ", value: "03:43", trend: "04:17 restant", color: "var(--sev-medium)" },
        ].map(k => (
          <div key={k.label} className="rounded-md border border-border bg-[var(--bg-elevated)] p-3">
            <div className="label-mono text-[color:var(--text-faint)]">{k.label}</div>
            <div className="font-mono text-2xl font-bold mt-1" style={{ color: k.color }}>{k.value}</div>
            <div className="font-mono text-xs text-[color:var(--text-faint)] mt-0.5">▲ {k.trend}</div>
          </div>
        ))}
      </div>

      {/* Score timeline sparkline */}
      <div className="rounded-md border border-border bg-[var(--bg-elevated)] p-4">
        <div className="label-mono mb-3 text-[color:var(--text-faint)]">ÉVOLUTION SCORES — TOP 4</div>
        <div className="relative h-full">
          <svg viewBox="0 0 400 80" className="h-full w-full" preserveAspectRatio="none">
            {[
              { points: "0,70 80,60 160,45 240,30 320,20 400,10", color: "var(--accent)" },
              { points: "0,72 80,65 160,55 240,42 320,35 400,22", color: "var(--sev-low)" },
              { points: "0,74 80,68 160,60 240,52 320,44 400,36", color: "var(--flag)" },
              { points: "0,76 80,71 160,66 240,60 320,55 400,48", color: "var(--sev-medium)" },
            ].map((l, i) => (
              <g key={i}>
                <polyline points={l.points} fill="none" stroke={l.color} strokeWidth="1.5" opacity="0.8" />
                <polyline points={`${l.points} 400,80 0,80`} fill={l.color} fillOpacity="0.05" stroke="none" />
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-[1fr_240px] gap-3">
        {/* Mini scoreboard */}
        <div className="rounded-md border border-border bg-[var(--bg-elevated)] p-4">
          <div className="label-mono mb-3 text-[color:var(--text-faint)]">CLASSEMENT ACTUEL</div>
          <div className="divide-y divide-[color:var(--border)]">
            {TEAMS.slice(0, 5).map(t => (
              <div key={t.rank} className="flex items-center gap-3 py-2 font-mono text-sm">
                <span className="w-5 shrink-0 font-bold" style={{ color: t.rank === 1 ? "var(--accent)" : "var(--text-faint)" }}>
                  {String(t.rank).padStart(2, "0")}
                </span>
                <span className="flex-1 truncate text-[color:var(--text-body)]">{t.name}</span>
                <span className="font-bold" style={{ color: t.rank === 1 ? "var(--accent)" : "var(--text-high)" }}>{t.score.toLocaleString("fr-FR")}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cat breakdown donut */}
        <div className="rounded-md border border-border bg-[var(--bg-elevated)] p-4">
          <div className="label-mono mb-3 text-[color:var(--text-faint)]">SOLVES PAR CATÉGORIE</div>
          <div className="flex flex-col gap-2">
            {catBreakdown.map(c => (
              <div key={c.cat}>
                <div className="mb-1 flex justify-between">
                  <span className="label-mono text-[10px]" style={{ color: c.color }}>{c.cat}</span>
                  <span className="font-mono text-xs text-[color:var(--text-faint)]">{c.count}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[var(--bg-base)]">
                  <div className="h-full rounded-full" style={{ width: `${(c.count / total) * 100}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============== T9 : Pilotage Son (VERTICAL) ==============
const SOUND_ZONES = [
  { key: "main", label: "Salle principale", icon: "◉" },
  { key: "hall", label: "Couloir / Hall", icon: "◈" },
  { key: "podium", label: "Podium", icon: "▲" },
  { key: "ambient", label: "Ambient global", icon: "~" },
];

const SOUND_PRESETS = [
  { key: "ambient", label: "Ambient CTF", color: "#2EE6D6", bpm: 90 },
  { key: "tension", label: "Tension finale", color: "#FF5470", bpm: 128 },
  { key: "victory", label: "Victoire 🎉", color: "#4ADE80", bpm: 140 },
  { key: "silence", label: "Silence total", color: "#59636F", bpm: 0 },
];

export function ScreenSon() {
  const [volumes, setVolumes] = useState({ main: 75, hall: 50, podium: 90, ambient: 40 });
  const [preset, setPreset] = useState("ambient");
  const [masterVol, setMasterVol] = useState(80);
  const [vuValues, setVuValues] = useState([0.6, 0.7, 0.5, 0.8]);

  useEffect(() => {
    const i = setInterval(() => {
      setVuValues(vs => vs.map(v => Math.max(0.1, Math.min(1, v + (Math.random() - 0.5) * 0.3))));
    }, 200);
    return () => clearInterval(i);
  }, []);

  const currentPreset = SOUND_PRESETS.find(p => p.key === preset)!;

  return (
    <div className="flex h-full flex-col gap-5 p-6">
      <div>
        <div className="label-mono text-[color:var(--accent)]">TOUR CONTRÔLE · SON</div>
        <h2 className="font-display text-2xl font-bold text-[color:var(--text-high)] mt-1">Pilotage sonore</h2>
      </div>

      {/* VU-meters */}
      <div className="rounded-md border border-border bg-[var(--bg-elevated)] p-4">
        <div className="label-mono mb-3 text-[color:var(--text-faint)]">VU-MÈTRE SORTIE</div>
        <div className="flex items-end justify-around h-16 gap-1">
          {vuValues.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col-reverse gap-0.5">
              {Array.from({ length: 12 }).map((_, j) => {
                const active = j / 12 < v;
                const isHot = j > 9;
                return (
                  <div key={j} className="h-1 rounded-full transition-all duration-100"
                    style={{
                      background: active ? (isHot ? "var(--sev-critical)" : j > 7 ? "var(--sev-medium)" : "var(--flag)") : "var(--bg-base)",
                      boxShadow: active && isHot ? "0 0 4px var(--sev-critical)" : "none",
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Master volume */}
      <div className="rounded-md border border-[color:var(--accent)]/30 bg-[var(--bg-elevated)] p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="label-mono text-[color:var(--accent)]">VOLUME MASTER</div>
          <span className="font-mono text-xl font-bold text-[color:var(--accent)]">{masterVol}%</span>
        </div>
        <input type="range" min={0} max={100} value={masterVol}
          onChange={e => setMasterVol(+e.target.value)}
          className="w-full h-3 rounded-full appearance-none cursor-pointer"
          style={{ background: `linear-gradient(90deg, var(--accent) ${masterVol}%, var(--bg-base) ${masterVol}%)`, accentColor: "var(--accent)" }}
        />
      </div>

      {/* Presets */}
      <div>
        <div className="label-mono mb-3 text-[color:var(--text-faint)]">AMBIANCE SONORE</div>
        <div className="grid grid-cols-2 gap-2">
          {SOUND_PRESETS.map(p => (
            <button key={p.key} onClick={() => setPreset(p.key)}
              className="flex flex-col gap-1 rounded-md border p-3 text-left transition-all"
              style={{
                borderColor: preset === p.key ? p.color : "var(--border)",
                background: preset === p.key ? `color-mix(in oklab, ${p.color} 12%, var(--bg-elevated))` : "var(--bg-elevated)",
                boxShadow: preset === p.key ? `0 0 14px color-mix(in oklab, ${p.color} 25%, transparent)` : "none",
              }}>
              <span className="font-display text-sm font-semibold text-[color:var(--text-high)]">{p.label}</span>
              {p.bpm > 0 && <span className="label-mono text-[color:var(--text-faint)]">{p.bpm} BPM</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Zone faders */}
      <div className="flex-1">
        <div className="label-mono mb-3 text-[color:var(--text-faint)]">VOLUMES PAR ZONE</div>
        <div className="flex flex-col gap-3">
          {SOUND_ZONES.map(z => (
            <div key={z.key}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="font-mono text-sm text-[color:var(--text-body)]">
                  <span className="mr-2 text-[color:var(--accent)]">{z.icon}</span>{z.label}
                </span>
                <span className="label-mono text-[color:var(--accent)]">{volumes[z.key as keyof typeof volumes]}%</span>
              </div>
              <input type="range" min={0} max={100} value={volumes[z.key as keyof typeof volumes]}
                onChange={e => setVolumes(v => ({ ...v, [z.key]: +e.target.value }))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(90deg, var(--accent) ${volumes[z.key as keyof typeof volumes]}%, var(--bg-elevated) ${volumes[z.key as keyof typeof volumes]}%)`,
                  accentColor: "var(--accent)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="rounded-md border bg-[var(--bg-elevated)] p-3 flex items-center gap-3"
        style={{ borderColor: currentPreset.color }}>
        <span className="live-dot" style={{ background: currentPreset.color, boxShadow: `0 0 10px ${currentPreset.color}` }} />
        <div>
          <div className="label-mono text-[color:var(--text-faint)]">PRESET ACTIF</div>
          <div className="font-display text-sm font-bold" style={{ color: currentPreset.color }}>{currentPreset.label}</div>
        </div>
        {currentPreset.bpm > 0 && (
          <div className="ml-auto text-right">
            <div className="label-mono text-[color:var(--text-faint)]">BPM</div>
            <div className="font-mono font-bold text-[color:var(--text-high)]">{currentPreset.bpm}</div>
          </div>
        )}
      </div>
    </div>
  );
}

