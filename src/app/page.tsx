import { Hero } from "@/components/marketing/Hero";
import { SocialProof } from "@/components/marketing/SocialProof";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Features } from "@/components/marketing/Features";
import { About } from "@/components/marketing/About";
import { Testimonials } from "@/components/marketing/Testimonials";
import { FAQ } from "@/components/marketing/FAQ";
import { CTABanner } from "@/components/marketing/CTABanner";
import { DashboardSection } from "@/components/dashboard/DashboardSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Features />
      <About />
      <Testimonials />
      <CTABanner />
      <FAQ />
      <DashboardSection />
    </>
  );
}
