import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, ChevronUp, TrendingUp, Database, Cpu, BarChart3, Layers, Zap } from 'lucide-react';
import SectionReveal from './SectionReveal';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  category: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  problem: string;
  solution: string;
  impact: string;
  architecture: string[];
  icon: React.ReactNode;
}

const projects: Project[] = [
  {
    title: "Kannada RAG Agent — Hybrid Search · Reranking · Voice",
    description: "Scanned Kannada novel in → page-cited, hallucination-guarded answers + Kannada voice out. RAGAS-validated.",
    technologies: ["Python", "FastAPI", "ChromaDB", "Rank-BM25", "RRF", "Cross-Encoder", "Surya OCR", "RAGAS", "Sarvam AI TTS", "Groq", "Gemini"],
    githubUrl: "https://github.com/Amruth011/kannada-rag-agent",
    demoUrl: "https://kannada-rag-agent.vercel.app/",
    category: "AI / NLP & CV",
    icon: <Cpu className="h-5 w-5" />,
    highlights: [
      "Generic LLMs hallucinate on low-resource Kannada literature due to data sparsity and complex agglutinative morphology. I engineered a 5-phase grounded pipeline: Surya OCR ingestion, hybrid retrieval (BM25 + dense) fused via Reciprocal Rank Fusion, cross-encoder reranking, deterministic page routing, and a multi-model LLM fallback chain.",
      "Hybrid Retrieval & RRF: Fuses sparse (BM25) and dense vector search to rescue morphologically complex Kannada keywords that pure embeddings miss.",
      "Deterministic Page Routing: Regex intercepts exact-page queries, bypassing semantic search for 100% precision and zero hallucination.",
      "Production Resilience: Gemini → Groq fallback chain absorbs API rate limits; serverless memory optimizations keep peak RAM under 600MB.",
    ],
    metrics: [
      { label: "RAGAS FAITHFULNESS", value: "0.92" },
      { label: "CONTEXT RECALL", value: "0.89" },
      { label: "P50 END-TO-END", value: "2.8s" },
      { label: "PAGES OCR'D", value: "346" },
    ],
    problem: "LLMs hallucinate on low-resource Kannada literature — and pure vector search drops exact names, colloquialisms, and page references.",
    solution: "Hybrid BM25+dense retrieval fused via RRF, cross-encoder reranked, deterministic page routing, and a Gemini→Groq fallback chain over a Surya-OCR corpus.",
    impact: "0.92 faithfulness / 0.89 recall on a 50-query golden set. Page-cited answers + Kannada voice at 2.8s P50, under 600MB RAM on serverless.",
    architecture: ["Surya OCR", "Chunk + Meta", "BM25 ∥ ChromaDB", "RRF", "Cross-Encoder", "LLM Fallback", "Sarvam TTS"],
  },
  {
    title: 'Customer Churn Prediction & Retention ROI System',
    description: 'End-to-end machine learning system for predicting customer churn and optimizing retention campaign ROI.',
    technologies: ['Python', 'XGBoost', 'SHAP', 'Streamlit', 'Docker'],
    githubUrl: 'https://github.com/Amruth011/customer-churn-prediction-retention-roi',
    demoUrl: 'https://customer-churn-prediction-retention-roi-9gkae6bppwug3sjpykbcgd.streamlit.app/',
    category: 'Machine Learning',
    icon: <TrendingUp className="h-5 w-5" />,
    highlights: [
      'Built a full ML pipeline (Excel → EDA → feature engineering → model benchmarking → deployment) achieving AUC-ROC 0.9989 and 98.76% accuracy on imbalanced churn data.',
      'Identified 937 high-risk customers worth ₹47.4L annual revenue and discovered 41.9% churn in the 0–3 month cohort using cohort analysis.',
      'Developed a Streamlit decision-support dashboard with SHAP explainability, a 12-factor What-If simulator, and ROI optimizer projecting 224% campaign ROI.',
    ],
    metrics: [
      { label: 'AUC-ROC', value: '0.9989' },
      { label: 'Accuracy', value: '98.76%' },
      { label: 'Campaign ROI', value: '224%' },
      { label: 'Revenue at Risk', value: '₹47.4L' },
    ],
    problem: 'High customer churn rates leading to significant revenue loss with no systematic way to identify at-risk customers.',
    solution: 'End-to-end ML pipeline with XGBoost classification, SHAP explainability, and a decision-support dashboard for targeted retention.',
    impact: 'Identified 937 high-risk customers, projected 224% ROI on retention campaigns, and enabled data-driven retention strategy.',
    architecture: ['Data Ingestion', 'EDA & Validation', 'Feature Engineering', 'Model Training', 'SHAP Analysis', 'Dashboard Deploy'],
  },
  {
    title: 'Social Media Sentiment Analysis — Distributed PySpark Pipeline',
    description: 'Distributed big-data analytics pipeline for processing and analyzing social media sentiment at scale.',
    technologies: ['Python', 'PySpark', 'Delta Lake', 'Streamlit', 'Docker', 'GitHub Actions'],
    githubUrl: 'https://github.com/Amruth011/Social_Media_Sentiment_Analysis',
    demoUrl: 'https://socialmediasentimentanalysis-9hj7cfkcjjsdky5xwbmzzr.streamlit.app/',
    category: 'Big Data',
    icon: <Database className="h-5 w-5" />,
    highlights: [
      'Designed a PySpark data pipeline replacing manual notebook workflows (CSV → validation → feature engineering → Delta Lake storage).',
      'Implemented data quality validation, schema checks, and fail-fast assertions packaged in modular OOP components with PyTest testing and CI/CD via GitHub Actions.',
      'Built an interactive analytics dashboard visualizing sentiment trends, geographic engagement, platform distribution, and hourly activity insights.',
    ],
    metrics: [
      { label: 'Pipeline', value: 'PySpark' },
      { label: 'Storage', value: 'Delta Lake' },
      { label: 'CI/CD', value: 'Automated' },
      { label: 'Testing', value: 'PyTest' },
    ],
    problem: 'Manual notebook-based workflows couldn\'t scale for processing large social media datasets with proper validation.',
    solution: 'Distributed PySpark pipeline with Delta Lake storage, modular OOP design, and automated CI/CD for reliable data processing.',
    impact: 'Replaced fragile notebooks with a production-grade pipeline enabling real-time sentiment insights across platforms.',
    architecture: ['CSV Ingestion', 'Schema Validation', 'PySpark Processing', 'Feature Engineering', 'Delta Lake', 'Dashboard'],
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [showHighlights, setShowHighlights] = useState(false);

  return (
    <SectionReveal delay={index * 0.15}>
      <motion.div
        className="relative group"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="rounded-xl border border-primary/20 bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-[350ms] ease-out group-hover:border-primary/40 group-hover:shadow-[0_0_40px_hsl(46_78%_59%/0.1)] group-hover:bg-white/[0.05]">
          {/* Header */}
          <div className="p-8 md:p-10">
            {/* Category + Number */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl border border-primary/20 bg-primary/5 text-primary group-hover:shadow-[0_0_20px_hsl(46_78%_59%/0.15)] transition-all duration-500">
                  {project.icon}
                </div>
                <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-primary/70 border border-primary/20 rounded-full bg-primary/5">
                  {project.category}
                </span>
              </div>
              <span className="font-mono text-4xl font-bold text-primary/10 group-hover:text-primary/25 transition-colors duration-500">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground/70 leading-relaxed mb-6 max-w-3xl font-light">
              {project.description}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {project.metrics.map((m) => (
                <div key={m.label} className="px-4 py-3 rounded-xl border border-primary/20 bg-primary/[0.04] group-hover:border-primary/30 group-hover:shadow-[0_0_15px_hsl(46_78%_59%/0.06)] transition-all duration-[350ms]">
                  <p className="text-lg md:text-xl font-bold text-primary font-mono">{m.value}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground/60 font-mono uppercase tracking-wider mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Architecture Pipeline */}
            <div className="mb-6">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">Architecture Pipeline</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {project.architecture.map((stage, i) => (
                  <div key={stage} className="flex items-center gap-1.5">
                    <span className="px-3 py-1.5 text-[10px] md:text-xs font-mono text-muted-foreground border border-primary/25 rounded-lg bg-primary/[0.06] group-hover:border-primary/35 group-hover:text-foreground transition-all duration-[350ms]">
                      {stage}
                    </span>
                    {i < project.architecture.length - 1 && (
                      <span className="text-primary/50 text-xs">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Problem → Solution → Impact (compact) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
              {[
                { title: 'Problem', text: project.problem, icon: <BarChart3 className="h-3.5 w-3.5" /> },
                { title: 'Solution', text: project.solution, icon: <Layers className="h-3.5 w-3.5" /> },
                { title: 'Impact', text: project.impact, icon: <TrendingUp className="h-3.5 w-3.5" /> },
              ].map((item) => (
                <div key={item.title} className="px-3 py-2.5 rounded-lg border border-primary/10 bg-primary/[0.02]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-primary/60">{item.icon}</span>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-primary/60 font-semibold">{item.title}</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground/70 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Expandable Description / Highlights */}
            <button
              onClick={() => setShowHighlights(!showHighlights)}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors duration-300 mb-4"
            >
              {showHighlights ? 'Hide' : 'Show'} Description
              {showHighlights ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
            <AnimatePresence initial={false}>
              {showHighlights && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 mb-6">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex gap-2.5 items-start">
                        <Zap className="h-3 w-3 text-primary/50 mt-1 shrink-0" />
                        <p className="text-[11px] text-muted-foreground/70 leading-relaxed">{h}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-2 py-0.5 text-[10px] font-mono text-primary/80 border border-primary/20 rounded bg-primary/[0.04]">
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono border border-border/50 rounded-lg bg-background/30 text-foreground/80 hover:border-primary/40 hover:text-primary hover:bg-primary/5 hover:shadow-[0_0_20px_hsl(46_78%_59%/0.1)] transition-all duration-300"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono bg-primary text-primary-foreground rounded-lg hover:shadow-[0_0_25px_hsl(46_78%_59%/0.3)] transition-all duration-300"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </SectionReveal>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-28 relative">
      <div className="gradient-line" />
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <p className="font-mono text-xs text-primary mb-4 tracking-widest uppercase">Portfolio</p>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-heading">
              Featured AI Systems.
            </h2>
            <p className="text-muted-foreground/70 text-sm max-w-2xl mb-20 font-light">
              Production-grade AI systems built with end-to-end ML pipelines, distributed computing, and intelligent automation.
            </p>
          </SectionReveal>

          <div className="space-y-10">
            {projects.map((project, idx) => (
              <ProjectCard key={project.title} project={project} index={idx} />
            ))}
          </div>

          <SectionReveal delay={0.5}>
            <div className="mt-16 text-center">
              <a
                href="https://github.com/amruth011?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-mono group px-6 py-3 border border-border/40 rounded-lg hover:border-primary/30 hover:bg-primary/5"
              >
                <Github className="h-4 w-4" />
                View all repositories
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
