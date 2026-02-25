import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
    { name: 'Our Work', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Backstage', href: '#' },
    { name: 'Career', href: '#' },
    { name: 'Contact', href: '#' },
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <>
            {/* ── Main Bar ── */}
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-14 py-5 transition-all duration-500 ${scrolled
                        ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                        : 'bg-transparent'
                    }`}
            >
                <div className="max-w-[1600px] mx-auto flex items-center justify-between">

                    {/* LOGO */}
                    <motion.a href="/" whileHover={{ opacity: 0.75 }} transition={{ duration: 0.2 }}>
                        <img
                            src="https://www.midis.in/image/midis%20final%20logo-01.png"
                            alt="Midis Digital Agency"
                            className="h-9 lg:h-11 w-auto object-contain"
                        />
                    </motion.a>

                    {/* DESKTOP LINKS */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.08 * i + 0.2, duration: 0.5 }}
                                className="relative group px-5 py-2.5 text-white/55 text-[14px] font-medium tracking-wide hover:text-white transition-colors duration-300"
                            >
                                {link.name}
                                {/* Animated underline */}
                                <span className="absolute bottom-1.5 left-5 right-5 h-[1.5px] bg-[#ff4b2b] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
                            </motion.a>
                        ))}
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-3">
                        {/* Desktop CTA */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.88 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.55, duration: 0.5 }}
                            whileHover={{ scale: 1.05, backgroundColor: '#ff4b2b', color: '#fff' }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden lg:inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[13px] font-bold tracking-wide transition-colors duration-300"
                        >
                            Start a project
                            <ArrowUpRight className="w-[15px] h-[15px]" />
                        </motion.button>

                        {/* Mobile hamburger */}
                        <motion.button
                            aria-label="Open navigation"
                            onClick={() => setMenuOpen(true)}
                            whileTap={{ scale: 0.88 }}
                            className="lg:hidden w-10 h-10 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md flex items-center justify-center text-white"
                        >
                            <Menu className="w-[18px] h-[18px]" />
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* ── Mobile Drawer ── */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Dim backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setMenuOpen(false)}
                            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
                        />

                        {/* Drawer panel */}
                        <motion.aside
                            key="drawer"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
                            className="fixed top-0 right-0 bottom-0 z-[70] w-[82vw] max-w-[340px] bg-[#0d0d0d] border-l border-white/[0.06] flex flex-col px-8 pt-8 pb-10"
                        >
                            {/* Header row */}
                            <div className="flex items-center justify-between mb-12">
                                <img
                                    src="https://www.midis.in/image/midis%20final%20logo-01.png"
                                    alt="Midis"
                                    className="h-8 w-auto object-contain"
                                />
                                <button
                                    onClick={() => setMenuOpen(false)}
                                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Links */}
                            <nav className="flex flex-col flex-1">
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        initial={{ opacity: 0, x: 24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.06, duration: 0.4 }}
                                        onClick={() => setMenuOpen(false)}
                                        className="group flex items-center justify-between py-5 border-b border-white/[0.06] text-white/55 text-xl font-bold tracking-tight hover:text-white hover:pl-1.5 transition-all duration-300"
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-4 h-4 text-[#ff4b2b] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.a>
                                ))}
                            </nav>

                            {/* Mobile CTA */}
                            <motion.button
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                whileTap={{ scale: 0.96 }}
                                className="mt-8 w-full bg-[#ff4b2b] hover:bg-[#e03d20] text-white py-[14px] rounded-2xl text-[14px] font-bold flex items-center justify-center gap-2 transition-colors duration-300"
                            >
                                Start a project
                                <ArrowUpRight className="w-4 h-4" />
                            </motion.button>

                            <p className="mt-5 text-center text-white/15 text-[10px] tracking-[0.2em] uppercase font-medium">
                                midis.in © {new Date().getFullYear()}
                            </p>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
