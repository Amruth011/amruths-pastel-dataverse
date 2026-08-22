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
    { icon: <GitFork className="h-3.5 w-3.5" />, label: 'Repos', value: repos !== null ? String(repos) : '—' },
    { icon: <Star className="h-3.5 w-3.5" />, label: 'Stars', value: stars !== null ? String(stars) : '—' },
    { icon: <Code className="h-3.5 w-3.5" />, label: `${year}`, value: total !== null ? total.toLocaleString() : '—' },
  ];

  return (
    <section id="github" className="py-14 relative">
      <div className="gradient-line" />
      <div className="container mx-auto px-4 pt-10">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <p className="font-mono text-xs text-primary mb-3 tracking-widest uppercase">GitHub</p>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-8 tracking-tight text-heading">
              Open source & activity.
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="border border-border rounded-xl p-4 md:p-5 bg-card/20">
              {/* Compact header with stats */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-mono">
                    {total !== null ? `${total.toLocaleString()} contributions in ${year}` : `Contribution activity ${year}`}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border/50 bg-background/30 text-[11px] font-mono"
                    >
                      <span className="text-primary/70">{stat.icon}</span>
                      <span className="text-foreground/80 font-semibold">{stat.value}</span>
                      <span className="text-muted-foreground/70">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Heatmap */}
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[560px]">
                  <div className="relative h-3 mb-1">
                    {monthLabels.map((m) => (
                      <span
                        key={`${m.label}-${m.index}`}
                        className="absolute text-[9px] text-muted-foreground/70 font-mono"
                        style={{ left: `${m.index * 11.5}px` }}
                      >
                        {m.label}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-[2px]">
                    {loading && <div className="text-xs text-muted-foreground font-mono">Loading activity…</div>}
                    {weeks.map((week, weekIdx) => (
                      <div key={weekIdx} className="flex flex-col gap-[2px]">
                        {week.map((day, dayIdx) => (
                          <motion.div
                            key={dayIdx}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: weekIdx * 0.003, duration: 0.2 }}
                            title={day ? `${day.count} contributions on ${day.date}` : undefined}
                            className={`w-[9px] h-[9px] rounded-[2px] ${
                              day ? getColor(day.level) : 'bg-transparent'
                            } transition-colors duration-200 hover:ring-1 hover:ring-primary/40`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legend + languages */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-3 border-t border-border/40">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-muted-foreground/60 font-mono">Less</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div key={level} className={`w-[9px] h-[9px] rounded-[2px] ${getColor(level)}`} />
                  ))}
                  <span className="text-[9px] text-muted-foreground/60 font-mono">More</span>
                </div>

                {languages.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    {languages.map((lang, i) => (
                      <div key={lang.name} className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${langColors[i]}`} />
                        <span className="text-[11px] text-muted-foreground">
                          {lang.name} <span className="font-mono text-foreground/60">{lang.percentage}%</span>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="mt-6 text-center">
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
