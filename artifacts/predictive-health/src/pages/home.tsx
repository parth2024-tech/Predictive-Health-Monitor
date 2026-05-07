import type { ReactNode } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Shield, Activity, Bell, Cpu, Battery, HardDrive,
  Fan, Wifi, Info, Download, Brain, FileText,
  CheckCircle2, AlertTriangle, TrendingDown, ChevronRight
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    icon: Download,
    title: "Install & forget",
    subtitle: "30 seconds. Then nothing.",
    description:
      "Install the lightweight background agent. It runs silently, consuming less than 1% CPU. No setup wizards, no dashboards to configure. It starts watching immediately — you don't need to do anything else.",
    detail: "Uses Windows system APIs to collect sensor data every 60 seconds. No third-party drivers required.",
  },
  {
    number: "02",
    icon: Brain,
    title: "PredictPC learns your machine",
    subtitle: "Days 1–14: Building your baseline.",
    description:
      "Every laptop is different. Yours runs hotter when charging. Your fan ramps earlier. Your battery drains faster on Zoom calls. PredictPC maps all of that — building a model of what 'normal' looks like specifically for you.",
    detail: "After 14 days, your personal baseline is locked in. Predictions start from Day 1 but sharpen considerably by Week 2.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Your first health report arrives",
    subtitle: "Sunday morning. Plain English. Two minutes.",
    description:
      "Every Sunday you get a short, honest summary of how your machine is doing. No jargon. No scare tactics. Just clear signals: what's fine, what's worth watching, and what you should act on this week.",
    detail: "Alerts appear immediately when something urgent is detected — you don't wait for Sunday if it can't wait.",
  },
];

