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
    'I build apps people use every day. I like taking something complicated and making it feel simple.',
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
  { label: 'Public repos', value: '33', hint: 'on github.com/dptspartan' },
  { label: 'Brands served', value: 'OLX · Bayut · Zameen', hint: 'through my work at Dubizzle Labs' },
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
  // TODO: your start date, e.g. "2024 to now".
  period: PLACEHOLDER,
  intro:
    'Most of my work at Dubizzle Labs has been on the CRM systems used by big property and classifieds brands, along with other projects. This work is private, so below are simple overviews of what I built. No code.',
  missions: [
    {
      id: 'group-crm',
      code: 'M-01',
      title: 'Shared CRM',
      kind: 'Used by many brands',
      summary:
        'A CRM first built for one company, then shared with other brands in the group like OLX and Bayut. Each brand now runs its sales team on the same system.',
      highlights: [
        'Made a single-brand CRM ready for other companies to use.',
        'Kept brand differences in settings, so there is still one codebase.',
        // TODO: 1 or 2 things you personally owned.
        PLACEHOLDER,
      ],
      // TODO: measurable impact.
      impact: [PLACEHOLDER],
      // TODO: real stack.
      stack: [PLACEHOLDER],
      // TODO: feature types and counts (null shows "count soon").
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
      kind: 'Multi-tenant CRM',
      summary:
        'The CRM for all Zameen projects. Each project is its own tenant, with its own data, users and settings, but they all run on one platform.',
      highlights: [
        'One system that serves many separate projects.',
        'Each project can set up its own teams, roles and sales stages.',
        // TODO: what you built in Jarvis.
        PLACEHOLDER,
      ],
      impact: [PLACEHOLDER],
      stack: [PLACEHOLDER],
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
      kind: 'Built by me, start to finish',
      summary:
        'I built Focus Mode from scratch. It puts every main CRM task on one screen, so agents can handle leads, calls, follow-ups and deals without jumping between pages.',
      highlights: [
        'All the main CRM tasks in one place.',
        'Actions happen right there, so the user never loses their place.',
        // TODO: hard technical problems you solved.
        PLACEHOLDER,
      ],
      impact: [PLACEHOLDER],
      stack: [PLACEHOLDER],
      features: [
        { type: PLACEHOLDER, count: null },
        { type: PLACEHOLDER, count: null },
        { type: PLACEHOLDER, count: null },
      ],
    },
  ] satisfies Mission[],
}

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

/** Bigger personal builds, from public repos. */
export const builds: Build[] = [
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
  // TODO: adjust groups, levels (0 to 100) and items to match your current stack.
  { group: 'Frontend', level: 90, items: ['React', 'TypeScript', 'Tailwind', 'Material UI'] },
  { group: 'Mobile', level: 78, items: ['React Native', 'Expo'] },
  { group: 'Backend & data', level: 78, items: ['Supabase', 'PostgreSQL', 'Django', 'Flask', 'Python'] },
  { group: 'Product engineering', level: 88, items: ['Multi-tenant apps', 'Realtime', 'Internal tools'] },
  { group: 'Games & XR', level: 72, items: ['Unity', 'Unreal Engine 5', 'VR', 'Spark AR'] },
  { group: 'AI & ML', level: 65, items: ['Keras', 'TensorFlow', 'LLMs', 'OpenCV'] },
]

export const timeline: { when: string; what: string; where: string }[] = [
  // TODO: confirm dates.
  { when: PLACEHOLDER, what: 'Software Engineer', where: 'Dubizzle Labs' },
  { when: '2021 to 2025', what: 'BS Computer Science', where: 'Forman Christian College (FCCU)' },
  { when: '2022 to 2023', what: 'Co-Lead Developer', where: 'Omnilife VR Society, FCCU' },
]

export const achievements: { title: string; detail: string }[] = [
  { title: 'Co-Lead Developer shield', detail: 'Omnilife VR Society, FCCU' },
  { title: 'LUMS Uraan Hackathon', detail: '2022 participant' },
  { title: 'Softec', detail: 'Programming competition' },
  { title: 'Future Fest', detail: 'Space themed VR demo for Ejad Labs' },
]
