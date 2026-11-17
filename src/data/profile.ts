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
  role: 'Associate Software Engineer',
  company: 'Dubizzle Labs',
  location: 'Lahore, Pakistan',
  tagline:
    'Full stack developer who takes products from idea to live. Ruby on Rails and React at work, plus my own DevOps, and years of working straight with clients. I ship fast, clean and reliable.',
  strengths: ['Full stack', 'Ruby on Rails + React', 'DevOps', 'Client-facing'],
  github: 'https://github.com/dptspartan',
  linkedin: 'https://www.linkedin.com/in/shoaib-rashid-5932a51b3',
  email: 'shoaib.lahore90@gmail.com',
  resume: '/resume.pdf',
  avatar: '/assets/img/shoaib.jpg',
  status: 'Full stack at Dubizzle Labs',
}

/** HUD stats in the hero. Use a string value of PLACEHOLDER until you have the real number. */
export const stats: { label: string; value: string; hint?: string }[] = [
  { label: 'PRs merged', value: '251', hint: 'at Dubizzle Labs' },
  { label: 'Commits', value: '670+', hint: 'at Dubizzle Labs' },
  { label: 'Building since', value: '2023', hint: 'CSOLS, ClickSotic, Dubizzle' },
  { label: 'Public repos', value: '33', hint: 'on GitHub' },
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
  period: 'Mar 2026 to now',
  intro:
    'I work full stack on large scale legacy codebases, with Ruby on Rails on the back end and React on the front. My main work is multi-tenant CRMs, plus LMS platforms, merchant portals and customer-facing pages.',
  totals: [
    { label: 'PRs merged', value: '251' },
    { label: 'PRs opened', value: '290' },
    { label: 'Commits', value: '670+' },
    { label: 'Since', value: 'Mar 2026' },
  ],
  stack: ['Ruby on Rails', 'React', 'Redux Toolkit', 'REST APIs', 'Multi-tenancy', 'i18n', 'Feature flags'],
  missions: [
    {
      id: 'group-crm',
      code: 'M-01',
      title: 'Shared CRM',
      kind: 'Used by many brands',
      summary:
        'A CRM first built for one company, then shared with other brands in the group like OLX and Bayut. Sales teams use it to manage customers, deals, contracts and payments.',
      highlights: [
        'Updated contract and payment flows.',
        'Improved lead and customer search by reworking how records are indexed.',
        'Added report views and filters.',
      ],
      impact: [],
      stack: [],
      features: [
        { type: 'Screens', count: null },
        { type: 'Workflows', count: null },
        { type: 'Roles & permissions', count: null },
        { type: 'Search', count: null },
        { type: 'Reporting', count: null },
        { type: 'Refactoring', count: null },
      ],
    },
    {
      id: 'jarvis',
      code: 'M-02',
      title: 'Jarvis',
      kind: 'Multi-tenant CRM',
      summary:
        'The CRM for all Zameen projects. Each project is its own tenant, with its own data, users and settings, but they all run on one platform.',
      highlights: [
        'One system that serves many separate projects.',
        'Each project can set up its own teams, roles and sales stages.',
      ],
      impact: [],
      stack: [],
      features: [
        { type: 'Multi-tenancy', count: null },
        { type: 'Roles & permissions', count: null },
        { type: 'Workflows', count: null },
      ],
    },
    {
      id: 'focus-mode',
      code: 'M-03',
      title: 'Focus Mode',
      kind: 'Built by me, start to finish',
      summary:
        'I built Focus Mode from scratch. It puts every main CRM task on one screen, so sales agents can plan their day and work through leads, calls, follow-ups and deals without jumping between pages.',
      highlights: [
        'All the main CRM tasks in one place.',
        'Task checks that change based on the user role and the state of the task.',
        'Built-in timers to help agents plan and track their work.',
      ],
      impact: [],
      stack: [],
      features: [
        { type: 'Screens', count: null },
        { type: 'Workflows', count: null },
        { type: 'Role-based checks', count: null },
        { type: 'Timers', count: null },
      ],
    },
    {
      id: 'outreach',
      code: 'M-04',
      title: 'Outreach & campaigns',
      kind: 'Sales tools',
      summary: 'Tools that help sales teams plan and schedule messages to customers.',
      highlights: [
        'Scheduled campaign flows.',
        'Personalised message content for each customer.',
        'Campaign details and quick lookups.',
      ],
      impact: [],
      stack: [],
      features: [
        { type: 'Workflows', count: null },
        { type: 'Screens', count: null },
        { type: 'Personalisation', count: null },
      ],
    },
    {
      id: 'property',
      code: 'M-05',
      title: 'Property & listings',
      kind: 'Customer-facing web',
      summary: 'Web pages where people browse property listings, look at investment info and complete seller tasks.',
      highlights: [
        'New investment and listing pages.',
        'Better mobile panels and action buttons.',
        'A preview step for the seller form.',
      ],
      impact: [],
      stack: [],
      features: [
        { type: 'Screens', count: null },
        { type: 'Search & filters', count: null },
        { type: 'Mobile layout', count: null },
      ],
    },
    {
      id: 'finance',
      code: 'M-06',
      title: 'Payments & finance',
      kind: 'Internal workflows',
      summary: 'Flows used by finance teams to review and approve payments.',
      highlights: [
        'Added a finance approval step.',
        'Updated who can pay and when.',
        'Clearer payment confirmation messages.',
      ],
      impact: [],
      stack: [],
      features: [
        { type: 'Workflows', count: null },
        { type: 'Permissions', count: null },
        { type: 'Screens', count: null },
      ],
    },
  ] satisfies Mission[],
}

