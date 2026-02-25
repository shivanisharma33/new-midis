import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, Clock, TrendingUp } from 'lucide-react';

// Hook to detect mobile viewport
const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint);
        check();
        window.addEventListener('resize', check, { passive: true });
        return () => window.removeEventListener('resize', check);
    }, [breakpoint]);
    return isMobile;
};

interface BlogPost {
    id: number;
    category: string;
    title: string;
    excerpt: string;
    image: string;
    readTime: string;
    date: string;
    featured?: boolean;
}

const blogPosts: BlogPost[] = [
    {
        id: 1,
        category: 'Strategy',
        title: 'Why Your Brand Needs a Digital-First Identity in 2025',
        excerpt: 'The brands winning today are built for screens first. Here\'s how to shift from legacy thinking to digital-native strategy.',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=1200',
        readTime: '5 min',
        date: 'Feb 20, 2025',
        featured: true,
    },
    {
        id: 2,
        category: 'Development',
        title: 'The Rise of AI-Powered Web Experiences',
        excerpt: 'From dynamic personalization to generative UI — the web is getting smarter. Are you ready?',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
        readTime: '7 min',
        date: 'Feb 15, 2025',
    },
    {
        id: 3,
        category: 'Marketing',
        title: 'Performance Marketing vs. Brand Building: The Real ROI',
        excerpt: 'Short-term wins or long-term equity? Modern marketers need both. Here\'s the framework we use.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
        readTime: '6 min',
        date: 'Feb 10, 2025',
    },
    {
        id: 4,
        category: 'Design',
        title: 'Motion Design: The Secret Weapon of Premium Brands',
        excerpt: 'Static design is dead. Discover how micro-animations and kinetic typography are reshaping brand perception.',
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80&w=1200',
        readTime: '4 min',
        date: 'Feb 5, 2025',
    },
];

