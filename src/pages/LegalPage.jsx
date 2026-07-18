import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { contentData } from '../utils/contentManager';

const pages = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'July 2026',
    sections: [
      {
        heading: 'Overview',
        body: 'This Privacy Policy describes how Himank Arora ("I", "me", or "my") collects, uses, and protects information when you visit himankarora.com and related portfolio pages.',
      },
      {
        heading: 'Information I Collect',
        body: 'I may collect information you voluntarily submit through the contact form (such as name, email, and message content). The site may also use analytics tools that collect standard usage data such as pages viewed, approximate location, device type, and referral source.',
      },
      {
        heading: 'How Information Is Used',
        body: 'Contact form submissions are used only to respond to your inquiry. Analytics data is used to understand site performance and improve the portfolio experience. I do not sell your personal information.',
      },
      {
        heading: 'Cookies and Analytics',
        body: 'This site may use cookies or similar technologies through Google Analytics or equivalent services. You can control cookies through your browser settings.',
      },
      {
        heading: 'Third-Party Links',
        body: 'The portfolio may link to third-party sites such as GitHub, LinkedIn, or project demos. Their privacy practices are governed by their own policies.',
      },
      {
        heading: 'Contact',
        body: `For privacy questions, email ${contentData.personal.email}.`,
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'July 2026',
    sections: [
      {
        heading: 'Agreement',
        body: 'By using himankarora.com, you agree to these Terms of Service. If you do not agree, please do not use the site.',
      },
      {
        heading: 'Portfolio Content',
        body: 'All content on this site including text, design, code samples, project descriptions, and media is owned by Himank Arora unless otherwise noted. You may view and share links for personal or professional evaluation. Reproduction, redistribution, or commercial reuse without permission is not allowed.',
      },
      {
        heading: 'No Professional Advice',
        body: 'Content on this site is for informational and portfolio purposes only and does not constitute professional, legal, or technical advice.',
      },
      {
        heading: 'External Links',
        body: 'Links to third-party websites or demos are provided for convenience. I am not responsible for the content or practices of those sites.',
      },
      {
        heading: 'Disclaimer',
        body: 'The site is provided "as is" without warranties of any kind. I am not liable for damages arising from use of the site to the fullest extent permitted by law.',
      },
      {
        heading: 'Contact',
        body: `Questions about these terms can be sent to ${contentData.personal.email}.`,
      },
    ],
  },
};

const sitemapGroups = [
  {
    title: 'Main',
    links: [
      { to: '/', label: 'Portfolio Hub' },
      { to: '/tech', label: 'Tech Portfolio' },
      { to: '/artist', label: 'Artist Portfolio' },
    ],
  },
  {
    title: 'Tech Sections',
    links: [
      { to: '/tech#hero', label: 'Home' },
      { to: '/tech#about', label: 'About' },
      { to: '/tech#experience', label: 'Experience' },
      { to: '/tech#projects', label: 'Projects' },
      { to: '/tech#skills', label: 'Skills' },
      { to: '/tech#certificates', label: 'Certificates' },
      { to: '/tech#contact', label: 'Contact' },
    ],
  },
  {
    title: 'Artist',
    links: [
      { to: '/artist', label: 'Artist Home' },
      { to: '/artist/about', label: 'About' },
      { to: '/artist/work', label: 'Work' },
      { to: '/artist/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms of Service' },
      { to: '/sitemap', label: 'Sitemap' },
    ],
  },
];

const LegalPage = () => {
  const { pathname } = useLocation();
  const page = pathname.replace(/^\//, '');
  const personalInfo = contentData.personal;

  if (page === 'sitemap') {
    return (
      <div className="min-h-screen tech-grid-bg text-white">
        <SEO title="Sitemap | Himank Arora" description="Sitemap for Himank Arora portfolio." />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <Link to="/tech" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
            Back to Tech Portfolio
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold mt-6 mb-2">Sitemap</h1>
          <p className="text-gray-400 text-sm mb-10">All primary pages and sections on this site.</p>
          <div className="space-y-8">
            {sitemapGroups.map((group) => (
              <div key={group.title}>
                <h2 className="font-display text-xs uppercase tracking-[0.16em] text-gray-500 mb-3">
                  {group.title}
                </h2>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="text-gray-300 hover:text-cyan-300 transition-colors text-sm sm:text-base">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-xs mt-12">© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        </div>
      </div>
    );
  }

  const doc = pages[page];
  if (!doc) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen tech-grid-bg text-white">
      <SEO title={`${doc.title} | Himank Arora`} description={`${doc.title} for Himank Arora portfolio.`} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <Link to="/tech" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
          Back to Tech Portfolio
        </Link>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold mt-6 mb-2">{doc.title}</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: {doc.updated}</p>
        <div className="space-y-8">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-lg font-semibold text-white mb-2">{section.heading}</h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>
        <p className="text-gray-600 text-xs mt-12">© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LegalPage;
