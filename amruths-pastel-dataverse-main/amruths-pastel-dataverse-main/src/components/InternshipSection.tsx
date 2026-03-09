import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import SectionReveal from './SectionReveal';

const InternshipSection = () => {
  const experiences = [
    {
      company: 'iStudio',
      role: 'Data Science Intern',
      period: 'February 2026 – Present',
      mode: 'Remote',
      current: true,
      description: [
        'Built a sales forecasting model using Python and scikit-learn, achieving 92% accuracy through feature engineering and hyperparameter tuning.',
        'Designed and deployed interactive Streamlit dashboards that visualized key business metrics, enabling data-driven decision-making for stakeholders.',
        'Automated data preprocessing pipelines handling 50K+ records — reducing manual cleaning time by 70% with pandas and NumPy.',
        'Conducted statistical analysis and A/B testing to identify revenue-driving patterns, delivering actionable insights to the team.',
        'Owned the full data science lifecycle end-to-end: from problem scoping and data wrangling to model deployment and stakeholder presentation.',
      ],
      skills: ['Python', 'Machine Learning', 'Data Analysis', 'Data Visualization', 'Statistics', 'Streamlit'],
      impact: 'Delivered production-ready ML models and analytics dashboards that directly supported business decisions, demonstrating end-to-end data science capability.',
    },
  ];

  return (
    <section id="internship" className="py-24 relative">
      <div className="gradient-line" />
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <p className="font-mono text-xs text-primary mb-4 tracking-widest uppercase">Current Role</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-16 tracking-tight">
              Internship
            </h2>
          </SectionReveal>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <SectionReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="relative pl-12 md:pl-24 group"
                >
                  {/* Timeline line */}
                  <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-border" />

                  {/* Dot */}
                  <motion.div
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-4 md:left-8 top-6 w-3 h-3 rounded-full bg-primary -translate-x-[5px] shadow-[0_0_16px_hsl(46_78%_59%/0.6)]"
                  />
                  {exp.current && (
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute left-4 md:left-8 top-6 w-3 h-3 rounded-full bg-primary -translate-x-[5px]"
                    />
                  )}

                  {/* Card */}
                  <div className="rounded-xl border border-primary/20 bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_40px_hsl(46_78%_59%/0.1)] group-hover:bg-white/[0.05]">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Briefcase className="h-4 w-4 text-primary" />
                          <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                            {exp.company}
                          </h3>
                          {exp.current && (
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

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-3">
                          <ArrowUpRight className="h-3 w-3 mt-1 text-primary/50 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {exp.impact && (
                      <div className="mb-4 p-3 rounded-lg bg-primary/[0.05] border border-primary/10">
                        <p className="text-xs font-mono text-primary/70 mb-1 uppercase tracking-wider">Impact</p>
                        <p className="text-sm text-muted-foreground">{exp.impact}</p>
                      </div>
                    )}

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
    </section>
  );
};

export default InternshipSection;
