import FluidGlass from './FluidGlass';
import { motion } from 'framer-motion';

const FluidGlassSection = () => {
    return (
        <section className="relative w-full py-24 bg-[#0a0a0a] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
                        Next-Gen <span className="text-[#ff4b2b]">Refraction</span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto">
                        Experience physics-based 3D glass distortion that reacts to your interaction.
                        A premium touch for a modern digital experience.
                    </p>
                </motion.div>
            </div>

            <div className="relative h-[600px] w-full cursor-none">
                <FluidGlass
                    mode="lens"
                    lensProps={{
                        scale: 0.25,
                        ior: 1.15,
                        thickness: 5,
                        chromaticAberration: 0.1,
                        anisotropy: 0.01
                    }}
                    transmission={1}
                    roughness={0}
                    chromaticAberration={0.05}
                >
                    {/* Content inside the 3D scene that gets refracted */}
                    <group>
                        <mesh position={[-2, 0, 0]}>
                            <sphereGeometry args={[1, 32, 32]} />
                            <meshStandardMaterial color="#ff4b2b" />
                        </mesh>
                        <mesh position={[2, 1, -2]}>
                            <boxGeometry args={[1.5, 1.5, 1.5]} />
                            <meshStandardMaterial color="#ffffff" />
                        </mesh>
                    </group>
                </FluidGlass>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h3 className="text-[12vw] font-black text-white/5 uppercase select-none">
                        Refraction
                    </h3>
                </div>
            </div>
        </section>
    );
};

export default FluidGlassSection;
