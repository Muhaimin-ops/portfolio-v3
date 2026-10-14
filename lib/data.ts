export const profile = {
  name: "Mahmud Al Muhaimin",
  role: "AI engineer and full-stack developer",
  intro: "I build LLM systems, agent backends and the products around them, from the model call to the screen.",
  location: "Dhaka, Bangladesh",
  email: "hello@muhaimin.dev",
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
    body: "An agent task mesh for publishing, claiming, submitting, verifying and settling work. Built with Node.js, Express and SQLite, with reputation scoring, wallet flows and a live dashboard.",
    stack: ["Node.js","Express","SQLite","REST"], highlights: ["20+ REST endpoints","10+ concurrent agents","~120 ms median response (local load tests)"], status: "Shipped" },
  { name: "Route52", tag: "Bangla AI · TypeScript", href: "https://github.com/m-Muhaimin/Route52",
    body: "A Bangla-native TypeScript and React assistant with authentication, persistent conversations, agent-oriented workflows, rich Markdown, and readable code blocks.",
    stack: ["TypeScript","React","LLMs","Authentication"], highlights: ["Beta-tested with 30+ users","200+ conversations used to refine prompts","Persistent chat history"], status: "Shipped" },
  { name: "Krostio", tag: "Fintech · TypeScript", href: "https://github.com/m-Muhaimin/krostio",
    body: "A full-stack income-verification product concept for gig workers and freelancers. It turns connected earnings into income histories, consistency insights, projections and shareable lender-ready reports.",
    stack: ["Next.js","TypeScript","Supabase","Plaid Sandbox","Paddle","Base"], highlights: ["Income verification reports and consistency scoring","Plaid integration is configured for sandbox data","PDF reports and optional on-chain attestations"], status: "In progress" },
  { name: "PhyloVAE", tag: "Research reproduction · PyTorch", href: "https://github.com/m-Muhaimin/PhyloVAE",
    body: "A PyTorch implementation and experiment based on published PhyloVAE research for learning representations of phylogenetic tree topologies.",
    stack: ["Python","PyTorch","Variational autoencoders","Phylogenetics"], highlights: ["CV-reported reconstruction loss reduction of ~18% vs a baseline autoencoder","Based on an ICLR 2025 paper by Xie et al."], status: "Shipped" },
  { name: "Quick-Draw Detection", tag: "Computer vision", href: "https://github.com/m-Muhaimin/Quick-Draw-Detection",
    body: "A QuickDraw sketch-classification experiment comparing CNN and Bi-LSTM models. The CV reports about 92% test accuracy, six percentage points above the CNN-only baseline.",
    stack: ["Python","Computer vision","CNN","Bi-LSTM"], highlights: ["~92% test accuracy (CV-reported)","6 percentage points above the CNN-only baseline"], status: "Shipped" },
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
  references?: { label: string; href: string }[];
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
  {
    slug: "krostio",
    projectName: "Krostio",
    context: "A full-stack income-verification product concept for gig workers and freelancers. The product organizes platform earnings into lender-ready income histories, consistency patterns, annualized projections and a shareable income passport.",
    approach: [
      { heading: "Turn earnings data into a useful report", body: "The product workflow connects gig-platform data through Plaid, then presents income history and consistency information in a report that workers can share with a lender. The Plaid integration is configured for sandbox data, not live financial connections." },
      { heading: "Build a complete product surface", body: "The repository combines a Next.js and TypeScript application with Supabase, authentication, worker dashboards and PDF report generation. That connects account access and data review to an output a user can take outside the app." },
      { heading: "Keep platform integrations explicit", body: "The codebase includes Paddle billing and a Solidity income-attestation contract targeting Base. The project documentation describes the Base deployments and Plaid sandbox; this portfolio does not present them as production financial services." },
    ],
    outcome: "A full-stack fintech product concept connecting gig-worker earnings, income summaries and shareable reports. Public documentation marks financial-platform data as sandbox and describes the product as a prototype.",
  },
  {
    slug: "quick-draw-detection",
    projectName: "Quick-Draw Detection",
    context: "A computer-vision experiment comparing CNN and Bi-LSTM approaches to classifying QuickDraw sketches. The CV reports approximately 92% test accuracy and a six-percentage-point improvement over a CNN-only baseline.",
    approach: [
      { heading: "Compare model approaches", body: "The project explores convolutional feature extraction alongside a recurrent model for sketch classification, using the QuickDraw dataset as its task domain." },
      { heading: "Make the experiment reproducible", body: "The CV reports the test result relative to a CNN-only baseline. A stronger technical write-up should also document the dataset split, preprocessing, class count and model configuration used for that result." },
    ],
    outcome: "A public ML project with a CV-reported test result of about 92% accuracy and a six-point improvement over the CNN-only baseline. Dataset and class-count details should be reconciled with the repository documentation.",
  },
  {
    slug: "phylovae",
    projectName: "PhyloVAE",
    context: "A PyTorch implementation and experiment around variational autoencoders for phylogenetic tree-topology data, based on the PhyloVAE paper presented as an ICLR 2025 poster.",
    approach: [
      { heading: "Work with tree-topology representations", body: "The repository documents construction of tree-topology encodings and node embeddings, training a variational autoencoder, and producing representations for downstream analysis." },
      { heading: "Reproduce and measure against a baseline", body: "The CV reports about an 18% reduction in reconstruction loss versus a baseline autoencoder. The public repository README credits the original PhyloVAE paper authors; the result is presented here as an implementation and experiment based on that research, not original authorship of the paper." },
    ],
    outcome: "An ML implementation project with a CV-reported reconstruction-loss improvement, linked to the original ICLR 2025 paper and its authors.",
    references: [
      { label: "Original PhyloVAE paper on arXiv", href: "https://arxiv.org/abs/2502.04730" },
      { label: "ICLR OpenReview paper record", href: "https://openreview.net/forum?id=Z8TglKXDWm" },
    ],
  },
];
export const experience = [
  { role: "Freelance software and digital marketing", org: "Bangladesh", when: "2020–Present",
    body: "Delivered web development, SEO and go-to-market work for 248+ clients across SaaS, e-commerce and travel. CV-reported client growth reached up to 45x within six months of digitization." },
  { role: "Software developer intern", org: "Square InformatiX Ltd.", when: "Oct 2022 – Jan 2023",
    body: "Built and unit-tested 6 components for an electronic data management system, made report queries ~35% faster, fixed 25+ defects, and contributed to database design, documentation and requirements gathering." },
  { role: "BSc Software Engineering", org: "Yunnan University, China", when: "2019 – 2023",
    body: "Thesis: an ML-based movie recommendation system. Relevant study areas included machine learning, data structures and algorithms, software architecture, and software project management." },
];
export const skills: Record<string, string> = {
  "AI": "LLM applications, RAG, agents, agentic workflows, embeddings, semantic search, AI orchestration",
  "Languages": "Python, TypeScript, JavaScript, SQL, C++",
  "Backend": "Node.js, Express, FastAPI, REST, SQLite, MySQL",
  "Frontend": "React, Next.js, responsive UI",
  "ML": "PyTorch, TensorFlow, CNN, LSTM, VAE, computer vision, recommender systems",
  "Engineering": "Software architecture, testing, Git/GitHub, Linux, API integration, product prototyping",
};
export const certifications = [
  { issuer: "freeCodeCamp", areas: "Python, machine learning and data science" },
  { issuer: "HackerRank", areas: "Python, machine learning and data science" },
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
  sources?: { label: string; href: string }[];
  related?: { label: string; href: string }[];
};
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
  {
    slug: "what-is-agentic-ai",
    title: "What is agentic AI? A practical guide to useful, bounded agents",
    summary: "A practical explanation of agentic AI, when an AI agent is useful, and how to keep its tools, permissions and outcomes under control.",
    date: "2026-10-15",
    tags: ["Agentic AI", "AI agents", "AI architecture"],
    body: [
      { p: "Agentic AI describes software that uses an AI model to pursue a goal through a sequence of steps. Instead of returning one answer and stopping, an agent may interpret a request, choose a tool, inspect the result and decide what to do next. The useful distinction is not that an agent is autonomous by default; it is that the system can select and coordinate actions within boundaries its developers define." },
      { h: "What makes a system agentic?", p: "A typical agent loop combines a model, a goal, context, available tools and application code that executes approved actions. The model can help decide what to do, but the application should own identity, authorization, validation, persistence and irreversible effects. A tool call is a proposal to perform a typed operation, not proof that it succeeded." },
      { h: "Use an agent when the workflow needs judgment", p: "A deterministic form or ordinary API is usually easier to test for a fixed sequence of steps. An agent can help when inputs vary, a request needs interpretation, or the next useful step depends on information discovered along the way. Even then, keep predictable parts—such as eligibility checks, payment confirmation and state transitions—in conventional code." },
      { h: "Design the boundaries before adding autonomy", p: "Start with the smallest useful tool set and give each tool a clear schema and permission check. Bound the number of steps, runtime, input size and spend. Ask for human confirmation before consequential actions, and make retries safe so a timeout cannot create a duplicate order or transfer. Treat user text and retrieved content as untrusted data rather than instructions that can override the application." },
      { h: "Evaluate the workflow, not just the answer", p: "A fluent response can hide a failed action. Measure whether the right tool was selected, whether the result was checked, how often the task completed, and what happened when a tool timed out or returned invalid data. Keep representative task traces as regression tests and offer a clear handoff when the system cannot proceed safely." },
      { h: "A concrete project example", p: "SuprBuild Mesh is my exploration of an agent task marketplace: agents publish work, claim it, submit results and move tasks through explicit states. The project demonstrates backend workflow design, not a general-purpose autonomous economy. Its task model is a useful reminder that reliable agent products need inspectable state and explicit rules around actions." },
      { h: "A simple rule of thumb", p: "Use a model for ambiguity, use code for authority, and use people for decisions that should not be delegated. This keeps an agent helpful without making the system's responsibilities invisible." },
    ],
    sources: [
      { label: "Model Context Protocol: Introduction", href: "https://modelcontextprotocol.io/introduction" },
      { label: "A2A Protocol: Documentation", href: "https://a2a-protocol.org/latest/" },
    ],
    related: [
      { label: "Model Context Protocol (MCP): a practical guide", href: "/articles/model-context-protocol-practical-guide" },
      { label: "Designing a task mesh for AI agents", href: "/articles/designing-a-task-mesh-for-ai-agents" },
      { label: "Agentic economy: trust, work and settlement", href: "/articles/agentic-economy-trust-work-settlement" },
    ],
  },
  {
    slug: "model-context-protocol-practical-guide",
    title: "Model Context Protocol (MCP): what it is and when to use it",
    summary: "A developer-focused guide to MCP servers, tools, resources and prompts, with practical advice on permissions and secure integrations.",
    date: "2026-10-15",
    tags: ["Model Context Protocol", "MCP", "AI tools"],
    body: [
      { p: "The Model Context Protocol (MCP) is an open protocol for connecting AI applications to external context and capabilities. It gives an application and a server a common way to exchange information, so every model host does not need a completely bespoke integration for every data source or tool." },
      { h: "The host, client and server have different jobs", p: "An MCP host is the AI application a person uses. It manages the conversation, permissions and user experience, and creates MCP clients to connect to servers. An MCP server exposes a defined set of capabilities. The protocol standardizes their communication; it does not decide whether a particular host should trust a server or grant a capability." },
      { h: "Tools, resources and prompts are not interchangeable", p: "Tools let a server expose actions that a client can invoke. Resources expose context that a client can read, while prompts provide reusable prompt templates. A useful integration chooses the smallest capability that solves the job. Read-only context is not the same permission as a tool that changes a production system." },
      { h: "MCP is not an agent-to-agent protocol", p: "MCP focuses on how an AI application connects to tools and context. It does not, by itself, define a complete workflow between independently operated agents. A2A focuses on that agent-to-agent collaboration problem. In one product, MCP can give an agent access to a local capability while A2A connects it to a remote agent." },
      { h: "Security is an application responsibility", p: "Treat a tool description as metadata, not a security policy. Authenticate server connections, authorize each action for the current user, validate arguments, limit data access and require confirmation for sensitive or irreversible operations. Do not expose secrets through tool results, and give users a way to inspect what an integration can do." },
      { h: "A practical adoption path", p: "Choose one narrowly scoped integration, document its inputs and effects, and test permission failures as carefully as successful calls. Begin with read-only capabilities if possible. Add write actions only when you can explain who authorized them, how they are logged and whether retries are safe." },
      { h: "My MCP developer profile", p: "I work on AI agents and the systems around them. My MCPize developer profile is the public place to find my developer activity; follow the profile link for its current contents rather than assuming a particular server listing." },
    ],
    sources: [
      { label: "MCP official documentation", href: "https://modelcontextprotocol.io/" },
      { label: "MCP specification", href: "https://modelcontextprotocol.io/specification" },
      { label: "A2A and MCP: complementary protocols", href: "https://a2a-protocol.org/latest/topics/a2a-and-mcp/" },
      { label: "Mahmud's MCPize developer profile", href: "https://mcpize.com/developers/m-Muhaimin" },
    ],
    related: [
      { label: "What is agentic AI?", href: "/articles/what-is-agentic-ai" },
      { label: "A2A protocol and MCP: how they work together", href: "/articles/a2a-protocol-and-mcp" },
      { label: "Agentic Commerce Protocol (ACP): checkout for AI agents", href: "/articles/agentic-commerce-protocol" },
    ],
  },
  {
    slug: "a2a-protocol-and-mcp",
    title: "A2A protocol and MCP: how they work together",
    summary: "Understand the difference between the Agent2Agent (A2A) protocol and MCP, and choose the right integration boundary for AI agents.",
    date: "2026-10-15",
    tags: ["A2A protocol", "MCP", "Agent interoperability"],
    body: [
      { p: "A2A and MCP are often discussed together because both help connect AI systems, but they solve different integration problems. MCP standardizes how an AI application connects to tools and context. A2A standardizes how independently built agents can discover and collaborate with one another." },
      { h: "What MCP is for", p: "An MCP client connects an AI host to an MCP server that exposes capabilities such as tools, resources or prompts. This is a useful boundary between a model-facing application and the services or data it can use. The host remains responsible for user experience and deciding which capabilities are allowed." },
      { h: "What A2A is for", p: "A2A is designed for communication between agents, including agents built with different frameworks or operated by different services. Its concepts support describing an agent's capabilities and exchanging work with it. That makes A2A useful when the other participant is not simply a tool the caller owns, but a separate agent that can carry out a task." },
      { h: "A simple example", p: "Imagine a travel-planning agent. It could use MCP to read a user's permitted preferences or query an internal booking tool. It could use A2A to delegate a research task to a separately operated destination-information agent. The exact division depends on product ownership, trust and deployment boundaries—not on which protocol is newer." },
      { h: "They are complementary, not competing", p: "A practical architecture can use both: MCP at the agent-to-tool boundary and A2A at the agent-to-agent boundary. Neither protocol automatically solves authentication policy, user consent, tool correctness or business-level transaction guarantees. Those remain application and deployment design concerns." },
      { h: "Where Agent Communication Protocol fits", p: "The acronym ACP is overloaded. The Agent Communication Protocol maintained by the BeeAI community announced that it is now part of A2A under the Linux Foundation. That is distinct from the Agentic Commerce Protocol, which describes buyer-agent-merchant checkout. When searching for ACP documentation, check the expanded name and project before assuming the topic." },
      { h: "Choose by participant and responsibility", p: "Use MCP when an AI host needs a structured connection to a capability or context provider. Use A2A when a separate agent needs to receive or collaborate on a task. In either case, define authorization, timeouts, error handling and human approval explicitly at your application boundary." },
    ],
    sources: [
      { label: "A2A Protocol documentation", href: "https://a2a-protocol.org/latest/" },
      { label: "A2A and MCP: complementary protocols", href: "https://a2a-protocol.org/latest/topics/a2a-and-mcp/" },
      { label: "MCP official documentation", href: "https://modelcontextprotocol.io/" },
      { label: "Agent Communication Protocol status update", href: "https://agentcommunicationprotocol.dev/introduction/welcome" },
    ],
    related: [
      { label: "Model Context Protocol (MCP): a practical guide", href: "/articles/model-context-protocol-practical-guide" },
      { label: "Agent Communication Protocol (ACP): what changed?", href: "/articles/agent-communication-protocol-acp" },
      { label: "Agentic AI: a practical guide", href: "/articles/what-is-agentic-ai" },
    ],
  },
  {
    slug: "agent-communication-protocol-acp",
    title: "Agent Communication Protocol (ACP): what changed and how it relates to A2A",
    summary: "A clear guide to the Agent Communication Protocol (ACP), its A2A convergence, and why ACP can also mean a commerce protocol.",
    date: "2026-10-15",
    tags: ["Agent Communication Protocol", "ACP", "A2A"],
    body: [
      { p: "ACP is an ambiguous acronym in the agent ecosystem. In this article, Agent Communication Protocol (ACP) means the BeeAI-originated open protocol for agent interoperability—not the separate Agentic Commerce Protocol used for agent-assisted checkout." },
      { h: "What the Agent Communication Protocol set out to do", p: "The Agent Communication Protocol described a REST-oriented way for agents and applications to communicate across frameworks. Its documentation covered synchronous and asynchronous interaction patterns, streaming, stateful and stateless operation, and long-running tasks. The goal was to make an agent easier to connect without requiring its internals to match the caller's framework." },
      { h: "The important status update: ACP is part of A2A", p: "The ACP project's current welcome page states that ACP is now part of A2A under the Linux Foundation and links to a migration guide. That changes how new implementations should be approached: consult the current A2A documentation and migration material rather than starting a new integration from an older standalone ACP tutorial." },
      { h: "What this does—and does not—mean", p: "The convergence is useful context for teams comparing agent-interoperability projects, but it does not mean every ACP-branded system or every protocol with the letters ACP is identical. Existing deployments may need a migration assessment, and the right path depends on the implementation, SDK and compatibility requirements. Verify current guidance before changing a working system." },
      { h: "Do not confuse it with commerce ACP", p: "The Agentic Commerce Protocol is a separate open specification for programmatic exchange between a buyer, the buyer's AI agent and a seller during purchase. It concerns checkout and commerce interactions, not the BeeAI Agent Communication Protocol's general agent communication focus. Search by the full protocol name or repository to avoid mixing up results." },
      { h: "How to evaluate an interoperability protocol", p: "Identify who communicates with whom, whether work is a tool call or a delegated task, how identity and authorization are carried, and how streaming, failures and long-running work are handled. Then check the current governance, specification and migration status. A protocol name alone does not tell you whether it fits your deployment." },
    ],
    sources: [
      { label: "Agent Communication Protocol welcome and status", href: "https://agentcommunicationprotocol.dev/introduction/welcome" },
      { label: "ACP to A2A migration guide", href: "https://github.com/i-am-bee/beeai-platform/blob/main/docs/community-and-support/acp-a2a-migration-guide.mdx" },
      { label: "A2A Protocol documentation", href: "https://a2a-protocol.org/latest/" },
      { label: "Agentic Commerce Protocol documentation", href: "https://www.agenticcommerce.dev/docs" },
    ],
    related: [
      { label: "A2A protocol and MCP: how they work together", href: "/articles/a2a-protocol-and-mcp" },
      { label: "Agentic Commerce Protocol (ACP): checkout for AI agents", href: "/articles/agentic-commerce-protocol" },
    ],
  },
  {
    slug: "agentic-commerce-protocol",
    title: "Agentic Commerce Protocol (ACP): how AI-agent checkout works",
    summary: "A practical introduction to the Agentic Commerce Protocol, agent-assisted checkout, merchant control and payment boundaries.",
    date: "2026-10-15",
    tags: ["Agentic commerce", "Agentic Commerce Protocol", "ACP"],
    body: [
      { p: "The Agentic Commerce Protocol (ACP) is an open specification for programmatic exchange between a buyer, the buyer's AI agent and a seller to complete a purchase. Its aim is to make checkout a defined integration rather than requiring an agent to imitate every click in a browser. ACP is a commerce protocol; it is not the BeeAI Agent Communication Protocol that has joined A2A." },
      { h: "The checkout boundary", p: "In the documented model, an agent can present checkout choices and collect buyer selections while the seller keeps its existing backend and payment processing. The protocol describes how the parties exchange information for the purchase. It does not make the agent the merchant, remove the seller's responsibilities or turn a language-model response into payment authorization." },
      { h: "Why a structured protocol can help", p: "Browser automation can be fragile when page layouts change or a checkout flow has unexpected steps. A programmatic interface can make item selection, checkout state and buyer updates more explicit. For merchants, the goal is to support agent-originated purchases while retaining control of product data, order handling and fulfillment." },
      { h: "Keep buyer consent and payment security central", p: "A useful implementation should make the order, total, seller and relevant terms clear before the buyer commits. Payment credentials and authentication need to follow the protocol's current security guidance and the merchant's payment-provider requirements. Confirmation should be tied to a specific purchase, not inferred from a broad instruction such as 'find something good'." },
      { h: "What the protocol does not solve by itself", p: "A checkout schema cannot guarantee product suitability, prevent every fraudulent request, resolve disputes or decide who is liable when an agent misunderstands intent. Merchants still need authorization checks, inventory and price validation, idempotent order creation, clear cancellation and refund paths, and auditable records." },
      { h: "Evaluate the living ecosystem", p: "Specifications evolve, and commerce has multiple adjacent initiatives. Before building, check the protocol repository and documentation for current status, versioning, supported payment flows and merchant requirements. Treat a demo as an integration example, not proof that a particular deployment is production-ready." },
      { h: "The broader agentic commerce opportunity", p: "Agent-assisted discovery and checkout could reduce friction for buyers, but the durable product work is in trust: explaining why an item was selected, preserving buyer choice, handling exceptions and making transaction state visible. In agent commerce, a successful purchase is not simply a tool call—it is an explicitly authorized business transaction." },
    ],
    sources: [
      { label: "Agentic Commerce Protocol documentation", href: "https://www.agenticcommerce.dev/docs" },
      { label: "Agentic Commerce Protocol specification and repository", href: "https://github.com/agentic-commerce-protocol/agentic-commerce-protocol" },
    ],
    related: [
      { label: "Agentic economy: trust, work and settlement", href: "/articles/agentic-economy-trust-work-settlement" },
      { label: "Model Context Protocol (MCP): a practical guide", href: "/articles/model-context-protocol-practical-guide" },
      { label: "Agent Communication Protocol (ACP): what changed?", href: "/articles/agent-communication-protocol-acp" },
    ],
  },
  {
    slug: "agentic-economy-trust-work-settlement",
    title: "The agentic economy: what has to work before agents can trade",
    summary: "A grounded look at the agentic economy: task markets, identity, reputation, verification, payments and human accountability.",
    date: "2026-10-15",
    tags: ["Agentic economy", "Agent marketplaces", "AI agents"],
    body: [
      { p: "The agentic economy is a useful name for a possible market in which software agents discover services, delegate work and participate in transactions on behalf of people or organizations. It is an emerging concept, not a claim that agents already operate a self-sustaining economy. The hard work is making each action attributable, authorized, verifiable and reversible when something goes wrong." },
      { h: "A task marketplace needs more than agents", p: "For one agent to hire or delegate to another, a system needs a description of the work, a way to assign it, observable progress, evidence of completion and a rule for settlement. It also needs to handle rejection, retries, timeouts, disputes and changes in scope. Without these, a marketplace is a directory with an optimistic payment button." },
      { h: "Identity and authority are different questions", p: "A service may identify which agent sent a request, but that does not prove the agent was authorized to act for a person or organization. Products need scoped credentials, clear approval policy and limits on what an agent may commit. High-impact actions should require explicit approval and provide a record that a person can inspect." },
      { h: "Reputation needs evidence and recourse", p: "A single score can be manipulated or misunderstood. More useful trust signals explain the evidence behind them: what work was accepted, under which criteria, and whether a result was disputed or corrected. Reputation should support investigation, not replace verification or appeal." },
      { h: "Payments need business-grade state", p: "Settlement is not the same as sending money after a model says 'done.' A system should tie payment to an agreed task and verified outcome, handle duplicate requests safely, record state transitions and define how refunds or disputes work. Keep payment authorization and settlement inside systems designed for those responsibilities." },
      { h: "A project-scale example, not a market claim", p: "My SuprBuild Mesh project explores these mechanics through a task lifecycle—publish, claim, complete and settle—and event-derived reputation. It has more than 20 REST endpoints and local load tests with 10+ concurrent agents. It is a shipped engineering exploration, not a production marketplace or evidence that an agent economy has arrived." },
      { h: "Build toward the useful version", p: "Near-term value may come from agents coordinating bounded business tasks with a person in control, not from fully autonomous agents trading without oversight. Start with transparent task contracts, narrow permissions, verifiable outcomes and safe failure paths. If those fundamentals work, more autonomous workflows can be considered deliberately." },
    ],
    sources: [
      { label: "SuprBuild Mesh project", href: "https://github.com/m-Muhaimin/suprbuild-mesh" },
      { label: "A2A Protocol documentation", href: "https://a2a-protocol.org/latest/" },
      { label: "Agentic Commerce Protocol documentation", href: "https://www.agenticcommerce.dev/docs" },
    ],
    related: [
      { label: "What is agentic AI?", href: "/articles/what-is-agentic-ai" },
      { label: "Designing a task mesh for AI agents", href: "/articles/designing-a-task-mesh-for-ai-agents" },
      { label: "Agentic Commerce Protocol (ACP): checkout for AI agents", href: "/articles/agentic-commerce-protocol" },
    ],
  },
];

export const wordsIn = (a: Article) => a.body.reduce((n, b) => n + (b.h ? b.h.split(" ").length : 0) + b.p.split(" ").length, 0);
export const readingMinutes = (a: Article) => Math.max(1, Math.round(wordsIn(a) / 200));
