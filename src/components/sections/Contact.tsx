'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE_CINEMA = [0.22, 1, 0.36, 1] as const;

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" ref={ref} aria-label="Contact">
      {/* Contact band — white with dot pattern, Digitalists teaser-contact */}
      <div
        className="bg-pattern"
        style={{
          backgroundColor: '#fff',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          paddingTop: 'clamp(5rem, 12vh, 9rem)',
          paddingBottom: 'clamp(5rem, 12vh, 9rem)',
        }}
      >
        <div className="container-main">
          <div className="flex items-center gap-4 mb-12">
            <div className="text-eyebrow">Contact</div>
            <div style={{ height: '1px', flex: 1, maxWidth: '80px', backgroundColor: 'var(--color-accent)' }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE_CINEMA }}
            >
              <h2
                className="text-heading mb-8"
                style={{ color: 'var(--text-primary)' }}
              >
                Let&apos;s build
                <br />
                something{' '}
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'var(--color-accent)',
                    padding: '0 0.25rem',
                    lineHeight: 1,
                  }}
                >
                  intelligent.
                </span>
              </h2>

              <p className="text-body mb-8" style={{ maxWidth: '400px' }}>
                Whether you&apos;re building autonomous systems, optimizing ML pipelines, or exploring
                the frontiers of reinforcement learning — I&apos;m interested in collaborating on
                projects that push boundaries.
              </p>

              {/* Availability */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '2rem' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#2FB65D', flexShrink: 0 }} />
                <span className="text-eyebrow">Available for new opportunities</span>
              </div>

              {/* Social */}
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'GitHub', href: 'https://github.com' },
                  { label: 'LinkedIn', href: 'https://linkedin.com' },
                  { label: 'Email', href: 'mailto:ayan@example.com' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      borderBottom: '1px solid var(--border-mid)',
                      paddingBottom: '2px',
                      transition: 'border-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-mid)')}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE_CINEMA }}
            >
              {submitted ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '280px', textAlign: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '2.5rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Thank you.</div>
                    <p className="text-body">I&apos;ll be in touch shortly.</p>
                  </div>
                </div>
              ) : (
                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="form-label" htmlFor="contact-name">Name</label>
                      <input id="contact-name" type="text" className="form-input" placeholder="Your name" required />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="contact-email">Email</label>
                      <input id="contact-email" type="email" className="form-input" placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="contact-message">Message</label>
                    <textarea id="contact-message" rows={5} className="form-input" style={{ resize: 'none' }} placeholder="Tell me about your project..." required />
                  </div>
                  <button type="submit" className="btn-primary">
                    Send message
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer — dark, Digitalists style */}
      <footer
        className="bg-pattern-light"
        style={{ backgroundColor: '#212121' }}
      >
        <div
          className="container-main"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: 'rgba(240,240,240,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            © 2025 Ayan Tiwari
          </span>
          {/* Pixel art signature — Digitalists footer bottom */}
          <svg xmlns="http://www.w3.org/2000/svg" width="106" height="14" fill="none" viewBox="0 0 106 14" style={{ opacity: 0.3 }}>
            <path d="M0 0h2v2H0zm0 4h2v2H0zm0 4h2v2H0zm0 4h2v2H0zM4 0h2v2H4zm0 4h2v2H4zm0 4h2v2H4zm0 4h2v2H4zM28 0h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zM32 0h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zM45 0h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zM49 0h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zM53 0h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zM57 0h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zM85 0h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zM104 0h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z" fill="white"/>
          </svg>
          <span style={{ fontSize: '0.75rem', color: 'rgba(240,240,240,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            AI/ML Engineer
          </span>
        </div>
      </footer>
    </section>
  );
}
