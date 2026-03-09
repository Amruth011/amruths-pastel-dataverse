import { Brain, BarChart3, Bot, Eye, Database, MessageSquare, Cpu, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionReveal from './SectionReveal';

const AboutSection = () => {
  const focusAreas = [
    { icon: <Cpu className="h-5 w-5" />, label: 'AI Engineering' },
    { icon: <Brain className="h-5 w-5" />, label: 'Machine Learning Systems' },
    { icon: <BarChart3 className="h-5 w-5" />, label: 'Data Science & Analytics' },
    { icon: <Bot className="h-5 w-5" />, label: 'Agentic AI Systems' },
    { icon: <Search className="h-5 w-5" />, label: 'Retrieval-Augmented Generation (RAG)' },
    { icon: <Database className="h-5 w-5" />, label: 'Vector Databases' },
    { icon: <MessageSquare className="h-5 w-5" />, label: 'Natural Language Processing' },
    { icon: <Eye className="h-5 w-5" />, label: 'Computer Vision' },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="gradient-line" />
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <p className="font-mono text-xs text-primary mb-4 tracking-widest uppercase">About</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tight text-heading">
              Engineering AI that solves real problems.
            </h2>
          </SectionReveal>

          <div className="grid md:grid-cols-5 gap-12">
            <SectionReveal className="md:col-span-3 space-y-6" delay={0.1}>
              <p className="text-muted-foreground/80 leading-relaxed text-sm">
                I specialize in designing end-to-end AI systems — from data pipelines and model training to deployment in production environments. My work spans agentic AI workflows, retrieval-augmented generation, and computer vision, always with a focus on measurable impact.
              </p>
              <p className="text-muted-foreground/80 leading-relaxed text-sm">
                I'm drawn to problems where ML can automate complex decision-making: turning unstructured data into actionable intelligence, orchestrating multi-step AI agents, and leveraging vector search for semantic understanding at scale.
              </p>
              <p className="text-muted-foreground/80 leading-relaxed text-sm">
                Currently pursuing my B.Tech in AI & Data Science, I'm actively shipping projects and seeking roles where I can contribute to production-grade AI products.
              </p>

              <div className="pt-4 space-y-3">
                <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Education</p>
                {[
                  { num: '01', text: 'B.Tech AI & Data Science — Reva University', year: '2023–Present', cgpa: '7.5' },
                  { num: '02', text: 'Diploma EEE — D S Dinakar National Polytechnic', year: '2020–2023', cgpa: '7.4' },
                ].map((edu) => (
                  <div key={edu.num} className="group hover:bg-accent/30 px-3 py-2 -mx-3 rounded-md transition-colors duration-200">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-primary font-mono font-bold">{edu.num}</span>
                      <span className="text-foreground/90">{edu.text}</span>
                      <span className="text-muted-foreground ml-auto font-mono text-xs">{edu.year}</span>
                    </div>
                    <p className="text-primary/70 font-mono text-xs ml-10">CGPA: {edu.cgpa}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal className="md:col-span-2" delay={0.2} direction="right">
              <p className="text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">Focus Areas</p>
              <div className="space-y-2">
                {focusAreas.map((area) => (
                  <motion.div
                    key={area.label}
                    whileHover={{ x: 6, borderColor: 'hsl(46 78% 59% / 0.4)' }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-md border border-border bg-card/30 group cursor-default shimmer"
                  >
                    <span className="text-primary/60 group-hover:text-primary transition-colors duration-300">{area.icon}</span>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{area.label}</span>
                  </motion.div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
