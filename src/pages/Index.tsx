import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import InternshipSection from '@/components/InternshipSection';
import ExperienceSection from '@/components/ExperienceSection';

import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-background"
      >
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <InternshipSection />
          <ProjectsSection />
          <ExperienceSection />
          
          <CertificationsSection />
          <ContactSection />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