const REPORT_ITEMS = [
  {
    status: "good" as const,
    icon: CheckCircle2,
    category: "Battery",
    message: "Holding strong at 91% original capacity. Well above average for a 14-month-old laptop.",
    tag: "No action needed",
  },
  {
    status: "watch" as const,
    icon: TrendingDown,
    category: "SSD Health",
    message: "Write endurance is at 74%. At your current usage rate, you have roughly 18–24 months before significant degradation begins.",
    tag: "Worth watching",
  },
  {
    status: "warn" as const,
    icon: AlertTriangle,
    category: "Thermal Pattern",
    message: "Your CPU has been thermal throttling during video calls for the past 6 days. This suggests your cooling vents may need cleaning.",
    tag: "Act this week",
  },
  {
    status: "good" as const,
    icon: CheckCircle2,
    category: "RAM & Memory",
    message: "Memory pressure is normal. No background apps are silently consuming resources.",
    tag: "No action needed",
  },
  {
    status: "coach" as const,
    icon: Bell,
    category: "Habit tip",
    message: "You've left your laptop plugged in at 100% charge for 9 of the last 14 nights. Keeping charge between 20–80% can significantly extend battery life.",
    tag: "Coaching",
  },
];

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 rounded-none py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-xl tracking-tight">PredictPC</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">How it works</a>
          <Button variant="default" className="rounded-full px-6 font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
            Download Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-medium text-primary mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Silently monitoring
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-[1.1] tracking-tight mb-8">
            Know before <br />
            <span className="text-gradient">it breaks.</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
            The quiet, intelligent guardian for your Windows PC. We learn your machine's unique heartbeat to predict hardware failures weeks before they happen.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 py-6 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto shadow-[0_0_40px_-10px_rgba(0,229,255,0.5)]">
              Get PredictPC Free
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-semibold bg-transparent border-white/20 hover:bg-white/5 w-full sm:w-auto">
              See How It Works
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Windows 10 & 11 • Zero impact on performance</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden glass-panel border-white/20 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
          <img src="/dashboard-mockup.png" alt="PredictPC Dashboard UI" className="w-full h-full object-cover object-top" />
        </motion.div>
      </section>

      {/* Philosophy / Plain English */}
      <section className="py-24 px-6 md:px-12 bg-card/50 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">No tech jargon.<br />Just plain English.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Most PC diagnostic tools look like they were built for aerospace engineers. We believe you shouldn't need a computer science degree to understand your own computer.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              PredictPC translates complex thermal dynamics, memory pressure, and SMART metrics into simple, actionable advice. Like a trusted mechanic telling you exactly what's wrong and what to do next.
            </p>

            <div className="glass-panel p-6 rounded-xl relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
              <p className="font-medium">Instead of: <span className="text-muted-foreground font-mono text-sm ml-2">ERR_SSD_WEAR_LEVEL_CRITICAL_THRESHOLD</span></p>
              <div className="h-px bg-white/10 my-4" />
              <p className="font-medium text-primary">We say: <span className="text-foreground ml-2">"Your storage drive is showing signs of age. You should back up your family photos this week."</span></p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden glass-panel"
          >
            <img src="/hero-core.png" alt="Intelligent Core" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Proactive, not reactive.</h2>
          <p className="text-xl text-muted-foreground">
            We don't wait for things to crash. By learning your specific machine's behavior, we spot the invisible warning signs weeks in advance.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          <FeatureCard icon={<Activity className="w-6 h-6 text-primary" />} title="Learns YOUR Normal" description="We don't use global averages. PredictPC learns what 'normal' looks like for your specific usage patterns and hardware combination." />
          <FeatureCard icon={<Info className="w-6 h-6 text-primary" />} title="Weekly Health Letter" description="Get a beautifully formatted, 2-minute read every Sunday summarizing your PC's health. No spam, just signal." />
          <FeatureCard icon={<Shield className="w-6 h-6 text-primary" />} title="Cross-Correlated Data" description="We don't just look at temperature. We look at how temperature, fan speed, and CPU voltage interact together to spot hidden issues." />
          <FeatureCard icon={<Bell className="w-6 h-6 text-primary" />} title="Relevant Coaching" description="We only show tips that matter to your current situation. If your battery is degrading because you leave it plugged in at 100%, we'll gently let you know." />
          <FeatureCard icon={<HardDrive className="w-6 h-6 text-primary" />} title="Weeks of Warning" description="Catch SSD degradation, failing cooling systems, and dying batteries weeks or months before you actually feel the impact." />
          <FeatureCard icon={<Cpu className="w-6 h-6 text-primary" />} title="Gets Smarter Over Time" description="The longer PredictPC runs in the background, the more accurate its predictions become as it builds a deeper model of your machine." />
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-32 px-6 md:px-12 relative bg-card/30 border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(0,229,255,0.06),transparent)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">How it works</h2>
            <p className="text-xl text-muted-foreground">
              Three stages. Zero effort on your end.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Step selector */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col gap-4"
            >
              {HOW_IT_WORKS_STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = activeStep === i;
                return (
                  <motion.button
                    key={i}
                    variants={fadeInUp}
                    onClick={() => setActiveStep(i)}
                    data-testid={`step-button-${i}`}
                    className={`text-left w-full rounded-2xl p-6 transition-all duration-300 border cursor-pointer ${
                      isActive
                        ? "glass-panel border-primary/40 shadow-[0_0_30px_-8px_rgba(0,229,255,0.3)]"
                        : "border-white/5 hover:border-white/10 bg-transparent hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isActive ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`text-xs font-mono font-bold tracking-widest transition-colors ${isActive ? "text-primary" : "text-muted-foreground/50"}`}>{step.number}</span>
                          <span className={`font-display font-bold text-lg transition-colors ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{step.title}</span>
                        </div>
                        <p className={`text-sm transition-colors ${isActive ? "text-primary/80" : "text-muted-foreground/50"}`}>{step.subtitle}</p>
                      </div>
                      <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-1 transition-all duration-300 ${isActive ? "text-primary rotate-90" : "text-muted-foreground/30"}`} />
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Step detail panel */}
            <div className="lg:sticky lg:top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-panel rounded-3xl p-10 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

                  <div className="relative z-10">
                    <span className="text-[80px] font-display font-black text-primary/10 leading-none block mb-4 select-none">
                      {HOW_IT_WORKS_STEPS[activeStep].number}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">
                      {HOW_IT_WORKS_STEPS[activeStep].title}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-6">
                      {HOW_IT_WORKS_STEPS[activeStep].subtitle}
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {HOW_IT_WORKS_STEPS[activeStep].description}
                    </p>
                    <div className="border-t border-white/10 pt-6">
                      <p className="text-sm text-muted-foreground/70 italic">
                        {HOW_IT_WORKS_STEPS[activeStep].detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Step dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {HOW_IT_WORKS_STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    data-testid={`step-dot-${i}`}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${activeStep === i ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WEEKLY HEALTH REPORT MOCKUP */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-medium text-primary mb-6">
              <FileText className="w-3.5 h-3.5" />
              Every Sunday morning
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Your weekly health report.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              Delivered like a letter from someone who actually cares about your machine. Plain language, no alerts, no panic — just a clear picture of where things stand.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Takes two minutes to read. Gives you everything you need to know.
            </p>

            <div className="flex flex-col gap-3">
              {(["Good" , "Worth watching", "Act this week", "Coaching tip"] as const).map((label, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    label === "Good" ? "bg-emerald-400" :
                    label === "Worth watching" ? "bg-blue-400" :
                    label === "Act this week" ? "bg-amber-400" : "bg-primary"
                  }`} />
                  <span className="text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Report card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
              {/* Report header */}
              <div className="px-8 pt-8 pb-6 border-b border-white/10">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-1">Weekly Health Report</p>
                    <h3 className="text-xl font-display font-bold">Your PC is mostly well.</h3>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="text-xs text-amber-400 font-medium">1 action needed</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Sunday, May 4, 2026 &nbsp;·&nbsp; 14-day model &nbsp;·&nbsp; 9 sensors active</p>
              </div>

              {/* Report items */}
              <div className="divide-y divide-white/5">
                {REPORT_ITEMS.map((item, i) => {
                  const Icon = item.icon;
                  const colors = {
                    good: { dot: "bg-emerald-400", tag: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
                    watch: { dot: "bg-blue-400", tag: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
                    warn: { dot: "bg-amber-400", tag: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
                    coach: { dot: "bg-primary", tag: "text-primary bg-primary/10 border-primary/20" },
                  }[item.status];

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="px-8 py-5 flex gap-4 items-start hover:bg-white/[0.015] transition-colors"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 ${colors.dot}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-sm font-semibold">{item.category}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colors.tag}`}>{item.tag}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.message}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Report footer */}
              <div className="px-8 py-5 border-t border-white/10 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Next report in 6 days</p>
                <div className="flex items-center gap-1 text-primary text-xs font-medium">
                  <span>Full history</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What we monitor */}
      <section className="py-32 px-6 md:px-12 bg-black relative border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Watching every vital sign.</h2>
              <p className="text-xl text-muted-foreground mb-12">
                We monitor dozens of sensors silently in the background, consuming less than 1% of your CPU.
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <MonitorItem icon={<Battery />} label="Battery Health & Cycles" />
                <MonitorItem icon={<HardDrive />} label="SSD/HDD Lifespan" />
                <MonitorItem icon={<Cpu />} label="CPU Thermals & Throttling" />
                <MonitorItem icon={<Fan />} label="Fan Curves & Acoustics" />
                <MonitorItem icon={<Activity />} label="Memory Pressure" />
                <MonitorItem icon={<Wifi />} label="Network Stability" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-full flex items-center justify-center"
            >
              <img src="/cross-correlation.png" alt="Data Nodes" className="w-full h-full object-cover rounded-full mix-blend-screen opacity-80" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 md:px-12 relative text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto glass-panel p-12 md:p-16 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Ready for peace of mind?</h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of users who trust PredictPC to watch over their machines. Download now and get your first health report in 7 days.
            </p>
            <Button size="lg" className="rounded-full px-10 py-7 text-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_40px_-10px_rgba(0,229,255,0.6)]" data-testid="button-download-cta">
              Download for Windows
            </Button>
            <p className="mt-6 text-sm text-muted-foreground">Free forever for basic monitoring. Pro features available.</p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/5 text-center text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <span className="font-display font-bold text-lg text-foreground">PredictPC</span>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} PredictPC. Built for Windows.</p>
      </footer>

    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <motion.div variants={fadeInUp} className="glass-panel p-8 rounded-2xl hover:bg-white/[0.02] transition-colors group">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-display mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

function MonitorItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-primary/70">{icon}</div>
      <span className="font-medium text-lg">{label}</span>
    </div>
  );
}
