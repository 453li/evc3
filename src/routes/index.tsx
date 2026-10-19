import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import evImg from "@/assets/ev.jpg";
import fuelImg from "@/assets/fuel.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Will Electric Vehicles Replace Fuel Cars? — Grade 11" },
      { name: "description", content: "An interactive Grade 11 English presentation about electric cars, fuel cars, and the future." },
      { property: "og:title", content: "Will Electric Vehicles Replace Fuel Cars?" },
      { property: "og:description", content: "Interactive class presentation with poll, comparison, future chart, quiz and exit ticket." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Deck,
});

const SCRIPTS = [
  "Good morning everyone, and welcome to our presentation today. We are looking at a very exciting and important question in our modern world: Will electric cars completely replace traditional fuel cars? Over the next few minutes, we will look at real market numbers, compare the pros and cons, explore future technology, and play a fun guessing game together. Let's begin!",
  "Before we talk about the future, let's look at the real market today. According to recent global data, electric cars make up about 25 to 30 percent of new car sales. Traditional fuel cars still lead with around 50 to 55 percent, while hybrid cars take about 20 percent. This shows us that the transition is happening step by step, not overnight.",
  "Now, let's compare both types of cars in four simple areas. First, electric cars give us instant speed and powerful acceleration, while fuel cars give us the classic engine sound. Second, fuel cars win easily when it comes to refueling—taking only 3 minutes at a station compared to 20 or 40 minutes for electric charging. Third, electric cars save a lot of money on maintenance because they have fewer moving parts and need no oil changes. Finally, electric cars keep our city air clean with zero tailpipe smoke.",
  "What does the future hold for us? If we look at this projection chart, electric car sales are expected to reach around 80 percent by the year 2040. Why? Because new solid-state batteries are coming soon, offering over 1,000 kilometers of range on a single charge and charging in just 10 minutes. However, traditional fuel engines are not disappearing completely; car makers are developing clean synthetic fuels and hydrogen so normal engines can survive without harming the environment.",
  "It is time for a quick guessing game to test your focus! I will ask you three quick questions, and you can tell me if they are True or False. Let's see how well you were listening to the facts about electric acceleration, refuelling times, and future sales predictions. Raise your voices and let's play!",
  "To wrap up our presentation today, let's complete our exit ticket. Did anyone change their mind after seeing the facts? Let's take a quick final vote and hear your predictions on what car you will drive in the year 2035. In conclusion, electric cars will lead our daily city driving, but they will work together with hybrids and clean fuels on our roads. Thank you all so much for listening and participating!",
];
const TOTAL = SCRIPTS.length;

