/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Zap, 
  ArrowUpRight, 
  ChevronRight, 
  ChevronLeft,
  ArrowDown,
  Mail, 
  Twitter, 
  Linkedin, 
  ExternalLink,
  BarChart3,
  Layers,
  Target,
  Rocket,
  Send
} from 'lucide-react';

// --- Types ---
interface StatProps {
  label: string;
  value: string;
  description: string;
}

interface ExperienceProps {
  role: string;
  company: string;
  period: string;
  impact: string[];
  tools?: string[];
}

// --- Constants ---

const CASE_STUDIES = [
  {
    id: 'hypersurface',
    title: 'Scaling Hypersurface',
    subtitle: 'Featured Case Study',
    category: 'DeFi / Onchain Options',
    description: 'Repositioned an abstract "on-chain options" protocol into a clear "Volatility Yield" narrative, building a full growth system from launch to market traction.',
    stats: [
      { label: 'Trading Volume', value: '$20M+' },
      { label: 'Followers', value: '12K+' }
    ],
    points: [
      { title: "Brand and narrative", description: "Created stronger positioning, educational content, and a clearer social presence so the product looked credible even at an early stage." },
      { title: "Ecosystem partnerships", description: "Built personalized outreach and secured 10+ ecosystem partnerships through co-announcements and community crossovers." },
      { title: "Product growth loops", description: "Implemented a points system, referral program, volume leaderboard, and PnL cards to increase trading activity." },
      { title: "Whale retention", description: "Designed a weekly whale leaderboard and private group for top wallets with early feature access and direct feedback channels." },
      { title: "NFT Pass campaign", description: "Viral campaign with ecosystem NFT partners that grew volume from $500K to $2M with zero additional ad spend." }
    ],
    tags: ['Points Systems', 'Referral Incentives', 'Whale Leaderboards', 'Social PnL Cards', 'NFT Pass Viral Campaign'],
    quote: "Hypersurface scaled from an unknown early-stage protocol to over $20M in trading volume through a combination of structured KOL distribution and community activation."
  },
  {
    id: 'polygon',
    title: 'Polygon',
    subtitle: 'Ecosystem Case Study',
    category: 'Layer 2 / Ethereum Scaling',
    description: 'Incubated Polygon at Lunar Digital Assets, scaling one of the fastest growing ecosystems in Web3 from under 10k to nearly 1M followers.',
    stats: [
      { label: 'X Followers', value: '1M' },
      { label: 'Token Growth', value: '330x' }
    ],
    points: [
      { title: "Social Scaling", description: "Led ecosystem visibility initiatives that scaled social presence from under 10,000 to nearly 1 million followers." },
      { title: "Milestone Campaigns", description: "Designed and executed campaign marketing around key ecosystem milestones to drive rapid adoption." },
      { title: "Retention Systems", description: "Built core community growth and retention systems to support a rapidly expanding user base." },
      { title: "Whale Engagement", description: "Developed specific engagement strategies for power-users and whales to solidify ecosystem loyalty." }
    ],
    tags: ['L2 Scaling', 'Ecosystem Growth', 'Social Scaling', 'Community Systems'],
    quote: "Polygon experienced rapid ecosystem growth, scaling from under 10,000 followers to nearly 1 million on X while the MATIC token grew from under $0.01 to $3.30."
  },
  {
    id: 'quickswap',
    title: 'QuickSwap',
    subtitle: 'DeFi Case Study',
    category: 'DeFi / Decentralized Exchange',
    description: 'Incubated the largest DEX on Polygon, scaling Total Value Locked from zero to over $1B through aggressive liquidity and yield campaigns.',
    stats: [
      { label: 'TVL Growth', value: '$1B+' },
      { label: 'Market Cap', value: '$500M+' }
    ],
    points: [
      { title: "Liquidity Campaigns", description: "Designed and executed liquidity and yield marketing campaigns that drove TVL from $0 to over $1B." },
      { title: "Brand Positioning", description: "Established QuickSwap as the core DeFi primitive within the Polygon ecosystem through strategic social growth." },
      { title: "Ecosystem Integration", description: "Secured key DeFi ecosystem partnerships and integrations required to support rapid adoption of the exchange." },
      { title: "LP Community", description: "Built a robust community of traders and liquidity providers through targeted engagement and content systems." }
    ],
    tags: ['DEX Marketing', 'Liquidity Mining', 'Yield Campaigns', 'DeFi Primitives'],
    quote: "QuickSwap became the largest dApp on Polygon, scaling its TVL to over $1B and reaching a fully diluted market cap of $500M+."
  },
  {
    id: 'thriv3',
    title: 'Thriv3 Agency',
    subtitle: 'Agency Case Study',
    category: 'Web3 Launch & Incubation',
    description: 'Co-founded a Web3 incubation agency that supported over 20 projects, reaching $1.5B+ in cumulative market caps through aggressive social distribution and KOL density.',
    stats: [
      { label: 'Combined MC', value: '$1.5B+' },
      { label: 'Projects', value: '20+' }
    ],
    points: [
      { title: "Dagknightdog", description: "Built launch momentum through 200 micro KOLs across X, Telegram, and TikTok, reaching $200M market cap on Kaspa." },
      { title: "Mario CTO", description: "Reached $190M market cap with dominant meme coin positioning and 560K+ pinned post views." },
      { title: "Hoot on Solana", description: "Achieved $160M market cap through strategic social expansion and pre-sale momentum." },
      { title: "KOL Activation", description: "Designed and executed campaigns activating 400+ KOLs across multiple successful project launches." }
    ],
    tags: ['Incubation', 'KOL Management', 'Launch Strategy', 'Meme Coin Positioning'],
    quote: "Across 20+ launches, the Thriv3 model combined narrative creation, aggressive social distribution, and KOL density to help client projects reach $1.5B+ in cumulative market caps."
  },
  {
    id: 'dogechain',
    title: 'Dogechain',
    subtitle: 'Ecosystem Case Study',
    category: 'Layer 2 / Dogecoin Expansion',
    description: 'Built the marketing and community foundations for a new Layer 2 ecosystem from scratch, achieving 10M wallets and 78M+ transactions within the first months.',
    stats: [
      { label: 'Wallets', value: '10M' },
      { label: 'Transactions', value: '78M+' }
    ],
    points: [
      { title: "Social Foundations", description: "Built all social channels from zero, creating the marketing foundations required for a new ecosystem to gain traction." },
      { title: "DOGE Utility", description: "Positioned Dogechain as a new utility layer for DOGE holders, driving rapid ecosystem growth and adoption." },
      { title: "Community Systems", description: "Implemented growth systems that turned users into distribution channels, increasing visibility and ecosystem activity." }
    ],
    tags: ['L2 Marketing', 'Community Building', 'Ecosystem Launch', 'Brand Building'],
    quote: "Dogechain achieved rapid ecosystem growth, reaching 10M wallets and 78M+ transactions within the first months after launch."
  },
  {
    id: 'persistence',
    title: 'Persistence',
    subtitle: 'Protocol Case Study',
    category: 'Cosmos Ecosystem / DeFi',
    description: 'Supported the growth and ecosystem expansion of Persistence and its liquid staking product pSTAKE through effective marketing and KOL coordination.',
    stats: [
      { label: 'MC Increase', value: '880%' },
      { label: 'TVL Growth', value: '3,100%' }
    ],
    points: [
      { title: "Token Launch", description: "Supported growth from the XPRT token launch onward through content, campaigns, and ambassador systems." },
      { title: "pSTAKE Launch", description: "Incubated and launched the liquid staking product resulting in a 3,100% TVL increase." },
      { title: "KOL Coordination", description: "Managed large-scale influencer partnerships to drive DeFi product visibility and ecosystem expansion." }
    ],
    tags: ['Liquid Staking', 'Ambassador Programs', 'Cosmos Ecosystem', 'KOL Coordination'],
    quote: "Persistence moved through a strong post-launch growth phase supported by effective marketing, ecosystem positioning, and DeFi product visibility."
  },
  {
    id: 'affyn',
    title: 'Affyn',
    subtitle: 'Gaming Case Study',
    category: 'Web3 Gaming / Metaverse',
    description: 'Built the growth engine for a Web3 gaming project, focusing on community incentives, hype systems, and social expansion to drive pre-sale demand.',
    stats: [
      { label: 'Capital Raised', value: '$10M+' },
      { label: 'X Growth', value: '50K+' }
    ],
    points: [
      { title: "Community Incentives", description: "Developed growth incentives that converted community momentum into private and pre-sale demand." },
      { title: "Social Scaling", description: "Grew the X audience from 3,000 to over 50,000 followers through aggressive social scaling strategies." },
      { title: "Market Excitement", description: "Built significant market excitement before token sales, resulting in sold-out private and pre-sale rounds." }
    ],
    tags: ['Web3 Gaming', 'Metaverse', 'Capital Raising', 'Community Growth'],
    quote: "Affyn sold out both private and pre-sale rounds, raising more than $10M while growing to 50,000+ followers and 15,000+ Telegram members."
  },
  {
    id: 'comdex',
    title: 'Comdex',
    subtitle: 'Infrastructure Case Study',
    category: 'DeFi Infrastructure / Cosmos',
    description: 'Scaled a Cosmos DeFi infrastructure project in 3 months, achieving major audience growth and strong token momentum through aggressive community scaling.',
    stats: [
      { label: 'X Growth', value: '24K' },
      { label: 'Token Growth', value: '12x' }
    ],
    points: [
      { title: "Social Scaling", description: "Grew the X audience from 1,000 to 24,000 followers within a 3-month engagement period." },
      { title: "Launch Momentum", description: "Built aggressive launch momentum through coordinated KOL campaigns and fair launch support on Osmosis." },
      { title: "Multi-Channel Growth", description: "Managed community engagement across Telegram, Reddit, and other channels to build a cohesive ecosystem." },
      { title: "Narrative Positioning", description: "Positioned Comdex as a critical DeFi infrastructure layer within the Cosmos ecosystem." }
    ],
    tags: ['Cosmos Ecosystem', 'Fair Launch', 'Community Scaling', 'KOL Campaigns'],
    quote: "Within 3 months Comdex achieved major audience growth, growing X from 1,000 to 24,000 followers while the token moved from $0.50 to $6 in one week."
  },
  {
    id: 'sentinel',
    title: 'Sentinel',
    subtitle: 'Marketing Case Study',
    category: 'Ambassador Programs / Growth',
    description: 'Built and managed a large-scale ambassador system of 200+ members, driving significant price momentum and coordinated ecosystem growth.',
    stats: [
      { label: 'Ambassadors', value: '200' },
      { label: 'Price Increase', value: '27x' }
    ],
    points: [
      { title: "Ambassador OS", description: "Designed a structured operating system capable of handling up to 200 ambassadors for coordinated growth." },
      { title: "Price Momentum", description: "Focused on driving price momentum through coordinated community actions and targeted KOL support." },
      { title: "Content Strategy", description: "Developed a comprehensive content strategy that ambassadors used to amplify the project's reach." },
      { title: "KOL Coordination", description: "Combined the ambassador system with targeted KOL campaigns to maximize distribution density." }
    ],
    tags: ['Ambassador Programs', 'Growth Marketing', 'Price Momentum', 'Content Strategy'],
    quote: "The ambassador program, content strategy, and KOL support helped drive the token from $0.0018 to $0.05 within the operating window."
  }
];

