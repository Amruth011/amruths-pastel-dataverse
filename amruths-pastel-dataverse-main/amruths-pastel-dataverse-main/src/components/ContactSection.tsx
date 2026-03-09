import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, ArrowUpRight, Send, User, MessageSquare } from 'lucide-react';
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
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="gradient-line" />
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="font-mono text-xs text-primary mb-4 tracking-widest uppercase">Contact</p>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
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
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground/50" />
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-card/30 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground/50" />
                  <input
                    type="email"
                    placeholder="Your email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-card/30 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground/50" />
                  <textarea
                    placeholder="Your message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-card/30 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none"
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
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg transition-all duration-300 text-sm disabled:opacity-60"
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
                    className="flex items-center gap-4 px-5 py-4 border border-border/60 rounded-lg bg-card/20 hover:bg-card/40 transition-all duration-300 group"
                  >
                    <span className="text-primary/50 group-hover:text-primary transition-colors">{link.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{link.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{link.href.replace('mailto:', '').replace('https://', '')}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground/0 group-hover:text-muted-foreground transition-all duration-300" />
                  </motion.a>
                ))}

                <div className="flex items-center gap-4 px-5 py-4 border border-border/40 rounded-lg bg-card/10">
                  <MapPin className="h-5 w-5 text-primary/50" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-xs text-muted-foreground">Bengaluru, India</p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Quote Card */}
          <SectionReveal delay={0.3}>
            <motion.div
              className="mt-12 relative rounded-xl border border-[#e8c545]/30 bg-card/40 backdrop-blur-sm p-8 overflow-hidden"
              whileHover={{ borderColor: 'rgba(232, 197, 69, 0.5)' }}
              style={{ boxShadow: '0 0 25px rgba(232, 197, 69, 0.08)' }}
            >
              <div className="absolute -top-2 -left-1 text-[#e8c545]/20 text-7xl font-serif leading-none select-none">"</div>
              <div className="relative z-10 text-center">
                <p className="italic text-foreground/90 text-base md:text-lg leading-relaxed mb-2">
                  "Build powerful AI systems — but never forget the responsibility behind them.
                </p>
                <p className="italic text-foreground/90 text-base md:text-lg leading-relaxed mb-6">
                  Intelligence without ethics is just automation."
                </p>
                <p className="text-xs text-muted-foreground tracking-wider uppercase mb-3">Engineering AI that is powerful, responsible, and human-aligned.</p>
                <p className="text-sm text-[#e8c545] font-medium tracking-wide">— Amruth Kumar M</p>
              </div>
              <div className="absolute -bottom-2 -right-1 text-[#e8c545]/20 text-7xl font-serif leading-none select-none rotate-180">"</div>
            </motion.div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
