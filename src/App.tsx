import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import PhotoGallery from './components/PhotoGallery';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-[#0c0c0c] text-neutral-900 dark:text-neutral-100 flex flex-col selection:bg-[#E5A91A] selection:text-black transition-colors duration-200">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <AboutSection />
          <ServicesSection />
          <PhotoGallery />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </ThemeProvider>
  );
}