// --- Components ---

const GlowPoints = () => {
  const points = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    color: Math.random() > 0.5 ? 'text-brand-red' : 'text-brand-orange',
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {points.map((p) => (
        <motion.div
          key={p.id}
          className={`glow-point ${p.color}`}
          style={{ top: p.top, left: p.left }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

const CaseStudyCarousel = ({ points }: { points: { title: string; description: string }[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [points]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % points.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + points.length) % points.length);

  return (
    <div className="relative mt-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${points[currentIndex].title}-${currentIndex}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="glass p-8 rounded-2xl border-l-4 border-l-brand-red"
        >
          <h4 className="text-brand-red font-display text-lg mb-4 uppercase tracking-wider">
            {currentIndex + 1}. {points[currentIndex].title}
          </h4>
          <p className="text-white/70 text-sm leading-relaxed font-accent">
            {points[currentIndex].description}
          </p>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex gap-4 mt-6">
        <button 
          onClick={prev}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all group"
        >
          <ChevronLeft className="w-5 h-5 text-white/40 group-hover:text-white" />
        </button>
        <button 
          onClick={next}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all group"
        >
          <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white" />
        </button>
        <div className="flex items-center gap-2 ml-auto">
          {points.map((_, i) => (
            <div 
              key={i}
              className={`h-1 transition-all duration-300 rounded-full ${i === currentIndex ? 'w-8 bg-brand-red' : 'w-2 bg-white/10'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, description }: StatProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02, y: -5, borderColor: 'rgba(255, 31, 64, 0.3)' }}
    viewport={{ once: true }}
    className="glass p-8 rounded-2xl flex flex-col gap-2 transition-colors group cursor-default"
  >
    <span className="text-brand-red font-mono text-sm tracking-widest uppercase">{label}</span>
    <h3 className="text-5xl font-bold font-display group-hover:text-brand-red transition-colors origin-left">{value}</h3>
    <p className="text-white/50 text-sm mt-2">{description}</p>
  </motion.div>
);

const ExperienceItem = ({ role, company, period, impact, tools }: ExperienceProps) => (
  <div className="relative pl-8 border-l border-white/10 pb-12 last:pb-0">
    <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-brand-red glow-red" />
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
      <div>
        <h3 className="text-2xl font-bold">{role}</h3>
        <p className="text-brand-red font-medium">{company}</p>
      </div>
      <span className="text-white/40 font-mono text-sm">{period}</span>
    </div>
    <ul className="space-y-3 mb-6">
      {impact.map((item, idx) => (
        <motion.li 
          key={idx} 
          whileHover={{ x: 8 }}
          className="text-white/70 flex gap-3 text-sm leading-relaxed cursor-default group"
        >
          <ChevronRight className="w-4 h-4 text-brand-red shrink-0 mt-1 group-hover:scale-125 transition-transform" />
          {item}
        </motion.li>
      ))}
    </ul>
    {tools && (
      <div className="flex flex-wrap gap-2">
        {tools.map(tool => (
          <span key={tool} className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-mono text-white/40 uppercase tracking-wider border border-white/5">
            {tool}
          </span>
        ))}
      </div>
    )}
  </div>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-red selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-dark/80 backdrop-blur-md py-4 border-b border-white/5' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover="hover"
            className="flex items-center gap-2 cursor-pointer group"
          >
            <motion.div 
              variants={{
                hover: { 
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(255, 31, 64, 0.6)"
                }
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center font-bold text-brand-dark"
            >
              D
            </motion.div>
            <motion.span 
              variants={{
                hover: { 
                  letterSpacing: "0.1em",
                  color: "#FF1F40"
                }
              }}
              className="font-display font-bold text-xl tracking-tighter transition-colors"
            >
              KEUVELAAR
            </motion.span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#expertise" className="hover:text-white transition-colors">Expertise</a>
            <a href="#contact" className="px-5 py-2 rounded-full bg-white text-brand-dark hover:bg-brand-red hover:text-white transition-all duration-300">
              Let's Talk
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-64 pb-48 overflow-hidden tech-grid">
        <div className="absolute inset-0 bg-radial-glow -z-10" />
        <GlowPoints />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-3/5 flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              <h1 className="text-5xl md:text-8xl font-display mb-4 tracking-tight leading-none">
                Davey Keuvelaar
              </h1>
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-12">
                <span className="text-xl md:text-3xl font-accent font-light tracking-[0.3em] text-white/80 uppercase">
                  Web3 Marketing
                </span>
                <div className="hidden md:block h-px w-32 bg-white/20" />
              </div>
              
              <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed mb-12 max-w-2xl font-accent">
                7+ years experience scaling Web3 ecosystems, DeFi protocols, and token launches. 
                Specialized in building growth engines that drive measurable user adoption.
              </p>
              
              <div className="flex flex-wrap gap-6 items-center">
                <a href="#work" className="group flex items-center gap-3 bg-brand-red px-10 py-5 rounded-sm font-display text-sm tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-300">
                  EXPLORE WORK
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
                <div className="flex items-center gap-8 text-white/30">
                  <a href="https://x.com/DaveStrategist" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors flex items-center gap-2 text-xs font-mono">
                    <Twitter className="w-4 h-4" /> @DaveStrategist
                  </a>
                  <a href="https://t.me/DaveStrategist" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors flex items-center gap-2 text-xs font-mono">
                    <Send className="w-4 h-4" /> @DaveStrategist
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-2/5 relative"
            >
              <div className="glow-frame group cursor-pointer">
                <div className="glow-content">
                  <img 
                    src="https://i.imgur.com/rLUM47g.png" 
                    alt="Davey Keuvelaar" 
                    className="w-full h-auto transition-all duration-700 scale-105 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-red/20 blur-3xl rounded-full -z-10" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-brand-orange/20 blur-3xl rounded-full -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-brand-gray/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard 
              label="Trading Volume" 
              value="$20M+" 
              description="Scaled Hypersurface from 0 to $20M+ volume in just 4 months."
            />
            <StatCard 
              label="Market Cap" 
              value="$1.5B+" 
              description="Cumulative market cap reached across 20+ launches at Thriv3."
            />
            <StatCard 
              label="Growth" 
              value="3,100%" 
              description="TVL growth achieved during expansion phase at Persistence."
            />
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section id="work" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-brand-red font-mono text-sm tracking-widest uppercase mb-4 block">Selected Case Studies</span>
              <h2 className="text-5xl md:text-7xl font-bold">Featured <br />Projects</h2>
            </div>
            <div className="flex gap-4 mb-4">
              <button 
                onClick={() => setProjectIndex(prev => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length)}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all group"
              >
                <ChevronLeft className="w-6 h-6 text-white/40 group-hover:text-white" />
              </button>
              <button 
                onClick={() => setProjectIndex(prev => (prev + 1) % CASE_STUDIES.length)}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all group"
              >
                <ChevronRight className="w-6 h-6 text-white/40 group-hover:text-white" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={projectIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-16 items-start"
            >
              <div className="md:w-1/2">
                <span className="text-brand-red font-mono text-sm tracking-widest uppercase mb-4 block">{CASE_STUDIES[projectIndex].subtitle}</span>
                <h3 className="text-4xl md:text-6xl font-bold mb-8">{CASE_STUDIES[projectIndex].title}</h3>
                <p className="text-lg text-white/60 mb-8 leading-relaxed">
                  {CASE_STUDIES[projectIndex].description}
                </p>
                
                <CaseStudyCarousel points={CASE_STUDIES[projectIndex].points} />
              </div>
              
              <div className="md:w-1/2 space-y-8">
                <motion.div 
                  whileHover={{ y: -8, borderColor: 'rgba(255, 31, 64, 0.2)' }}
                  className="glass rounded-3xl overflow-hidden group transition-colors"
                >
                  <div className="p-8 border-b border-white/5">
                    <div className="flex justify-between items-center mb-6">
                      <span className="px-3 py-1 rounded-full bg-brand-red/20 text-brand-red text-[10px] font-bold uppercase tracking-widest">Impact</span>
                      <BarChart3 className="text-white/20 w-5 h-5 group-hover:text-brand-red transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      {CASE_STUDIES[projectIndex].stats.map((stat, i) => (
                        <div key={i}>
                          <span className="text-white/40 text-xs block mb-1">{stat.label}</span>
                          <span className="text-3xl font-bold font-display group-hover:text-white transition-colors">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-8 bg-white/5">
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-brand-red animate-pulse" />
                      Key Growth Mechanics
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {CASE_STUDIES[projectIndex].tags.map(tag => (
                        <span key={tag} className="px-4 py-2 rounded-xl bg-brand-dark/50 text-xs text-white/70 border border-white/10 hover:border-brand-red/30 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -8, borderColor: 'rgba(255, 31, 64, 0.2)' }}
                  className="glass rounded-3xl p-8 transition-colors group"
                >
                  <h4 className="font-bold mb-6 group-hover:text-brand-red transition-colors">Strategic Outcome</h4>
                  <div className="bg-brand-red/5 border border-brand-red/20 rounded-2xl p-6 group-hover:bg-brand-red/10 transition-colors">
                    <p className="text-brand-red text-sm italic leading-relaxed">
                      "{CASE_STUDIES[projectIndex].quote}"
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-20">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">Scroll for more</span>
              <ArrowDown className="w-5 h-5 text-brand-red pulse-arrow" />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 bg-brand-gray/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <span className="text-brand-red font-mono text-sm tracking-widest uppercase mb-4 block">The Journey</span>
            <h2 className="text-5xl md:text-7xl font-bold">Professional <br />Experience</h2>
          </div>
          
          <div className="max-w-4xl">
            <ExperienceItem 
              role="Marketing Lead"
              company="Hypersurface"
              period="2025 – Present"
              impact={[
                "Scaled protocol from 0 to $20M+ trading volume within 4 months.",
                "Acquired 500+ daily traders during launch phase.",
                "Grew X account from 50 to 12,000+ followers organically.",
                "Executed 2 large-scale KOL campaigns generating 150+ coordinated posts."
              ]}
              tools={['Dune', 'Nansen', 'Mixpanel', 'Google Analytics', 'Notion']}
            />
            
            <ExperienceItem 
              role="Business Development"
              company="Movimentum"
              period="2025"
              impact={[
                "Collaborated with Avalanche, Sonic, Magic Eden, Bitget, and Hemi.",
                "Developed ecosystem positioning frameworks for Web3 infrastructure.",
                "Established 50+ potential client and partnership connections."
              ]}
            />
            
            <ExperienceItem 
              role="Co-Founder"
              company="Thriv3"
              period="2024 – 2025"
              impact={[
                "Led marketing and launch strategy for 20+ Web3 projects.",
                "Helped client tokens reach $1.5B+ cumulative market capitalization.",
                "Activated a network of 300+ KOLs and creators across campaigns."
              ]}
            />
            
            <ExperienceItem 
              role="Marketing Lead"
              company="Lunar Digital Assets"
              period="2020 – 2023"
              impact={[
                "Managed marketing for Polygon, QuickSwap, Kava, and Secret Network.",
                "Led ecosystem expansion initiatives across multiple blockchain ecosystems.",
                "Managed ambassador programs and influencer partnerships."
              ]}
            />
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section id="expertise" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-brand-red font-mono text-sm tracking-widest uppercase mb-4 block">Capabilities</span>
            <h2 className="text-5xl md:text-7xl font-bold">Core Expertise</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              whileHover={{ y: -10, borderColor: 'rgba(255, 31, 64, 0.3)' }}
              className="glass p-8 rounded-3xl group transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="text-brand-red" />
              </div>
              <h4 className="text-xl font-bold mb-4 group-hover:text-brand-red transition-colors">Growth & Acquisition</h4>
              <ul className="text-white/40 text-sm space-y-2">
                <li>Growth Strategy</li>
                <li>User Acquisition</li>
                <li>Conversion Optimization</li>
                <li>Referral Programs</li>
              </ul>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10, borderColor: 'rgba(255, 31, 64, 0.3)' }}
              className="glass p-8 rounded-3xl group transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layers className="text-brand-red" />
              </div>
              <h4 className="text-xl font-bold mb-4 group-hover:text-brand-red transition-colors">Web3 Marketing</h4>
              <ul className="text-white/40 text-sm space-y-2">
                <li>Go-To-Market Strategy</li>
                <li>DeFi Ecosystem Marketing</li>
                <li>Token Launch Strategy</li>
                <li>Narrative & Positioning</li>
              </ul>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10, borderColor: 'rgba(255, 31, 64, 0.3)' }}
              className="glass p-8 rounded-3xl group transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="text-brand-red" />
              </div>
              <h4 className="text-xl font-bold mb-4 group-hover:text-brand-red transition-colors">Ecosystems</h4>
              <ul className="text-white/40 text-sm space-y-2">
                <li>Strategic Partnerships</li>
                <li>Co-Marketing Campaigns</li>
                <li>Community-Led Growth</li>
                <li>Ambassador Programs</li>
              </ul>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10, borderColor: 'rgba(255, 31, 64, 0.3)' }}
              className="glass p-8 rounded-3xl group transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="text-brand-red" />
              </div>
              <h4 className="text-xl font-bold mb-4 group-hover:text-brand-red transition-colors">Social Growth</h4>
              <ul className="text-white/40 text-sm space-y-2">
                <li>KOL & Creator Campaigns</li>
                <li>Crypto Twitter Growth</li>
                <li>Content Marketing</li>
                <li>Algorithm-Driven Distribution</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-32 border-t border-white/5 relative overflow-hidden">
        <GlowPoints />
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-display mb-12 tracking-tighter">READY TO <span className="text-brand-red">SCALE?</span></h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <a href="mailto:davey@keuvelaar.com" className="flex items-center gap-3 text-sm font-mono hover:text-brand-red transition-colors tracking-widest">
                <Mail className="w-5 h-5" />
                daveykeuvelaar@gmail.com
              </a>
              <div className="flex items-center gap-8">
                <a href="https://x.com/DaveStrategist" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-mono hover:text-brand-red transition-colors">
                  <Twitter className="w-4 h-4" /> @DaveStrategist
                </a>
                <a href="https://t.me/DaveStrategist" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-mono hover:text-brand-red transition-colors">
                  <Send className="w-4 h-4" /> @DaveStrategist
                </a>
                <a href="https://www.linkedin.com/in/davey-keuvelaar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-mono hover:text-brand-red transition-colors">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
          
          <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/10 text-[10px] font-mono uppercase tracking-[0.3em]">
            <p>© 2026 Davey Keuvelaar. All Rights Reserved.</p>
            <p>WEB3 GROWTH INFRASTRUCTURE</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
