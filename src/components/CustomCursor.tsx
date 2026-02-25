import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useVelocity, useTransform, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [hoverText, setHoverText] = useState("");

    // Position of the actual mouse
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Velocity for "air" resistance feel
    const xVelocity = useVelocity(mouseX);
    const yVelocity = useVelocity(mouseY);

    const speed = useTransform([xVelocity, yVelocity], ([latestX, latestY]: any) => {
        return Math.sqrt(latestX ** 2 + latestY ** 2);
    });

    // Glass Springs
    const springConfig = { stiffness: 400, damping: 30, mass: 0.5 };
    const trailConfig = { stiffness: 100, damping: 25, mass: 1 };

    // Main Glass Lens
    const glassX = useSpring(mouseX, springConfig);
    const glassY = useSpring(mouseY, springConfig);

    // Inner Core
    const coreX = useSpring(mouseX, { stiffness: 800, damping: 40 });
    const coreY = useSpring(mouseY, { stiffness: 800, damping: 40 });

    // Floating Glow
    const glowX = useSpring(mouseX, trailConfig);
    const glowY = useSpring(mouseY, trailConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseEnter = (e: any) => {
            setIsHovering(true);
            const text = (e.currentTarget as HTMLElement).getAttribute('data-cursor-text') || "Explore";
            setHoverText(text);
        };
        const handleMouseLeave = () => {
            setIsHovering(false);
            setHoverText("");
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        const refreshInteractive = () => {
            const interactiveElements = document.querySelectorAll('a, button, .cursor-pointer, img, [role="button"]');
            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };

        refreshInteractive();
        const interval = setInterval(refreshInteractive, 2000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            clearInterval(interval);
        };
    }, []);

    const scale = useTransform(speed, [0, 2000], [1, 1.2]);
    const rotate = useTransform([xVelocity, yVelocity], ([latestX, latestY]: any) => {
        return (Math.atan2(latestY, latestX) * 180) / Math.PI;
    });

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block overflow-hidden">
            {/* 1. Fluid Ambient Glow */}
            <motion.div
                style={{ x: glowX, y: glowY, translateX: "-50%", translateY: "-50%", rotate }}
                animate={{
                    width: isHovering ? 250 : 100,
                    height: isHovering ? 250 : 60,
                    opacity: isHovering ? 0.3 : 0.1,
                }}
                className="absolute bg-gradient-to-r from-[#ff4b2b] to-orange-400 blur-[60px] rounded-full"
            />

            {/* 2. The Main Glass Lens */}
            <motion.div
                style={{
                    x: glassX,
                    y: glassY,
                    translateX: "-50%",
                    translateY: "-50%",
                    scale
                }}
                animate={{
                    width: isHovering ? 120 : 40,
                    height: isHovering ? 120 : 40,
                    borderRadius: isClicking ? "40px" : "100px",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="absolute border border-white/30 backdrop-blur-[12px] bg-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex items-center justify-center overflow-hidden"
            >
                {/* Refractive Highlight */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

                <AnimatePresence>
                    {isHovering && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="bg-[#ff4b2b] w-2 h-2 rounded-full shadow-[0_0_10px_#ff4b2b]"
                        />
                    )}
                </AnimatePresence>
            </motion.div>

            {/* 3. High-Precision Core Dot */}
            <motion.div
                style={{ x: coreX, y: coreY, translateX: "-50%", translateY: "-50%" }}
                animate={{
                    width: isHovering ? 6 : 10,
                    height: isHovering ? 6 : 10,
                    backgroundColor: isHovering ? "#ffffff" : "#ff4b2b",
                    scale: isClicking ? 0.8 : 1
                }}
                className="absolute rounded-full z-20 shadow-[0_0_15px_rgba(255,75,43,0.4)]"
            />

            {/* 4. Frosted Text Tag */}
            <AnimatePresence>
                {isHovering && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: -80 }}
                        exit={{ opacity: 0, y: 20 }}
                        style={{ x: glassX, y: glassY, translateX: "-50%" }}
                        className="absolute flex flex-col items-center gap-2"
                    >
                        <div className="px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md bg-white/10 shadow-xl">
                            <span className="text-[11px] font-bold text-white uppercase tracking-[0.2em] whitespace-nowrap">
                                {hoverText}
                            </span>
                        </div>
                        {/* Connecting Line */}
                        <div className="w-[1px] h-4 bg-gradient-to-b from-white/40 to-transparent" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 5. Click Shockwave */}
            <AnimatePresence>
                {isClicking && (
                    <motion.div
                        initial={{ opacity: 1, scale: 0 }}
                        animate={{ opacity: 0, scale: 3 }}
                        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
                        className="absolute w-20 h-20 border border-white/50 rounded-full blur-[2px]"
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomCursor;
