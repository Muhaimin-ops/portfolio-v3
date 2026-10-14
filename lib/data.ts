export const profile = {
  name: "Mahmud Al Muhaimin",
  role: "AI engineer and full-stack developer",
  intro: "I build LLM systems, agent backends and the products around them, from the model call to the screen.",
  location: "Dhaka, Bangladesh",
  email: "mahmudalmuhaimin055@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/m-Muhaimin" },
    { label: "LinkedIn", href: "https://linkedin.com/in/mahmud-al-muhaimin" },
    { label: "X", href: "https://x.com/MMuhaminn" },
  ],
};
export type Project = {
  name: string; tag: string; href: string; body: string;
  stack: string[]; highlights: string[]; status: "Shipped" | "In progress";
};
export const projects: Project[] = [
  { name: "SuprBuild Mesh", tag: "AI systems · Node.js", href: "https://github.com/m-Muhaimin/suprbuild-mesh",
    body: "A task mesh where AI agents publish work, complete it, earn reputation and get paid. Express and SQLite behind 20+ REST endpoints, 10+ concurrent agents, ~120 ms median response in local load tests.",
    stack: ["Node.js","Express","SQLite","REST"], highlights: ["20+ REST endpoints","10+ concurrent agents","~120 ms median response (local load tests)"], status: "Shipped" },
  { name: "Route52", tag: "Bangla AI · TypeScript", href: "https://github.com/m-Muhaimin/Route52",
    body: "A Bangla-native assistant with authentication, persistent chat history and an agent-oriented design. Beta-tested with 30+ users over 200+ conversations to refine prompts and flow.",
    stack: ["TypeScript","LLMs","Auth","Chat history"], highlights: ["Beta-tested with 30+ users","200+ conversations used to refine prompts","Persistent chat history"], status: "Shipped" },
  { name: "Krostio", tag: "Fintech · TypeScript", href: "https://github.com/m-Muhaimin/krostio",
    body: "Income verification for gig workers: platform earnings turned into lender-ready documentation.",
    stack: ["TypeScript","Fintech"], highlights: ["Built for gig workers","Platform earnings to lender-ready documents"], status: "Shipped" },
  { name: "PhyloVAE", tag: "Machine learning · PyTorch", href: "https://github.com/m-Muhaimin/PhyloVAE",
    body: "Variational autoencoders for tree-structured phylogenetic data; reconstruction loss down ~18% against a baseline autoencoder.",
    stack: ["PyTorch","VAE","Tree-structured data"], highlights: ["Reconstruction loss down ~18% vs baseline autoencoder"], status: "Shipped" },
  { name: "Quick-Draw Detection", tag: "Computer vision", href: "https://github.com/m-Muhaimin/Quick-Draw-Detection",
    body: "CNN plus Bi-LSTM sketch classifier reaching ~92% test accuracy, 6 points above CNN alone.",
    stack: ["Deep learning","CNN","Bi-LSTM"], highlights: ["~92% test accuracy","6 points above CNN alone"], status: "Shipped" },
  { name: "Interviewer Practice Lab", tag: "AI training · Next.js", href: "#",
    body: "AI-simulated candidates that let hiring managers practise interviewing before they sit across from a real person.",
    stack: ["Next.js","LLMs","SaaS"], highlights: ["Synthetic candidates for interviewer training"], status: "In progress" },
  { name: "Admission Mock Test Builder", tag: "EdTech · Next.js", href: "#",
    body: "An AI mock-test builder and weakness finder for BUET-style and DU admission exams.",
    stack: ["Next.js","Tailwind","Supabase","OpenAI-compatible API"], highlights: ["Generates exam-style mock tests","Finds each student's weak topics"], status: "In progress" },
];
export const experience = [
  { role: "Freelance software and digital marketing", org: "Bangladesh", when: "2020 – now",
    body: "Web development, SEO and go-to-market work for 248+ clients in SaaS, e-commerce and travel. Some grew up to 45x within six months of going digital." },
  { role: "Software developer intern", org: "Square InformatiX Ltd.", when: "Oct 2022 – Jan 2023",
    body: "Built and unit-tested 6 components for an electronic data management system, made report queries ~35% faster and fixed 25+ defects." },
  { role: "BSc Software Engineering", org: "Yunnan University, China", when: "2019 – 2023",
    body: "Thesis: an ML-based movie recommendation system." },
];
export const skills: Record<string, string> = {
  "AI": "LLM applications, RAG, agents, embeddings, semantic search",
  "Languages": "Python, TypeScript, JavaScript, SQL, C++",
  "Backend": "Node.js, Express, FastAPI, REST, SQLite, MySQL",
  "Frontend": "React, Next.js, responsive UI",
  "ML": "PyTorch, TensorFlow, CNN, LSTM, VAE",
};
// PLACEHOLDER pricing: edit before going live. Amounts are in cents; the server is the only source of truth.
export const offers = [
  { slug: "ai-sprint", name: "AI product sprint", mode: "payment" as const, amount: 300000,
    blurb: "Two weeks from idea to a working LLM or agent prototype, deployed." },
  { slug: "retainer", name: "Engineering retainer", mode: "subscription" as const, amount: 150000,
    blurb: "A monthly block of build time for your product. Cancel anytime." },
];

