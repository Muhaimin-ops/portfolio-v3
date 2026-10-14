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
export type CaseStudy = {
  slug: string;
  projectName: string;
  context: string;
  approach: { heading: string; body: string }[];
  outcome: string;
};
export const caseStudies: CaseStudy[] = [
  {
    slug: "suprbuild-mesh",
    projectName: "SuprBuild Mesh",
    context: "A marketplace concept where AI agents publish tasks, complete work for other agents, build reputation and receive payment. The core engineering challenge was making that lifecycle understandable and safe to retry.",
    approach: [
      { heading: "Model the task lifecycle", body: "The system centers on a small set of explicit states: published, claimed, completed and settled. That kept the REST surface understandable as it grew beyond 20 endpoints." },
      { heading: "Make reputation explainable", body: "Rather than treating reputation as a number to update, completed tasks are recorded as events and the score is derived from those events. This makes the result inspectable and recomputable." },
      { heading: "Validate with a small stack", body: "Express and SQLite were enough to exercise the design with 10+ concurrent agents. Local load tests measured about 120 ms median response time; that figure is a local test result, not a production service-level claim." },
      { heading: "Document the next constraints", body: "The design notes identify idempotency keys for safe write retries and queued settlement as follow-up work. Those are planned improvements, not features claimed as shipped." },
    ],
    outcome: "A shipped project with 20+ REST endpoints, a task-state model, event-derived reputation, and measured local-load-test results.",
  },
  {
    slug: "route52",
    projectName: "Route52",
    context: "A Bangla-native assistant project built around authentication, persistent chat history and an agent-oriented design.",
    approach: [
      { heading: "Build for Bangla-first use", body: "The assistant was designed as a Bangla-native product rather than a generic chat interface with language support added as an afterthought." },
      { heading: "Keep conversations persistent", body: "Authentication and persistent chat history are part of the project, so returning users can continue conversations rather than starting over." },
      { heading: "Use beta conversations to refine the flow", body: "The beta was tested with more than 30 users across 200+ conversations. Those conversations were used to refine the prompts and interaction flow." },
    ],
    outcome: "A shipped beta-tested assistant with authentication and persistent chat history. The available project notes do not include public production or accuracy metrics.",
  },
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
      { p: "SuprBuild Mesh is a marketplace concept where AI agents publish tasks, complete work for other agents, build reputation and receive payment. The project explores a practical backend question: how can multiple agents coordinate work without hiding the state of that work?" },
      { h: "Start with the task lifecycle", p: "The core lifecycle is deliberately compact: a task is published, claimed, completed and then settled. Keeping those states explicit gives the API a shared vocabulary. A client can reason about where a task is and which transition comes next, instead of interpreting a loosely defined status string." },
      { p: "That state model also helps keep the API understandable as its surface grows. The project has more than 20 REST endpoints, but the central workflow stays anchored to a small number of transitions. The endpoint count describes the implementation, not a claim that every future workflow is solved." },
      { h: "Treat reputation as a record of events", p: "A mutable reputation score is difficult to explain after a dispute or correction. In this design, completed tasks are recorded as events and the score is derived from those events. The important property is auditability: the value can be inspected, recomputed and corrected from its underlying history." },
      { p: "This separation makes reputation a result of recorded work rather than an opaque field that changes without context. It does not by itself prevent dishonest activity; it gives the system a more explainable basis for reviewing the score." },
      { h: "Choose storage that helps test the idea", p: "The implementation uses Express and SQLite. That kept the project small while exercising the task and agent flows. Local load tests covered more than 10 concurrent agents and measured roughly 120 ms median response time. These are local test results, not production benchmarks or a service-level guarantee." },
      { p: "Starting with a small stack made it possible to test the core model without treating infrastructure scale as the first problem. The useful question at this stage was whether the API and task lifecycle could support the intended interactions." },
      { h: "Design for retries and slow settlement", p: "Agent clients can retry a request after a timeout without knowing whether the server already completed it. Idempotency keys on write operations are a planned improvement so a retry can be distinguished from a new action." },
      { p: "Settlement is another boundary worth protecting. Moving it behind a queue is also planned work; it would keep a slow payment operation from holding up task completion. Neither improvement is represented as shipped in the current project." },
      { h: "What this project demonstrates", p: "SuprBuild Mesh is a shipped exploration of task-state modeling, REST API design and event-derived reputation for an agent-oriented marketplace. The strongest next step is to implement retry-safe writes and asynchronous settlement, then test those failure paths directly." },
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
    title: "How the text assistant on this site works",
    summary: "How the portfolio's text assistant sends questions to a rate-limited API and falls back to profile-based answers.",
    date: "2026-10-15",
    tags: ["AI assistants", "Next.js", "Reliability"],
    body: [
      { p: "The assistant on this portfolio answers questions about Mahmud's projects, experience, skills and rates. Visitors type questions into a small chat interface." },
      { h: "A narrow API route", p: "Messages are sent to a rate-limited API route with bounded message length and history. When a language model is configured, the route supplies portfolio facts and instructs it to answer only from those facts." },
      { h: "A local fallback", p: "When no model key is configured, or the model request fails, the API uses simple intent matching against the same profile and project data to produce a basic answer." },
      { h: "Progressive response display", p: "The interface reveals each completed answer a few characters at a time. This is a display animation; the current API response is returned as a complete message rather than streamed token by token." },
      { h: "Limits", p: "Answers are constrained to portfolio information and may still be wrong. Visitors are encouraged to email Mahmud to confirm important details." },
    ],
  },
];

export const wordsIn = (a: Article) => a.body.reduce((n, b) => n + (b.h ? b.h.split(" ").length : 0) + b.p.split(" ").length, 0);
export const readingMinutes = (a: Article) => Math.max(1, Math.round(wordsIn(a) / 200));
