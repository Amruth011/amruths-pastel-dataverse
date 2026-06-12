import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionReveal from './SectionReveal';

interface Cert {
  name: string;
  platform: string;
  date: string;
  why: string;
  certId?: string;
  skills?: string[];
}

const CertificationsSection = () => {
  const categories = [
    {
      title: 'Professional Certifications',
      certs: [
        { name: 'AI Engineer for Data Scientists Associate', platform: 'DataCamp', date: 'Jul 21, 2025', why: 'Directly maps to LLM Engineer, AI Engineer roles — Llama 3, fine-tuning, production AI', certId: 'AEDS0014096833007' },
        { name: 'Salesforce Certified: Agentforce Specialist', platform: 'Salesforce', date: 'Dec 6, 2025', why: 'Agentic AI is the hottest emerging skill — agent architecture, reasoning engines, trust layers', certId: 'Cert7141976_AgentforceSpecialist_20251206' },
        { name: 'IBM Machine Learning', platform: 'Coursera (IBM)', date: 'Sep 12, 2025', why: 'Core ML credential covering full spectrum — supervised, unsupervised, DL, RL' },
        { name: 'Google Advanced Data Analytics', platform: 'Coursera (Google)', date: 'Jul 6, 2025', why: 'Google-backed, covers Python + Stats + Regression + ML — strong ATS signal' },
        { name: 'Meta Data Analyst', platform: 'Coursera (Meta)', date: 'Jul 5, 2025', why: 'Meta brand, covers SQL + Python + Statistics — essential DS fundamentals' },
        { name: 'Oracle Cloud Infrastructure 2025 AI Foundations Associate', platform: 'Oracle University', date: 'Apr 7, 2025', why: 'GenAI + LLM + Responsible AI + OCI — enterprise cloud AI credential' },
        { name: 'Microsoft Azure Data Fundamentals DP-900', platform: 'Coursera (Microsoft)', date: 'Jul 11, 2025', why: 'Azure appeared in 38 jobs — Microsoft cert carries strong enterprise weight' },
      ] as Cert[],
    },
    {
      title: 'AI & Cloud Specializations',
      certs: [
        { name: 'Introduction to Generative AI Studio', platform: 'Simplilearn (Google Cloud)', date: 'Jul 18, 2025', why: 'GCP + GenAI Studio — directly relevant to LLM/AI Engineering roles' },
        { name: 'SQL and Relational Databases 101', platform: 'Cognitive Class (IBM)', date: 'Apr 6, 2025', why: 'SQL appeared in 51 jobs — non-negotiable foundational skill' },
        { name: 'Cloud Foundational', platform: 'Great Learning', date: 'Nov 1, 2024', why: 'Cloud basics — supporting credential for cloud AI roles' },
      ] as Cert[],
    },
    {
      title: 'Data & Analytics Tools',
      certs: [
        { name: 'Fundamentals of R Programming & Statistical Analysis', platform: 'Infosys Springboard', date: 'Oct 3, 2024', why: 'R is valued specifically in Data Scientist roles (stats-heavy positions)' },
        { name: 'R Programming — Data Frames, Factors & Strings', platform: 'Infosys Springboard', date: 'Oct 4, 2024', why: 'Complements the fundamentals cert — shows depth in R' },
        { name: 'Power BI Workshop', platform: 'MiVi Technologies', date: 'Nov 5, 2024', why: 'Power BI is a recurring tool in DS/Analyst roles — dashboard skills' },
      ] as Cert[],
    },
    {
      title: 'Supporting Credentials',
      certs: [
        { name: 'Agile Explorer', platform: 'IBM SkillsBuild', date: 'Apr 16, 2025', why: 'Agile appeared in 25+ jobs — supporting credential for team-based ML roles' },
        { name: 'User Experience (UX)', platform: 'FutureLearn (Accenture)', date: 'Dec 3, 2024', why: 'Adds product thinking context to AI/ML roles' },
      ] as Cert[],
    },
    {
      title: 'Job Simulations',
      certs: [
        { name: 'GenAI Powered Data Analytics', platform: 'Tata iQ', date: 'Sep 19, 2025', why: '', skills: ['AI Strategy', 'EDA', 'Predictive Analytics', 'Ethical AI', 'Agentic AI', 'Process Automation'] },
        { name: 'GenAI — AI-Powered Financial Chatbot', platform: 'BCG X', date: 'Apr 27, 2025', why: '', skills: ['AI Development', 'NLP', 'Python', 'Financial Analysis', 'Rule-based Logic'] },
        { name: 'Data Analytics', platform: 'Deloitte Australia', date: 'Jun 17, 2025', why: '', skills: ['Data Analysis', 'Tableau', 'Python', 'Data Modeling', 'Log Analysis'] },
        { name: 'Data Analytics and Visualization', platform: 'Accenture', date: 'Mar 8, 2025', why: '', skills: ['Data Analysis', 'Data Modeling', 'Storytelling', 'Excel', 'PowerPoint'] },
        { name: 'Power BI', platform: 'PwC Switzerland', date: 'Mar 9, 2025', why: '', skills: ['Business Intelligence', 'KPI Development', 'Power BI', 'Quantitative Analysis'] },
        { name: 'Developer & Technology', platform: 'Accenture UK', date: 'Jun 28, 2025', why: '', skills: ['SDLC', 'Agile', 'Code Debugging', 'Pseudocode', 'Algorithmic Thinking'] },
      ] as Cert[],
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="certifications" className="py-24 relative">
      <div className="gradient-line" />
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <p className="font-mono text-xs text-primary mb-4 tracking-widest uppercase">Certifications</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-12 tracking-tight text-heading">
              Credentials & achievements.
            </h2>
          </SectionReveal>

          <div className="space-y-2">
            {categories.map((cat, catIdx) => (
              <SectionReveal key={cat.title} delay={catIdx * 0.05}>
                <div className="rounded-xl border border-border/30 bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-colors duration-300 hover:border-primary/30">
                  <button
                    onClick={() => toggle(catIdx)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold tracking-wide text-foreground group-hover:text-primary transition-colors duration-200">
                        {cat.title}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground/60">{cat.certs.length}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === catIdx ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === catIdx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 space-y-3">
                          {cat.certs.map((cert, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: i * 0.03 }}
                              className="border border-border/20 rounded-lg px-4 py-3 bg-card/10"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-foreground">{cert.name}</p>
                                  <p className="text-xs text-muted-foreground/70 mt-0.5">
                                    {cert.platform} · {cert.date}
                                  </p>
                                  {cert.certId && (
                                    <p className="text-[10px] font-mono text-muted-foreground/40 mt-1">ID: {cert.certId}</p>
                                  )}
                                  {cert.why && (
                                    <p className="text-xs text-primary/60 mt-1 italic">{cert.why}</p>
                                  )}
                                  {cert.skills && cert.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                      {cert.skills.map((skill) => (
                                        <span
                                          key={skill}
                                          className="px-2 py-0.5 text-[10px] font-mono border border-primary/20 rounded-md bg-primary/[0.04] text-primary/80"
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
