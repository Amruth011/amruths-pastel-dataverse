import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionReveal from './SectionReveal';

const SkillsSection = () => {
  const categories = [
    { title: 'AI Engineering', skills: ['AI System Design', 'LLM Integration', 'Agent Architecture', 'Multi-Agent Systems', 'Model Optimization', 'Inference Pipelines', 'AI Application Development', 'Responsible AI / AI Safety'] },
    { title: 'Machine Learning', skills: ['Scikit-learn', 'XGBoost', 'LightGBM', 'Model Evaluation', 'Feature Engineering', 'Statistical Analysis', 'A/B Testing'] },
    { title: 'Deep Learning & Frameworks', skills: ['PyTorch', 'TensorFlow', 'Keras', 'Hugging Face', 'Fine-tuning'] },
    { title: 'Data Science', skills: ['Pandas', 'NumPy', 'Data Analysis', 'Data Visualization', 'Hadoop', 'Apache Spark'] },
    { title: 'Agentic AI & RAG', skills: ['LangChain', 'LlamaIndex', 'Vector Databases', 'Prompt Engineering', 'RAG Pipelines', 'OpenAI API'] },
    { title: 'Natural Language Processing', skills: ['Text Processing', 'Embeddings', 'Semantic Search', 'Transformers/BERT/GPT', 'NLP Pipelines'] },
    { title: 'Computer Vision', skills: ['OpenCV', 'CNNs', 'Object Detection (YOLO)', 'Image Segmentation', 'Image Processing', 'OCR Systems'] },
    { title: 'Cloud & MLOps', skills: ['AWS (SageMaker)', 'Azure', 'GCP', 'MLflow', 'Kubernetes', 'Apache Airflow'] },
    { title: 'Tools & DevOps', skills: ['Docker', 'CI/CD Pipelines', 'REST APIs', 'Git/GitHub'] },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleHover = (idx: number) => {
    setOpenIndex(idx);
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="gradient-line" />
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <p className="font-mono text-xs text-primary mb-4 tracking-widest uppercase">Skills</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-12 tracking-tight">
              Technologies I work with.
            </h2>
          </SectionReveal>

          <div className="space-y-2">
            {categories.map((cat, catIdx) => (
              <SectionReveal key={cat.title} delay={catIdx * 0.05}>
                <div className="rounded-xl border border-border/30 bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-colors duration-300 hover:border-primary/30">
                  {/* Header button */}
                  <div
                    onMouseEnter={() => handleHover(catIdx)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left group cursor-default"
                  >
                    <span className="text-sm font-semibold tracking-wide text-foreground group-hover:text-primary transition-colors duration-200">
                      {cat.title}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === catIdx ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                    </motion.div>
                  </div>

                  {/* Collapsible skills */}
                  <AnimatePresence initial={false}>
                    {openIndex === catIdx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 flex flex-wrap gap-2">
                          {cat.skills.map((skill) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              whileHover={{
                                scale: 1.08,
                                borderColor: 'hsl(46 78% 59% / 0.5)',
                                backgroundColor: 'hsl(46 78% 59% / 0.08)',
                              }}
                              className="px-3 py-1.5 text-xs font-mono border border-primary/20 rounded-md bg-primary/[0.04] text-primary/80 cursor-default hover:text-foreground transition-colors duration-200"
                            >
                              {skill}
                            </motion.span>
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

export default SkillsSection;
