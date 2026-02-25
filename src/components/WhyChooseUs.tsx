import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const reasons = [
    {
        id: '01',
        title: 'Strategic Innovation',
        description: 'We blend creative excellence with data-driven strategy to ensure every project delivers measurable impact and digital authority.',
        size: 'large', // 2x2 or similar
        gradient: 'from-[#ff4b2b]/20 to-transparent'
    },
    {
        id: '02',
        title: 'Cutting-Edge Tech',
        description: 'AI-driven solutions and 3D web frameworks.',
        size: 'small',
        gradient: 'from-blue-500/10 to-transparent'
    },
    {
        id: '03',
        title: 'Transparent Process',
        description: 'Crystal-clear communication workflows.',
        size: 'small',
        gradient: 'from-orange-500/10 to-transparent'
    },
    {
        id: '04',
        title: 'Result Focused Growth',
        description: 'We measure success by your conversion, retention, and scalable business impact. Your growth is our primary KPI.',
        size: 'medium', // wide
        gradient: 'from-white/5 to-transparent'
    }
];

const BentoCard = ({ reason, index }: { reason: typeof reasons[0], index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 30 });

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    }

    const sizeClasses = {
        large: 'md:col-span-2 md:row-span-2 min-h-[400px]',
        medium: 'md:col-span-2 min-h-[300px]',
        small: 'md:col-span-1 min-h-[300px]'
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                mouseX.set(0);
                mouseY.set(0);
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1200 }}
            className={`${sizeClasses[reason.size as keyof typeof sizeClasses]} relative group`}
        >
            <motion.div
                style={{ rotateX, rotateY }}
                className="relative h-full w-full p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl bg-neutral-900/40 overflow-hidden flex flex-col justify-between transition-colors duration-500 hover:border-[#ff4b2b]/30"
            >
                {/* Noise & Grain Texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                {/* Dynamic Gradient Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-12">
                        <span className="text-[#ff4b2b] font-black text-xs tracking-[0.3em] uppercase opacity-50">
                            {reason.id}
                        </span>
                        <motion.div
                            animate={{ rotate: isHovered ? 45 : 0 }}
                            className="w-10 h-10 rounded-full border-2 border-white/10 flex items-center justify-center text-white/20 group-hover:text-[#ff4b2b] group-hover:border-[#ff4b2b]/50 transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </motion.div>
                    </div>

                    <h3 className={`text-white font-[800] tracking-tight leading-tight mb-6 ${reason.size === 'large' ? 'text-4xl lg:text-5xl' : 'text-2xl'}`}>
                        {reason.title}
                    </h3>
                    <p className={`text-white/40 font-medium leading-relaxed group-hover:text-white/70 transition-colors ${reason.size === 'large' ? 'text-lg max-w-md' : 'text-sm'}`}>
                        {reason.description}
                    </p>
                </div>

                <div className="relative z-10 mt-12 flex items-end justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="w-12 h-[1px] bg-[#ff4b2b]" />
                        <span className="text-[10px] uppercase tracking-widest text-[#ff4b2b] font-black italic">Midis Core</span>
                    </div>

                    {reason.size === 'large' && (
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-neutral-800" />
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-[#ff4b2b] flex items-center justify-center text-[10px] font-bold text-white">
                                +
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

const WhyChooseUs = () => {
    return (
        <section className="bg-[#0a0a0a] pt-0 pb-32 lg:pb-30 px-10 lg:px-20 relative overflow-hidden">
            {/* Architectural Background Lights */}
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
            <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
                    <div className="lg:col-span-8">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-[#ff4b2b] uppercase tracking-[0.6em] text-[11px] font-black mb-8 block"
                        >
                            The Difference
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-white text-[8vw] lg:text-[6vw] font-[900] tracking-tighter leading-[0.85] uppercase"
                        >
                            Engineered for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4b2b] to-white italic">Unfair Advantage</span>
                        </motion.h2>
                    </div>
                    <div className="lg:col-span-4 lg:pt-20">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-white/30 text-xl leading-relaxed border-l border-white/10 pl-8 font-medium italic"
                        >
                            We don't settle for "good enough." We build the digital infrastructure that puts you years ahead of your competition.
                        </motion.p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {reasons.map((reason, index) => (
                        <BentoCard key={index} reason={reason} index={index} />
                    ))}
                </div>
            </div>

          
        </section>
    );
};

export default WhyChooseUs;
