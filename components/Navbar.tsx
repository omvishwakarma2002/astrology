'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { t } from '@/lib/translations';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLanguage } = useLanguage();

  const navLinks = [
    { href: '/',               label: t('nav.home', lang),          icon: '✦' },
    { href: '/birth-chart',    label: t('nav.birthChart', lang),    icon: '⊕' },
    { href: '/horoscope',      label: t('nav.horoscope', lang),     icon: '☽' },
    { href: '/compatibility',  label: t('nav.compatibility', lang), icon: '♾' },
    { href: '/planets',        label: t('nav.planets', lang),       icon: '⟡' },
    { href: '/predictions',    label: t('nav.future', lang),        icon: '🔮' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">
          <span className="brand-star">✦</span>
          <span className="brand-text">{t('nav.brand', lang)}</span>
        </Link>

        {/* Desktop links */}
        <div className="nav-links-desktop">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? 'nav-link-active' : ''}`}
            >
              <span className="nav-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Language toggle + hamburger */}
        <div className="nav-right">
          <button
            className="lang-toggle"
            onClick={toggleLanguage}
            aria-label="Toggle language"
          >
            {lang === 'en' ? 'हिं' : 'EN'}
          </button>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`mobile-nav-link ${pathname === link.href ? 'nav-link-active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(15, 12, 41, 0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }
        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          font-family: 'Cinzel', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #d4af37;
          letter-spacing: 0.05em;
        }
        .brand-star {
          font-size: 1.2rem;
          animation: twinkle 2s infinite;
        }
        .brand-text {
          background: linear-gradient(135deg, #d4af37, #f5e17a, #d4af37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nav-links-desktop {
          display: none;
          gap: 0.25rem;
        }
        @media (min-width: 768px) {
          .nav-links-desktop { display: flex; }
        }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .lang-toggle {
          border: 1px solid rgba(212, 175, 55, 0.6);
          border-radius: 20px;
          background: rgba(212, 175, 55, 0.08);
          color: #d4af37;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 0.3rem 0.65rem;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .lang-toggle:hover {
          background: rgba(212, 175, 55, 0.18);
          border-color: #d4af37;
        }
        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        @media (min-width: 768px) {
          .hamburger { display: none; }
        }
        .hamburger-line {
          display: block;
          width: 22px;
          height: 2px;
          background: #d4af37;
          border-radius: 2px;
          transition: all 0.3s;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          text-decoration: none;
          color: rgba(255,255,255,0.7);
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          transition: all 0.2s;
        }
        .nav-link:hover {
          color: #d4af37;
          background: rgba(212, 175, 55, 0.08);
        }
        .nav-link-active {
          color: #d4af37 !important;
          background: rgba(212, 175, 55, 0.12) !important;
        }
        .nav-icon {
          font-size: 0.9rem;
        }
        .mobile-menu {
          display: flex;
          flex-direction: column;
          padding: 0.5rem 1.5rem 1rem;
          background: rgba(15, 12, 41, 0.95);
          border-top: 1px solid rgba(212, 175, 55, 0.1);
        }
        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 0;
          text-decoration: none;
          color: rgba(255,255,255,0.7);
          font-size: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: #d4af37; }
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.9); }
        }
      `}</style>
    </nav>
  );
}
