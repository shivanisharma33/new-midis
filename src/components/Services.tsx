import { motion } from 'framer-motion';

const services = [
    {
        title: 'Designing',
        items: ['Web Designing', 'UI/UX Design', 'Visual Identity', 'Design Systems']
    },
    {
        title: 'Development',
        items: ['Web Development', 'Mobile Apps', 'E-commerce', 'CMS Integration']
    },
    {
        title: 'Graphic Design',
        items: ['Brand Identity', 'Social Media Graphics', 'Print Design', 'Illustrations']
    },
    {
        title: 'Management',
        items: ['YouTube Management', 'Social Media Management', 'Content Strategy', 'SEO Optimization']
    }
];

const Services = () => {
    return (
        <section className="bg-[#0b0b0b] py-24 sm:py-32 px-6 sm:px-10 lg:px-20 border-t border-white/5">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-12 sm:gap-20">
                    <div className="lg:sticky lg:top-40 max-w-[400px]">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-white text-[10vw] sm:text-[5vw] lg:text-[4vw] font-[700] leading-[1] tracking-[-0.03em] mb-6 sm:mb-8"
                        >
                            How can we <br /> <span className="text-white/40">help you?</span>
                        </motion.h2>
                        <p className="text-white/40 text-[16px] sm:text-[18px] font-medium leading-[1.6]">
                            We offer a wide range of services to help you stay ahead of the competition and grow your business.
                        </p>
                    </div>

                    <div className="flex-1 w-full space-y-16 sm:space-y-24 lg:space-y-32">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                                className="flex flex-col md:flex-row md:items-start gap-6 sm:gap-8 md:gap-20"
                            >
                                <span className="text-white/20 text-[12px] sm:text-[14px] font-bold uppercase tracking-widest pt-2">
                                    0{index + 1}
                                </span>
                                <div className="flex flex-col flex-1">
                                    <h3 className="text-white text-[28px] sm:text-[32px] md:text-[48px] font-bold tracking-tight mb-6 sm:mb-8">
                                        {service.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-4">
                                        {service.items.map((item, i) => (
                                            <span
                                                key={i}
                                                className="text-white/40 text-[16px] sm:text-[18px] md:text-[22px] font-medium hover:text-white transition-colors cursor-default"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
