import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const testimonials = [
    {
        quote: "Outloud exhibits excellent communication that ensures a smooth collaboration. They exceed expectations by considering all aspects of the UX, demonstrating their commitment and proactivity.",
        author: "Justin Valley",
        role: "CEO, StudyShep",
        avatar: "https://i.pravatar.cc/150?u=justin",
        rating: "5.0 ★"
    },
    {
        quote: "Their team's expertise in digital strategy and mobile development helped us achieve our goals faster than we ever thought possible. A truly exceptional partner.",
        author: "Sarah Chen",
        role: "Founder, GreenTrace",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        rating: "4.9 ★"
    }
];

const Testimonials = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="bg-[#0b0b0b] py-24 lg:py-48 px-10 lg:px-20 border-t border-white/5 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[1400px] mx-auto relative cursor-default"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="flex flex-col space-y-16"
                    >
                        {/* Quote Text with Character/Word Reveal Logic */}
                        <div className="overflow-hidden">
                            <motion.h2
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="text-white text-[3.8vw] lg:text-[2.6vw] font-[500] leading-[1.3] tracking-tight"
                            >
                                "{testimonials[index].quote}"
                            </motion.h2>
                        </div>

                        {/* Author Info & Rating Row */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="flex items-center gap-5"
                            >
                                <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
                                    <img
                                        src={testimonials[index].avatar}
                                        alt={testimonials[index].author}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row md:items-baseline gap-2">
                                    <span className="text-white text-[20px] font-bold tracking-tight">
                                        {testimonials[index].author}
                                    </span>
                                    <span className="text-white/30 text-[18px] font-medium tracking-tight">
                                        {testimonials[index].role}
                                    </span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="flex items-center gap-3 self-end md:self-auto"
                            >
                                <span className="text-white/40 text-[16px] font-medium">Clutch</span>
                                <span className="text-[#ff4b2b] text-[16px] font-bold tracking-wider">
                                    {testimonials[index].rating}
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Animated Progress Line */}
                <div className="mt-20 h-[2px] w-full bg-white/5 relative">
                    <motion.div
                        key={`line-${index}`}
                        initial={{ width: "0%", left: "0%" }}
                        animate={{ width: "30%", left: "0%" }} // Adjusted to match the short highlighted line in image
                        transition={{ duration: 8, ease: "linear" }}
                        className="absolute h-full bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Testimonials;
