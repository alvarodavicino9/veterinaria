import Hero from "../components/home/Hero";
import ServicesSection from "../components/home/ServicesSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import HoursLocation from "../components/home/HoursLocation";
import Testimonials from "../components/home/Testimonials";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <FeaturedProducts />
      <Testimonials />
      <HoursLocation />
      <CTASection />
    </>
  );
}