// Every figure below is taken from the project and experience entries above.
export const stats = [
  { value: "248+", label: "freelance clients served" },
  { value: "20+", label: "REST endpoints in SuprBuild Mesh" },
  { value: "~92%", label: "sketch classifier test accuracy" },
  { value: "~35%", label: "faster report queries at my internship" },
];
export const availability = {
  status: "Open to AI engineer and full-stack roles",
  detail: "Based in Dhaka, Bangladesh. Email is the fastest way to reach me.",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/my-works" },
  { label: "About", href: "/about" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/contact" },
];

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export type Article = {
  slug: string; title: string; summary: string; date: string; tags: string[];
  body: { h?: string; p: string }[];
};
// Drafts written for review: edit the wording and dates before you publish.
export const articles: Article[] = [
  {
    slug: "designing-a-task-mesh-for-ai-agents",
    title: "Designing a task mesh for AI agents",
    summary: "Design notes from SuprBuild Mesh: how agents publish work, complete it, earn reputation and get paid.",
    date: "2026-10-15",
    tags: ["Agents", "Node.js", "Architecture"],
    body: [
      { p: "SuprBuild Mesh is a marketplace where the workers are AI agents. One agent publishes a task, another completes it, and the system tracks reputation and payment. These notes explain the shape of the design and the trade-offs I made." },
      { h: "Start with the task lifecycle", p: "Everything hangs off one small state machine: a task is published, claimed, completed and then settled. Keeping the states few and explicit made the REST surface easy to reason about, and it is why a 20-endpoint API stayed readable." },
      { h: "Reputation is a ledger, not a number", p: "A single reputation score is easy to store and hard to trust. Recording each completed task as an event, and deriving the score from those events, means a score can always be explained, recomputed and corrected." },
      { h: "Pick boring storage first", p: "Express with SQLite handled 10+ concurrent agents with a median response of about 120 ms in local load tests. Those are local numbers, not production ones, but they were enough to prove the design before adding anything heavier." },
      { h: "What I would do next", p: "Add idempotency keys to every write so agents can retry safely, and move settlement behind a queue so a slow payment never blocks task completion." },
    ],
  },
  {
    slug: "a-checklist-before-you-ship-an-llm-feature",
    title: "A checklist before you ship an LLM feature",
    summary: "Seven practical questions I ask before an LLM feature reaches real users.",
    date: "2026-10-15",
    tags: ["LLMs", "Product", "Reliability"],
    body: [
      { p: "A demo only has to work once. A feature has to work for strangers on a bad day. This is the short list I run through before an LLM feature ships." },
      { h: "1. What happens when the model is wrong?", p: "Decide the failure mode in advance: a fallback answer, a visible caveat, or a human handoff. Never let a wrong answer look as confident as a right one." },
      { h: "2. Can you replay a bad conversation?", p: "Log prompts, retrieved context and outputs with an ID, so a user complaint becomes a reproducible test case rather than a guess." },
      { h: "3. Are the inputs bounded?", p: "Cap message length, history length and request rate. Treat everything a user or a retrieved document says as data, never as instructions." },
      { h: "4. Is there a cheap path?", p: "Answer simple questions without the model where you can. It is faster, cheaper and still works when the provider does not." },
      { h: "5. How do you measure better?", p: "Keep a small set of real questions with known good answers and run it before every prompt change. Without it, every edit is a coin flip." },
      { h: "6. Who pays when it loops?", p: "Set timeouts, token limits and spend alerts. An agent without a stopping rule is a billing incident waiting to happen." },
      { h: "7. Does it say it is AI?", p: "Tell people they are talking to a model and what it can and cannot do. Trust is cheaper to keep than to rebuild." },
    ],
  },
  {
    slug: "how-the-voice-assistant-on-this-site-works",
    title: "How the voice assistant on this site works",
    summary: "A browser-only voice interface on top of a small, rate-limited API route, with a fallback that needs no API key.",
    date: "2026-10-15",
    tags: ["Voice", "Next.js", "Web APIs"],
    body: [
      { p: "The assistant in the corner of this site answers questions about my work. It is deliberately small, and every part of it can fail without breaking the page." },
      { h: "Speech in and out", p: "Listening uses the browser's SpeechRecognition API and speaking uses speechSynthesis. Nothing is streamed to my servers as audio: the browser turns speech into text, and only that text is sent." },
      { h: "A narrow API route", p: "The text goes to one route that limits message length and request rate. If a language model key is configured, the route sends my profile, projects and rates as context and tells the model to answer only from them." },
      { h: "A fallback that always works", p: "Without a key, or if the model call fails, the route answers from the same data with simple intent matching. It is less fluent but it is never down." },
      { h: "Limits", p: "SpeechRecognition is not available in every browser, so the mic button only appears where it works. Typing and spoken replies work everywhere." },
    ],
  },
];

export const wordsIn = (a: Article) => a.body.reduce((n, b) => n + (b.h ? b.h.split(" ").length : 0) + b.p.split(" ").length, 0);
export const readingMinutes = (a: Article) => Math.max(1, Math.round(wordsIn(a) / 200));
