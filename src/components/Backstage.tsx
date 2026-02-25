import { motion } from 'framer-motion';

const articles = [
    {
        title: "How we designed a award-winning mobile experience",
        category: "Design",
        date: "MAR 2024",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "The power of high-quality code in digital products",
        category: "Development",
        date: "FEB 2024",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Collaborating with fast-growing startups in 2024",
        category: "Backstage",
        date: "JAN 2024",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
    }
];

const Backstage = () => {
    return (
        <section className="bg-[#0b0b0b] py-24 sm:py-32 px-6 sm:px-10 lg:px-20 border-t border-white/5">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex justify-between items-end mb-12 sm:mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-[#ff4b2b] text-[10px] sm:text-[14px] font-bold uppercase tracking-[0.2em] mb-3 sm:mb-4">
                            Journal
                        </h2>
                        <p className="text-white text-[12vw] sm:text-[48px] md:text-[64px] font-bold tracking-tighter leading-[1]">
                            Backstage
                        </p>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="text-white/40 text-[12px] sm:text-[16px] font-bold uppercase tracking-widest hidden sm:block hover:text-white transition-colors"
                    >
                        See all posts
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {articles.map((article, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-[4/5] overflow-hidden rounded-[2px] mb-8 bg-[#1a1a1a]">
                                <motion.img
                                    src={article.image}
                                    alt={article.title}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.8 }}
                                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <div className="flex justify-between items-center text-[12px] font-bold uppercase tracking-widest text-white/30 mb-4">
                                <span>{article.category}</span>
                                <span>{article.date}</span>
                            </div>
                            <h3 className="text-white text-[24px] lg:text-[28px] font-bold leading-[1.2] group-hover:text-[#ff4b2b] transition-colors">
                                {article.title}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Backstage;
