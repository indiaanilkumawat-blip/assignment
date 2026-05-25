import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const services = [
  { icon: '📝', title: 'Essay Help', desc: 'Custom essays for any topic, length, or academic level with original research.' },
  { icon: '🎓', title: 'Dissertation & Thesis', desc: 'End-to-end support from proposal to final submission for Masters & PhD.' },
  { icon: '📊', title: 'Report Writing', desc: 'Analytical, technical, and business reports structured for clarity.' },
  { icon: '💼', title: 'Case Studies', desc: 'In-depth case analysis with real-world solutions for business and law.' },
  { icon: '📄', title: 'CV & SOP Writing', desc: 'Professional CVs and statements that get you noticed by top universities.' },
  { icon: '🔬', title: 'Research Papers', desc: 'Well-cited, peer-reviewed standard research across all disciplines.' },
  { icon: '💻', title: 'Technical Writing', desc: 'Engineering, CS, and IT assignments handled by domain specialists.' },
  { icon: '🧮', title: 'Finance & Stats', desc: 'Complex calculations, analysis, and reports with precise methodology.' },
];

const stats = [
  { number: '3.5M+', label: 'Assignments Delivered', icon: '📚' },
  { number: '7,000+', label: 'Expert Writers', icon: '👨‍🏫' },
  { number: '4.8★', label: 'Average Rating', icon: '⭐' },
  { number: '10+', label: 'Years of Excellence', icon: '🏆' },
];

const reasons = [
  { icon: '🤖', title: 'AI-Free Guarantee', desc: '100% human-written content with no AI tools — verified and certified original.' },
  { icon: '⏰', title: 'On-Time Delivery', desc: 'We respect every deadline. Get your work delivered before time, every time.' },
  { icon: '💰', title: 'Pocket-Friendly Pricing', desc: 'Premium quality at student-friendly prices. No hidden fees, transparent billing.' },
  { icon: '👨‍🏫', title: 'Qualified Experts', desc: 'PhD and Masters-qualified writers with 5+ years of academic writing experience.' },
  { icon: '🔄', title: 'Free Revisions', desc: 'Unlimited revisions until you are 100% satisfied with the final output.' },
  { icon: '🔒', title: '24/7 Support', desc: 'Round-the-clock customer support via WhatsApp, email, and live chat.' },
];

const steps = [
  { num: '01', title: 'Submit Inquiry', desc: 'Fill in your assignment details, deadline, and requirements in our simple form.', accent: '#dbeafe', text: '#1e40af' },
  { num: '02', title: 'Meet Your Expert', desc: 'A qualified writer reviews your brief and connects with you personally.', accent: '#dcfce7', text: '#15803d' },
  { num: '03', title: 'Secure Payment', desc: 'Make a secure payment through multiple convenient payment methods.', accent: '#fef3c7', text: '#92400e' },
  { num: '04', title: 'Receive Your Work', desc: 'Get your perfectly crafted assignment delivered before your deadline.', accent: '#f3e8ff', text: '#7e22ce' },
];

const testimonials = [
  { name: 'Heeral P.', role: 'Business Student', text: 'The team supported my marketing dissertation brilliantly. Well-structured, excellent writing, and helped me achieve top marks!', rating: 5 },
  { name: 'Nikhil S.', role: 'Nursing Student', text: 'A big thanks for helping with my nursing research project. Their in-depth insights and academic knowledge were outstanding. Highly recommend!', rating: 5 },
  { name: 'Liam H.', role: 'HR Student', text: 'They structured my Human Resource essay with strong arguments and solid research. The paper was both insightful and academically credible.', rating: 5 },
  { name: 'Sophia R.', role: 'Psychology Student', text: 'My psychology thesis was handled with such expertise. Great research and profound analysis. My final result was absolutely perfect!', rating: 5 },
  { name: 'Daniel K.', role: 'Engineering Student', text: 'They simplified my complex technical report into clear, concise language. Met my deadline with a very polished output.', rating: 5 },
  { name: 'Olivia M.', role: 'Business Student', text: 'The research and strategy for my business case study was perfect. My professor was very impressed and I couldn\'t be happier!', rating: 5 },
];

