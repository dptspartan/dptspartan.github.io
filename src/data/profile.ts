/**
 * All site content lives here, so you can update the portfolio without touching components.
 *
 * Anything marked `TODO` is a placeholder waiting for real details. Placeholders render
 * as a subtle "details coming soon" chip on the site, so nothing looks broken meanwhile.
 *
 * Dubizzle Labs work is described as overviews only: no internal links, repo names or code.
 */

export const PLACEHOLDER = 'TODO'

export const profile = {
  name: 'Shoaib Rashid',
  handle: 'dptspartan',
  // TODO: confirm exact title at Dubizzle Labs (e.g. "Software Engineer", "Full-Stack Engineer").
  role: 'Software Engineer',
  company: 'Dubizzle Labs',
  location: 'Lahore, Pakistan',
  tagline:
    'Software engineer who builds products people rely on every day, and who cares about making complex things feel simple.',
  github: 'https://github.com/dptspartan',
  // TODO: add your LinkedIn URL, or leave empty to hide the button.
  linkedin: '',
  // TODO: add a public contact email, or leave empty to hide the email button and form.
  email: '',
  // TODO: replace public/resume.pdf with your current résumé (the existing one is from 2023).
  resume: '/resume.pdf',
  avatar: '/assets/img/shoaib.jpg',
  status: 'Shipping at Dubizzle Labs',
}

/** HUD stats in the hero. Use a string value of PLACEHOLDER until you have the real number. */
export const stats: { label: string; value: string; hint?: string }[] = [
  { label: 'Platforms shipped', value: '3', hint: 'Group CRM · Jarvis · Focus Mode' },
  { label: 'Brands served', value: 'OLX · Bayut · Zameen', hint: 'via the shared CRM' },
  // TODO: e.g. "250+" merged PRs from your work account.
  { label: 'PRs merged', value: PLACEHOLDER },
  // TODO: years of professional experience.
  { label: 'Years in prod', value: PLACEHOLDER },
]

export type Mission = {
  id: string
  code: string
  title: string
  kind: string
  summary: string
  highlights: string[]
  impact: string[]
  stack: string[]
  /** Feature counts by type, e.g. { type: 'Workflow automation', count: 12 }. Types only, no business specifics. */
  features: { type: string; count: number | null }[]
}

/** Main quest: Dubizzle Labs. Overviews only. */
export const dubizzle = {
  company: 'Dubizzle Labs',
  // TODO: your start date and current title, e.g. "2024 – Present".
  period: PLACEHOLDER,
  intro:
    'At Dubizzle Labs my main work has been on the internal CRM platforms behind some of the region’s biggest property and classifieds brands, alongside other projects. Because this is proprietary work, what follows are overviews of what I built and why it mattered, not source code.',
  missions: [
    {
      id: 'group-crm',
      code: 'M-01',
      title: 'Group CRM platform',
      kind: 'Platform · Multi-brand',
      summary:
        'An internal CRM originally built in-house and then offloaded to sister brands across the group, including OLX and Bayut, so each business could run its sales operations on one shared, battle-tested system.',
      highlights: [
        'Generalised a single-brand CRM so it could be onboarded by other group companies.',
        'Kept brand-specific behaviour configurable instead of forking the codebase.',
        // TODO: add 1–2 concrete things you personally owned (modules, migrations, integrations).
        PLACEHOLDER,
      ],
      // TODO: add measurable impact, e.g. "Onboarded N teams", "Cut setup time from weeks to days".
      impact: [PLACEHOLDER],
      // TODO: list the real stack.
      stack: [PLACEHOLDER],
      // TODO: replace with your real feature types and counts (null shows "count soon").
      features: [
        { type: PLACEHOLDER, count: null },
        { type: PLACEHOLDER, count: null },
        { type: PLACEHOLDER, count: null },
      ],
    },
    {
      id: 'jarvis',
      code: 'M-02',
      title: 'Jarvis',
      kind: 'Multi-tenant CRM · Zameen projects',
      summary:
        'The CRM that powers all Zameen projects. Jarvis is multi-tenant: every project runs as its own tenant with isolated data, users and configuration, on one platform.',
      highlights: [
        'Multi-tenant architecture: one deployment, many isolated project tenants.',
        'Per-tenant configuration for teams, roles and pipelines.',
        // TODO: what you built in Jarvis (e.g. tenant onboarding, permissions, reporting).
        PLACEHOLDER,
      ],
      impact: [PLACEHOLDER],
      stack: [PLACEHOLDER],
      // TODO: feature types and counts.
      features: [
        { type: PLACEHOLDER, count: null },
        { type: PLACEHOLDER, count: null },
        { type: PLACEHOLDER, count: null },
      ],
    },
    {
      id: 'focus-mode',
      code: 'M-03',
      title: 'Focus Mode',
      kind: 'Product · Built end-to-end',
      summary:
        'I built Focus Mode from the ground up: every major CRM flow brought into a single screen, so agents can work leads, calls, follow-ups and deals without bouncing between pages.',
      highlights: [
        'Unified the core CRM flows into one workspace instead of separate pages.',
        'Designed for staying in context: actions happen in place, the record stays on screen.',
        // TODO: notable technical problems you solved (state sync, performance, real-time updates…).
        PLACEHOLDER,
      ],
      impact: [PLACEHOLDER],
      stack: [PLACEHOLDER],
      // TODO: feature types and counts.
      features: [
        { type: PLACEHOLDER, count: null },
        { type: PLACEHOLDER, count: null },
        { type: PLACEHOLDER, count: null },
      ],
    },
  ] satisfies Mission[],
}

