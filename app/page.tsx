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
  { number: '3.5M+', label: 'Assignments Delivered' },
  { number: '7,000+', label: 'Expert Writers' },
  { number: '4.8★', label: 'Average Rating' },
  { number: '10+', label: 'Years of Excellence' },
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
  { num: '01', title: 'Submit Your Inquiry', desc: 'Fill in the inquiry form with your assignment details, deadline, and requirements.', color: '#dbeafe' },
  { num: '02', title: 'Connect With Experts', desc: 'Our qualified writer reviews your brief and discusses requirements personally.', color: '#dcfce7' },
  { num: '03', title: 'Secure Payment', desc: 'Make a secure payment through multiple payment methods at your convenience.', color: '#fef3c7' },
  { num: '04', title: 'Receive Your Work', desc: 'Get your perfectly crafted assignment delivered before your deadline.', color: '#f3e8ff' },
];

const testimonials = [
  { name: 'Heeral P.', role: 'Business Student', text: 'The team at The Assignment Hub supported my marketing dissertation brilliantly. Well-structured content, excellent writing, and helped me achieve top marks!', rating: 5 },
  { name: 'Nikhil S.', role: 'Nursing Student', text: 'A big thanks for helping with my nursing research project. Their in-depth insights and academic knowledge were outstanding. Highly recommend!', rating: 5 },
  { name: 'Liam H.', role: 'HR Student', text: 'They structured my Human Resource essay with strong arguments and solid research. The paper was both insightful and academically credible.', rating: 5 },
  { name: 'Sophia R.', role: 'Psychology Student', text: 'My psychology thesis was handled with such expertise. Great research and profound analysis. My final result was absolutely perfect!', rating: 5 },
  { name: 'Daniel K.', role: 'Engineering Student', text: 'They simplified my complex technical report into clear, concise language. Helped me meet my deadline with a very polished output.', rating: 5 },
  { name: 'Olivia M.', role: 'Business Student', text: 'The research and strategy for my business case study was perfect. My professor was very impressed and I couldn\'t be happier with the results!', rating: 5 },
];