const faqs = [
  { q: 'Why should I trust your online assignment service?', a: 'We have 10+ years of experience, 7000+ qualified writers, and 3.5M+ delivered assignments. We maintain strict confidentiality policies and guarantee original work.' },
  { q: 'How fast can you complete my assignment?', a: 'We offer urgent delivery as fast as 12 hours. Our team works 24/7 to meet any deadline, no matter how tight.' },
  { q: 'Is the work plagiarism-free and AI-free?', a: 'Absolutely. Every assignment is 100% human-written, checked with Turnitin, and comes with a plagiarism-free certificate upon request.' },
  { q: 'What subjects do you cover?', a: 'We cover 100+ subjects including Law, Engineering, Nursing, Finance, Psychology, Management, Science, Calculus, Computer Science, and many more.' },
  { q: 'Is my personal information kept confidential?', a: 'Yes, completely. We follow strict data privacy protocols and never share your information with third parties.' },
  { q: 'What if I need revisions?', a: 'We offer free unlimited revisions within the scope of original requirements until you are fully satisfied.' },
];

const domains = ['Law', 'Science', 'Nursing', 'Engineering', 'Management & HR', 'Finance & Stats', 'Psychology', 'Calculus', 'Computer Science', 'MBA'];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section style={{
          minHeight: '100vh',
          background: 'linear-gradient(150deg, #0f2137 0%, #1a3a5c 55%, #1e4a7a 100%)',
          paddingTop: 130,
          paddingBottom: 100,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative blobs */}
          <div style={{ position: 'absolute', top: -200, right: -200, width: 700, height: 700, borderRadius: '50%', background: 'rgba(37,99,168,0.15)', pointerEvents: 'none', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', bottom: -100, left: -150, width: 500, height: 500, borderRadius: '50%', background: 'rgba(232,160,32,0.08)', pointerEvents: 'none', filter: 'blur(60px)' }} />
          {/* Grid pattern */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left content */}
              <div className="animate-fadeUp">
                {/* Badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28,
                  padding: '7px 18px', borderRadius: 100,
                  background: 'rgba(232,160,32,0.15)', border: '1px solid rgba(232,160,32,0.35)',
                  color: 'var(--accent)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  🏆 India's Most Trusted Academic Help
                </div>

                <h1 style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 5.5vw, 66px)',
                  fontWeight: 700, lineHeight: 1.12, color: 'white', marginBottom: 24,
                  letterSpacing: '-0.01em',
                }}>
                  Expert Assignment Help —{' '}
                  <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>AI-Free &amp; Plagiarism-Free</span>
                </h1>

                <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, marginBottom: 36, maxWidth: 500 }}>
                  Get your assignments done by 7,000+ qualified academic experts. 100% original, on-time delivery, and grades you deserve — guaranteed.
                </p>

                {/* Trust badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
                  {['✅ AI-Free Content', '📋 Plagiarism Report', '⚡ 12-Hr Delivery', '🔒 100% Confidential'].map(b => (
                    <div key={b} style={{
                      padding: '8px 16px', borderRadius: 100, fontSize: 12, fontWeight: 600,
                      color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}>{b}</div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                  <Link href="/contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '15px 34px', borderRadius: 13, fontWeight: 700, fontSize: 15,
                    background: 'var(--accent)', color: 'white', textDecoration: 'none',
                    boxShadow: '0 8px 28px rgba(232,160,32,0.4)',
                    letterSpacing: '0.02em',
                  }}>
                    Get Help Now →
                  </Link>
                  <a href="https://api.whatsapp.com/send/?phone=917357274693" target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '15px 34px', borderRadius: 13, fontWeight: 600, fontSize: 15,
                    background: 'rgba(37,211,102,0.15)', color: '#4ade80',
                    textDecoration: 'none', border: '1.5px solid rgba(37,211,102,0.3)',
                  }}>
                    💬 WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Right — stat cards */}
              <div className="grid grid-cols-2 gap-5 animate-fadeUp-1">
                {stats.map((stat, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)',
                    borderRadius: 20, padding: '28px 22px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    textAlign: 'center',
                    transition: 'background 0.2s',
                  }} className="hover:bg-white/10">
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
                      {stat.number}
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 6, fontWeight: 500, letterSpacing: '0.03em' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}

                <div style={{
                  gridColumn: '1 / -1',
                  background: 'rgba(232,160,32,0.12)',
                  border: '1px solid rgba(232,160,32,0.25)',
                  borderRadius: 20, padding: '18px 22px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 5 }}>🌍 Serving students from</div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>India · UK · Canada · UAE · Ireland</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 26 }}>🎓</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>100+ subjects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DOMAINS STRIP ── */}
        <section style={{ background: 'var(--accent)', padding: '22px 0', overflow: 'hidden' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: 8 }}>100+ Subjects:</span>
              {domains.map(d => (
                <Link key={d} href="/contact" style={{
                  padding: '6px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                  background: 'rgba(255,255,255,0.2)', color: 'white',
                  textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)',
                  transition: 'background 0.2s',
                }}
                  className="hover:bg-white/30">{d}</Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section style={{ padding: '96px 0', background: 'var(--bg-warm)' }} id="services">
          <div className="max-w-7xl mx-auto px-6">
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <div className="section-tag mx-auto mb-5">Our Services</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 700, color: 'var(--primary)', marginBottom: 14, letterSpacing: '-0.01em' }}>
                Complete Academic Writing Services
              </h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: 540, margin: '0 auto', fontSize: 16, lineHeight: 1.7 }}>
                From essays to dissertations — our expert team handles every type of academic assignment with precision.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s, i) => (
                <div key={i} className="card-hover" style={{
                  background: 'white', borderRadius: 20, padding: '28px 24px',
                  border: '1.5px solid var(--border)', cursor: 'pointer',
                  boxShadow: '0 2px 12px rgba(15,33,55,0.04)',
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, marginBottom: 18,
                    background: 'var(--bg)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 26,
                    border: '1.5px solid var(--border)',
                  }}>{s.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--primary)', marginBottom: 10, letterSpacing: '-0.01em' }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{s.desc}</p>
                  <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 16, fontSize: 12, fontWeight: 700, color: 'var(--primary-light)', textDecoration: 'none', letterSpacing: '0.02em' }}>
                    Get Started →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ padding: '96px 0', background: 'white' }} id="how-it-works">
          <div className="max-w-7xl mx-auto px-6">
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <div className="section-tag mx-auto mb-5">Process</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 700, color: 'var(--primary)', letterSpacing: '-0.01em' }}>
                How It Works in 4 Simple Steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <div className="card-hover" style={{
                    background: 'var(--bg)', borderRadius: 20, padding: '28px 24px',
                    border: '1.5px solid var(--border)', height: '100%',
                  }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 16,
                      background: step.accent, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', marginBottom: 18,
                      fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: step.text,
                    }}>{step.num}</div>
                    <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--primary)', marginBottom: 10 }}>{step.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{step.desc}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden lg:block" style={{
                      position: 'absolute', right: -16, top: '40%', zIndex: 1,
                      width: 32, height: 32, background: 'white', border: '2px solid var(--border)',
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--accent)', fontSize: 14, fontWeight: 700,
                    }}>→</div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Link href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '15px 38px', borderRadius: 13, fontWeight: 700, fontSize: 15,
                background: 'var(--primary)', color: 'white', textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(15,33,55,0.2)',
              }}>
                Start Your Inquiry Now →
              </Link>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section style={{ padding: '96px 0', background: 'var(--bg)' }} id="about">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="section-tag mb-6">Why Choose Us</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 700, color: 'var(--primary)', marginBottom: 18, letterSpacing: '-0.01em' }}>
                  The Assignment Hub Advantage
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.85, marginBottom: 28 }}>
                  We don't just write assignments — we craft academic success stories. With over a decade of expertise,
                  we've helped thousands of students across the globe achieve their academic goals.
                </p>

                {/* mini stats */}
                <div style={{ display: 'flex', gap: 20, marginBottom: 32, flexWrap: 'wrap' }}>
                  {[['3.5M+', 'Assignments'], ['7K+', 'Writers'], ['4.8★', 'Rating']].map(([n, l]) => (
                    <div key={l} style={{ textAlign: 'center', padding: '14px 20px', background: 'white', borderRadius: 14, border: '1.5px solid var(--border)', minWidth: 90 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--primary-light)' }}>{n}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div>
                    </div>
                  ))}
                </div>

                <Link href="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 30px', borderRadius: 12, fontWeight: 700, fontSize: 14,
                  background: 'var(--primary)', color: 'white', textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(15,33,55,0.18)',
                }}>
                  Submit an Inquiry →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {reasons.map((r, i) => (
                  <div key={i} className="card-hover" style={{
                    background: 'white', borderRadius: 18, padding: '22px 20px',
                    border: '1.5px solid var(--border)',
                    boxShadow: '0 2px 12px rgba(15,33,55,0.04)',
                  }}>
                    <div style={{ fontSize: 26, marginBottom: 12 }}>{r.icon}</div>
                    <h3 style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)', marginBottom: 8 }}>{r.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65 }}>{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section style={{
          background: 'linear-gradient(135deg, #0f2137 0%, #1a3a5c 60%, #1e4a7a 100%)',
          padding: '80px 0', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(232,160,32,0.07)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 700, color: 'white', marginBottom: 16, letterSpacing: '-0.01em' }}>
              Ready to Get the Grade You Deserve?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, marginBottom: 36, lineHeight: 1.7 }}>
              Join 3.5 million+ students who trust The Assignment Hub for their academic success.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/contact" style={{
                display: 'inline-block', padding: '16px 40px', borderRadius: 13,
                fontWeight: 700, fontSize: 15, background: 'var(--accent)', color: 'white',
                textDecoration: 'none', boxShadow: '0 8px 28px rgba(232,160,32,0.35)',
              }}>
                📋 Get Help Now
              </Link>
              <a href="https://api.whatsapp.com/send/?phone=917357274693" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block', padding: '16px 40px', borderRadius: 13,
                fontWeight: 600, fontSize: 15, background: 'rgba(255,255,255,0.1)',
                color: 'white', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.25)',
              }}>
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section style={{ padding: '96px 0', background: 'var(--bg-warm)' }} id="testimonials">
          <div className="max-w-7xl mx-auto px-6">
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <div className="section-tag mx-auto mb-5">Student Reviews</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 700, color: 'var(--primary)', marginBottom: 14, letterSpacing: '-0.01em' }}>
                What Our Students Say
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
                Rated 4.8/5 on SiteJabber and Trustpilot by thousands of verified students
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="card-hover" style={{
                  background: 'white', borderRadius: 22, padding: '28px 26px',
                  border: '1.5px solid var(--border)',
                  boxShadow: '0 4px 20px rgba(15,33,55,0.05)',
                  display: 'flex', flexDirection: 'column',
                }}>
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                    {Array(t.rating).fill(0).map((_, j) => (
                      <span key={j} style={{ color: 'var(--accent)', fontSize: 15 }}>★</span>
                    ))}
                  </div>
                  {/* Quote mark */}
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, lineHeight: 0.8, color: 'var(--accent)', opacity: 0.3, marginBottom: 8 }}>"</div>
                  <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75, flex: 1, marginBottom: 20 }}>
                    {t.text}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: 700, fontSize: 17,
                      flexShrink: 0,
                    }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: '96px 0', background: 'white' }} id="faq">
          <div className="max-w-3xl mx-auto px-6">
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <div className="section-tag mx-auto mb-5">FAQ</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 700, color: 'var(--primary)', letterSpacing: '-0.01em' }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {faqs.map((faq, i) => (
                <details key={i} style={{
                  background: 'var(--bg)', borderRadius: 16,
                  border: '1.5px solid var(--border)', overflow: 'hidden',
                  transition: 'border-color 0.2s',
                }}>
                  <summary style={{
                    padding: '20px 24px', fontWeight: 600, fontSize: 14, cursor: 'pointer',
                    color: 'var(--text)', listStyle: 'none', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center', gap: 12,
                    letterSpacing: '-0.01em',
                  }}>
                    {faq.q}
                    <span style={{ color: 'var(--accent)', fontSize: 22, flexShrink: 0, fontWeight: 300, lineHeight: 1 }}>+</span>
                  </summary>
                  <div style={{ padding: '0 24px 20px', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />

      {/* Floating WhatsApp */}
      <a href="https://api.whatsapp.com/send/?phone=917357274693" target="_blank" rel="noopener noreferrer" style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 100,
        width: 58, height: 58, borderRadius: '50%', background: '#25d366',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 28px rgba(37,211,102,0.45)', fontSize: 28,
        textDecoration: 'none', transition: 'transform 0.2s',
      }}
        className="hover:scale-110">
        💬
      </a>
    </>
  );
}
