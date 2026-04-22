import { motion } from 'motion/react';
import { Linkedin, Twitter, ExternalLink } from 'lucide-react';

const team = [
  {
    name: "Alexander J. Vance",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    desc: "A visionary entrepreneur dedicated to redefining urban service hubs."
  },
  {
    name: "Sarah K. Miller",
    role: "Head of Cyber Operations",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    desc: "Expert in high-performance networking and digital ecosystem security."
  },
  {
    name: "Julian ‘Master’ Rossi",
    role: "Lead Barber / Art Director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    desc: "Master of the craft with over 15 years in bespoke grooming artistry."
  },
  {
    name: "Nicolette Vargos",
    role: "Manager, Detail & Care",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    desc: "Specialist in chemical engineering for premium automotive detailing."
  }
];

export default function Team() {
  return (
    <section id="team" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="text-xs font-bold tracking-[0.3em] uppercase text-brand-blue mb-4 block"
          >
            The Custodians
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1D1D1F]">
            Meet the <span className="text-black/40 italic">Visionaries</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass-card p-4 hover:border-brand-blue/40 transition-all flex flex-col h-full"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6 pb-8">
                  <div className="flex gap-4">
                    <a href="#" className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-brand-blue transition-all">
                      <Linkedin size={18} />
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-brand-blue transition-all">
                      <Twitter size={18} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="px-2 pb-4">
                <h3 className="text-xl font-bold mb-1 text-[#1D1D1F] group-hover:text-brand-blue transition-colors">{member.name}</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-[#1D1D1F]/30 mb-4">{member.role}</p>
                <p className="text-sm text-[#1D1D1F]/60 leading-relaxed">{member.desc}</p>
              </div>
              
              <div className="mt-auto pt-6 px-2">
                <button className="flex items-center gap-2 text-xs font-bold text-[#1D1D1F]/20 hover:text-[#1D1D1F] transition-colors">
                  VIEW BIO <ExternalLink size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
