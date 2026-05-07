import type { ReactNode, ComponentType } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Shield, Activity, Bell, Cpu, Battery, HardDrive,
  Fan, Wifi, Info, Download, Brain, FileText,
  CheckCircle2, AlertTriangle, TrendingDown, ChevronRight,
  Terminal, MemoryStick, Thermometer, Network, Layers, Zap
} from "lucide-react";
import { SiHp, SiLenovo, SiDell, SiAsus, SiAcer } from "react-icons/si";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    icon: Download,
    title: "Install & forget",
    subtitle: "30 seconds. Then nothing.",
    description: "Install the lightweight background agent. It runs silently, consuming less than 1% CPU. No setup wizards, no dashboards to configure. It starts watching immediately — you don't need to do anything else.",
    detail: "Uses Windows system APIs to collect sensor data every 60 seconds. No third-party drivers required.",
  },
  {
    number: "02",
    icon: Brain,
    title: "PredictPC learns your machine",
    subtitle: "Days 1–14: Building your baseline.",
    description: "Every laptop is different. Yours runs hotter when charging. Your fan ramps earlier. Your battery drains faster on Zoom calls. PredictPC maps all of that — building a model of what 'normal' looks like specifically for you.",
    detail: "After 14 days, your personal baseline is locked in. Predictions start from Day 1 but sharpen considerably by Week 2.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Your first health report arrives",
    subtitle: "Sunday morning. Plain English. Two minutes.",
    description: "Every Sunday you get a short, honest summary of how your machine is doing. No jargon. No scare tactics. Just clear signals: what's fine, what's worth watching, and what you should act on this week.",
    detail: "Alerts appear immediately when something urgent is detected — you don't wait for Sunday if it can't wait.",
  },
];

const REPORT_ITEMS = [
  { status: "good" as const, icon: CheckCircle2, category: "Battery", message: "Holding strong at 91% original capacity. Well above average for a 14-month-old laptop.", tag: "No action needed" },
  { status: "watch" as const, icon: TrendingDown, category: "SSD Health", message: "Write endurance is at 74%. At your current usage rate, you have roughly 18–24 months before significant degradation begins.", tag: "Worth watching" },
  { status: "warn" as const, icon: AlertTriangle, category: "Thermal Pattern", message: "Your CPU has been thermal throttling during video calls for the past 6 days. This suggests your cooling vents may need cleaning.", tag: "Act this week" },
  { status: "good" as const, icon: CheckCircle2, category: "RAM & Memory", message: "Memory pressure is normal. No background apps are silently consuming resources.", tag: "No action needed" },
  { status: "coach" as const, icon: Bell, category: "Habit tip", message: "You've left your laptop plugged in at 100% charge for 9 of the last 14 nights. Keeping charge between 20–80% can significantly extend battery life.", tag: "Coaching" },
];

const HP_MODULES = [
  { icon: Battery, label: "Battery", desc: "Wear level, cycles, temperature, charge habits, power delivery" },
  { icon: HardDrive, label: "SSD / NVMe", desc: "SMART data, wear endurance, read errors, drive temperature" },
  { icon: Cpu, label: "CPU", desc: "Thermals, throttling, turbo boost, microcode, core balance" },
  { icon: MemoryStick, label: "RAM", desc: "Memory pressure, error rate, usage patterns, leak detection" },
  { icon: Zap, label: "GPU", desc: "Temperature, VRAM usage, driver version, compute errors" },
  { icon: Thermometer, label: "Thermals & Fans", desc: "All thermal zones, fan RPM curves, vent blockage patterns" },
  { icon: Layers, label: "Startup & Drivers", desc: "Boot time trend, failing drivers, Windows event log errors" },
  { icon: Network, label: "Network Stability", desc: "Packet loss, DNS latency, adapter errors, Wi-Fi signal drift" },
  { icon: Brain, label: "Habit Coaching", desc: "Detects usage patterns silently damaging your hardware" },
  { icon: FileText, label: "Health Report", desc: "Plain English weekly summary with predictions and timelines" },
];

const LENOVO_MODULES = [
  { icon: Battery, label: "Battery", desc: "WMI cycle count, Vantage charge thresholds, conservation mode, voltage" },
  { icon: HardDrive, label: "SSD / NVMe", desc: "SMART wear, temperature, read/write errors, power-on hours" },
  { icon: Cpu, label: "CPU", desc: "Thermals, throttle events, frequency scaling, turbo state" },
  { icon: MemoryStick, label: "RAM", desc: "Error rate, memory pressure, commit %, page file, leak patterns" },
  { icon: Zap, label: "GPU", desc: "Intel + NVIDIA/AMD temps, VRAM, driver age, compute errors" },
  { icon: Thermometer, label: "Thermals & Fans", desc: "Legion GameZone fan RPM, thermal zones, throttle thresholds" },
  { icon: Layers, label: "Lenovo-Specific", desc: "Vantage API, ThinkPad APS, GameZone, intelligent standby, hinge sensors" },
  { icon: Network, label: "Network", desc: "Wi-Fi drop events, DNS latency, adapter errors, signal drift" },
  { icon: Brain, label: "Correlation AI", desc: "8 cross-metric patterns: battery-heat, SSD pressure, crash+WHEA, and more" },
  { icon: FileText, label: "Health Score", desc: "0–100 score with grade, deductions, and full JSON export to Desktop" },
];

