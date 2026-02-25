import Navbar from './components/Navbar';
import Hero from './components/Hero';

import AboutText from './components/AboutText';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Backstage from './components/Backstage';
import Services from './components/Services';

import ZoomCTA from './components/ZoomCTA';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';

function App() {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <main className="relative min-h-screen bg-brand-black selection:bg-brand-orange selection:text-white">
          <Navbar />
          <Hero />

          <AboutText />
          <WhyChooseUs />
          <Portfolio />
          <Testimonials />
          <Backstage />
          <Services />

          <ZoomCTA />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}

export default App;
