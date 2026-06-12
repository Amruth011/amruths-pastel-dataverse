import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, ArrowUpRight, Send, User, MessageSquare, Phone, ShieldCheck } from 'lucide-react';
import SectionReveal from './SectionReveal';

const WEB3FORMS_ACCESS_KEY = 'fbd98e34-18ef-4409-bef1-a88c05b827af';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Inquiry from ${formData.name}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setError('Failed to send. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const links = [
    { icon: <Github className="h-5 w-5" />, label: 'GitHub', href: 'https://github.com/Amruth011', external: true },
    { icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/amruth-kumar-m', external: true },
    { icon: <Mail className="h-5 w-5" />, label: 'Email', href: 'mailto:amruth.kumar.portfolio@gmail.com', external: false },
    { icon: <Phone className="h-5 w-5" />, label: 'Phone', href: 'tel:+919148159827', external: false },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="gradient-line" />
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="font-mono text-xs text-primary mb-4 tracking-widest uppercase">Contact</p>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-heading">
                Let's build something<br />
                <span className="text-primary">together.</span>
              </h2>
              <p className="text-muted-foreground/70 max-w-md mx-auto text-sm leading-relaxed font-light">
                Open to opportunities in AI engineering, data science, and machine learning. Let's connect.
              </p>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <SectionReveal delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-4 top-4 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-primary/10 hover:border-primary/25 focus:border-primary/40 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-4 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors duration-300" />
                  <input
                    type="email"
                    placeholder="Your email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-primary/10 hover:border-primary/25 focus:border-primary/40 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors duration-300" />
                  <textarea
                    placeholder="Your message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-primary/10 hover:border-primary/25 focus:border-primary/40 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-400 text-center">{error}</p>
                )}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01, boxShadow: '0 0 30px hsl(46 78% 59% / 0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg transition-all duration-300 text-sm disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {loading ? 'Sending...' : submitted ? '✓ Message Sent!' : 'Send Message'}
                </motion.button>
              </form>
            </SectionReveal>

            {/* Contact Info */}
            <SectionReveal delay={0.2} direction="right">
              <div className="space-y-4">
                {links.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    whileHover={{ x: 4, borderColor: 'hsl(46 78% 59% / 0.3)' }}
                    className="flex items-center gap-4 px-5 py-4 border border-primary/15 rounded-lg bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 group"
                  >
                    <div className="p-2.5 rounded-xl border border-primary/10 bg-primary/[0.02] text-primary/50 group-hover:text-primary group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-300">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground/60 font-mono tracking-widest uppercase mb-0.5">{link.label}</p>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {link.href.replace('mailto:', '').replace('https://', '').replace('tel:', '').replace('+91', '+91 ')}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground/0 group-hover:text-muted-foreground transition-all duration-300" />
                  </motion.a>
                ))}

                <div className="flex items-center gap-4 px-5 py-4 border border-primary/15 rounded-lg bg-white/[0.01] transition-all duration-300">
                  <div className="p-2.5 rounded-xl border border-primary/10 bg-primary/[0.02] text-primary/50 transition-all duration-300">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground/60 font-mono tracking-widest uppercase mb-0.5">Location</p>
                    <p className="text-sm font-semibold text-foreground">Bengaluru, India</p>
                  </div>
                </div>

                {/* Native Hand-Coded Tailwind CSS Verification Card */}
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4, borderColor: 'hsl(46 78% 59% / 0.4)' }}
                  className="flex items-center gap-4 px-5 py-4 border border-primary/20 rounded-lg bg-primary/[0.02] hover:bg-primary/[0.04] transition-all duration-300 group cursor-pointer relative overflow-hidden"
                >
                  <div className="p-2.5 rounded-xl border border-primary/25 bg-primary/5 text-primary group-hover:shadow-[0_0_20px_hsl(46_78%_59%/0.15)] transition-all duration-300">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <p className="text-[10px] text-primary/70 font-mono tracking-[0.2em] uppercase">Credentials Verified</p>
                    </div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      Identity Verified — Amruth Kumar M
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/0 group-hover:text-muted-foreground transition-all duration-300" />
                </motion.a>

              </div>
            </SectionReveal>
          </div>

          {/* Quote Card Container */}
          <SectionReveal delay={0.3}>
            <motion.div
              className="mt-16 relative rounded-xl border border-primary/20 bg-card/40 backdrop-blur-xl p-10 md:p-12 overflow-hidden group hover:border-primary/45 hover:shadow-[0_0_35px_hsl(46_78%_59%/0.08)] transition-all duration-500"
              whileHover={{ y: -2 }}
            >
              {/* Glowing vertical accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-primary/50 to-transparent shadow-[0_0_15px_hsl(46_78%_59%/0.4)]" />

              {/* Background radial glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,197,69,0.04)_0%,transparent_70%)] pointer-events-none" />
              
              {/* Background dot pattern */}
              <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none" />

              {/* Floating quote mark decor */}
              <span className="absolute -top-2 left-6 text-8xl font-serif text-primary/[0.04] select-none pointer-events-none">“</span>
              <span className="absolute -bottom-12 right-6 text-8xl font-serif text-primary/[0.04] select-none pointer-events-none">”</span>

              {/* Top Meta Info Header */}
              <div className="flex justify-between items-center mb-6 relative z-10">
                <span className="font-mono text-[9px] tracking-[0.25em] text-primary/60 uppercase">
                  [ Philosophy ]
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/45">
                  SYS.CORE // AUTH_OK
                </span>
              </div>

              {/* Main Quote Text */}
              <p className="text-base md:text-lg lg:text-xl font-light tracking-wide text-foreground/90 text-center leading-relaxed max-w-2xl mx-auto relative z-10 font-mono italic">
                "I don't just <span className="text-primary font-semibold drop-shadow-[0_0_8px_rgba(232,197,69,0.25)]">learn AI</span> — I <span className="text-primary font-semibold drop-shadow-[0_0_8px_rgba(232,197,69,0.25)]">build systems</span> with it."
              </p>

              {/* Bottom Meta Info Footer */}
              <div className="flex justify-between items-center mt-6 relative z-10 pt-4 border-t border-border/20">
                <span className="font-mono text-[9px] text-muted-foreground/45 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  RUNTIME: ACTIVE
                </span>
                <span className="font-mono text-[9px] text-muted-foreground/45">
                  AMRUTH_M_DEV_LOG // 2026
                </span>
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
