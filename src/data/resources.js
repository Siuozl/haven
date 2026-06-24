// Real, reputable mental health resources. Phone/text lines are US-focused
// with an International section for everyone else. Haven is not affiliated with
// any of these organizations — these are links to help, not a replacement for it.

export const crisisLines = [
  {
    name: '988 Suicide & Crisis Lifeline',
    blurb:
      'Free, confidential support 24/7 for anyone in distress — not just thoughts of suicide. Call or text any time.',
    contact: 'Call or text 988',
    href: 'https://988lifeline.org',
    region: 'US',
  },
  {
    name: 'Crisis Text Line',
    blurb:
      'Text with a trained crisis counselor 24/7. Great if talking on the phone feels like too much.',
    contact: 'Text HOME to 741741',
    href: 'https://www.crisistextline.org',
    region: 'US',
  },
  {
    name: 'The Trevor Project',
    blurb:
      'Crisis support specifically for LGBTQ+ young people, by phone, text, or chat, 24/7.',
    contact: 'Call 1-866-488-7386 · Text START to 678-678',
    href: 'https://www.thetrevorproject.org/get-help',
    region: 'US',
  },
  {
    name: 'Trans Lifeline',
    blurb:
      'A peer-support hotline run by and for trans people. They will never call emergency services without your consent.',
    contact: 'Call 1-877-565-8860',
    href: 'https://translifeline.org',
    region: 'US',
  },
]

export const categories = [
  {
    id: 'talk-now',
    title: 'Talk to someone now',
    description: 'Free helplines and chat services with real, trained people.',
    icon: 'chat',
    items: [
      {
        name: 'Teen Line',
        blurb: 'Teens helping teens. Talk to a trained teen listener about anything on your mind.',
        contact: 'Text TEEN to 839863 · Call 1-800-852-8336',
        href: 'https://www.teenline.org',
      },
      {
        name: 'SAMHSA National Helpline',
        blurb:
          'Free, confidential 24/7 referral service for mental health and substance use — they point you to local help.',
        contact: 'Call 1-800-662-4357',
        href: 'https://www.samhsa.gov/find-help/national-helpline',
      },
      {
        name: 'NAMI HelpLine',
        blurb:
          'Information, resources, and support for you or someone you care about. Not a crisis line, but very helpful.',
        contact: 'Call 1-800-950-6264 · Text "HelpLine" to 62640',
        href: 'https://www.nami.org/help',
      },
      {
        name: '7 Cups',
        blurb: 'Free, anonymous emotional support from trained volunteer listeners, online any time.',
        contact: 'Online chat',
        href: 'https://www.7cups.com',
      },
    ],
  },
  {
    id: 'learn',
    title: 'Learn & understand',
    description: 'Trustworthy places to understand what you’re feeling and what helps.',
    icon: 'book',
    items: [
      {
        name: 'The Jed Foundation (JED)',
        blurb: 'Mental health support built for teens and young adults, including a guided "Mental Health Resource Center".',
        contact: 'Articles & tools',
        href: 'https://jedfoundation.org',
      },
      {
        name: 'Child Mind Institute',
        blurb: 'Clear, science-backed guides on anxiety, depression, ADHD, and more — written for young people and families.',
        contact: 'Articles & guides',
        href: 'https://childmind.org',
      },
      {
        name: 'Mind (UK)',
        blurb: 'Easy-to-read explainers on mental health conditions, treatments, and your rights.',
        contact: 'Information hub',
        href: 'https://www.mind.org.uk/information-support/',
      },
      {
        name: 'NHS — Every Mind Matters',
        blurb: 'Practical, free self-help tips and a short quiz that builds a personal "mind plan".',
        contact: 'Self-help tools',
        href: 'https://www.nhs.uk/every-mind-matters/',
      },
    ],
  },
  {
    id: 'specific',
    title: 'For specific struggles',
    description: 'Focused support for the things that don’t have a one-size-fits-all answer.',
    icon: 'heart',
    items: [
      {
        name: 'Childhelp National Child Abuse Hotline',
        blurb: 'If you’re being hurt or don’t feel safe at home, you can talk to someone 24/7, confidentially.',
        contact: 'Call or text 1-800-422-4453',
        href: 'https://www.childhelphotline.org',
      },
      {
        name: 'National Eating Disorders Association (NEDA)',
        blurb: 'Information, screening tools, and support options for eating and body-image struggles.',
        contact: 'Resources & screening',
        href: 'https://www.nationaleatingdisorders.org',
      },
      {
        name: 'RAINN',
        blurb: 'Confidential support for survivors of sexual assault or abuse, 24/7 by phone or online chat.',
        contact: 'Call 1-800-656-4673',
        href: 'https://www.rainn.org',
      },
      {
        name: 'The Dougy Center',
        blurb: 'Support and resources for children and teens who are grieving the death of someone they love.',
        contact: 'Grief support',
        href: 'https://www.dougy.org',
      },
    ],
  },
  {
    id: 'tools',
    title: 'Apps & everyday tools',
    description: 'Free or low-cost tools for calming down, sleeping, and checking in with yourself.',
    icon: 'sparkle',
    items: [
      {
        name: 'Calm Harm',
        blurb: 'A free app with quick activities to help ride out the urge to self-harm.',
        contact: 'Free app',
        href: 'https://calmharm.stem4.org.uk',
      },
      {
        name: 'Insight Timer',
        blurb: 'Thousands of free guided meditations, sleep sounds, and breathing exercises.',
        contact: 'Free app',
        href: 'https://insighttimer.com',
      },
      {
        name: 'NotOK App',
        blurb: 'A digital panic button that lets your chosen contacts know you need support, fast.',
        contact: 'Free app',
        href: 'https://www.notokapp.com',
      },
      {
        name: 'Smiling Mind',
        blurb: 'Free mindfulness programs designed with young people and schools in mind.',
        contact: 'Free app',
        href: 'https://www.smilingmind.com.au',
      },
    ],
  },
]

export const international = [
  {
    name: 'Befrienders Worldwide',
    blurb: 'Find a crisis helpline in almost any country.',
    href: 'https://www.befrienders.org',
  },
  {
    name: 'Samaritans (UK & Ireland)',
    blurb: 'Call 116 123, free, 24/7.',
    href: 'https://www.samaritans.org',
  },
  {
    name: 'Kids Help Phone (Canada)',
    blurb: 'Call 1-800-668-6868 or text CONNECT to 686868.',
    href: 'https://kidshelpphone.ca',
  },
  {
    name: 'Lifeline (Australia)',
    blurb: 'Call 13 11 14, 24/7 crisis support.',
    href: 'https://www.lifeline.org.au',
  },
  {
    name: 'Find A Helpline',
    blurb: 'Search free, confidential helplines by country and topic.',
    href: 'https://findahelpline.com',
  },
]
