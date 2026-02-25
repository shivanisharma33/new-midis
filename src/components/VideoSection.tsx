import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const VideoSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Transform values for zoom and scale
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["40px", "0px"]);

    return (
        <section
            ref={sectionRef}
            className="relative h-[150vh] bg-black flex items-center justify-center overflow-hidden"
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
                <motion.div
                    style={{
                        scale,
                        opacity,
                        borderRadius
                    }}
                    className="relative w-[90vw] h-[80vh] overflow-hidden shadow-2xl"
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-seashore-with-waves-4457-large.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Overlay text for cinematic feel */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-white text-5xl md:text-8xl font-black tracking-tighter uppercase text-center px-6"
                        >
                            Immersive <br /> Experiences
                        </motion.h2>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default VideoSection;
