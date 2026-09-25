import Trace from "@/components/Trace";
import ContactLinks from "@/components/ContactLinks";

type Item = {
  title: React.ReactNode;
  body: string;
  stack?: string;
  route?: boolean;
};

const work: Item[] = [
  {
    title: "In-house calling that replaced a paid vendor",
    body: "Moved the product's calling from an old TCP phone setup to WebRTC to cut per-call cost. Set up a routing server on AWS that connects calls directly when the other person is online and falls back to the existing phone system when they aren't. Built the softphone UI too (calls, history, contacts), which let us drop the paid third-party app.",
    stack: "WebRTC, SIP.js, Kamailio, Asterisk, AWS",
    route: true,
  },
  {
    title: "Notifications that still arrive when a channel is down",
    body: "Real-time alerts for a technician-facing app, with a cascading fallback: if the first delivery path fails, the next one picks it up.",
    stack: "Laravel Horizon, Reverb, Redis, Firebase",
    route: true,
  },
  {
    title: "Ask-the-database assistant, in production",
    body: "Lets admins ask questions in plain English over a large ERP schema. It calls an existing API when one fits, writes read-only SQL when none does, and asks a clarifying question when the request is ambiguous. Schema split into per-module chunks so it stays accurate at scale.",
    stack: "Python, LangChain",
    route: true,
  },
  {
    title: "Smaller things that mattered",
    body: "A call-flow viewer that shows a call's path through webhooks, menus and transfers on one screen. About 27% faster first load after moving the app to Vite and serving from Cloudflare's edge. A MySQL vs Postgres/TimescaleDB benchmark for our time-series data, where Postgres came out roughly 3.2x faster on date-range aggregations.",
  },
];

const own: Item[] = [
  {
    title: <a href="https://glorii.in">Glorii</a>,
    body: "A live women's occasionwear store, built from scratch. Next.js storefront on Cloudflare Workers, Medusa v2 backend on AWS Lightsail, product images on R2, CI/CD for backend deploys. Moved off Vercel to cut hosting cost.",
    stack: "Next.js, OpenNext, Medusa, PostgreSQL, Nginx",
  },
  {
    title: "Knock-pattern lock",
    body: "Recognises a secret knock from microphone audio using a small on-device audio model, aimed at an Arduino Uno Q.",
    stack: "YAMNet, TensorFlow Lite, Python",
  },
  {
    title: "Spam classifier, two ways",
    body: "Hand-written rules got 90% on the UCI SMS Spam set. A trained embedding model got 97%. Built both to see where rules stop being enough.",
  },
  {
    title: "sre-sidekick",
    body: "Hackathon team project: an AI assistant that helps find the root cause of production incidents from traces and logs. I built the dashboard and the speech-to-text input.",
    stack: "React, SigNoz, OpenTelemetry, Whisper",
  },
];

function Items({ items }: { items: Item[] }) {
  return items.map((it, i) => (
    <div key={i} className={it.route ? "item route" : "item"}>
      <h4>{it.title}</h4>
      <p>{it.body}</p>
      {it.stack && <p className="stack">{it.stack}</p>}
    </div>
  ));
}

const CHESS_USERNAME = "dhruval254";

type RatingPoint = { month: string; rating: number };

async function fetchRapidHistory(): Promise<{
  points: RatingPoint[];
  peak: number;
}> {
  const points: RatingPoint[] = [];
  let peak = 0;

  const archivesRes = await fetch(
    `https://api.chess.com/pub/player/${CHESS_USERNAME}/games/archives`,
  );
  if (!archivesRes.ok) return { points, peak };
  const { archives }: { archives: string[] } = await archivesRes.json();

  const BATCH = 5;
  for (let i = 0; i < archives.length; i += BATCH) {
    const batch = archives.slice(i, i + BATCH);
    const results = await Promise.all(
      batch.map(async (url) => {
        const res = await fetch(url);
        if (!res.ok) return null;
        const data: {
          games: {
            time_class: string;
            white: { username: string; rating: number };
            black: { username: string; rating: number };
          }[];
        } = await res.json();
        return { url, games: data.games };
      }),
    );

    for (const result of results) {
      if (!result) continue;
      let lastRating: number | undefined;
      for (const g of result.games) {
        if (g.time_class !== "rapid") continue;
        const me =
          g.white.username.toLowerCase() === CHESS_USERNAME
            ? g.white
            : g.black;
        lastRating = me.rating;
        if (me.rating > peak) peak = me.rating;
      }
      if (lastRating !== undefined) {
        const month = result.url.slice(-7).replace("/", "-");
        points.push({ month, rating: lastRating });
      }
    }
  }

  return { points, peak };
}

