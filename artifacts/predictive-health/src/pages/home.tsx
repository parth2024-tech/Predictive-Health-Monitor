import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Activity, Bell, Cpu, Battery, HardDrive, Fan, Wifi, Info } from "lucide-react";

// Reusable animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Home() {
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50"></div>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-4xl relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-medium text-primary mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
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
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
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
          <FeatureCard 
            icon={<Activity className="w-6 h-6 text-primary" />}
            title="Learns YOUR Normal"
            description="We don't use global averages. PredictPC learns what 'normal' looks like for your specific usage patterns and hardware combination."
          />
          <FeatureCard 
            icon={<Info className="w-6 h-6 text-primary" />}
            title="Weekly Health Letter"
            description="Get a beautifully formatted, 2-minute read every Sunday summarizing your PC's health. No spam, just signal."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-primary" />}
            title="Cross-Correlated Data"
            description="We don't just look at temperature. We look at how temperature, fan speed, and CPU voltage interact together to spot hidden issues."
          />
          <FeatureCard 
            icon={<Bell className="w-6 h-6 text-primary" />}
            title="Relevant Coaching"
            description="We only show tips that matter to your current situation. If your battery is degrading because you leave it plugged in at 100%, we'll gently let you know."
          />
          <FeatureCard 
            icon={<HardDrive className="w-6 h-6 text-primary" />}
            title="Weeks of Warning"
            description="Catch SSD degradation, failing cooling systems, and dying batteries weeks or months before you actually feel the impact."
          />
          <FeatureCard 
            icon={<Cpu className="w-6 h-6 text-primary" />}
            title="Gets Smarter Over Time"
            description="The longer PredictPC runs in the background, the more accurate its predictions become as it builds a deeper model of your machine."
          />
        </motion.div>
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
            <Button size="lg" className="rounded-full px-10 py-7 text-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_40px_-10px_rgba(0,229,255,0.6)]">
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

function FeatureCard({ icon, title, description }: { icon: ReactNode, title: string, description: string }) {
  return (
    <motion.div variants={fadeInUp} className="glass-panel p-8 rounded-2xl hover:bg-white/[0.02] transition-colors group">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-display mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

function MonitorItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-primary/70">{icon}</div>
      <span className="font-medium text-lg">{label}</span>
    </div>
  );
}
