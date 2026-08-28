import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import BlogSection from '@/components/BlogSection';
import GitHubSection from '@/components/GitHubSection';
import InternshipSection from '@/components/InternshipSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

const Index = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-background"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:border focus:border-primary/50 focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:text-primary"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <InternshipSection />
          <ProjectsSection />
          <BlogSection />
          <GitHubSection />
          <CertificationsSection />
          <ContactSection />
        </main>
        <Footer />
        <ChatWidget />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;

