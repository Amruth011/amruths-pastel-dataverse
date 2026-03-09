import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import SectionReveal from './SectionReveal';

interface Experience {
  company: string;
  role: string;
  period: string;
  mode: string;
  description: string[];
  skills: string[];
  impact?: string;
  isCurrent?: boolean;
}

const ExperienceSection = () => {
  const experiences: Experience[] = [
    {
      company: 'BCG',
      role: 'GenAI Job Simulation',
      period: '2025',
      mode: 'Virtual',
      description: [
        'Completed a job simulation focused on AI-powered financial chatbot development for BCG\'s GenAI consulting team.',
        'Developed Python-based solutions using pandas for financial data manipulation and analysis.',
        'Integrated and interpreted complex financial datasets from 10-K and 10-Q regulatory reports to extract meaningful insights.',
        'Designed a rule-based financial chatbot prototype that translates complex financial information into user-friendly analysis and insights.',
      ],
      skills: ['GenAI', 'Financial Analytics', 'Python', 'pandas', 'Chatbot Development', 'Data Analysis'],
    },
    {
      company: 'Tata',
      role: 'GenAI Powered Data Analytics Simulation',
      period: '2025',
      mode: 'Virtual',
      description: [
        'Completed a job simulation on AI-powered data analytics and strategy for the Financial Services team',
        'Conducted exploratory data analysis (EDA) using GenAI tools to identify customer risk indicators',
        'Designed an AI-driven collections strategy incorporating predictive models, ethical AI, and regulatory compliance',
      ],
      skills: ['AI Analytics', 'AI Strategy', 'Predictive Analytics', 'EDA', 'Ethical Reasoning'],
    },
    {
      company: 'PwC Switzerland',
      role: 'Data Analytics Virtual Intern',
      period: 'Mar 2025',
      mode: 'Virtual',
      description: [
        'Analyzed call center trends and customer satisfaction metrics',
        'Built comprehensive Power BI dashboards for performance tracking',
        'Implemented data visualization best practices for stakeholder reporting',
      ],
      skills: ['Power BI', 'Data Analysis', 'Dashboard Design'],
    },
    {
      company: 'Accenture',
      role: 'Data Analytics Virtual Intern',
      period: 'Mar 2025 – Jun 2025',
      mode: 'Virtual',
      description: [
        'Performed extensive data cleaning and preprocessing tasks',
        'Developed predictive models for business insights',
        'Created interactive visualizations for data storytelling',
      ],
      skills: ['Python', 'Data Modeling', 'Visualization'],
    },
    {
      company: 'Deloitte Australia',
      role: 'Data Analytics Virtual Intern',
      period: 'Jun 2025',
      mode: 'Virtual',
      description: [
        'Conducted analytics simulation projects for real-world scenarios',
        'Utilized Tableau for advanced data visualization',
        'Performed data classification and pattern recognition using Excel',
      ],
      skills: ['Tableau', 'Excel', 'Analytics'],
    },
  ];

  return (
    <section id="experience" className="py-24 relative">
      <div className="gradient-line" />
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <p className="font-mono text-xs text-primary mb-4 tracking-widest uppercase">Career</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-16 tracking-tight">
              Professional Experience
            </h2>
          </SectionReveal>

          <div className="relative">
            {/* Glowing timeline line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-border" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <SectionReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="relative pl-12 md:pl-24 group"
                  >
                    {/* Timeline dot */}
                    <motion.div
                      whileInView={{ scale: [0, 1.3, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`absolute left-4 md:left-8 top-6 w-3 h-3 rounded-full -translate-x-[5px] ${
                        exp.isCurrent
                          ? 'bg-primary shadow-[0_0_16px_hsl(46_78%_59%/0.6)]'
                          : 'bg-primary/50 shadow-[0_0_8px_hsl(46_78%_59%/0.3)]'
                      }`}
                    />
                    {exp.isCurrent && (
                      <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute left-4 md:left-8 top-6 w-3 h-3 rounded-full bg-primary -translate-x-[5px]"
                      />
                    )}

                    {/* Card */}
                    <div className="rounded-xl border border-border/30 bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_40px_hsl(46_78%_59%/0.1)] group-hover:bg-white/[0.05]">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Briefcase className="h-4 w-4 text-primary" />
                            <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                              {exp.company}
                            </h3>
                            {exp.isCurrent && (
                              <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-primary/20 text-primary rounded-full border border-primary/30">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-medium text-foreground/80">{exp.role}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1 font-mono">
                            <Calendar className="h-3 w-3" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {exp.mode}
                          </span>
                        </div>
                      </div>

                      {/* Contributions */}
                      <ul className="space-y-2 mb-4">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-3">
                            <ArrowUpRight className="h-3 w-3 mt-1 text-primary/50 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* Impact */}
                      {exp.impact && (
                        <div className="mb-4 p-3 rounded-lg bg-primary/[0.05] border border-primary/10">
                          <p className="text-xs font-mono text-primary/70 mb-1 uppercase tracking-wider">Impact</p>
                          <p className="text-sm text-muted-foreground">{exp.impact}</p>
                        </div>
                      )}

                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span key={skill} className="px-2.5 py-1 text-xs font-mono text-primary/80 border border-primary/20 rounded-md bg-primary/[0.04] hover:bg-primary/10 hover:border-primary/40 transition-colors duration-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
