import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const AboutText = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const text = "From fast-growing startups to experienced companies, we deliver functional design, high-quality code and well-thought strategy to increase your odds of success in the digital world.";
    const words = text.split(" ");

    // Highlight specific keywords in the text
    const highlights = ["functional", "design,", "high-quality", "code", "well-thought", "strategy", "success"];

    // Background move effect based on scroll
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section
            ref={sectionRef}
            className="bg-[#0a0a0a] pt-20 pb-32 lg:pb-72 px-6 sm:px-10 lg:px-20 overflow-hidden relative"
        >
            {/* Ambient Background Elements */}
            <motion.div
                style={{ y: bgY }}
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ff4b2b] opacity-[0.03] blur-[150px] rounded-full pointer-events-none"
            />
            <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-white opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-12"
                >
                    {/* Tiny Label */}
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-[1px] bg-[#ff4b2b]" />
                        <span className="text-[#ff4b2b] uppercase tracking-[0.4em] text-[10px] font-black italic">
                            Who we are
                        </span>
                    </div>

                    {/* Main Animated Text */}
                    <h2 className="text-white text-[8vw] sm:text-[7vw] lg:text-[4.2vw] font-[600] leading-[1.05] tracking-[-0.03em] max-w-full lg:max-w-[1300px] flex flex-wrap gap-x-[0.2em] gap-y-[0.1em]">
                        {words.map((word, index) => {
                            const isHighlighted = highlights.some(h => word.toLowerCase().includes(h.toLowerCase()));

                            return (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0.1, filter: "blur(10px)", y: 10 }}
                                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.02,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className={`inline-block ${isHighlighted
                                        ? "text-[#ff4b2b] font-[800] tracking-[-0.04em]"
                                        : "text-white"
                                        }`}
                                >
                                    {word}
                                </motion.span>
                            );
                        })}
                    </h2>

                    {/* Interactive Bottom Row */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="flex items-center gap-8 mt-12"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#ff4b2b", color: "#fff" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 sm:px-10 py-4 sm:py-5 rounded-full border border-[#ff4b2b]/20 text-white/80 font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-colors duration-500 backdrop-blur-sm bg-[#ff4b2b]/5"
                        >
                            Our Philosophy
                        </motion.button>

                        <div className="hidden md:flex flex-col">
                            <span className="text-white font-bold text-sm">250+</span>
                            <span className="text-[#ff4b2b]/60 text-[10px] uppercase tracking-[0.2em] font-black italic">
                                Projects Delivered
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Side Vertical Indicator */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 opacity-30">
                <span className="[writing-mode:vertical-lr] uppercase tracking-[0.5em] text-[10px] font-black text-[#ff4b2b]">scroll to explore</span>
                <div className="w-[1px] h-20 bg-gradient-to-b from-[#ff4b2b] to-transparent" />
            </div>
        </section>
    );
};

export default AboutText;

