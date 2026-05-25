const catalog = {
  'cyber-security': {
    id: 'cyber-security',
    title: 'Cyber Security',
    price: 899,
    originalPrice: 1200,
    duration: '3 Months Training + Project',
    level: 'Beginner to Advanced',
    description: 'Ethical hacking, network defense, penetration testing, and cloud security protocols. Protect systems and build a secure digital future.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
    category: 'Internship Program'
  },
  'gen-ai': {
    id: 'gen-ai',
    title: 'Gen AI',
    price: 999,
    originalPrice: 1500,
    duration: '3 Months Training + Project',
    level: 'Beginner to Advanced',
    description: 'Learn to build applications with Large Language Models (LLMs), prompt engineering, and integrate generative capabilities into software solutions.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=1200',
    category: 'Internship Program'
  },
  'agentic-ai': {
    id: 'agentic-ai',
    title: 'Agentic AI',
    price: 1199,
    originalPrice: 1700,
    duration: '3 Months Training + Project',
    level: 'Beginner to Advanced',
    description: 'Build autonomous AI agents, multi-agent systems, task planning, and orchestrate intelligent workflows using leading agentic frameworks.',
    image: '/agentic-ai.png',
    category: 'Internship Program'
  },
  'vlsi': {
    id: 'vlsi',
    title: 'VLSI',
    price: 1199,
    originalPrice: 1750,
    duration: '3 Months Training + Project',
    level: 'Beginner to Advanced',
    description: 'Very Large Scale Integration engineering. Master digital design, Verilog, FPGA, and physical design concepts for modern semiconductor chips.',
    image: '/vlsi.png',
    category: 'Internship Program'
  },
  'quantum-computing': {
    id: 'quantum-computing',
    title: 'Quantum Computing',
    price: 1199,
    originalPrice: 1750,
    duration: '3 Months Training + Project',
    level: 'Beginner to Advanced',
    description: 'Introduction to quantum bits (qubits), quantum circuits, algorithms like Shor\'s and Grover\'s, and hands-on programming on quantum hardware.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200',
    category: 'Internship Program'
  },
  'microsoft-fabric': {
    id: 'microsoft-fabric',
    title: 'Microsoft Fabric',
    price: 1499,
    originalPrice: 3150,
    duration: '3 Months Training + Project',
    level: 'Beginner to Advanced',
    description: 'Master Microsoft\'s all-in-one analytics platform. Learn data engineering, data factory pipelines, Synapse data science, and Power BI integration.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    category: 'Internship Program'
  }
};

export const getProgramDetails = (programId) => {
  const cleanId = (programId || '').toLowerCase().trim().replace(/\s+/g, '-');
  
  // Find in catalog
  const found = catalog[cleanId];
  if (found) return found;

  // Fallback default
  let title = cleanId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return {
    id: cleanId || 'premium-course',
    title: title || 'Premium Program',
    price: 999,
    originalPrice: 1500,
    duration: '3 Months Training + Project',
    level: 'Beginner to Advanced',
    description: 'Comprehensive curriculum designed by industry experts. Take your career to the next level with hands-on projects and 1-on-1 mentorship.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200',
    category: 'Internship Program'
  };
};

export const getCatalogList = () => Object.values(catalog);