const DELL_MODULES = [
  { icon: Battery, label: "Battery", desc: "DCIM cycle count, ExpressCharge mode, charge config, voltage" },
  { icon: HardDrive, label: "SSD / NVMe", desc: "SMART wear, Dell DCIM disk status, temperature, read errors" },
  { icon: Cpu, label: "CPU", desc: "Throttling events, turbo state, frequency scaling, thermal zones" },
  { icon: MemoryStick, label: "RAM", desc: "Error rate, memory commit %, page file, pressure patterns" },
  { icon: Zap, label: "GPU", desc: "Intel/NVIDIA/AMD temps, VRAM, driver age, Alienware cooling zones" },
  { icon: Thermometer, label: "Thermals & Fans", desc: "Thermal zones, fan RPM, Alienware Command Center integration" },
  { icon: Layers, label: "Dell-Specific", desc: "SupportAssist, Command Monitor, DCIM namespace, service tag validation" },
  { icon: Network, label: "Network", desc: "Wi-Fi drops, DNS latency, adapter errors, signal drift" },
  { icon: Brain, label: "Correlation AI", desc: "8 cross-metric failure patterns: WHEA errors, SSD wear, thermal, and more" },
  { icon: FileText, label: "Health Score", desc: "0–100 score with grade, deductions, full JSON report to Desktop" },
];

