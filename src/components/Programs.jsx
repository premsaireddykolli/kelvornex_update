import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Database, Brain, Globe, Shield, BarChart3, Users, Clock, 
  ArrowRight, Zap, Briefcase, HeartPulse, PenTool, Layout, 
  Smartphone, Cpu, Binary, Car, Scale, Palette, Scissors, Gamepad2, Plane, Settings
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const ProgramCard = ({ icon: Icon, title, description, count, duration = "2 Months" }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-3xl group cursor-pointer relative overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col h-full"
  >
    <Link to={`/${title.toLowerCase().replace(/\s+/g, '-')}`} className="absolute inset-0 z-10" />
    <div className={`w-16 h-16 rounded-2xl bg-brand-purple/5 flex items-center justify-center mb-6 group-hover:bg-brand-purple transition-all duration-500`}>
      <Icon className="text-brand-purple group-hover:text-white group-hover:scale-110 transition-transform" size={32} />
    </div>
    
    <h3 className="text-2xl font-bold font-display mb-3 text-gray-900 leading-tight">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">{description}</p>
    
    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs font-bold text-brand-purple uppercase">
          <Clock size={14} /> {duration}
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
          <Users size={14} /> {count} Mentees
        </div>
      </div>
      <div className="text-brand-purple font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
        Know More <ArrowRight size={16} />
      </div>
    </div>
  </motion.div>
);

const Programs = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const catParam = searchParams.get('cat');

  const tabs = [
    { id: 'Tech & Data', icon: Code },
    { id: 'Mechanics', icon: PenTool },
    { id: 'Business', icon: Briefcase },
    { id: 'Medical', icon: HeartPulse },
    { id: 'Design', icon: Layout },
    { id: 'Bootcamp', icon: Zap },
  ];

  // Helper to map search params
  const getMappedCategory = () => {
    if (categoryParam) return categoryParam;
    if (catParam) {
      const lower = catParam.toLowerCase();
      if (lower === 'tech' || lower === 'data') return 'Tech & Data';
      if (lower === 'product' || lower === 'marketing') return 'Business';
      if (lower === 'design') return 'Design';
    }
    return null;
  };

  // Set initial active tab based on query param if matched
  const getInitialTab = () => {
    const targetCategory = getMappedCategory();
    if (targetCategory) {
      const matchedTab = tabs.find(t => 
        t.id.toLowerCase().includes(targetCategory.toLowerCase()) || 
        targetCategory.toLowerCase().includes(t.id.toLowerCase())
      );
      if (matchedTab) return matchedTab.id;
    }
    return 'Tech & Data';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

  const [prevParams, setPrevParams] = useState({ categoryParam, catParam });
  if (categoryParam !== prevParams.categoryParam || catParam !== prevParams.catParam) {
    setPrevParams({ categoryParam, catParam });
    const targetCategory = getMappedCategory();
    if (targetCategory) {
      const matchedTab = tabs.find(t => 
        t.id.toLowerCase().includes(targetCategory.toLowerCase()) || 
        targetCategory.toLowerCase().includes(t.id.toLowerCase())
      );
      if (matchedTab) {
        setActiveTab(matchedTab.id);
      }
    }
  }

  useEffect(() => {
    const targetCategory = getMappedCategory();
    if (targetCategory) {
      // Allow DOM to settle, then smooth scroll to the section container
      const timer = setTimeout(() => {
        const element = document.getElementById('programs');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryParam, catParam]);

  const programData = {
    'Tech & Data': [
      { icon: Code, title: "Web Development", description: "Master Web Fundamentals to Build Your Own Website", count: "13k+" },
      { icon: Smartphone, title: "Android Development", description: "Master Android Programming to Create Your Own Mobile", count: "10k+" },
      { icon: Shield, title: "Cyber Security", description: "Master Cloud Security to Safeguard Your Digital Assets", count: "12k+" },
      { icon: Brain, title: "Artificial Intelligence", description: "Master AI to Innovate and Transform Industries", count: "10k+" },
      { icon: Database, title: "Data Science", description: "Master Data Science to Unlock Insights from Data", count: "15k+" },
      { icon: Cpu, title: "Machine Learning", description: "Master Machine Learning to Develop Intelligent Systems", count: "9k+" },
      { icon: Settings, title: "IoT & Robotics", description: "Master IoT & Robotics to Build Automated Systems", count: "16k+" },
      { icon: Globe, title: "Cloud Computing", description: "Master in Revolutionize Digital Infrastructure", count: "13k+" },
      { icon: Binary, title: "Embedded System", description: "Master in Developing High-Performance Devices", count: "10k+" },
      { icon: Code, title: "DSA", description: "Master Data Structures and Algorithms for Top Companies", count: "8k+" },
    ],
    'Mechanics': [
      { icon: Car, title: "Hybrid & Electric Vehicles", description: "Master the future of automotive technology.", count: "5k+" },
      { icon: PenTool, title: "Auto CAD", description: "Master 2D and 3D computer-aided design.", count: "12k+" },
    ],
    'Business': [
      { icon: Globe, title: "Digital Marketing", description: "Boost online presence and engage with audience.", count: "20k+" },
      { icon: BarChart3, title: "Finance", description: "Master financial planning and analysis.", count: "11k+" },
      { icon: Briefcase, title: "Human Resource", description: "Master talent management and strategy.", count: "8k+" },
      { icon: BarChart3, title: "Stock Market", description: "Learn trading and investment strategies.", count: "14k+" },
      { icon: BarChart3, title: "Business Analytics", description: "Turn data into actionable business insights.", count: "10k+" },
      { icon: Scale, title: "Corporate Law", description: "Understand legal frameworks for businesses.", count: "4k+" },
    ],
    'Medical': [
      { icon: Binary, title: "Genetics Engineering", description: "Explore the future of biotechnology.", count: "3k+" },
      { icon: HeartPulse, title: "Psychology", description: "Understand human behavior and mental health.", count: "12k+" },
      { icon: HeartPulse, title: "Medical Coding", description: "Master healthcare classification systems.", count: "9k+" },
    ],
    'Design': [
      { icon: Layout, title: "UI/UX Design", description: "Design beautiful and functional user experiences.", count: "18k+" },
      { icon: Palette, title: "Graphic Design", description: "Master visual communication and branding.", count: "15k+" },
      { icon: Scissors, title: "Fashion Designing", description: "Explore the world of fashion and apparel design.", count: "6k+" },
    ],
    'Bootcamp': [
      { icon: Gamepad2, title: "AR VR", description: "Build immersive virtual and augmented realities.", count: "4k+" },
      { icon: Plane, title: "Drone Engineering", description: "Master drone design and flight technology.", count: "3k+" },
      { icon: Settings, title: "Robot Engineering", description: "Design and build advanced robotic systems.", count: "5k+" },
      { icon: Zap, title: "Career Advancement", description: "Intensive program for professional growth.", count: "7k+" },
    ]
  };

  return (
    <section id="programs" className="py-32 bg-gray-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-extrabold font-display mb-6 text-gray-900 tracking-tight">
            Our Featured <span className="text-brand-purple">Programs</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Select a category to explore our wide range of industry-vetted programs.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold transition-all text-sm md:text-base ${
                activeTab === tab.id 
                ? 'bg-brand-purple text-white shadow-xl shadow-brand-purple/40 scale-105' 
                : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100 shadow-sm'
              }`}
            >
              <tab.icon size={20} />
              {tab.id}
            </button>
          ))}
        </div>

        {/* Program Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {programData[activeTab].map((prog) => (
              <ProgramCard key={prog.title} {...prog} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Programs;
