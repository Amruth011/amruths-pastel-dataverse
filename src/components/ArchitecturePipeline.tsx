import { ChevronRight, ChevronDown } from 'lucide-react';

interface ArrowProps {
  className?: string;
}

const Arrow = ({ className = '' }: ArrowProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
      {/* Desktop: right arrow */}
      <ChevronRight className="hidden md:block w-4 h-4 text-slate-500" />
      {/* Mobile: down arrow */}
      <ChevronDown className="block md:hidden w-4 h-4 text-slate-500" />
    </div>
  );
};

interface ArchitecturePipelineProps {
  steps: string[];
}

const ArchitecturePipeline = ({ steps }: ArchitecturePipelineProps) => {
  if (!steps.length) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2 p-4 bg-slate-900/50 rounded-xl border border-slate-800 overflow-x-auto">
      {steps.map((step, index) => (
        <div key={`${step}-${index}`} className="contents">
          <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-slate-200 whitespace-nowrap shadow-sm hover:bg-slate-700 transition-colors">
            {step}
          </div>
          {index < steps.length - 1 && <Arrow />}
        </div>
      ))}
    </div>
  );
};

export default ArchitecturePipeline;
