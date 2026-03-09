import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Github, GitFork, Star, Code } from 'lucide-react';
import SectionReveal from './SectionReveal';

const GitHubSection = () => {
  const heatmapData = useMemo(() => {
    const data: number[][] = [];
    for (let week = 0; week < 52; week++) {
      const weekData: number[] = [];
      for (let day = 0; day < 7; day++) {
        const rand = Math.random();
        if (rand < 0.25) weekData.push(0);
        else if (rand < 0.5) weekData.push(1);
        else if (rand < 0.75) weekData.push(2);
        else if (rand < 0.92) weekData.push(3);
        else weekData.push(4);
      }
      data.push(weekData);
    }
    return data;
  }, []);

  const getColor = (level: number) => {
    const colors = [
      'bg-card/80',
      'bg-primary/15',
      'bg-primary/35',
      'bg-primary/55',
      'bg-primary/85',
    ];
    return colors[level] || colors[0];
  };

  const topLanguages = [
    { name: 'Python', percentage: 62, color: 'bg-blue-500' },
    { name: 'Jupyter Notebook', percentage: 18, color: 'bg-orange-500' },
    { name: 'SQL', percentage: 10, color: 'bg-emerald-500' },
    { name: 'JavaScript', percentage: 6, color: 'bg-yellow-500' },
    { name: 'Other', percentage: 4, color: 'bg-muted-foreground/20' },
  ];

  const stats = [
    { icon: <GitFork className="h-5 w-5" />, label: 'Repositories', value: '15+' },
    { icon: <Star className="h-5 w-5" />, label: 'Stars Earned', value: '20+' },
    { icon: <Code className="h-5 w-5" />, label: 'Contributions', value: '300+' },
  ];

  return (
    <section id="github" className="py-24 relative">
      <div className="gradient-line" />
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <p className="font-mono text-xs text-primary mb-4 tracking-widest uppercase">GitHub</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-16 tracking-tight text-heading">
              Open source & activity.
            </h2>
          </SectionReveal>

          {/* Stats */}
          <SectionReveal delay={0.1}>
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -4, borderColor: 'hsl(46 78% 59% / 0.3)' }}
                  transition={{ duration: 0.2 }}
                  className="border border-border rounded-lg p-4 md:p-6 bg-card/20 text-center glow-card"
                >
                  <div className="flex items-center justify-center mb-3 text-primary/70">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold mb-1 tracking-tight">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground font-mono uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </SectionReveal>

          {/* Contribution Heatmap */}
          <SectionReveal delay={0.2}>
            <div className="border border-border rounded-lg p-4 md:p-6 bg-card/20 mb-4">
              <div className="flex items-center gap-2 mb-5">
                <Github className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-mono">Contribution activity</span>
              </div>

              <div className="overflow-x-auto pb-2">
                <div className="flex gap-[3px] min-w-[700px]">
                  {heatmapData.map((week, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-[3px]">
                      {week.map((level, dayIdx) => (
                        <motion.div
                          key={dayIdx}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: weekIdx * 0.005 + dayIdx * 0.002, duration: 0.2 }}
                          className={`w-[11px] h-[11px] rounded-[2px] ${getColor(level)} transition-colors duration-200 hover:ring-1 hover:ring-primary/40`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 justify-end">
                <span className="text-[10px] text-muted-foreground/60 font-mono">Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <div key={level} className={`w-[11px] h-[11px] rounded-[2px] ${getColor(level)}`} />
                ))}
                <span className="text-[10px] text-muted-foreground/60 font-mono">More</span>
              </div>
            </div>
          </SectionReveal>

          {/* Top Languages */}
          <SectionReveal delay={0.3}>
            <div className="border border-border rounded-lg p-4 md:p-6 bg-card/20">
              <p className="text-sm text-muted-foreground mb-4 font-mono">Top Languages</p>

              <div className="flex rounded-full overflow-hidden h-2.5 mb-4 bg-card">
                {topLanguages.map((lang) => (
                  <motion.div
                    key={lang.name}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`${lang.color}`}
                  />
                ))}
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {topLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${lang.color}`} />
                    <span className="text-xs text-muted-foreground">
                      {lang.name} <span className="font-mono text-foreground/60">{lang.percentage}%</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.4}>
            <div className="mt-10 text-center">
              <a
                href="https://github.com/Amruth011"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-mono group"
              >
                <Github className="h-4 w-4" />
                View full profile on GitHub
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
