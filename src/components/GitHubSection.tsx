import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, GitFork, Star, Code } from 'lucide-react';
import SectionReveal from './SectionReveal';

const USERNAME = 'Amruth011';

type Day = { date: string; count: number; level: number };

const GitHubSection = () => {
  const year = new Date().getFullYear();
  const [days, setDays] = useState<Day[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [repos, setRepos] = useState<number | null>(null);
  const [stars, setStars] = useState<number | null>(null);
  const [languages, setLanguages] = useState<{ name: string; percentage: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadContributions = async () => {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${year}`);
        if (!res.ok) throw new Error('failed');
        const json = await res.json();
        if (!active) return;
        setDays(json.contributions ?? []);
        setTotal(json.total?.[String(year)] ?? null);
      } catch {
        /* keep empty state */
      } finally {
        if (active) setLoading(false);
      }
    };

    const loadRepos = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`);
        if (!res.ok) throw new Error('failed');
        const json: { stargazers_count: number; language: string | null; fork: boolean }[] = await res.json();
        if (!active || !Array.isArray(json)) return;
        const own = json.filter((r) => !r.fork);
        setRepos(own.length);
        setStars(own.reduce((sum, r) => sum + (r.stargazers_count || 0), 0));

        const counts = new Map<string, number>();
        own.forEach((r) => {
          if (r.language) counts.set(r.language, (counts.get(r.language) || 0) + 1);
        });
        const totalLang = Array.from(counts.values()).reduce((a, b) => a + b, 0);
        if (totalLang > 0) {
          setLanguages(
            Array.from(counts.entries())
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([name, c]) => ({ name, percentage: Math.round((c / totalLang) * 100) }))
          );
        }
      } catch {
        /* keep empty state */
      }
    };

    loadContributions();
    loadRepos();
    return () => {
      active = false;
    };
  }, [year]);

  // group days into weeks aligned to weekday index
  const weeks = useMemo(() => {
    if (!days.length) return [] as (Day | null)[][];
    const result: (Day | null)[][] = [];
    let current: (Day | null)[] = new Array(new Date(days[0].date).getDay()).fill(null);
    days.forEach((d) => {
      current.push(d);
      if (current.length === 7) {
        result.push(current);
        current = [];
      }
    });
    if (current.length) {
      while (current.length < 7) current.push(null);
      result.push(current);
    }
    return result;
  }, [days]);

  const monthLabels = useMemo(() => {
    const labels: { index: number; label: string }[] = [];
    let last = -1;
    weeks.forEach((week, i) => {
      const first = week.find((d) => d);
      if (!first) return;
      const m = new Date(first.date).getMonth();
      if (m !== last) {
        labels.push({ index: i, label: new Date(first.date).toLocaleString('en', { month: 'short' }) });
        last = m;
      }
    });
    return labels;
  }, [weeks]);

  const getColor = (level: number) => {
    const colors = ['bg-card/80', 'bg-primary/15', 'bg-primary/35', 'bg-primary/55', 'bg-primary/85'];
    return colors[level] || colors[0];
  };

  const langColors = ['bg-blue-500', 'bg-orange-500', 'bg-emerald-500', 'bg-yellow-500', 'bg-muted-foreground/30'];

  const stats = [
    { icon: <GitFork className="h-5 w-5" />, label: 'Repositories', value: repos !== null ? String(repos) : '—' },
    { icon: <Star className="h-5 w-5" />, label: 'Stars Earned', value: stars !== null ? String(stars) : '—' },
    {
      icon: <Code className="h-5 w-5" />,
      label: `Contributions ${year}`,
      value: total !== null ? total.toLocaleString() : '—',
    },
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
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -4, borderColor: 'hsl(46 78% 59% / 0.3)' }}
                  transition={{ duration: 0.2 }}
                  className="border border-border rounded-lg p-4 md:p-6 bg-card/20 text-center glow-card"
                >
                  <div className="flex items-center justify-center mb-3 text-primary/70">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold mb-1 tracking-tight">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground font-mono uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionReveal>

          {/* Contribution Heatmap */}
          <SectionReveal delay={0.2}>
            <div className="border border-border rounded-lg p-4 md:p-6 bg-card/20 mb-4">
              <div className="flex items-center gap-2 mb-5">
                <Github className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-mono">
                  {total !== null ? `${total.toLocaleString()} contributions in ${year}` : `Contribution activity ${year}`}
                </span>
              </div>

              <div className="overflow-x-auto pb-2">
                <div className="min-w-[700px]">
                  <div className="relative h-4 mb-1">
                    {monthLabels.map((m) => (
                      <span
                        key={`${m.label}-${m.index}`}
                        className="absolute text-[10px] text-muted-foreground/70 font-mono"
                        style={{ left: `${m.index * 14}px` }}
                      >
                        {m.label}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-[3px]">
                    {loading && <div className="text-xs text-muted-foreground font-mono">Loading activity…</div>}
                    {weeks.map((week, weekIdx) => (
                      <div key={weekIdx} className="flex flex-col gap-[3px]">
                        {week.map((day, dayIdx) => (
                          <motion.div
                            key={dayIdx}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: weekIdx * 0.004, duration: 0.2 }}
                            title={day ? `${day.count} contributions on ${day.date}` : undefined}
                            className={`w-[11px] h-[11px] rounded-[2px] ${
                              day ? getColor(day.level) : 'bg-transparent'
                            } transition-colors duration-200 hover:ring-1 hover:ring-primary/40`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
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
          {languages.length > 0 && (
            <SectionReveal delay={0.3}>
              <div className="border border-border rounded-lg p-4 md:p-6 bg-card/20">
                <p className="text-sm text-muted-foreground mb-4 font-mono">Top Languages</p>

                <div className="flex rounded-full overflow-hidden h-2.5 mb-4 bg-card">
                  {languages.map((lang, i) => (
                    <motion.div
                      key={lang.name}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={langColors[i]}
                    />
                  ))}
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {languages.map((lang, i) => (
                    <div key={lang.name} className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${langColors[i]}`} />
                      <span className="text-xs text-muted-foreground">
                        {lang.name} <span className="font-mono text-foreground/60">{lang.percentage}%</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          )}

          <SectionReveal delay={0.4}>
            <div className="mt-10 text-center">
              <a
                href={`https://github.com/${USERNAME}`}
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
