const Footer = () => {
    return (
        <footer className="bg-[#0b0b0b] pt-32 pb-12 px-10 lg:px-20 border-t border-white/5">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pb-32">
                    {/* Left Side */}
                    <div>
                        <h2 className="text-white text-[14px] font-bold uppercase tracking-[0.2em] mb-12">
                            Contact us
                        </h2>
                        <div className="flex flex-col space-y-8">
                            <a href="mailto:hello@midis.in" className="text-white text-[32px] md:text-[48px] font-bold hover:text-[#ff4b2b] transition-colors leading-[1]">
                                hello@midis.in
                            </a>
                            <a href="tel:+42100000000" className="text-white text-[24px] md:text-[32px] font-bold hover:text-[#ff4b2b] transition-colors">
                                +91 98765 43210
                            </a>
                        </div>
                    </div>

                    {/* Right Side - Locations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-white text-[14px] font-bold uppercase tracking-[0.2em] mb-8">
                                Mumbai Office
                            </h3>
                            <p className="text-white/40 text-[18px] font-medium leading-[1.6]">
                                123 Digital Drive, <br />
                                Bandra West, <br />
                                Mumbai, India
                            </p>
                        </div>
                        <div>
                            <h3 className="text-white text-[14px] font-bold uppercase tracking-[0.2em] mb-8">
                                London Office
                            </h3>
                            <p className="text-white/40 text-[18px] font-medium leading-[1.6]">
                                45 Creative Lane, <br />
                                Shoreditch, <br />
                                London, UK
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-12">
                        <span className="text-white/20 text-[14px] font-bold uppercase tracking-widest">
                            © {new Date().getFullYear()} midis.
                        </span>
                        <div className="hidden md:flex gap-8 text-white/20 text-[14px] font-bold uppercase tracking-widest">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>

                    <div className="flex items-center gap-10">
                        {['LinkedIn', 'Instagram', 'Behance', 'Dribbble'].map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="text-white/40 hover:text-white font-bold text-[14px] uppercase tracking-widest transition-colors"
                            >
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