export type Project = {
  title: string
  tag: string
  year: string
  description: string
  media?: { type: 'video' | 'image'; src: string; poster?: string }
  link?: string
}

/** Side quests: personal and university projects. */
export const projects: Project[] = [
  {
    title: 'Draw in VR',
    tag: 'VR · Unity',
    year: '2023',
    description:
      'A system for drawing in virtual reality, built with ClarityTek. Users sketch a prompt in 3D space and the strokes are recorded. Very little documentation existed, so most of it was worked out from first principles.',
    media: { type: 'video', src: '/assets/video/vr-draw.mp4', poster: '/assets/img/vr-draw-poster.jpg' },
  },
  {
    title: 'Zombie Shooter',
    tag: 'Game · Unreal Engine 5',
    year: '2023',
    description:
      'My first Unreal Engine 5 project. Coming from Unity it was a completely different workflow, and this was where I learned the engine’s fundamentals.',
    media: {
      type: 'video',
      src: '/assets/video/zombie-shooter.mp4',
      poster: '/assets/img/zombie-shooter-poster.jpg',
    },
  },
  {
    title: 'Virtual Art Gallery',
    tag: 'VR · Hackathon',
    year: '2022',
    description:
      'Built with the Omnilife VR team at FCCU for Hackathon ’22: a virtual gallery that showcases artwork by fellow students, pitched live to participants and judges.',
    media: { type: 'image', src: '/assets/img/hackathon.jpg' },
  },
  {
    title: 'Emotion recognition in AR',
    tag: 'ML · AR',
    year: '2022',
    description:
      'Represented Team Omnilife at the LUMS hackathon with a facial-recognition based emotion recognition system delivered through augmented reality.',
  },
  {
    title: 'Real-time vision models',
    tag: 'ML · Python',
    year: '2022',
    description:
      'Real-time classification, sentiment analysis and age prediction using TensorFlow, scikit-learn and OpenCV.',
  },
  {
    title: 'Game prototypes',
    tag: 'Games · Unity / Python',
    year: '2021–23',
    description:
      'A VR action shooter shown at a science fest, a retro fighting game, an FPS aim trainer, a snooker prototype and more.',
  },
]

export const skills: { group: string; level: number; items: string[] }[] = [
  // TODO: adjust groups, levels (0–100) and items to match your current stack.
  { group: 'Frontend', level: 88, items: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS'] },
  { group: 'Product engineering', level: 90, items: ['Multi-tenant SaaS', 'Workflow UX', 'Internal tools'] },
  { group: 'Backend', level: 70, items: ['APIs', 'Python', 'C#'] },
  { group: 'Games & XR', level: 75, items: ['Unity', 'Unreal Engine 5', 'VR', 'Spark AR'] },
  { group: 'Machine learning', level: 60, items: ['TensorFlow', 'scikit-learn', 'OpenCV'] },
]

export const timeline: { when: string; what: string; where: string }[] = [
  // TODO: confirm dates.
  { when: PLACEHOLDER, what: 'Software Engineer', where: 'Dubizzle Labs' },
  { when: '2021 – 2025', what: 'BS Computer Science', where: 'Forman Christian College (FCCU)' },
  { when: '2022 – 2023', what: 'Co-Lead Developer', where: 'Omnilife VR Society, FCCU' },
]

export const achievements: { title: string; detail: string }[] = [
  { title: 'Co-Lead Developer shield', detail: 'Omnilife VR Society, FCCU' },
  { title: 'LUMS Uraan Hackathon', detail: '2022 participant' },
  { title: 'Softec', detail: 'Programming competition' },
  { title: 'Future Fest', detail: 'Space-themed VR experience for Ejad Labs' },
]