export type Gig = {
  client: string
  role: string
  about: string
  points: string[]
  stack: string[]
}

/** Before Dubizzle: my own studio, ClickSotic, plus the CSOLS IT role. */
export const studio = {
  name: 'ClickSotic',
  role: 'Founder and software developer',
  period: 'Mar 2024 to Mar 2026',
  about:
    'I started and ran my own software studio. I worked directly with clients abroad, turned their ideas into plans, designed the systems, led a small team, and handled deployment and hosting end to end.',
}

export const freelance: Gig[] = [
  {
    client: 'DripSaint',
    role: 'AI t-shirt store · via ClickSotic',
    about:
      'An AI powered clothing store. Shoppers type a prompt, the site creates an image with Midjourney, shows it on a t-shirt preview, and they can order it right away.',
    points: [
      'Prompt to image to t-shirt preview to order, all in one flow.',
      'Background workers (Celery) handle the image requests so the site stays fast.',
      'Live t-shirt mockups made with OpenCV.',
    ],
    stack: ['React', 'Redux', 'Django REST', 'Celery', 'Midjourney', 'OpenCV', 'AWS S3', 'Heroku'],
  },
  {
    client: 'CSOLS',
    role: 'Learning platform · Head of IT, Jul 2023 to Mar 2025',
    about:
      'Caroline School of Legal Studies. As Head of IT I advised the board, ran their web setup and security, and built their custom learning management system (LMS).',
    points: [
      'LMS for courses, student tracking and grading, with automatic grading.',
      'Role-based access and secure JWT login.',
      'Kept the school systems safe: SSL, firewall and automatic database backups.',
    ],
    stack: ['React', 'Django REST', 'PostgreSQL', 'JWT', 'RBAC'],
  },
  {
    client: 'AR Scavenger Hunt',
    role: 'Mobile AR game · via ClickSotic',
    about: 'A mobile scavenger hunt in augmented reality, made for university events.',
    points: ['Tracks the real world so clues sit in real places.', 'Virtual objects hide behind real ones (occlusion).'],
    stack: ['Unity', 'C#', 'ARCore'],
  },
]

