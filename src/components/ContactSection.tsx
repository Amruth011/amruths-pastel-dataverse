import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, ArrowUpRight, Send, User, MessageSquare, Phone, Calendar } from 'lucide-react';
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
                <a
                  href="https://calendly.com/amruth-kumar-portfolio/new-meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-8 py-3 px-6 border-2 border-primary/70 hover:bg-primary/10 rounded-lg text-primary font-medium hover:border-primary transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule a 15-min Chat
                </a>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Pick a time that works for you →
                </p>
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
                      <p className="text-xs text-muted-foreground truncate">{link.href.replace('mailto:', '').replace('https://', '').replace('tel:', '').replace('+91', '+91 ')}</p>
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

                {/* Social presence */}
                <div className="pt-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-3">
                    Follow the build
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {socials.map((s) =>
                      s.href ? (
                        <motion.a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -2 }}
                          aria-label={s.label}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-card/20 text-xs text-foreground/80 hover:text-primary hover:border-primary/40 transition-colors duration-300"
                        >
                          {s.icon}
                          {s.label}
                        </motion.a>
                      ) : (
                        <span
                          key={s.label}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dashed border-border/50 bg-transparent text-xs text-muted-foreground/50 cursor-default"
                        >
                          {s.icon}
                          {s.label}
                          <span className="font-mono text-[9px] uppercase tracking-wider text-primary/40">soon</span>
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Quote Card */}
          <SectionReveal delay={0.3}>
            <motion.div
              className="mt-12 border-l-4 border-primary/50 bg-card/30 p-6 rounded-r-lg"
              whileHover={{ borderColor: 'hsl(46 78% 59% / 0.7)' }}
            >
              <p className="text-lg md:text-xl text-foreground/80 italic leading-relaxed font-light">
                "The engineers who will matter in 2030 aren't just the ones who can build the fastest model — they're the ones who know when not to deploy it."
              </p>
              <p className="mt-4 text-sm text-primary/80 font-medium tracking-wide">— Amruth Kumar M</p>
            </motion.div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
