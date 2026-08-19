import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import BlogSection from '@/components/BlogSection';
import InternshipSection from '@/components/InternshipSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import ArchitecturePipeline from '@/components/ArchitecturePipeline';

const Index = () => {
  const [bannerOpen, setBannerOpen] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-background"
      >
        <AnnouncementBanner onOpenChange={setBannerOpen} />
        <Header bannerOffset={bannerOpen} />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <InternshipSection />
          <ProjectsSection />
          <BlogSection />
          <CertificationsSection />
          <ContactSection />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
