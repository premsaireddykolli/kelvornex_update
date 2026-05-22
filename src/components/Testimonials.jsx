import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const stories = [
    {
      name: "Rahul Sharma",
      role: "Full Stack Developer",
      company: "Google",
      text: "The web development program at Corizo was life-changing. The mentors are industry experts who guide you at every step. I landed my dream job within 3 months of completion.",
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
      text: "Corizo's Machine Learning program is one of the best out there. The focus on fundamentals combined with advanced topics like NLP and CV is unmatched.",
      image: "https://i.pravatar.cc/150?u=vikram"
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-extrabold font-display mb-8 text-gray-900 tracking-tight">
            Success <span className="text-brand-purple">Stories</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Hear from our alumni who have successfully transitioned into high-growth tech roles after learning with Corizo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-10 rounded-[2.5rem] relative border border-gray-100"
            >
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-brand-purple rounded-full flex items-center justify-center text-white shadow-xl shadow-brand-purple/20">
                <Quote size={20} fill="currentColor" />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-brand-yellow fill-brand-yellow" />
                ))}
              </div>
              
              <p className="text-gray-700 text-lg italic leading-relaxed mb-10">
                "{story.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <img src={story.image} alt={story.name} className="w-14 h-14 rounded-full border-2 border-brand-purple/30 p-1" />
                <div>
                  <h4 className="font-bold text-gray-900">{story.name}</h4>
                  <p className="text-gray-400 text-sm">{story.role} @ {story.company}</p>
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
