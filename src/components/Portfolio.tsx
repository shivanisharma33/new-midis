import { motion } from 'framer-motion';

const projects = [
    {
        title: 'Cognitive architectural systems. Transforming data into neural intelligence.',
        label: 'AI Neural Engine',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    },
    {
        title: 'A prize-winning mobile experience. Designed and developed from zero to launch.',
        label: 'Questim',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200',
    },
    {
        title: 'Making public transport intuitive, fast, and actually enjoyable.',
        label: 'IDS BK',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    },
    {
        title: 'Empowering festivals through cutting-edge mobile solutions.',
        label: 'Pohoda Festival',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200',
    },

];

const Portfolio = () => {
    return (
        <section className="bg-[#0b0b0b] py-20 lg:py-40 px-5 sm:px-10 lg:px-20">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 sm:gap-y-24 lg:gap-y-32">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                            transition={{
                                duration: 1,
                                ease: [0.16, 1, 0.3, 1],
                                delay: index % 2 === 0 ? 0 : 0.2
                            }}
                            className={`flex flex-col group ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
                        >
                            <div className="relative overflow-hidden aspect-[4/5] lg:aspect-[3/4] rounded-[2px] mb-8 bg-[#1a1a1a]">
                                <motion.img
                                    src={project.image}
                                    alt={project.label}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="w-full h-full object-cover cursor-pointer"
                                />
                            </div>

                            <div className="flex flex-col space-y-3 max-w-[500px]">
                                <h3 className="text-white text-[18px] sm:text-[22px] lg:text-[28px] font-bold leading-[1.2] opacity-90 group-hover:opacity-100 transition-opacity">
                                    {project.title}
                                </h3>
                                <p className="text-white/40 text-[12px] sm:text-[14px] font-medium tracking-wide uppercase">
                                    {project.label}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;