function RatingChart({ points, peak }: { points: RatingPoint[]; peak: number }) {
  if (points.length < 2) return null;

  const width = 640;
  const height = 120;
  const pad = 8;
  const ratings = points.map((p) => p.rating);
  const min = Math.min(...ratings);
  const max = Math.max(...ratings, peak);
  const xStep = (width - pad * 2) / (points.length - 1);
  const scaleY = (r: number) =>
    height - pad - ((r - min) / (max - min || 1)) * (height - pad * 2);

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${pad + i * xStep} ${scaleY(p.rating)}`)
    .join(" ");

  const first = points[0];
  const last = points[points.length - 1];

  return (
    <>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="chess-chart"
        role="img"
        aria-label={`Rapid rating from ${first.rating} in ${first.month} to ${last.rating} in ${last.month}, peaking at ${peak}.`}
      >
        <path d={path} fill="none" style={{ stroke: "var(--line)" }} strokeWidth={2} />
      </svg>
      <p className="stack">
        {first.month} → {last.month} · peak {peak} · now {last.rating}
      </p>
    </>
  );
}

export default async function Home() {
  const rapid = await fetchRapidHistory();

  return (
    <div className="wrap">
      <nav className="nav">
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#work">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Connect</a>
        </div>
        <div className="nav-meta">
          <a href="mailto:dhruval0254@gmail.com">dhruval0254@gmail.com</a>
          <span>Bengaluru, India</span>
        </div>
      </nav>

      <header id="about">
        <p className="lede">Build things, break things, repeat.</p>
        <p className="b64">QnVpbGQgdGhpbmdzLCBicmVhayB0aGluZ3MsIHJlcGVhdC4=</p>
        <Trace />
      </header>

      <section id="work">
        <h2>Work</h2>
        <div className="role">
          <h3>Digitattva Technolabs</h3>
          <p>Software engineer, Apr 2025 – Sep 2026</p>
        </div>
        <Items items={work} />
      </section>

      <section id="projects">
        <h2>On my own</h2>
        <Items items={own} />
      </section>

      <section className="now">
        <h2>Now</h2>
        <p>
          Learning ML from first principles, commerce background and all. Worked
          through derivatives and backprop to Karpathy&apos;s micrograd; now
          implementing attention from scratch.
        </p>
      </section>

      <section className="elsewhere">
        <h2>Elsewhere</h2>
        <p>
          Recently read <em>The Accidental CTO</em> by Subhash Choudhary —{" "}
          <a href="https://x.com/Dhruval254/status/2102683155673288912">
            wrote about it on X
          </a>
          .
        </p>
        <p>
          13,000+ games of{" "}
          <a href="https://www.chess.com/member/dhruval254">chess</a> since
          2021 — rapid peaked at 1632.
        </p>
        <details className="chess-chart-toggle">
          <summary>Show rating chart</summary>
          <RatingChart points={rapid.points} peak={rapid.peak} />
        </details>
      </section>

      <section id="contact" className="contact">
        <h2>Contact</h2>
        <p>
          Looking for full-stack, infrastructure and applied AI roles in
          Bengaluru.
        </p>
        <ContactLinks />
      </section>

      <footer>
        <p>Bengaluru, India</p>
        <p className="colophon">
          Colophon — Set in Ubuntu. Static export, deployed on Cloudflare
          Workers.
        </p>
      </footer>
    </div>
  );
}
