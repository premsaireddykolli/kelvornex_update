import { useState } from 'react';
import Layout from '../components/Layout';
import { Calendar, User, Clock, ArrowRight, ArrowUpRight } from 'lucide-react';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Technology', 'Marketing', 'Career Guides', 'Data Science'];

  const posts = [
    {
      id: 1,
      category: "Technology",
      title: "The Rise of Agentic AI: How AI Agents are Changing Software Engineering",
      excerpt: "AI is moving from simple chat assistance to fully autonomous agentic workflows. Discover how this shift affects modern software engineers, DevOps, and project management.",
      author: "Aditya Sharma",
      date: "May 18, 2026",
      readTime: "6 min read",
      featured: true,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: 2,
      category: "Marketing",
      title: "Mastering Performance Marketing in 2026: Strategies that Actually Convert",
      excerpt: "Cookies are fading, and privacy rules are tightening. Learn how top-performing marketing teams use first-party data and context targeting to drive massive conversions.",
      author: "Rohan Varma",
      date: "May 15, 2026",
      readTime: "4 min read",
      featured: false,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 3,
      category: "Career Guides",
      title: "How to Build a Technical Portfolio that Tech Startups Love to Hire",
      excerpt: "A generic resume won't cut it. Learn how to package your capstone projects, structure your GitHub repos, and write documentation that makes hiring managers reach out to you.",
      author: "Sneha Nair",
      date: "May 12, 2026",
      readTime: "5 min read",
      featured: false,
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 4,
      category: "Data Science",
      title: "Why Modern Data Teams are Ditching Hadoop for Real-Time Lakehouses",
      excerpt: "Understand the structural differences between data lakes, warehouses, and the modern lakehouse architecture utilizing Delta Lake and Apache Iceberg.",
      author: "Vikram Sen",
      date: "May 08, 2026",
      readTime: "7 min read",
      featured: false,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 5,
      category: "Technology",
      title: "Vite 6 vs Webpack: Performance Benchmarks for Large Scale React Apps",
      excerpt: "Deep-diving into bundle sizes, hot module replacement latency, and build pipeline customizability to see if upgrading your legacy project is worth the hassle.",
      author: "Amit Patel",
      date: "May 02, 2026",
      readTime: "8 min read",
      featured: false,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const featuredPost = posts.find(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured || activeCategory !== 'All');

  return (
    <Layout 
      title="Kelvornex Blog" 
      subtitle="Industry insights, technical tutorials, career guides, and marketing trends curated by experts."
      description="Kelvornex Blog: Read expert articles on upskilling trends, web development tutorials, data science advancements, and modern digital marketing."
    >
      <div className="space-y-16">
        {/* Category Navigation */}
        <div className="flex flex-wrap gap-2 justify-center border-b border-gray-150 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all cursor-pointer ${
                activeCategory === cat 
                  ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/20' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post (only display when All is selected or when category matches featured post) */}
        {activeCategory === 'All' && featuredPost && (
          <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-2">
            <div className="relative overflow-hidden min-h-[300px] lg:min-h-[450px]">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <span className="absolute top-6 left-6 bg-brand-purple text-white font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg">
                Featured • {featuredPost.category}
              </span>
            </div>
            
            <div className="p-8 md:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-400">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {featuredPost.date}</span>
                  <span className="flex items-center gap-1"><User size={14} /> By {featuredPost.author}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {featuredPost.readTime}</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight group-hover:text-brand-purple transition-colors">
                  {featuredPost.title}
                </h2>
                
                <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div>
                <button className="flex items-center gap-2 text-brand-purple font-extrabold group-hover:gap-3 transition-all cursor-pointer">
                  Read Article <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold font-display text-gray-900">
            {activeCategory === 'All' ? 'Recent Publications' : `${activeCategory} Articles`}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article 
                key={post.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-250 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-800 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="p-6 space-y-3">
                    <div className="flex gap-3 text-[11px] font-semibold text-gray-400">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                    </div>
                    
                    <h4 className="font-extrabold text-gray-900 text-lg leading-snug group-hover:text-brand-purple transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    
                    <p className="text-gray-500 text-xs md:text-sm line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">By {post.author}</span>
                  <button className="text-brand-purple hover:text-brand-purple-dark font-bold text-xs flex items-center gap-1 cursor-pointer">
                    Read <ArrowUpRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
