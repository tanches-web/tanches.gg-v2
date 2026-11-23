export const SITE = {
  name: 'TANCHES.GG',
  url: 'https://tanches.gg',
  address: { street: '10804 Roark Road', city: 'Houston', region: 'TX', zip: '77099' },
  addressHref: 'https://maps.google.com/?q=10804+Roark+Road+Houston+TX+77099',
  phone: '(281) 826-2437',
  phoneHref: 'tel:+12818262437',
  email: 'contact@tanches.gg',
  social: {
    linkedin: 'https://www.linkedin.com/showcase/tanches-gg/',
    instagram: 'https://www.instagram.com/tanches.gg/',
  },
  memberLogin: 'https://tel.rally.gg',
  contracts: ['DIR', 'OMNIA Partners', 'NCPA', 'GSA', 'E-Rate SPIN 143052684'],
  legal: '© 2026 TanChes Global Management, Inc. TANCHES.GG is the esports vertical of TanChes Global. All rights reserved.',
  themeKey: 'tg-theme-v2',
};

export type NavLink = { label: string; href: string; note?: string };
export type NavItem = { label: string; href?: string; children?: NavLink[]; live?: boolean };

export const NAV: NavItem[] = [
  {
    label: 'About',
    children: [
      { label: 'Story', href: '/About', note: '28 years of enterprise IT, now esports' },
      { label: 'Team', href: '/Team', note: 'The people behind TANCHES.GG' },
      { label: 'Brand Center', href: '/brand', note: 'Logos, colors, and the story of our mark' },
    ],
  },
  {
    label: 'Solutions',
    children: [
      { label: 'Education', href: '/Education', note: 'K-12, colleges, universities' },
      { label: 'Community', href: '/Community', note: 'Nonprofits, government, community centers' },
      { label: 'Commercial', href: '/Commercial', note: 'LAN centers, hotels, casinos, healthcare' },
    ],
  },
  {
    label: 'Services',
    children: [
      { label: 'Technology & Architecture', href: '/Technology', note: 'Enterprise infrastructure on every build' },
      { label: 'Procurement & Funding', href: '/Procurement', note: 'Contracts, grants, leasing & HaaS' },
    ],
  },
  { label: 'Projects', href: '/Projects' },
  { label: 'Contact', href: '/Contact' },
  { label: 'Esports League', href: '/League', live: true },
];

export const FOOTER = [
  { title: 'About', links: [{ label: 'Story', href: '/About' }, { label: 'Team', href: '/Team' }, { label: 'Brand Center', href: '/brand' }] },
  { title: 'Solutions', links: [{ label: 'Education', href: '/Education' }, { label: 'Community', href: '/Community' }, { label: 'Commercial', href: '/Commercial' }] },
  { title: 'Services', links: [{ label: 'Technology & Architecture', href: '/Technology' }, { label: 'Procurement & Funding', href: '/Procurement' }, { label: 'Readiness Assessment', href: '/Assessment' }] },
  { title: 'Explore', links: [{ label: 'Home', href: '/' }, { label: 'Projects', href: '/Projects' }, { label: 'Esports League', href: '/League' }, { label: 'Contact', href: '/Contact' }] },
];