function Deck() {
  const [i, setI] = useState(0);
  const [showScript, setShowScript] = useState(false);
  const go = (n: number) => setI(Math.max(0, Math.min(TOTAL - 1, n)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight") setI((v) => Math.min(TOTAL - 1, v + 1));
      if (e.key === "ArrowLeft") setI((v) => Math.max(0, v - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const slides = [<S1 key={0} onStart={() => go(1)} />, <S2 key={1} />, <S3 key={2} />, <S4 key={3} />, <S5 key={4} />, <S6 key={5} />];

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar i={i} go={go} toggleScript={() => setShowScript((s) => !s)} showScript={showScript} />
      {showScript && (
        <div className="glass mx-4 mt-3 animate-slide p-4 text-base md:text-lg">
          <span className="font-semibold text-ev">Speaker Script: </span>
          {SCRIPTS[i]}
        </div>
      )}
      <main key={i} className="flex flex-1 animate-slide items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl">{slides[i]}</div>
      </main>
    </div>
  );
}

function Btn({ children, onClick, tone = "ev", active, className = "" }: { children: ReactNode; onClick?: () => void; tone?: "ev" | "fuel" | "hybrid" | "ghost"; active?: boolean; className?: string }) {
  const tones = {
    ev: "border-ev text-ev hover:bg-ev hover:text-background",
    fuel: "border-fuel text-fuel hover:bg-fuel hover:text-background",
    hybrid: "border-hybrid text-hybrid hover:bg-hybrid hover:text-background",
    ghost: "border-border text-foreground hover:bg-muted",
  };
  return (
    <button onClick={onClick} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${tones[tone]} ${active ? "bg-muted ring-2 ring-current" : ""} ${className}`}>
      {children}
    </button>
  );
}

function TopBar({ i, go, toggleScript, showScript }: { i: number; go: (n: number) => void; toggleScript: () => void; showScript: boolean }) {
  const [secs, setSecs] = useState(420);
  const [run, setRun] = useState(false);
  useEffect(() => {
    if (!run) return;
    const t = setInterval(() => setSecs((s) => (s <= 1 ? (setRun(false), 0) : s - 1)), 1000);
    return () => clearInterval(t);
  }, [run]);
  const fs = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen());
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="flex flex-wrap items-center gap-2 px-4 py-2">
        <span className="font-bold text-ev-gradient">EV vs Fuel</span>
        <span className="text-sm text-muted-foreground">Slide {i + 1} / {TOTAL}</span>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <span className={`font-mono text-lg font-bold ${secs < 60 ? "text-fuel" : "text-ev"}`}>{mm}:{ss}</span>
          <Btn tone="ghost" onClick={() => setRun((r) => !r)}>{run ? "Pause" : "Start"}</Btn>
          <Btn tone="ghost" onClick={() => { setRun(false); setSecs(420); }}>Reset</Btn>
          <Btn tone="hybrid" onClick={toggleScript} active={showScript}>Speaker Script</Btn>
          <Btn tone="ghost" onClick={fs}>Fullscreen</Btn>
          <Btn tone="ghost" onClick={() => go(i - 1)}>← Prev</Btn>
          <Btn onClick={() => go(i + 1)}>Next →</Btn>
        </div>
      </div>
      <div className="h-1 bg-muted">
        <div className="h-full bg-gradient-to-r from-ev to-ev2 transition-all duration-500" style={{ width: `${((i + 1) / TOTAL) * 100}%` }} />
      </div>
    </header>
  );
}

function H({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <div className="mb-6 text-center">
      <h2 className="text-3xl font-extrabold md:text-5xl">{children}</h2>
      {sub && <p className="mt-2 text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}

function S1({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-3xl">
      <div className="grid h-[70vh] grid-cols-2">
        <img src={evImg} alt="Electric car charging at night" className="h-full w-full object-cover" width={1024} height={1024} />
        <img src={fuelImg} alt="Fuel car at a petrol station" className="h-full w-full object-cover" width={1024} height={1024} />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 p-6 text-center">
        <div className="mb-4 flex gap-3 text-sm font-bold uppercase tracking-widest">
          <span className="text-ev">⚡ Electric</span><span className="text-muted-foreground">vs</span><span className="text-fuel">⛽ Fuel</span>
        </div>
        <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
          Will <span className="text-ev-gradient">Electric Vehicles</span> Replace <span className="text-fuel">Fuel Cars</span>?
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">A Simple Look at Cars, Energy, and the Future — Grade 11</p>
        <button onClick={onStart} className="glow-ev mt-8 rounded-full bg-ev px-8 py-3 text-lg font-bold text-background transition-transform hover:scale-105">
          Start Presentation
        </button>
      </div>
    </div>
  );
}

function S2() {
  const data = [
    { k: "ev", name: "Electric Cars (EVs)", val: 28, label: "~25% – 30%", note: "Growing fast because of lower running cost.", bar: "bg-ev", text: "text-ev" },
    { k: "fuel", name: "Traditional Fuel Cars", val: 52, label: "~50% – 55%", note: "Still popular for long trips and petrol power.", bar: "bg-fuel", text: "text-fuel" },
    { k: "hy", name: "Hybrid Cars", val: 20, label: "~20%", note: "Mixing fuel and electricity — a very popular choice.", bar: "bg-hybrid", text: "text-hybrid" },
  ];
  const [sel, setSel] = useState<string | null>(null);
  const [fact, setFact] = useState(false);
  return (
    <div>
      <H sub="Based on real global car sales data (2025–2026):">Real Market Poll: What is happening right now?</H>
      <div className="grid gap-4 md:grid-cols-3">
        {data.map((d) => (
          <button key={d.k} onClick={() => setSel(d.k)} className={`glass p-5 text-left transition-all hover:-translate-y-1 ${sel === d.k ? "ring-2 ring-current " + d.text : ""}`}>
            <div className={`text-3xl font-extrabold ${d.text}`}>{d.label}</div>
            <div className="mt-1 text-lg font-semibold text-foreground">{d.name}</div>
            <p className="mt-1 text-muted-foreground">{d.note}</p>
          </button>
        ))}
      </div>
      <div className="glass mt-6 space-y-4 p-6">
        {data.map((d) => (
          <div key={d.k}>
            <div className="mb-1 flex justify-between text-sm"><span>{d.name}</span><span className={d.text}>{d.label}</span></div>
            <div className="h-5 overflow-hidden rounded-full bg-muted">
              <div className={`h-full rounded-full ${d.bar} transition-all duration-700 ${sel && sel !== d.k ? "opacity-30" : ""}`} style={{ width: sel === null || sel === d.k ? `${d.val}%` : `${d.val * 0.6}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Btn tone="hybrid" onClick={() => setFact(true)}>Show Real Fact</Btn>
        {fact && <p className="glass mx-auto mt-4 max-w-3xl animate-pop p-4 text-lg"><b className="text-hybrid">Fact:</b> Electric and Hybrid cars are growing faster than ever, but fuel cars still lead in total numbers on roads.</p>}
      </div>
    </div>
  );
}

function S3() {
  const rows = [
    { t: "Speed", i: "🏁", ev: "Instant power — very fast start.", fuel: "Traditional engine sound and power." },
    { t: "Refueling", i: "🔌", ev: "20–40 min fast charging (or overnight at home).", fuel: "Only 3 minutes at a station." },
    { t: "Maintenance", i: "🔧", ev: "Very few parts. No oil change.", fuel: "Many moving parts need regular service." },
    { t: "Environment", i: "🌍", ev: "Zero smoke in cities.", fuel: "Produces CO₂ smoke." },
  ];
  return (
    <div>
      <H>Electric Cars vs. Fuel Cars (Pros &amp; Cons)</H>
      <div className="grid gap-4 md:grid-cols-2">
        {rows.map((r) => (
          <div key={r.t} className="glass p-5 transition-transform hover:scale-[1.02]">
            <div className="mb-3 text-xl font-bold">{r.i} {r.t}</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-ev/40 p-3"><div className="text-xs font-bold uppercase text-ev">⚡ Electric</div><p className="mt-1">{r.ev}</p></div>
              <div className="rounded-xl border border-fuel/40 p-3"><div className="text-xs font-bold uppercase text-fuel">⛽ Fuel</div><p className="mt-1">{r.fuel}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function S4() {
  const pts = [{ y: 2025, v: 28 }, { y: 2028, v: 40 }, { y: 2031, v: 52 }, { y: 2035, v: 65 }, { y: 2038, v: 74 }, { y: 2040, v: 80 }];
  const [hover, setHover] = useState(pts.length - 1);
  const W = 500, Hh = 300, P = 40;
  const x = (k: number) => P + (k * (W - 2 * P)) / (pts.length - 1);
  const y = (v: number) => Hh - P - (v / 100) * (Hh - 2 * P);
  const path = pts.map((p, k) => `${k ? "L" : "M"}${x(k)},${y(p.v)}`).join(" ");
  const cards = [
    { t: "🔋 Better Batteries", d: "New solid-state batteries will let cars travel 1,000 km on one charge and charge in 10 minutes." },
    { t: "📜 New Laws", d: "Many countries plan to stop selling new petrol-only cars by 2035." },
    { t: "🧪 Clean Fuel (e-Fuels)", d: "Car makers are building clean synthetic fuels to keep normal engines running cleanly." },
  ];
  return (
    <div>
      <H>The Future: What Will Happen by 2040?</H>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass p-4">
          <div className="mb-2 text-sm text-muted-foreground">EV share of new car sales (forecast) — tap a point</div>
          <svg viewBox={`0 0 ${W} ${Hh}`} className="w-full">
            {[0, 25, 50, 75, 100].map((g) => (
              <g key={g}><line x1={P} x2={W - P} y1={y(g)} y2={y(g)} stroke="var(--border)" /><text x={8} y={y(g) + 4} fontSize="11" fill="var(--muted-foreground)">{g}%</text></g>
            ))}
            <path d={`${path} L${x(pts.length - 1)},${y(0)} L${x(0)},${y(0)} Z`} fill="var(--ev)" opacity="0.12" />
            <path d={path} fill="none" stroke="var(--ev)" strokeWidth="3" />
            {pts.map((p, k) => (
              <g key={p.y} onMouseEnter={() => setHover(k)} onClick={() => setHover(k)} className="cursor-pointer">
                <circle cx={x(k)} cy={y(p.v)} r={hover === k ? 9 : 6} fill={hover === k ? "var(--ev2)" : "var(--ev)"} />
                <text x={x(k)} y={Hh - 15} textAnchor="middle" fontSize="12" fill="var(--muted-foreground)">{p.y}</text>
                {hover === k && <text x={x(k)} y={y(p.v) - 16} textAnchor="middle" fontSize="16" fontWeight="bold" fill="var(--foreground)">{p.v}%</text>}
              </g>
            ))}
          </svg>
        </div>
        <div className="space-y-4">
          {cards.map((c) => (
            <div key={c.t} className="glass p-5 transition-transform hover:translate-x-1">
              <div className="text-xl font-bold text-ev">{c.t}</div>
              <p className="mt-1 text-lg">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const QUIZ = [
  { q: "Electric cars give instant power when you press the pedal.", a: true, why: "Correct! Electric motors give power right away." },
  { q: "Traditional fuel cars take 2 hours to fill up with petrol.", a: false, why: "Correct! It takes only about 3 minutes." },
  { q: "By 2040, experts predict electric cars will be around 80% of sales.", a: true, why: "Correct! Around 80% is the forecast." },
];

function S5() {
  const [ans, setAns] = useState<(boolean | null)[]>([null, null, null]);
  const score = ans.filter((v, k) => v === QUIZ[k]?.a).length;
  return (
    <div>
      <H>Quick Guess Game: True or False?</H>
      <div className="mb-4 text-center">
        <span key={score} className="glass glow-ev inline-block animate-pop px-6 py-2 text-2xl font-extrabold text-ev">Class Score: {score} / 3 {score === 3 && "🎉"}</span>
      </div>
      <div className="space-y-4">
        {QUIZ.map((item, k) => {
          const picked = ans[k];
          const right = picked === item.a;
          return (
            <div key={k} className="glass p-5">
              <p className="text-lg font-semibold md:text-xl">{k + 1}. {item.q}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {[true, false].map((v) => (
                  <Btn key={String(v)} tone={v ? "ev" : "fuel"} active={picked === v} onClick={() => picked === null && setAns((a) => a.map((x, j) => (j === k ? v : x)))}>
                    {v ? "True" : "False"}
                  </Btn>
                ))}
                {picked !== null && (
                  <span className={`animate-pop font-bold ${right ? "text-ev2" : "text-fuel"}`}>{right ? `✅ ${item.why}` : `❌ Not quite. The answer is ${item.a ? "True" : "False"}.`}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-center"><Btn tone="ghost" onClick={() => setAns([null, null, null])}>Play Again</Btn></div>
    </div>
  );
}

function S6() {
  const [votes, setVotes] = useState({ Electric: 0, Hybrid: 0, "Fuel Car": 0 });
  const [notes, setNotes] = useState("");
  const total = Object.values(votes).reduce((a, b) => a + b, 0) || 1;
  const tone = { Electric: "ev", Hybrid: "hybrid", "Fuel Car": "fuel" } as const;
  const bar = { Electric: "bg-ev", Hybrid: "bg-hybrid", "Fuel Car": "bg-fuel" };
  return (
    <div>
      <H>Exit Ticket: Your Final Choice</H>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass p-5">
          <div className="mb-3 text-xl font-bold">🗳️ What will you drive in 2035?</div>
          <div className="flex flex-wrap gap-3">
            {(Object.keys(votes) as (keyof typeof votes)[]).map((k) => (
              <Btn key={k} tone={tone[k]} onClick={() => setVotes((v) => ({ ...v, [k]: v[k] + 1 }))}>{k} ({votes[k]})</Btn>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {(Object.keys(votes) as (keyof typeof votes)[]).map((k) => (
              <div key={k} className="h-3 overflow-hidden rounded-full bg-muted">
                <div className={`h-full ${bar[k]} transition-all duration-500`} style={{ width: `${(votes[k] / total) * 100}%` }} />
              </div>
            ))}
          </div>
        </div>
        <div className="glass p-5">
          <div className="mb-3 text-xl font-bold">📝 Quick Note Board</div>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Ali: Hybrid because it's safe for long trips" className="h-40 w-full resize-none rounded-xl border border-border bg-muted p-3 text-foreground outline-none focus:border-ev" />
        </div>
      </div>
      <div className="glow-ev mt-6 rounded-2xl border border-ev bg-gradient-to-r from-ev/15 to-ev2/15 p-6 text-center text-lg md:text-xl">
        <b className="text-ev">Conclusion:</b> Electric cars will lead our cities, but hybrids and clean fuels will stay with us. <b>Thank you for listening!</b>
      </div>
    </div>
  );
}