function ModuleGrid({ modules }: { modules: { icon: ComponentType<{ className?: string }>; label: string; desc: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {modules.map(({ icon: Icon, label, desc }) => (
        <div key={label} className="glass-panel rounded-xl p-5 group hover:border-primary/30 transition-colors duration-200">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              <Icon className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-sm font-semibold">{label}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>
  );
}

function StatBar({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="mt-10 glass-panel rounded-2xl px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      {stats.map(({ value, label }) => (
        <div key={label}>
          <div className="text-2xl font-display font-bold text-primary">{value}</div>
          <div className="text-xs text-muted-foreground mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}

function CodePanel({
  filename, meta, usageLines, showCode, onToggle, toggleId, expandedBody,
}: {
  filename: string;
  meta: { label: string; value: string }[];
  usageLines: ReactNode[];
  showCode: boolean;
  onToggle: () => void;
  toggleId: string;
  expandedBody: ReactNode;
}) {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-black/30">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-xs text-muted-foreground font-mono">{filename}</span>
        </div>
        <button
          onClick={onToggle}
          data-testid={toggleId}
          className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors font-medium cursor-pointer"
        >
          <Terminal className="w-3.5 h-3.5" />
          {showCode ? "Hide code" : "View code"}
          <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${showCode ? "rotate-90" : ""}`} />
        </button>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {meta.map(({ label, value }) => (
            <div key={label} className="bg-white/[0.03] rounded-lg px-4 py-3 border border-white/5">
              <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
              <div className="text-sm font-semibold font-mono text-foreground">{value}</div>
            </div>
          ))}
        </div>
        <div className="font-mono text-xs space-y-1 bg-black/20 rounded-lg px-4 py-3">
          {usageLines}
        </div>
      </div>
      <AnimatePresence>
        {showCode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 font-mono text-xs leading-6 overflow-x-auto border-t border-white/10 pt-5">
              {expandedBody}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [showHpCode, setShowHpCode] = useState(false);
  const [showLenovoCode, setShowLenovoCode] = useState(false);
  const [showDellCode, setShowDellCode] = useState(false);

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

      {/* Hero */}
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
            Know before <br /><span className="text-gradient">it breaks.</span>
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

      {/* Philosophy */}
      <section className="py-24 px-6 md:px-12 bg-card/50 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
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
          <p className="text-xl text-muted-foreground">We don't wait for things to crash. By learning your specific machine's behavior, we spot the invisible warning signs weeks in advance.</p>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-3 gap-6">
          <FeatureCard icon={<Activity className="w-6 h-6 text-primary" />} title="Learns YOUR Normal" description="We don't use global averages. PredictPC learns what 'normal' looks like for your specific usage patterns and hardware combination." />
          <FeatureCard icon={<Info className="w-6 h-6 text-primary" />} title="Weekly Health Letter" description="Get a beautifully formatted, 2-minute read every Sunday summarizing your PC's health. No spam, just signal." />
          <FeatureCard icon={<Shield className="w-6 h-6 text-primary" />} title="Cross-Correlated Data" description="We don't just look at temperature. We look at how temperature, fan speed, and CPU voltage interact together to spot hidden issues." />
          <FeatureCard icon={<Bell className="w-6 h-6 text-primary" />} title="Relevant Coaching" description="We only show tips that matter to your current situation. If your battery is degrading because you leave it plugged in at 100%, we'll gently let you know." />
          <FeatureCard icon={<HardDrive className="w-6 h-6 text-primary" />} title="Weeks of Warning" description="Catch SSD degradation, failing cooling systems, and dying batteries weeks or months before you actually feel the impact." />
          <FeatureCard icon={<Cpu className="w-6 h-6 text-primary" />} title="Gets Smarter Over Time" description="The longer PredictPC runs in the background, the more accurate its predictions become as it builds a deeper model of your machine." />
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6 md:px-12 relative bg-card/30 border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(0,229,255,0.06),transparent)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">How it works</h2>
            <p className="text-xl text-muted-foreground">Three stages. Zero effort on your end.</p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col gap-4">
              {HOW_IT_WORKS_STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = activeStep === i;
                return (
                  <motion.button
                    key={i}
                    variants={fadeInUp}
                    onClick={() => setActiveStep(i)}
                    data-testid={`step-button-${i}`}
                    className={`text-left w-full rounded-2xl p-6 transition-all duration-300 border cursor-pointer ${isActive ? "glass-panel border-primary/40 shadow-[0_0_30px_-8px_rgba(0,229,255,0.3)]" : "border-white/5 hover:border-white/10 bg-transparent hover:bg-white/[0.02]"}`}
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
                    <span className="text-[80px] font-display font-black text-primary/10 leading-none block mb-4 select-none">{HOW_IT_WORKS_STEPS[activeStep].number}</span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">{HOW_IT_WORKS_STEPS[activeStep].title}</h3>
                    <p className="text-primary text-sm font-medium mb-6">{HOW_IT_WORKS_STEPS[activeStep].subtitle}</p>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">{HOW_IT_WORKS_STEPS[activeStep].description}</p>
                    <div className="border-t border-white/10 pt-6">
                      <p className="text-sm text-muted-foreground/70 italic">{HOW_IT_WORKS_STEPS[activeStep].detail}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center justify-center gap-2 mt-6">
                {HOW_IT_WORKS_STEPS.map((_, i) => (
                  <button key={i} onClick={() => setActiveStep(i)} data-testid={`step-dot-${i}`} className={`rounded-full transition-all duration-300 cursor-pointer ${activeStep === i ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Health Report */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-medium text-primary mb-6">
              <FileText className="w-3.5 h-3.5" /> Every Sunday morning
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Your weekly health report.</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">Delivered like a letter from someone who actually cares about your machine. Plain language, no alerts, no panic — just a clear picture of where things stand.</p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">Takes two minutes to read. Gives you everything you need to know.</p>
            <div className="flex flex-col gap-3">
              {(["Good", "Worth watching", "Act this week", "Coaching tip"] as const).map((label, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${label === "Good" ? "bg-emerald-400" : label === "Worth watching" ? "bg-blue-400" : label === "Act this week" ? "bg-amber-400" : "bg-primary"}`} />
                  <span className="text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
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
              <div className="divide-y divide-white/5">
                {REPORT_ITEMS.map((item, i) => {
                  const Icon = item.icon;
                  const colors = { good: { dot: "bg-emerald-400", tag: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" }, watch: { dot: "bg-blue-400", tag: "text-blue-400 bg-blue-400/10 border-blue-400/20" }, warn: { dot: "bg-amber-400", tag: "text-amber-400 bg-amber-400/10 border-amber-400/20" }, coach: { dot: "bg-primary", tag: "text-primary bg-primary/10 border-primary/20" } }[item.status];
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="px-8 py-5 flex gap-4 items-start hover:bg-white/[0.015] transition-colors">
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
              <div className="px-8 py-5 border-t border-white/10 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Next report in 6 days</p>
                <div className="flex items-center gap-1 text-primary text-xs font-medium">
                  <span>Full history</span><ChevronRight className="w-3.5 h-3.5" />
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
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Everything that matters.<br /><span className="text-gradient">Nothing that doesn't.</span></h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10">We monitor the signals that actually predict failure — not just raw sensor values, but the patterns, trends, and combinations that most tools miss entirely.</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Battery className="w-5 h-5" />, label: "Battery Health" },
                  { icon: <HardDrive className="w-5 h-5" />, label: "SSD / NVMe" },
                  { icon: <Thermometer className="w-5 h-5" />, label: "Thermal Patterns" },
                  { icon: <Cpu className="w-5 h-5" />, label: "CPU Throttling" },
                  { icon: <Fan className="w-5 h-5" />, label: "Fan Behaviour" },
                  { icon: <MemoryStick className="w-5 h-5" />, label: "Memory Pressure" },
                  { icon: <Wifi className="w-5 h-5" />, label: "Network Stability" },
                  { icon: <Zap className="w-5 h-5" />, label: "Power Delivery" },
                ].map(({ icon, label }) => (
                  <MonitorItem key={label} icon={icon} label={label} />
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="glass-panel rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-sm text-muted-foreground font-mono uppercase tracking-widest">Live sensors</span>
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" /> All nominal
                  </span>
                </div>
                {[
                  { label: "CPU Package Temp", value: "67°C", bar: 67, warn: false },
                  { label: "Battery Health", value: "91.4%", bar: 91, warn: false },
                  { label: "SSD Wear Level", value: "26%", bar: 26, warn: false },
                  { label: "Fan Speed", value: "2,840 RPM", bar: 57, warn: false },
                  { label: "Memory Pressure", value: "61%", bar: 61, warn: false },
                ].map(({ label, value, bar, warn }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">{label}</span>
                      <span className={warn ? "text-amber-400 font-medium" : "text-foreground font-medium"}>{value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-1000 ${warn ? "bg-amber-400" : "bg-primary/60"}`} style={{ width: `${bar}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Compatibility */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-medium text-primary mb-6">
            <Shield className="w-3.5 h-3.5" /> Deep brand integration
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Built for the laptops you actually own.</h2>
          <p className="text-xl text-muted-foreground">We go far deeper than generic WMI queries. For HP and Lenovo, we access proprietary APIs and firmware interfaces for data no other tool collects.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            { Icon: SiHp, name: "HP", desc: "Spectre · Envy · Pavilion · EliteBook · ProBook · Omen · Victus · ZBook · Dragonfly", checks: ["Battery wear via HP WMI namespace", "OMEN thermal & fan APIs", "HP-specific SMART extensions", "EliteBook security chip health"] },
            { Icon: SiLenovo, name: "Lenovo", desc: "ThinkPad · IdeaPad · Yoga · Legion · LOQ · ThinkBook", checks: ["Vantage API battery thresholds", "Legion GameZone fan & temp data", "ThinkPad Active Protection System", "Intelligent standby & hinge sensors"] },
          ].map(({ Icon, name, desc, checks }) => (
            <motion.div key={name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="glass-panel rounded-2xl p-8" data-testid={`brand-card-${name.toLowerCase()}`}>
              <div className="flex items-center gap-3 mb-4">
                <Icon className="w-8 h-8 text-foreground" />
                <div>
                  <h3 className="font-display font-bold text-xl">{name}</h3>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
              <div className="space-y-2.5 mt-5">
                {checks.map(c => <BrandCheck key={c} text={c} />)}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="glass-panel rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-center gap-6 justify-between">
          <p className="text-sm text-muted-foreground text-center sm:text-left">Also fully supported via standard WMI &amp; ACPI interfaces:</p>
          <div className="flex items-center gap-8 flex-wrap justify-center">
            {[{ Icon: SiDell, name: "Dell" }, { Icon: SiAsus, name: "Asus" }, { Icon: SiAcer, name: "Acer" }].map(({ Icon, name }) => (
              <div key={name} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors" data-testid={`brand-${name.toLowerCase()}`}>
                <Icon className="w-5 h-5" /><span className="text-sm font-medium">{name}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-muted-foreground"><span className="text-sm">+ more</span></div>
          </div>
        </motion.div>
      </section>

      {/* ── Scripts & Info Tabs ── */}
      <section className="py-24 px-6 md:px-12 relative bg-card/30 border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_50%,rgba(0,229,255,0.05),transparent)]" />
        <div className="max-w-7xl mx-auto relative z-10">

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Diagnostic scripts.<br /><span className="text-gradient">Deep knowledge. Plain answers.</span>
            </h2>
            <p className="text-xl text-muted-foreground">Brand-specific scripts that go far deeper than generic tools. Download, run once, get everything.</p>
          </motion.div>

          <Tabs defaultValue="hp" className="w-full">
            <TabsList className="w-full flex flex-wrap h-auto gap-1 p-1.5 mb-10 glass-panel rounded-2xl bg-transparent border border-white/10">
              {([
                { value: "hp", label: "HP", Icon: SiHp },
                { value: "lenovo", label: "Lenovo", Icon: SiLenovo },
                { value: "dell", label: "Dell", Icon: SiDell },
                { value: "features", label: "Features", Icon: null },
                { value: "about", label: "About", Icon: null },
                { value: "howto", label: "How to Use", Icon: null },
              ] as const).map(({ value, label, Icon }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="flex-1 min-w-[80px] rounded-xl py-2.5 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_20px_-6px_rgba(0,229,255,0.5)] transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* ── HP Tab ── */}
            <TabsContent value="hp">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-medium text-primary mb-4">
                    <SiHp className="w-3.5 h-3.5" /> HP-exclusive diagnostic script
                  </div>
                  <h3 className="text-2xl md:text-4xl font-display font-bold mb-3">Open-source HP health scanner.<br /><span className="text-gradient">Run it once. Know everything.</span></h3>
                  <p className="text-lg text-muted-foreground max-w-2xl">A standalone Python script built for HP laptops. Covers every hardware component and generates a full plain-English health report — no installation, no account needed.</p>
                </div>
                <a href="/hp_laptop_diagnostics.py" download="hp_laptop_diagnostics.py" data-testid="link-download-hp-script">
                  <Button size="lg" className="rounded-full px-8 py-6 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-3 shadow-[0_0_30px_-8px_rgba(0,229,255,0.5)] whitespace-nowrap">
                    <Download className="w-5 h-5" /> Download Script
                  </Button>
                </a>
              </div>
              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <CodePanel
                  filename="hp_laptop_diagnostics.py"
                  meta={[{ label: "Language", value: "Python 3.9+" }, { label: "Platform", value: "Windows 10/11" }, { label: "Lines", value: "2,732" }, { label: "Requires", value: "Admin recommended" }]}
                  usageLines={[
                    <div key="1"><span className="text-emerald-400">python</span> hp_laptop_diagnostics.py <span className="text-primary">--report</span></div>,
                    <div key="2"><span className="text-emerald-400">python</span> hp_laptop_diagnostics.py <span className="text-primary">--quick</span></div>,
                    <div key="3"><span className="text-emerald-400">python</span> hp_laptop_diagnostics.py <span className="text-primary">--monitor 60</span></div>,
                  ]}
                  showCode={showHpCode}
                  onToggle={() => setShowHpCode(v => !v)}
                  toggleId="button-toggle-hp-code"
                  expandedBody={
                    <>
                      <div className="text-muted-foreground/50">{"# ══════════════════════════════════════════════════════"}</div>
                      <div className="text-primary/80 font-semibold">{"# HP LAPTOP COMPREHENSIVE DIAGNOSTIC & PREDICTIVE HEALTH"}</div>
                      <div className="text-muted-foreground/50">{"# ══════════════════════════════════════════════════════"}</div>
                      <div className="mt-3 text-muted-foreground/60">{"# Covers: Battery · SSD/NVMe · CPU · RAM · GPU"}</div>
                      <div className="text-muted-foreground/60">{"#         Thermals · Fans · Power · Drivers · Network"}</div>
                      <div className="mt-3 text-muted-foreground/60">{"# Supports: Spectre · Envy · Pavilion · EliteBook"}</div>
                      <div className="text-muted-foreground/60">{"#           ProBook · Omen · Victus · ZBook · Dragonfly"}</div>
                      <div className="mt-4 text-muted-foreground/40">{"# ─── Requirements ─────────────────────────────────────"}</div>
                      <div className="mt-1"><span className="text-yellow-400">Python</span><span className="text-foreground"> 3.9+</span><span className="text-muted-foreground/50">{" · Windows 10/11 · Admin recommended"}</span></div>
                      <div><span className="text-yellow-400">pip install</span><span className="text-foreground"> psutil wmi py-cpuinfo pynvml</span><span className="text-muted-foreground/50">{" # auto-installed"}</span></div>
                      <div className="mt-4 text-muted-foreground/40">{"# ─── Sample output ─────────────────────────────────────"}</div>
                      <div className="mt-1"><span className="text-emerald-400">{"✓"}</span><span className="text-foreground"> Battery Health: </span><span className="text-emerald-400">Excellent</span><span className="text-muted-foreground/60">{" (91.4% · 187 cycles)"}</span></div>
                      <div><span className="text-yellow-400">{"⚠"}</span><span className="text-foreground"> CPU Thermal Throttling </span><span className="text-muted-foreground/60">detected 6 of last 7 days</span></div>
                      <div><span className="text-emerald-400">{"✓"}</span><span className="text-foreground"> NVMe SSD: </span><span className="text-emerald-400">Good</span><span className="text-muted-foreground/60">{" (74% wear · 43°C)"}</span></div>
                      <div><span className="text-emerald-400">{"✓"}</span><span className="text-foreground"> RAM: 16 GB </span><span className="text-muted-foreground/60">· no errors · pressure normal</span></div>
                      <div className="mt-2"><span className="text-primary font-semibold">Overall Score: </span><span className="text-emerald-400 font-bold">82</span><span className="text-muted-foreground/60">/100  —  Your HP is in good shape.</span></div>
                    </>
                  }
                />
                <ModuleGrid modules={HP_MODULES} />
              </div>
              <StatBar stats={[{ value: "2,732", label: "lines of code" }, { value: "10", label: "hardware modules" }, { value: "v2.0.0", label: "current version" }, { value: "free", label: "open source, always" }]} />
            </TabsContent>

            {/* ── Lenovo Tab ── */}
            <TabsContent value="lenovo">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-medium text-primary mb-4">
                    <SiLenovo className="w-3.5 h-3.5" /> Lenovo-exclusive diagnostic script
                  </div>
                  <h3 className="text-2xl md:text-4xl font-display font-bold mb-3">Deep Lenovo hardware scanner.<br /><span className="text-gradient">PowerShell. 18 sections. One run.</span></h3>
                  <p className="text-lg text-muted-foreground max-w-2xl">Built specifically for Lenovo laptops. Accesses Vantage APIs, ThinkPad APS sensors, Legion GameZone data, and Lenovo WMI classes unavailable to generic tools. Saves full JSON to your desktop.</p>
                </div>
                <a href="/lenovo_laptop_diagnostics.ps1" download="lenovo_laptop_diagnostics.ps1" data-testid="link-download-lenovo-script">
                  <Button size="lg" className="rounded-full px-8 py-6 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-3 shadow-[0_0_30px_-8px_rgba(0,229,255,0.5)] whitespace-nowrap">
                    <Download className="w-5 h-5" /> Download Script
                  </Button>
                </a>
              </div>
              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <CodePanel
                  filename="lenovo_laptop_diagnostics.ps1"
                  meta={[{ label: "Language", value: "PowerShell 5.1+" }, { label: "Platform", value: "Windows 10/11" }, { label: "Lines", value: "1,008" }, { label: "Requires", value: "Run as Administrator" }]}
                  usageLines={[
                    <div key="1" className="text-muted-foreground/50"># Right-click PowerShell → Run as Administrator</div>,
                    <div key="2" className="mt-1"><span className="text-yellow-400">.\lenovo_laptop_diagnostics.ps1</span></div>,
                    <div key="3" className="text-muted-foreground/50 mt-1"># Report + JSON saved to Desktop automatically</div>,
                  ]}
                  showCode={showLenovoCode}
                  onToggle={() => setShowLenovoCode(v => !v)}
                  toggleId="button-toggle-lenovo-code"
                  expandedBody={
                    <>
                      <div className="text-muted-foreground/50">{"# ============================================================"}</div>
                      <div className="text-primary/80 font-semibold">{"# LENOVO LAPTOP COMPREHENSIVE DIAGNOSTIC SCRIPT"}</div>
                      <div className="text-muted-foreground/50">{"# ============================================================"}</div>
                      <div className="mt-3 text-muted-foreground/60">{"# Covers: ThinkPad · IdeaPad · Yoga · Legion · LOQ · ThinkBook"}</div>
                      <div className="text-muted-foreground/60">{"# Models: 2019–2024  |  Windows 10/11"}</div>
                      <div className="mt-4 text-muted-foreground/40">{"# ─── 18 sections ──────────────────────────────────────────"}</div>
                      {["1. System Identity & Lenovo Model Detection","2. Battery Health (Vantage API + WMI)","3. SSD / Storage + SMART Counters","4. CPU Thermals & Throttling","5. RAM / Memory Analysis","6. GPU (Intel + NVIDIA/AMD)","7. Thermal Zones & Fan RPM","8. Power Delivery & Charger","9. Network Stability & Wi-Fi","10. Driver Health & Problem Devices","11. Startup & Boot Performance","12. Memory Pressure Analysis","13. Windows Health & System Integrity","14. Lenovo-Specific Features (GameZone, APS, Vantage)","15. Cross-Metric Correlation Analysis","16. Usage Habit Coaching","17. Predictive Health Score (0–100)","18. Save JSON + Text Report to Desktop"].map((s, i) => (
                        <div key={i} className={i === 0 ? "mt-1" : ""}><span className="text-muted-foreground/40">{"#  "}</span><span className="text-foreground/70">{s}</span></div>
                      ))}
                      <div className="mt-4 text-muted-foreground/40">{"# ─── Sample output ─────────────────────────────────────────"}</div>
                      <div className="mt-1"><span className="text-emerald-400">{"[OK]  "}</span><span className="text-foreground">Battery Health    </span><span className="text-muted-foreground/60">: 88.3%  (312 cycles)</span></div>
                      <div><span className="text-yellow-400">{"[WARN]"}</span><span className="text-foreground"> BIOS Age          </span><span className="text-muted-foreground/60">: 29 months — update available</span></div>
                      <div><span className="text-emerald-400">{"[OK]  "}</span><span className="text-foreground">SSD SMART Wear    </span><span className="text-muted-foreground/60">: 12% used · 38°C</span></div>
                      <div><span className="text-red-400">{"[CRIT]"}</span><span className="text-foreground"> WHEA Hardware Err </span><span className="text-muted-foreground/60">: 2 detected — check RAM</span></div>
                      <div><span className="text-emerald-400">{"[OK]  "}</span><span className="text-foreground">Legion Fan 1      </span><span className="text-muted-foreground/60">: 2,840 RPM — normal</span></div>
                      <div className="mt-2"><span className="text-primary font-semibold">HEALTH SCORE: </span><span className="text-emerald-400 font-bold">79</span><span className="text-muted-foreground/60">/100  —  GOOD</span></div>
                      <div className="mt-1 text-muted-foreground/50">Report + JSON saved to Desktop.</div>
                    </>
                  }
                />
                <ModuleGrid modules={LENOVO_MODULES} />
              </div>
              <StatBar stats={[{ value: "1,008", label: "lines of code" }, { value: "18", label: "diagnostic sections" }, { value: "PowerShell", label: "no Python needed" }, { value: "free", label: "open source, always" }]} />
            </TabsContent>

            {/* ── Dell Tab ── */}
            <TabsContent value="dell">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-medium text-primary mb-4">
                    <SiDell className="w-3.5 h-3.5" /> Dell-exclusive diagnostic script
                  </div>
                  <h3 className="text-2xl md:text-4xl font-display font-bold mb-3">Deep Dell hardware scanner.<br /><span className="text-gradient">DCIM APIs. SupportAssist data. One run.</span></h3>
                  <p className="text-lg text-muted-foreground max-w-2xl">Built specifically for Dell laptops. Accesses Dell Command Monitor DCIM APIs, SupportAssist service data, ExpressCharge settings, and Alienware thermal zones unavailable to generic tools.</p>
                </div>
                <a href="/dell_laptop_diagnostics.ps1" download="dell_laptop_diagnostics.ps1" data-testid="link-download-dell-script">
                  <Button size="lg" className="rounded-full px-8 py-6 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-3 shadow-[0_0_30px_-8px_rgba(0,229,255,0.5)] whitespace-nowrap">
                    <Download className="w-5 h-5" /> Download Script
                  </Button>
                </a>
              </div>
              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <CodePanel
                  filename="dell_laptop_diagnostics.ps1"
                  meta={[{ label: "Language", value: "PowerShell 5.1+" }, { label: "Platform", value: "Windows 10/11" }, { label: "Lines", value: "1,021" }, { label: "Requires", value: "Run as Administrator" }]}
                  usageLines={[
                    <div key="1" className="text-muted-foreground/50"># Right-click PowerShell → Run as Administrator</div>,
                    <div key="2" className="mt-1"><span className="text-yellow-400">.\dell_laptop_diagnostics.ps1</span></div>,
                    <div key="3" className="text-muted-foreground/50 mt-1"># Report + JSON saved to Desktop automatically</div>,
                  ]}
                  showCode={showDellCode}
                  onToggle={() => setShowDellCode(v => !v)}
                  toggleId="button-toggle-dell-code"
                  expandedBody={
                    <>
                      <div className="text-muted-foreground/50">{"# ============================================================"}</div>
                      <div className="text-primary/80 font-semibold">{"# DELL LAPTOP COMPREHENSIVE DIAGNOSTIC SCRIPT"}</div>
                      <div className="text-muted-foreground/50">{"# ============================================================"}</div>
                      <div className="mt-3 text-muted-foreground/60">{"# Covers: XPS · Inspiron · Latitude · Vostro · Alienware · G-Series · Precision"}</div>
                      <div className="text-muted-foreground/60">{"# Models: 2019–2024  |  Windows 10/11"}</div>
                      <div className="mt-4 text-muted-foreground/40">{"# ─── 18 sections ──────────────────────────────────────────"}</div>
                      {["1. System Identity & Dell Model Detection","2. Battery Health (DCIM + WMI + ExpressCharge)","3. SSD / Storage + SMART Counters","4. CPU Thermals & Throttling","5. RAM / Memory Analysis","6. GPU (Intel + NVIDIA/AMD)","7. Thermal Zones & Fan Control","8. Power Delivery & Charger","9. Network Stability & Wi-Fi","10. Driver Health & Problem Devices","11. Startup & Boot Performance","12. Memory Pressure Analysis","13. Windows Health & System Integrity","14. Dell-Specific Features (DCIM, SupportAssist, Alienware)","15. Cross-Metric Correlation Analysis","16. Usage Habit Coaching","17. Predictive Health Score (0–100)","18. Save JSON + Text Report to Desktop"].map((s, i) => (
                        <div key={i} className={i === 0 ? "mt-1" : ""}><span className="text-muted-foreground/40">{"#  "}</span><span className="text-foreground/70">{s}</span></div>
                      ))}
                      <div className="mt-4 text-muted-foreground/40">{"# ─── Sample output ─────────────────────────────────────────"}</div>
                      <div className="mt-1"><span className="text-emerald-400">{"[OK]  "}</span><span className="text-foreground">Battery Health    </span><span className="text-muted-foreground/60">: 82.1%  (234 cycles)</span></div>
                      <div><span className="text-emerald-400">{"[OK]  "}</span><span className="text-foreground">SSD SMART Wear    </span><span className="text-muted-foreground/60">: 8% used · 41°C</span></div>
                      <div><span className="text-yellow-400">{"[WARN]"}</span><span className="text-foreground"> BIOS Age          </span><span className="text-muted-foreground/60">: 31 months — check SupportAssist</span></div>
                      <div><span className="text-emerald-400">{"[OK]  "}</span><span className="text-foreground">Dell Service Tag  </span><span className="text-muted-foreground/60">: 7AB12CD (valid)</span></div>
                      <div><span className="text-red-400">{"[CRIT]"}</span><span className="text-foreground"> WHEA Hardware Err </span><span className="text-muted-foreground/60">: 1 detected — check RAM</span></div>
                      <div className="mt-2"><span className="text-primary font-semibold">HEALTH SCORE: </span><span className="text-emerald-400 font-bold">85</span><span className="text-muted-foreground/60">/100  —  GOOD</span></div>
                      <div className="mt-1 text-muted-foreground/50">Report + JSON saved to Desktop.</div>
                    </>
                  }
                />
                <ModuleGrid modules={DELL_MODULES} />
              </div>
              <StatBar stats={[{ value: "1,021", label: "lines of code" }, { value: "18", label: "diagnostic sections" }, { value: "DCIM APIs", label: "Dell-exclusive data" }, { value: "free", label: "open source, always" }]} />
            </TabsContent>

            {/* ── Features Tab ── */}
            <TabsContent value="features">
              <div className="mb-10">
                <h3 className="text-2xl md:text-4xl font-display font-bold mb-3">Everything PredictPC does for you.</h3>
                <p className="text-lg text-muted-foreground max-w-2xl">A complete picture of what's running under the hood — quietly, automatically, and always in plain English.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Brain, title: "Predictive Failure Detection", desc: "PredictPC doesn't wait for something to break. It tracks subtle degradation trends across battery, SSD, thermals, and RAM — then flags the pattern weeks before it becomes a problem. Most failures give weeks of warning. We catch them." },
                  { icon: Activity, title: "Personal Baseline Learning", desc: "Every machine behaves differently. PredictPC learns yours specifically — how hot your CPU runs during video calls, how your battery discharges on battery vs. AC, your fan curve under load. After 14 days, your baseline is locked in and predictions sharpen dramatically." },
                  { icon: FileText, title: "Plain English Weekly Reports", desc: "Every Sunday, you get a 2-minute health summary written for a human, not an engineer. No error codes. No raw sensor values. Just clear statements like: 'Your SSD is at 74% endurance — no action needed yet, but worth backing up important files this month.'" },
                  { icon: Shield, title: "Zero Performance Impact", desc: "PredictPC runs as a lightweight background service consuming under 1% CPU and under 30 MB of RAM at all times. It uses Windows system APIs that are always running anyway — it doesn't add new processes, just intelligently reads existing data." },
                  { icon: Bell, title: "Habit Coaching", desc: "Some of the worst hardware damage comes from innocent habits — always charging to 100%, never restarting, running demanding apps on battery. PredictPC detects these silently and surfaces a coaching tip only when it's actually relevant to your current behavior." },
                  { icon: Layers, title: "Cross-Metric Correlation", desc: "The most valuable insights come from connecting dots: high SSD wear + high RAM pressure = death spiral risk. Low battery health + high thermals = swollen battery risk. PredictPC tracks 8 documented cross-metric failure patterns to catch what single-sensor tools miss." },
                  { icon: HardDrive, title: "Brand-Specific Deep Scanning", desc: "For HP, Lenovo, and Dell, we go beyond standard WMI. HP's battery firmware, Lenovo Vantage APIs, Dell DCIM namespace — these expose data that no generic tool can access, including cycle counts, charge thresholds, conservation modes, and proprietary thermal data." },
                  { icon: Wifi, title: "Network Stability Tracking", desc: "Wi-Fi hardware degrades too. PredictPC tracks adapter drop events, signal drift, DNS latency spikes, and reassociation frequency over time. Sudden increases often indicate driver issues or failing antenna connections before you notice them." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="glass-panel rounded-2xl p-7 hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-display font-bold text-lg">{title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* ── About Tab ── */}
            <TabsContent value="about">
              <div className="max-w-3xl">
                <h3 className="text-2xl md:text-4xl font-display font-bold mb-6">About PredictPC</h3>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">PredictPC is a quiet Windows background app that watches your hardware 24/7 and tells you — weeks in advance — when something is about to fail.</p>
                <div className="space-y-8">
                  <div className="glass-panel rounded-2xl p-7">
                    <h4 className="font-display font-bold text-lg mb-3 text-primary">Why we built this</h4>
                    <p className="text-muted-foreground leading-relaxed">Hardware failures are rarely sudden. An SSD failing after years of wear, a battery swelling from chronic overcharging, a cooling system gradually clogging — these all give weeks or months of warning signs. The problem is that reading those signs requires deep technical knowledge most users don't have. PredictPC makes that knowledge automatic.</p>
                  </div>
                  <div className="glass-panel rounded-2xl p-7">
                    <h4 className="font-display font-bold text-lg mb-3 text-primary">Privacy first</h4>
                    <p className="text-muted-foreground leading-relaxed">All data stays on your machine. PredictPC doesn't send telemetry, doesn't require an account, and doesn't connect to any cloud service. Your hardware health data is yours. The diagnostic scripts write reports to your Desktop — no upload, no account, no tracking.</p>
                  </div>
                  <div className="glass-panel rounded-2xl p-7">
                    <h4 className="font-display font-bold text-lg mb-3 text-primary">Who it's for</h4>
                    <p className="text-muted-foreground leading-relaxed mb-4">PredictPC is built for regular people who rely on their laptops for work, school, creative projects, or gaming — and can't afford an unexpected failure. You don't need to know what SMART attributes are or how thermal throttling works. PredictPC handles all of that and surfaces only what matters to you.</p>
                    <div className="grid grid-cols-2 gap-3">
                      {["Windows 10 & 11 compatible", "Supports HP, Lenovo, Dell, Asus, Acer", "Free basic monitoring forever", "No account or cloud required", "Under 1% CPU at all times", "Plain English — no jargon ever"].map(f => (
                        <div key={f} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass-panel rounded-2xl p-7">
                    <h4 className="font-display font-bold text-lg mb-3 text-primary">The diagnostic scripts</h4>
                    <p className="text-muted-foreground leading-relaxed">The HP, Lenovo, and Dell diagnostic scripts on this page are standalone tools you can run right now — no PredictPC installation needed. They're designed to give you an immediate, deep snapshot of your hardware health, and to feed data into PredictPC's AI model when you do install it. They're free and open source.</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ── How to Use Tab ── */}
            <TabsContent value="howto">
              <div className="mb-10">
                <h3 className="text-2xl md:text-4xl font-display font-bold mb-3">Getting started with PredictPC</h3>
                <p className="text-lg text-muted-foreground max-w-2xl">Two ways to start: install the background app for ongoing monitoring, or run your brand's diagnostic script for an instant deep snapshot.</p>
              </div>
              <div className="grid lg:grid-cols-2 gap-10">
                {/* PredictPC App */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-medium text-primary mb-6">
                    <Shield className="w-3.5 h-3.5" /> PredictPC background app
                  </div>
                  <div className="space-y-4">
                    {[
                      { n: "01", title: "Download PredictPC", body: "Click \"Download for Windows\" — it's a single .exe installer, about 8 MB. No dependencies required." },
                      { n: "02", title: "Run the installer", body: "Double-click the installer and click through the 2-step setup. Takes about 30 seconds. No restart needed." },
                      { n: "03", title: "It starts watching immediately", body: "PredictPC launches as a background service. You won't see a window or icon — it just runs silently. Check Task Manager if you want to confirm it's active." },
                      { n: "04", title: "Wait for your baseline", body: "For the first 14 days, PredictPC is building your personal baseline. You'll still see early signals, but predictions sharpen significantly after day 14." },
                      { n: "05", title: "Read your first health report", body: "After 7 days, you'll receive your first weekly health report on Sunday morning. Check your notification area or the PredictPC report folder on your Desktop." },
                    ].map(({ n, title, body }) => (
                      <div key={n} className="glass-panel rounded-xl p-5 flex gap-4 items-start">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-mono font-bold text-primary">{n}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Diagnostic Scripts */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-medium text-primary mb-6">
                    <Terminal className="w-3.5 h-3.5" /> Brand diagnostic scripts
                  </div>
                  <div className="space-y-4">
                    {[
                      { n: "01", title: "Find your laptop brand", body: "Check HP, Lenovo, or Dell tab above and download the matching script. Each script is tailored to that brand's specific WMI APIs and firmware interfaces." },
                      { n: "02", title: "Open PowerShell as Administrator", body: "For Lenovo/Dell: right-click the Start menu → \"Windows PowerShell (Admin)\" or \"Terminal (Admin)\". For HP: open Command Prompt as Admin, navigate to your download folder." },
                      { n: "03", title: "Run the script", body: "For PowerShell scripts: type .\\script_name.ps1 and press Enter. For the HP Python script: run python hp_laptop_diagnostics.py in Command Prompt. The scan takes 2–5 minutes." },
                      { n: "04", title: "Wait for the scan", body: "The script runs through 10–18 diagnostic sections automatically. You'll see colored output in the terminal window — green for OK, yellow for warnings, red for critical issues." },
                      { n: "05", title: "Check your Desktop", body: "When complete, a plain-English text report and a machine-readable JSON file are saved to your Desktop. The JSON can be imported into PredictPC to jump-start your baseline." },
                    ].map(({ n, title, body }) => (
                      <div key={n} className="glass-panel rounded-xl p-5 flex gap-4 items-start">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-mono font-bold text-primary">{n}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 glass-panel rounded-xl p-5 border-primary/20">
                    <div className="flex items-start gap-3">
                      <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground leading-relaxed"><span className="text-foreground font-medium">PowerShell execution policy: </span>If you see a red error about execution policy, run <span className="font-mono text-primary text-xs">Set-ExecutionPolicy -Scope CurrentUser RemoteSigned</span> first, then re-run the script.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 md:px-12 relative text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-3xl mx-auto glass-panel p-12 md:p-16 rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Ready for peace of mind?</h2>
            <p className="text-xl text-muted-foreground mb-10">Join thousands of users who trust PredictPC to watch over their machines. Download now and get your first health report in 7 days.</p>
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

function BrandCheck({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
      <span className="text-sm text-muted-foreground leading-relaxed">{text}</span>
    </div>
  );
}
