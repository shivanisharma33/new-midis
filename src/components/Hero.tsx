import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import LightRays from './LightRays';

const Hero = () => {
    const [index, setIndex] = useState(0);
    const words = ["Creative", "Digital", "Marketing", "Design", "Strategy"];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.3 },
        },
    };

    const item = {
        hidden: { y: 40, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
        } as any,
    };

    return (
        <section className="relative min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-20 pt-24 sm:pt-28 pb-16 overflow-hidden bg-[#0a0a0a]">

            {/* Light Rays Background */}
            <LightRays
                raysOrigin="top-center"
                raysColor="#ffffff"
                raysSpeed={1}
                lightSpread={0.5}
                rayLength={3}
                pulsating={false}
                fadeDistance={1}
                saturation={1}
                followMouse
                mouseInfluence={0.1}
                noiseAmount={0}
                distortion={0}
            />

            {/* Grain Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-[5]" />

            {/* Background radial glow */}
            <div className="absolute top-[30%] left-[20%] sm:left-[30%] lg:left-[35%] w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] bg-white opacity-[0.04] blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="max-w-[1600px] mx-auto w-full relative z-10"
            >
                {/* ── Eyebrow Label ── */}
                <motion.div variants={item} className="flex items-center gap-3 mb-6 sm:mb-8">
                    <div className="w-6 h-[1px] bg-[#ff4b2b]" />
                    <span className="text-[#ff4b2b] text-[10px] sm:text-[11px] uppercase tracking-[0.45em] font-black">
                        Midis Digital Agency
                    </span>
                </motion.div>

                {/* ── Main Headline ── */}
                <motion.div variants={item}>
                    <h1 className="text-[13vw] sm:text-[11vw] lg:text-[8.5vw] font-[800] tracking-[-0.03em] leading-[0.88] text-white flex flex-wrap items-end gap-x-[0.25em] gap-y-0">
                        {/* Rotating word */}
                        <span className="relative overflow-hidden inline-block h-[1.1em] align-bottom">
                            {/* Ghost for width */}
                            <span className="invisible whitespace-nowrap">{words[index]}</span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={words[index]}
                                    initial={{ y: "105%", opacity: 0 }}
                                    animate={{ y: "0%", opacity: 1 }}
                                    exit={{ y: "-105%", opacity: 0 }}
                                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute left-0 top-0 text-[#ff4b2b] whitespace-nowrap"
                                >
                                    {words[index]}
                                </motion.span>
                            </AnimatePresence>
                        </span>

                        <span>Agency</span>
                    </h1>
                </motion.div>

                {/* ── Sub-row: Video mockup + Made Great + rating ── */}
                <motion.div
                    variants={item}
                    className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-end gap-6 sm:gap-10 lg:gap-14"
                >
                    {/* Video mockup card */}
                    <div className="w-[140px] sm:w-[180px] lg:w-[220px] shrink-0 self-start sm:self-end">
                        <div className="bg-[#f2f1ed] aspect-[4/3] rounded-sm p-1.5 shadow-2xl overflow-hidden">
                            <div className="bg-black rounded-[2px] h-full w-full relative overflow-hidden">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover grayscale-[0.2]"
                                >
                                    <source src="https://www.pexels.com/download/video/18069234/" type="video/mp4" />
                                </video>
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#ff4b2b]/10 to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Right block: Made Great + rating + CTA */}
                    <div className="flex flex-col gap-4 sm:gap-6">
                        {/* "Made Great" text */}
                        <div
                            className="text-[#ff4b2b] text-[14vw] sm:text-[12vw] lg:text-[9vw] font-[900] leading-none tracking-[0.04em]"
                            style={{
                                fontFamily: "'DotGothic16', sans-serif",
                                transform: 'scaleY(0.9)'
                            }}
                        >
                            Made Great
                        </div>

                        {/* Bottom info row */}
                        <div className="flex flex-wrap items-center gap-5 sm:gap-8">
                            {/* Clutch rating */}
                            <div className="flex items-center gap-2">
                                <span className="text-white/40 text-xs sm:text-sm font-medium tracking-tight">Clutch</span>
                                <span className="text-[#ff4b2b] text-xs sm:text-sm font-bold tracking-tight">4.9 ★</span>
                            </div>

                            {/* Divider */}
                            <div className="hidden sm:block w-[1px] h-4 bg-white/10" />

                            {/* Project count */}
                            <div className="flex items-center gap-2">
                                <span className="text-white text-xs sm:text-sm font-bold">250+</span>
                                <span className="text-white/30 text-[10px] sm:text-xs uppercase tracking-widest font-medium">Projects Done</span>
                            </div>

                            {/* CTA Button – mobile visible */}
                            <motion.button
                                whileHover={{ scale: 1.04, backgroundColor: '#ff4b2b', color: '#fff' }}
                                whileTap={{ scale: 0.94 }}
                                className="sm:hidden flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full text-[12px] font-bold transition-colors duration-300"
                            >
                                Let's Talk
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* ── Description & Desktop CTA ── */}
                <motion.div
                    variants={item}
                    className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-start sm:items-end gap-6 sm:gap-12 max-w-3xl"
                >
                    <p className="text-white/35 text-sm sm:text-base font-medium leading-relaxed max-w-md">
                        From fast-growing startups to global enterprises — we craft digital experiences
                        that convert, engage, and scale.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.04, backgroundColor: '#ff4b2b', color: '#fff' }}
                        whileTap={{ scale: 0.94 }}
                        className="hidden sm:flex shrink-0 items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[13px] font-bold transition-colors duration-300"
                    >
                        Start a project
                        <ArrowUpRight className="w-4 h-4" />
                    </motion.button>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
