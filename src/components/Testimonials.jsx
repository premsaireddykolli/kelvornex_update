import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const stories = [
    {
      name: "Rahul Sharma",
      role: "Full Stack Developer",
      company: "Google",
      text: "The web development program at Kelvornex was life-changing. The mentors are industry experts who guide you at every step. I landed my dream job within 3 months of completion.",
      image: "https://i.pravatar.cc/150?u=rahul"
    },
    {
      name: "Ananya Iyer",
      role: "Data Scientist",
      company: "Amazon",
      text: "The curriculum is extremely well-structured. Practical projects gave me the confidence to solve real-world problems. Highly recommended for anyone looking to transition into Data Science.",
      image: "https://i.pravatar.cc/150?u=ananya"
    },
    {
      name: "Vikram Singh",
      role: "ML Engineer",
      company: "Microsoft",
      text: "Kelvornex's Machine Learning program is one of the best out there. The focus on fundamentals combined with advanced topics like NLP and CV is unmatched.",
      image: "https://i.pravatar.cc/150?u=vikram"
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-slate-900 tracking-tight font-sans">
            Success <span className="text-brand-purple">Stories</span>
          </h2>
          <p className="text-slate-600 text-lg font-sans font-light">
            Hear from our alumni who have successfully transitioned into high-growth tech roles after learning with Kelvornex.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -6 }}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-slate-200/80 hover:bg-white shadow-sm hover:shadow-xl hover:shadow-slate-100/60 transition-all duration-300 relative"
            >
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-md">
                <Quote size={16} fill="currentColor" />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              
              <p className="text-slate-700 text-base italic leading-relaxed mb-8 font-sans font-medium">
                "{story.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <img src={story.image} alt={story.name} className="w-14 h-14 rounded-full border border-slate-200/60 p-0.5 bg-white shadow-sm" />
                <div className="font-sans">
                  <h4 className="font-bold text-slate-800">{story.name}</h4>
                  <p className="text-slate-500 text-sm mt-0.5">{story.role} @ {story.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