export type Build = {
  title: string
  kind: string
  year: string
  about: string
  points: string[]
  stack: string[]
  repo?: string
  live?: string
}

const gh = (r: string) => `https://github.com/dptspartan/${r}`

/** Bigger personal builds. Harmony is a private repo, so it has no code link. */
export const builds: Build[] = [
  {
    title: 'Us.exe',
    kind: 'Couples app · web + mobile',
    year: '2026',
    about:
      'A private shared space for couples. Notes, a photo wall, shared to-dos, moods, love letters and little "sparks" that ping your partner.',
    points: [
      'Messages are end-to-end encrypted on the phone before they are saved.',
      'Push notifications when your partner sends a spark or a sticky note.',
      'Three parts: a React web app, an Expo mobile app and a Supabase backend with row-level security.',
    ],
    stack: ['React Native', 'Expo', 'React', 'Supabase', 'Edge Functions', 'PostgreSQL'],
    repo: gh('us-exe-mobile'),
  },
  {
    title: 'Harmony',
    kind: 'Self-hosted AI assistant',
    year: '2026',
    about:
      'My own AI assistant that runs on my own server, not in the cloud. You chat with it like a person, it remembers what matters, and it uses tools to get real things done.',
    points: [
      'Runs a local model (Qwen 3) through Ollama, so my data stays with me.',
      'Long-term memory in Postgres, rebuilt into a fresh context before every reply.',
      'An agent loop with a searchable tool registry. Every tool has a risk level, and only safe ones run without my approval.',
      'A coding sandbox where it can build a small website and hand back the link.',
    ],
    stack: ['Python', 'FastAPI', 'Ollama', 'Qwen 3', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'DLC Gaming Club',
    kind: 'Live tournament app',
    year: '2026',
    about:
      'An app to run gaming tournaments live. Players and fans see brackets and schedules, a big screen shows matches as they happen, and admins run everything from web or phone.',
    points: [
      'Makes the whole bracket for you, and fits matches into gaming stations and time slots.',
      'Updates live for everyone watching, with no refresh.',
      'Web app and mobile app share one core package, so the logic is written once.',
    ],
    stack: ['React', 'TypeScript', 'Expo', 'Supabase Realtime', 'PostgreSQL', 'Tailwind'],
    repo: gh('dlc-gaming-app'),
  },
  {
    title: 'Smart Notes',
    kind: 'AI notes app',
    year: '2025',
    about:
      'A notes app that does the boring work for you. It can summarise notes, tag them, turn them into flashcards, and read text from images and PDFs.',
    points: [
      'Uses a large language model (LLaMA 3.3 70B) through OpenRouter.',
      'Still works without AI: falls back to simple rules if no key is set.',
      'Full stack: React and Material UI on the front, Flask on the back.',
    ],
    stack: ['React', 'TypeScript', 'Flask', 'Python', 'LLaMA', 'OCR'],
    repo: gh('smart-note-org'),
    live: 'https://smart-note-org.vercel.app',
  },
  {
    title: 'AI Nexus',
    kind: 'Deep learning',
    year: '2025',
    about:
      'A spell recognition model. I collected my own data, grew it with data augmentation, and trained a CNN + LSTM network to recognise spells.',
    points: [
      'Own data collection and augmentation scripts.',
      'CNN + LSTM model built with Keras.',
      'A small app that runs the model live.',
    ],
    stack: ['Python', 'Keras', 'TensorFlow', 'CNN', 'LSTM'],
    repo: gh('AI-Nexus'),
  },
  {
    title: 'HiveMind',
    kind: 'Social media app',
    year: '2024',
    about: 'A small social media site with posts and users, built as a full stack app.',
    points: ['React front end.', 'Django REST Framework API on the back end.'],
    stack: ['React', 'Django', 'Django REST', 'Python'],
    repo: gh('HiveMind-Root'),
  },
]

export type Project = {
  title: string
  tag: string
  year: string
  description: string
  media?: { type: 'video' | 'image'; src: string; poster?: string }
  link?: string
}

/** Earlier work: VR, games and ML from university. */
export const projects: Project[] = [
  {
    title: 'Draw in VR',
    tag: 'VR · Unity',
    year: '2023',
    description:
      'A way to draw in virtual reality, built for ClarityTek. Users draw in 3D space and the drawing is recorded. There were almost no docs, so I worked most of it out myself.',
    media: { type: 'video', src: '/assets/video/vr-draw.mp4', poster: '/assets/img/vr-draw-poster.jpg' },
  },
  {
    title: 'Zombie Shooter',
    tag: 'Game · Unreal Engine 5',
    year: '2023',
    description:
      'My first Unreal Engine 5 game. I came from Unity, so this is where I learned how Unreal works.',
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
      'A VR gallery to show art made by students. Built with the Omnilife VR team at FCCU for Hackathon 22, and pitched live to the judges.',
    media: { type: 'image', src: '/assets/img/hackathon.jpg' },
  },
  {
    title: 'Emotion recognition in AR',
    tag: 'ML · AR',
    year: '2022',
    description:
      'Built at the LUMS hackathon for Team Omnilife. It reads emotions from your face and shows them in augmented reality.',
  },
  {
    title: 'Real-time vision models',
    tag: 'ML · Python',
    year: '2022',
    description:
      'Models that run live on a camera feed to classify objects, read sentiment and guess age. Built with TensorFlow, scikit-learn and OpenCV.',
  },
  {
    title: 'Game prototypes',
    tag: 'Games · Unity / Python',
    year: '2021-23',
    description:
      'A VR shooter shown at a science fest, a retro fighting game, an aim trainer, a snooker game and more.',
  },
]

export const skills: { group: string; level: number; items: string[] }[] = [
  { group: 'Frontend', level: 90, items: ['React', 'Redux Toolkit', 'Next.js', 'TypeScript', 'Tailwind', 'Ant Design'] },
  { group: 'Backend & data', level: 88, items: ['Ruby on Rails', 'Django REST', 'PostgreSQL', 'Supabase', 'Celery'] },
  { group: 'DevOps & cloud', level: 78, items: ['Docker', 'GitHub Actions', 'Heroku', 'AWS S3', 'Vercel', 'Linux'] },
  { group: 'Mobile', level: 78, items: ['React Native', 'Expo'] },
  { group: 'Client work', level: 85, items: ['Requirements', 'Planning', 'Team lead', 'Delivery'] },
  { group: 'Games & XR', level: 72, items: ['Unity', 'Unreal Engine', 'ARCore', 'VR'] },
  { group: 'AI & ML', level: 65, items: ['Keras', 'TensorFlow', 'LLMs', 'OpenCV'] },
]

export const timeline: { when: string; what: string; where: string }[] = [
  { when: 'Mar 2026 to now', what: 'Associate Software Engineer', where: 'Dubizzle Labs' },
  { when: 'Mar 2024 to Mar 2026', what: 'Founder and developer', where: 'ClickSotic' },
  { when: 'Jul 2023 to Mar 2025', what: 'Head of IT', where: 'CSOLS (Caroline School of Legal Studies)' },
  { when: 'Aug 2021 to Dec 2025', what: 'BS Computer Science', where: 'Forman Christian College (FCCU)' },
  { when: '2022 to 2023', what: 'Co-Lead Developer', where: 'Omnilife VR Society, FCCU' },
]

export const achievements: { title: string; detail: string }[] = [
  { title: 'High Achievers Award', detail: 'FCCU, 2024/25' },
  { title: '1st place, GDSC contest', detail: 'GDSC FCCU programming contest' },
  { title: 'Teaching Assistant', detail: 'OOP and Software Design, FCCU' },
  { title: 'Shield of Appreciation', detail: 'Omnilife FCCU' },
]
