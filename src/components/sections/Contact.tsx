'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextReveal } from '@/components/ui/TextReveal';
import { MagneticElement } from '@/components/ui/MagneticElement';
import { fadeUp, staggerContainer } from '@/lib/motion';

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      id="contact"
      ref={ref}
      className="section-spacing relative"
      aria-label="Contact section"
    >
      <div className="container-main">
        <SectionLabel prefix="08" label="ESTABLISH_SESSION" />

        <div className="mb-20">
          <TextReveal
            text="Let's Build Something Intelligent"
            className="text-display max-w-4xl"
            tag="h2"
            delay={0.3}
            splitBy="word"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_5fr] gap-14 lg:gap-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.p
              variants={fadeUp}
              className="text-body mb-10 max-w-md"
              style={{ color: 'hsl(55, 13%, 66%)' }}
            >
              Whether you&apos;re building autonomous systems, optimizing ML pipelines, 
              or exploring the frontiers of reinforcement learning — I&apos;m always interested 
              in collaborating on projects that push the boundaries of what&apos;s possible.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              {[
                { label: 'GITHUB', href: 'https://github.com' },
                { label: 'LINKEDIN', href: 'https://linkedin.com' },
                { label: 'TWITTER', href: 'https://twitter.com' },
                { label: 'EMAIL', href: 'mailto:ayan@example.com' },
              ].map((social) => (
                <MagneticElement key={social.label} strength={0.3}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-0 py-2 text-mono-label transition-colors duration-300"
                    style={{
                      fontSize: '10px',
                      color: 'hsl(55, 13%, 60%)',
                    }}
                    data-cursor="OPEN"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'hsl(56, 92%, 62%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'hsl(55, 13%, 60%)';
                    }}
                  >
                    [{social.label}]
                  </a>
                </MagneticElement>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'hsl(56, 92%, 62%)', opacity: 0.8 }} />
              <span className="text-mono-label" style={{ color: 'hsl(55, 13%, 50%)', fontSize: '10px' }}>
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </motion.div>
          </motion.div>

          <SimpleForm />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 pb-8">
        <div className="divider-dotted w-full mb-8" />
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <span className="text-mono-label" style={{ color: 'hsl(55, 13%, 35%)', fontSize: '9px' }}>
              © 2025 AYAN TIWARI
            </span>
            <span className="text-mono-label text-center" style={{ color: 'hsl(55, 13%, 25%)', fontSize: '9px' }}>
              SYSTEM: STABLE // LATENT OPERATOR v3.0
            </span>
            <div className="flex gap-4 md:justify-end">
              {['GITHUB', 'LINKEDIN', 'TWITTER'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-mono-label transition-colors duration-300"
                  style={{ color: 'hsl(55, 13%, 35%)', fontSize: '9px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'hsl(56, 92%, 62%)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'hsl(55, 13%, 35%)')}
                >
                  [{link}]
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

// Simple Form
function SimpleForm() {
  return (
    <div>
      <div className="text-mono-label mb-6" style={{ color: 'hsl(56, 92%, 62%)', fontSize: '10px' }}>
        [CONTACT_FORM // DIRECT_CHANNEL]
      </div>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="text-mono-label block mb-2" style={{ color: 'hsl(55, 13%, 50%)', fontSize: '10px' }}>
            NAME
          </label>
          <input
            type="text"
            className="w-full bg-transparent border-b py-3 text-sm outline-none transition-colors duration-200 focus:border-[hsl(56,92%,62%)]"
            style={{
              borderColor: 'hsla(225, 7%, 12%, 0.5)',
              color: 'hsl(55, 13%, 86%)',
            }}
          />
        </div>
        <div>
          <label className="text-mono-label block mb-2" style={{ color: 'hsl(55, 13%, 50%)', fontSize: '10px' }}>
            EMAIL
          </label>
          <input
            type="email"
            className="w-full bg-transparent border-b py-3 text-sm outline-none transition-colors duration-200 focus:border-[hsl(56,92%,62%)]"
            style={{
              borderColor: 'hsla(225, 7%, 12%, 0.5)',
              color: 'hsl(55, 13%, 86%)',
            }}
          />
        </div>
        <div>
          <label className="text-mono-label block mb-2" style={{ color: 'hsl(55, 13%, 50%)', fontSize: '10px' }}>
            MESSAGE
          </label>
          <textarea
            rows={4}
            className="w-full bg-transparent border-b py-3 text-sm outline-none transition-colors duration-200 resize-none focus:border-[hsl(56,92%,62%)]"
            style={{
              borderColor: 'hsla(225, 7%, 12%, 0.5)',
              color: 'hsl(55, 13%, 86%)',
            }}
          />
        </div>
        <MagneticElement strength={0.18}>
          <button
            type="submit"
            className="px-6 py-3 text-mono-label border transition-colors duration-300"
            style={{
              fontSize: '11px',
              borderColor: 'hsl(56, 92%, 62%)',
              color: 'hsl(56, 92%, 62%)',
            }}
          >
            [ TRANSMIT PAYLOAD ]
          </button>
        </MagneticElement>
      </form>
    </div>
  );
}


