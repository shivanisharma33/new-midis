import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ZoomCTA = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Zoom out effect: starts very large and scales down to normal
    const scale = useTransform(scrollYProgress, [0, 0.5], [1.5, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative h-[150vh] bg-[#0b0b0b] flex items-center justify-center overflow-hidden"
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center px-6">
                <motion.div
                    style={{ scale, opacity }}
                    className="flex flex-col items-center justify-center text-center"
                >
                    <h2 className="text-white text-[8vw] lg:text-[6.5vw] font-[900] leading-[1] tracking-[-0.04em] uppercase">
                        Let's turn your ideas <br />
                        into working products.
                    </h2>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-16 bg-[#ff4b2b] text-white px-10 py-5 rounded-full text-xl font-bold transition-shadow hover:shadow-[0_0_30px_rgba(255,75,43,0.4)]"
                    >
                        Start a project
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default ZoomCTA;
