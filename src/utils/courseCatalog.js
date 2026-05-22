export const getProgramDetails = (programId, cat, pathname = '') => {
  // Normalize the identifier by replacing spaces/hyphens to match catalog entries
  const cleanId = (programId || '').toLowerCase().trim().replace(/\s+/g, '-');
  
  // Base default formatting
  let title = cleanId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  if (!title) title = 'Premium Program';

  // Base defaults
  let price = 4999;
  let duration = '8-12 Weeks';
  let level = 'Beginner to Advanced';
  let description = 'Comprehensive curriculum designed by industry experts. Take your career to the next level with hands-on projects and 1-on-1 mentorship.';
  let image = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071';
  let category = 'Self Paced Course';

  // Check prefix or category from pathname or parameters
  const checkPath = pathname || window.location.pathname;
  const isAdvanced = checkPath.includes('/advanced-') || (cat && cat.toLowerCase().includes('advanced'));
  const isPro = checkPath.includes('/pro/') || (cat && cat.toLowerCase().includes('pro'));

  if (isAdvanced) {
    price = 14999;
    duration = '6 Months';
    level = 'Intermediate to Advanced';
    category = 'Advanced Program';
    image = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200';
  } else if (isPro) {
    price = 24999;
    duration = '12 Months';
    level = 'Beginner to Advanced';
    category = 'Pro Pack';
    image = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200';
  }

  // Customize specific known programs for richer catalog feel
  if (cleanId.includes('web-development')) {
    title = 'Web Development';
    price = 4999;
    description = 'Master HTML, CSS, JavaScript, React, Node.js and database management. Build fully responsive modern websites and web applications.';
    image = 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200';
  } else if (cleanId.includes('android')) {
    title = 'Android Development';
    price = 5999;
    description = 'Learn Kotlin, Android Studio, Jetpack Compose, and architectural patterns. Develop, test, and publish native mobile apps on Google Play Store.';
    image = 'https://images.unsplash.com/photo-1607252631355-89dddb30e7a4?auto=format&fit=crop&q=80&w=1200';
  } else if (cleanId.includes('cyber-security')) {
    title = 'Cyber Security';
    price = 6999;
    description = 'Learn ethical hacking, network defense, penetration testing, and cloud security protocols. Protect systems and earn top certifications.';
    image = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200';
  } else if (cleanId.includes('data-science')) {
    title = 'Data Science';
    price = 18999;
    description = 'Unlock the power of data. Master Python, SQL, Pandas, Data Visualization, and statistical models to guide strategic decisions.';
    image = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200';
  } else if (cleanId.includes('mba-lite')) {
    title = 'MBA Lite Pack';
    price = 24999;
    description = 'A fast-track mini-MBA program covering marketing, finance, human resource, operations, and leadership concepts to accelerate your business career.';
    image = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200';
  } else if (cleanId.includes('tech-starter')) {
    title = 'Tech Starter Pack';
    price = 29999;
    description = 'The ultimate bundle for tech aspirants. Covers Web Development, App Development, DSA, and Cloud Computing with 5+ professional certificates.';
    image = 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=1200';
  } else if (cleanId.includes('creator-pack')) {
    title = 'Creator Pack';
    price = 21999;
    description = 'Learn video production, digital marketing, copy writing, and brand building to create a profitable online presence and creative business.';
    image = 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1200';
  } else if (cleanId.includes('artificial-intelligence')) {
    title = 'Artificial Intelligence';
    price = 7999;
    description = 'Master AI to innovate and transform industries. Study neural networks, deep learning, NLP, and reinforcement learning.';
    image = 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=1200';
  } else if (cleanId.includes('machine-learning')) {
    title = 'Machine Learning';
    price = 7999;
    description = 'Master Machine Learning to develop intelligent systems. Cover regression, classification, clustering, and deployment.';
    image = 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=1200';
  } else if (cleanId.includes('iot-robotics') || cleanId.includes('iot-&-robotics')) {
    title = 'IoT & Robotics';
    price = 8999;
    description = 'Master IoT & Robotics to build automated systems. Learn microcontrollers, sensor integration, and firmware programming.';
    image = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200';
  }

  return {
    id: cleanId || 'premium-course',
    title,
    price,
    duration,
    level,
    description,
    image,
    category
  };
};
