import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRight, Check, BookOpen, Clock, CalendarDays, GraduationCap, Star } from "lucide-react";
import { useGetStarted, Package } from "@/contexts/GetStartedContext";
import { cn } from "@/lib/utils";

export interface Programme {
  name: Package;
  tag: string;
  price: string;
  tagline: string;
  description: string;
  whoFor: string;
  sessionStructure: string;
  topics: string[];
  outcomes: string[];
  surface: string;
}

interface ProgrammeModalProps {
  programme: Programme | null;
  onClose: () => void;
}

export const ProgrammeModal = ({ programme, onClose }: ProgrammeModalProps) => {
  const { openModal } = useGetStarted();

  const handleGetStarted = () => {
    onClose();
    setTimeout(() => openModal(programme?.name), 200);
  };

  return (
    <DialogPrimitive.Root open={!!programme} onOpenChange={(v) => !v && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 flex flex-col",
            "bg-background rounded-t-[2rem] shadow-elevated max-h-[94dvh]",
            "md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
            "md:rounded-3xl md:w-full md:max-w-[580px] md:max-h-[90dvh]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200"
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            {programme?.name} Programme details
          </DialogPrimitive.Title>

          {/* Drag handle */}
          <div className="flex justify-center pt-3.5 md:hidden shrink-0">
            <div className="w-10 h-1 rounded-full bg-ink/10" />
          </div>

          {/* Coloured header banner */}
          {programme && (
            <>
              <div className={cn("mx-4 md:mx-6 mt-4 md:mt-6 rounded-2xl px-5 py-5 shrink-0 relative overflow-hidden", programme.surface)}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(hsl(var(--ink) / 0.18) 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/60">{programme.tag}</span>
                    <h2 className="text-2xl font-semibold text-ink tracking-tight mt-1">{programme.name} Maths</h2>
                    <p className="text-sm text-ink/70 mt-1 leading-relaxed">{programme.tagline}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-baseline gap-0.5 justify-end">
                      <span className="text-sm text-ink/60">£</span>
                      <span className="text-3xl font-bold text-ink leading-none">{programme.price}</span>
                    </div>
                    <span className="text-[11px] text-ink/50">/month</span>
                  </div>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-5">

                {/* Info pills row */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: Clock, text: "1 hour per session" },
                    { icon: CalendarDays, text: "4 sessions / month" },
                    { icon: BookOpen, text: "Custom learning plan" },
                    { icon: GraduationCap, text: "UK curriculum aligned" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5 bg-background-soft border border-border-soft rounded-full px-3 py-1.5">
                      <Icon className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span className="text-xs font-medium text-ink">{text}</span>
                    </div>
                  ))}
                </div>

                {/* Who it's for */}
                <div>
                  <h3 className="text-sm font-semibold text-ink mb-2">Who is this for?</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{programme.whoFor}</p>
                </div>

                {/* Session structure */}
                <div>
                  <h3 className="text-sm font-semibold text-ink mb-2">How do sessions work?</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{programme.sessionStructure}</p>
                </div>

                {/* Topics */}
                <div>
                  <h3 className="text-sm font-semibold text-ink mb-3">Topics covered</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {programme.topics.map((t) => (
                      <div key={t} className="flex items-center gap-2 bg-background-soft border border-border-soft rounded-xl px-3 py-2.5">
                        <div className="w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-accent" strokeWidth={3} />
                        </div>
                        <span className="text-xs font-medium text-ink leading-snug">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <div>
                  <h3 className="text-sm font-semibold text-ink mb-3">What you can expect</h3>
                  <ul className="space-y-2.5">
                    {programme.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2.5 text-sm text-ink-soft">
                        <Star className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fine print */}
                <p className="text-xs text-ink-soft text-center py-1">
                  Cancel any time · No contracts · No card details required to enquire
                </p>
              </div>

              {/* Footer CTA */}
              <div className="px-4 md:px-6 py-4 border-t border-border-soft shrink-0 flex gap-3 bg-background">
                <button
                  onClick={onClose}
                  className="h-12 px-5 rounded-full border border-border-soft text-sm font-medium text-ink-soft hover:text-ink hover:border-ink/30 transition-all"
                >
                  Close
                </button>
                <button
                  onClick={handleGetStarted}
                  className="flex-1 h-12 rounded-full bg-ink text-background text-sm font-semibold hover:bg-ink-soft flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  Enquire about {programme.name}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="md:hidden" style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