const faqs = [
  { q: 'Why should I trust your online assignment service?', a: 'We have 10+ years of experience, 7000+ qualified writers, and 3.5M+ delivered assignments. We are ISO-certified and maintain strict confidentiality policies.' },
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
        {/* HERO */}
        <section style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 40%, #fff9f0 100%)',
          paddingTop: 120,
          paddingBottom: 80,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background decoration */}
          <div style={{
            position: 'absolute', top: -100, right: -100, width: 600, height: 600,
            borderRadius: '50%', background: 'rgba(37,99,168,0.05)', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: -150, left: -100, width: 500, height: 500,
            borderRadius: '50%', background: 'rgba(245,158,11,0.06)', pointerEvents: 'none',
          }} />

          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left */}
              <div className="animate-fadeUp">
                <div className="section-tag mb-6">
                  🏆 India's Most Trusted Academic Help
                </div>
                <h1 className="font-playfair" style={{ fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 800, lineHeight: 1.15, marginBottom: 24, color: 'var(--primary)' }}>
                  Expert Assignment Help —{' '}
                  <span className="gradient-text">AI-Free &amp; Plagiarism-Free</span>
                </h1>
                <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32, maxWidth: 520 }}>
                  Get your assignments done by 7000+ qualified academic experts. 100% original, on-time delivery, and grades you deserve — guaranteed.
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {['✅ AI-Free Content', '📋 Plagiarism Report', '⚡ 12-Hr Delivery', '🔒 100% Confidential'].map(b => (
                    <div key={b} style={{ padding: '8px 14px', background: 'white', borderRadius: 100, fontSize: 13, fontWeight: 500, color: 'var(--text)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid var(--border)' }}>
                      {b}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '15px 32px', borderRadius: 12, fontWeight: 700, fontSize: 16,
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                    color: 'white', textDecoration: 'none', boxShadow: '0 8px 24px rgba(26,58,92,0.25)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                    className="hover:scale-105">
                    Get Help Now →
                  </Link>
                  <a href="https://api.whatsapp.com/send/?phone=919352555548" target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '15px 32px', borderRadius: 12, fontWeight: 600, fontSize: 16,
                    background: '#25d366', color: 'white', textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(37,211,102,0.25)',
                  }}>
                    💬 WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Right — Stats cards */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="card-hover" style={{
                    background: 'white', borderRadius: 20, padding: '28px 24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid var(--border)',
                    textAlign: 'center', animationDelay: `${i * 0.1}s`,
                  }}>
                    <div className="font-playfair gradient-text" style={{ fontSize: 38, fontWeight: 800, lineHeight: 1 }}>
                      {stat.number}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6, fontWeight: 500 }}>
                      {stat.label}
                    </div>
                  </div>
                ))}

                {/* Rating card spanning full width */}
                <div style={{
                  gridColumn: '1 / -1', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                  borderRadius: 20, padding: '20px 24px', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 4 }}>🌍 Serving students from</div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>India · UK · Canada · UAE · Ireland</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 24 }}>🎓</div>
                    <div style={{ fontSize: 12, opacity: 0.7 }}>100+ subjects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section style={{ padding: '90px 0', background: 'white' }} id="services">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <div className="section-tag mx-auto mb-4">Our Services</div>
              <h2 className="font-playfair" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'var(--primary)', marginBottom: 12 }}>
                Complete Academic Writing Services
              </h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: 560, margin: '0 auto', fontSize: 16 }}>
                From essays to dissertations — our expert team handles every type of academic assignment with precision and care.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s, i) => (
                <div key={i} className="card-hover" style={{
                  background: 'var(--bg)', borderRadius: 16, padding: 24,
                  border: '1.5px solid var(--border)', cursor: 'pointer',
                }}>
                  <div style={{ fontSize: 36, marginBottom: 14 }}>{s.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--primary)', marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
                  <Link href="/contact" style={{ display: 'inline-block', marginTop: 14, fontSize: 13, fontWeight: 600, color: 'var(--primary-light)', textDecoration: 'none' }}>
                    Get Started →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DOMAINS STRIP */}
        <section style={{ background: 'var(--primary)', padding: '40px 0', overflow: 'hidden' }}>
          <div className="max-w-7xl mx-auto px-4">
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                We cover 100+ subjects including
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {domains.map(d => (
                <Link key={d} href="/contact" style={{
                  padding: '8px 20px', borderRadius: 100, fontSize: 14, fontWeight: 500,
                  background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)',
                  textDecoration: 'none', transition: 'background 0.2s',
                }}
                  className="hover:bg-white/20">{d}</Link>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ padding: '90px 0', background: 'var(--bg)' }} id="how-it-works">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <div className="section-tag mx-auto mb-4">Process</div>
              <h2 className="font-playfair" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'var(--primary)', marginBottom: 12 }}>
                How It Works in 4 Simple Steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={i} style={{
                  background: 'white', borderRadius: 20, padding: 28,
                  border: '1.5px solid var(--border)', position: 'relative',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16, background: step.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-playfair)', fontSize: 22, fontWeight: 800,
                    color: 'var(--primary)', marginBottom: 16,
                  }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.desc}</p>
                  {i < 3 && (
                    <div className="hidden lg:block" style={{
                      position: 'absolute', right: -22, top: '50%', transform: 'translateY(-50%)',
                      fontSize: 20, color: 'var(--accent)', zIndex: 1,
                    }}>→</div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '15px 36px', borderRadius: 12, fontWeight: 700, fontSize: 16,
                background: 'var(--accent)', color: 'white', textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(245,158,11,0.3)',
              }}>
                Start Your Inquiry Now →
              </Link>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section style={{ padding: '90px 0', background: 'white' }} id="about">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="section-tag mb-5">Why Choose Us</div>
                <h2 className="font-playfair" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'var(--primary)', marginBottom: 16 }}>
                  The Assignment Hub Advantage
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
                  We don't just write assignments — we craft academic success stories. With over a decade of expertise, 
                  we've helped thousands of students across the globe achieve their academic goals.
                </p>
                <Link href="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 28px', borderRadius: 10, fontWeight: 600, fontSize: 15,
                  background: 'var(--primary)', color: 'white', textDecoration: 'none',
                }}>
                  Submit an Inquiry →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {reasons.map((r, i) => (
                  <div key={i} className="card-hover" style={{
                    background: 'var(--bg)', borderRadius: 16, padding: 20,
                    border: '1.5px solid var(--border)',
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{r.icon}</div>
                    <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 6 }}>{r.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, #2563a8 60%, #1e40af 100%)',
          padding: '70px 0',
        }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-playfair" style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, color: 'white', marginBottom: 16 }}>
              Ready to Get the Grade You Deserve?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, marginBottom: 32 }}>
              Join 3.5 million+ students who trust The Assignment Hub for their academic success.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" style={{
                display: 'inline-block', padding: '16px 40px', borderRadius: 12,
                fontWeight: 700, fontSize: 16, background: 'var(--accent)', color: 'white',
                textDecoration: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              }}>
                📋 Get Help Now
              </Link>
              <a href="https://api.whatsapp.com/send/?phone=919352555548" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block', padding: '16px 40px', borderRadius: 12,
                fontWeight: 600, fontSize: 16, background: 'rgba(255,255,255,0.15)',
                color: 'white', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.3)',
              }}>
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ padding: '90px 0', background: 'var(--bg)' }} id="testimonials">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <div className="section-tag mx-auto mb-4">Reviews</div>
              <h2 className="font-playfair" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'var(--primary)', marginBottom: 12 }}>
                What Our Students Say
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16 }}>
                Rated 4.8/5 on SiteJabber and Trustpilot by thousands of verified students
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="card-hover" style={{
                  background: 'white', borderRadius: 20, padding: 28,
                  border: '1.5px solid var(--border)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                }}>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                    {Array(t.rating).fill(0).map((_, j) => (
                      <span key={j} style={{ color: 'var(--accent)', fontSize: 16 }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: 700, fontSize: 16,
                    }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '90px 0', background: 'white' }} id="faq">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-14">
              <div className="section-tag mx-auto mb-4">FAQ</div>
              <h2 className="font-playfair" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'var(--primary)' }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {faqs.map((faq, i) => (
                <details key={i} style={{
                  background: 'var(--bg)', borderRadius: 14, border: '1.5px solid var(--border)', overflow: 'hidden',
                }}>
                  <summary style={{
                    padding: '18px 24px', fontWeight: 600, fontSize: 15, cursor: 'pointer',
                    color: 'var(--text)', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    {faq.q}
                    <span style={{ color: 'var(--primary-light)', fontSize: 18, flexShrink: 0, marginLeft: 12 }}>+</span>
                  </summary>
                  <div style={{ padding: '0 24px 18px', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
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
      <a href="https://api.whatsapp.com/send/?phone=919352555548" target="_blank" rel="noopener noreferrer" style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 100,
        width: 56, height: 56, borderRadius: '50%', background: '#25d366',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 24px rgba(37,211,102,0.4)', fontSize: 26,
        textDecoration: 'none', transition: 'transform 0.2s',
      }}
        className="hover:scale-110">
        💬
      </a>
    </>
  );
}
