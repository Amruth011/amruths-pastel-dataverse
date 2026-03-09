import { motion } from 'framer-motion';
import { Github, FileText, ArrowDown, Download, Send } from 'lucide-react';
import AnimatedText from './AnimatedText';
import ParticleField from './ParticleField';

const HeroSection = () => {
  const typingTexts = ['Machine Learning', 'AI Engineering', 'Data Science', 'Automation Systems'];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layered backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030301] via-[#030301] to-[#0e0f09]/80" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <ParticleField />
      </div>

      {/* Subtle radial glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.006] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-white/[0.003] rounded-full blur-[100px]" />

      <div className="relative z-10 container mx-auto px-4 text-center pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/60 bg-card/30 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-ring text-emerald-500" />
          <span className="text-xs font-mono text-muted-foreground">Available for opportunities</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter mb-6 leading-[0.95]"
        >
          Amruth Kumar{' '}
          <span className="text-primary relative">
            M
            <span className="absolute -inset-2 bg-primary/5 blur-lg rounded-full" />
          </span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground mb-3 font-medium tracking-tight"
        >
          AI & Data Science Engineer
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-sm md:text-base text-muted-foreground/60 max-w-xl mx-auto mb-8"
        >
          Building intelligent AI systems, data-driven insights, and automation solutions.
        </motion.p>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="h-10 flex items-center justify-center mb-12"
        >
          <span className="font-mono text-sm md:text-base">
            <span className="text-muted-foreground/40 mr-2">{'>'}</span>
            <span className="text-primary/90">
              <AnimatedText texts={typingTexts} />
            </span>
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-20"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="group px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-[0_0_30px_hsl(46_78%_59%/0.3)] transition-all duration-300 text-sm relative overflow-hidden"
          >
            <span className="relative z-10">View Projects</span>
          </button>
          <a
            href="https://github.com/Amruth011"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-border bg-card/30 backdrop-blur-sm text-foreground font-medium rounded-lg hover:bg-accent hover:border-primary/30 transition-all duration-300 text-sm inline-flex items-center gap-2"
          >
            <Github className="h-4 w-4" />
            GitHub Profile
          </a>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-6 py-3 border border-primary/40 bg-primary/5 backdrop-blur-sm text-primary font-medium rounded-lg hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 text-sm inline-flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Contact Me
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => scrollToSection('about')}
          className="text-muted-foreground/30 hover:text-primary/60 transition-colors duration-300"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
