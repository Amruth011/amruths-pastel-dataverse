import { motion } from 'framer-motion';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import SectionReveal from './SectionReveal';

interface BlogPost {
  title: string;
  excerpt: string;
  meta: string;
  cta: string;
  url: string;
  tags: string[];
}

const posts: BlogPost[] = [
  {
    title: 'Why Pure Vector Search Fails on Kannada Literature — And How Hybrid RRF Fixed It',
    excerpt: 'Hybrid RAG teardown — BM25 + dense search, RRF fusion, cross-encoder reranking, and deterministic page routing. Validated at 0.92 RAGAS faithfulness.',
    meta: 'Dev.to · ~12 min read · RAG · Hybrid Search · NLP',
    cta: 'Read on Dev.to →',
    url: 'https://dev.to/amruth/why-pure-vector-search-fails-on-kannada-literature-and-how-hybrid-rrf-fixed-it-56jj',
    tags: ['RAG', 'Hybrid Search', 'Kannada NLP', 'RRF'],
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-28 relative">
      <div className="gradient-line" />
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <p className="font-mono text-xs text-primary mb-4 tracking-widest uppercase">Writing</p>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-heading">
              Notes on AI Systems.
            </h2>
            <p className="text-muted-foreground/70 text-sm max-w-2xl mb-20 font-light">
              Deep dives into production RAG, agentic systems, and lessons from building real-world AI products.
            </p>
          </SectionReveal>

          <div className="space-y-10">
            {posts.map((post, index) => (
              <SectionReveal key={post.title} delay={index * 0.15}>
                <motion.a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <div className="rounded-xl border border-primary/20 bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-[350ms] ease-out group-hover:border-primary/40 group-hover:shadow-[0_0_40px_hsl(46_78%_59%/0.1)] group-hover:bg-white/[0.05] p-8 md:p-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-2.5 rounded-xl border border-primary/20 bg-primary/5 text-primary group-hover:shadow-[0_0_20px_hsl(46_78%_59%/0.15)] transition-all duration-500">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <span className="px-3 py-1 mt-1 text-[10px] font-mono uppercase tracking-[0.2em] text-primary/70 border border-primary/20 rounded-full bg-primary/5">
                        Latest
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground/70 leading-relaxed mb-6 max-w-3xl font-light">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-mono text-primary/80 border border-primary/20 rounded bg-primary/[0.04]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-primary/10">
                      <p className="text-[11px] font-mono text-muted-foreground/60 uppercase tracking-wider">
                        {post.meta}
                      </p>
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono border border-border/50 rounded-lg bg-background/30 text-foreground/80 group-hover:border-primary/40 group-hover:text-primary group-hover:bg-primary/5 group-hover:shadow-[0_0_20px_hsl(46_78%_59%/0.1)] transition-all duration-300">
                        {post.cta}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </motion.a>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