// ── Tilt Card for Featured Post ──
const FeaturedCard = ({ post, index = 0 }: { post: BlogPost; index?: number }) => {
    const isMobile = useIsMobile();
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 25 });
    const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 25 });

    const handleMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setHovered(false);
                mx.set(0);
                my.set(0);
            }}
            initial={{ opacity: 0, ...(isMobile ? { x: index % 2 === 0 ? -60 : 60 } : { y: 40 }) }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1200 }}
            className="md:col-span-2 md:row-span-2"
        >
            <motion.article
                style={{ rotateX: rx, rotateY: ry }}
                className="relative h-full min-h-[500px] rounded-[2rem] overflow-hidden group cursor-pointer"
            >
                {/* Image */}
                <motion.img
                    src={post.image}
                    alt={post.title}
                    animate={{ scale: hovered ? 1.06 : 1 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10 lg:p-12">
                    {/* Category + Featured badge */}
                    <div className="flex items-center gap-3 mb-5">
                        <span className="px-3 py-1 bg-[#ff4b2b] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                            {post.category}
                        </span>
                        <span className="flex items-center gap-1 px-3 py-1 bg-white/10 backdrop-blur-md text-white/80 text-[10px] font-bold uppercase tracking-widest rounded-full">
                            <TrendingUp className="w-3 h-3" />
                            Featured
                        </span>
                    </div>

                    <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-[800] leading-tight tracking-tight mb-4 group-hover:text-[#ff4b2b] transition-colors duration-300">
                        {post.title}
                    </h3>
                    <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-lg mb-6">
                        {post.excerpt}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-white/40 text-xs font-medium">
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {post.readTime}
                            </span>
                            <span>{post.date}</span>
                        </div>
                        <motion.div
                            animate={{ rotate: hovered ? 45 : 0 }}
                            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#ff4b2b] group-hover:border-[#ff4b2b] transition-colors duration-300"
                        >
                            <ArrowUpRight className="w-4 h-4" />
                        </motion.div>
                    </div>
                </div>
            </motion.article>
        </motion.div>
    );
};

// ── Compact Blog Card ──
const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => {
    const isMobile = useIsMobile();
    const [hovered, setHovered] = useState(false);
    // Alternating: even index = slide from left, odd = slide from right
    const slideDirection = index % 2 === 0 ? -60 : 60;

    return (
        <motion.article
            initial={{ opacity: 0, ...(isMobile ? { x: slideDirection } : { y: 30 }) }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: isMobile ? 0 : index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group cursor-pointer flex flex-col h-full"
        >
            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl mb-5 aspect-[16/10]">
                <motion.img
                    src={post.image}
                    alt={post.title}
                    animate={{ scale: hovered ? 1.08 : 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

                {/* Category pill */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-full border border-white/10">
                    {post.category}
                </span>

                {/* Arrow */}
                <motion.div
                    animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
                    className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#ff4b2b] flex items-center justify-center"
                >
                    <ArrowUpRight className="w-4 h-4 text-white" />
                </motion.div>
            </div>

            {/* Text */}
            <div className="flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3 text-white/30 text-[11px] font-medium">
                    <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{post.date}</span>
                </div>

                <h3 className="text-white text-lg font-bold leading-snug tracking-tight mb-2 group-hover:text-[#ff4b2b] transition-colors duration-300">
                    {post.title}
                </h3>
                <p className="text-white/35 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                </p>
            </div>

            {/* Bottom accent */}
            <div className="mt-5 h-[1px] w-full bg-white/[0.04] relative overflow-hidden">
                <motion.div
                    animate={{ scaleX: hovered ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-[#ff4b2b] origin-left"
                />
            </div>
        </motion.article>
    );
};

// ── Main Blog Section ──
const Blog = () => {
    const featured = blogPosts.find(p => p.featured)!;
    const rest = blogPosts.filter(p => !p.featured);

    return (
        <section className="bg-[#0a0a0a] py-24 lg:py-40 px-6 sm:px-10 lg:px-20 relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#ff4b2b] opacity-[0.03] blur-[180px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-white opacity-[0.015] blur-[140px] rounded-full pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">

                {/* ── Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 lg:mb-20">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-[#ff4b2b] uppercase tracking-[0.5em] text-[10px] sm:text-[11px] font-black mb-4 sm:mb-5 block"
                        >
                            Insights & Ideas
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white text-[9vw] sm:text-[6vw] lg:text-[4vw] font-[900] tracking-tight leading-[0.9]"
                        >
                            Latest from <br className="sm:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4b2b] to-orange-400 italic">the blog</span>
                        </motion.h2>
                    </div>

                    <motion.a
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        href="#"
                        className="group flex items-center gap-2 text-white/40 text-sm font-semibold hover:text-[#ff4b2b] transition-colors duration-300 shrink-0"
                    >
                        View all articles
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.a>
                </div>

                {/* ── Bento Blog Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">

                    {/* Featured Post (spans 2 cols + 2 rows on md+) */}
                    <FeaturedCard post={featured} />

                    {/* Remaining Posts */}
                    {rest.map((post, i) => (
                        <BlogCard key={post.id} post={post} index={i} />
                    ))}
                </div>

                {/* ── Newsletter CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-20 lg:mt-28 p-8 sm:p-12 rounded-[2rem] border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff4b2b]/5 to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h3 className="text-white text-xl sm:text-2xl font-bold tracking-tight mb-2">
                                Stay ahead of the curve
                            </h3>
                            <p className="text-white/35 text-sm sm:text-base font-medium">
                                Get our weekly insights on design, strategy & growth — straight to your inbox.
                            </p>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto shrink-0">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 md:w-60 bg-white/[0.06] border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#ff4b2b]/50 transition-colors"
                            />
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className="bg-[#ff4b2b] hover:bg-[#e5411f] text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-colors duration-300 whitespace-nowrap"
                            >
                                Subscribe
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Blog;
