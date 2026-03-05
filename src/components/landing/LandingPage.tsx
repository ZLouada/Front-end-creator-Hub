import Hero from './components/Hero';
import { Header} from '../header/Header';
import LocalAdvantage from './components/LocalAdvantage';
import TierPreview from './components/TierPreview';
import StudioPreview from './components/StudioPreview';
import SocialProof from './components/SocialProof';
import Comparison from './components/Comparison';
import FinalCTA from './components/FinalCTA';
import ScrollReveal from '../ui/ScrollReveal';

const LandingPage= () => {
  return (
    <main className="bg-white dark:bg-[#0A0A0A] min-h-screen">
      <Header />
      <Hero />
      <ScrollReveal animation="fade-up">
        <LocalAdvantage />
      </ScrollReveal>
      <ScrollReveal animation="fade-up" delay={0.05}>
        <TierPreview />
      </ScrollReveal>
      <ScrollReveal animation="fade-up">
        <StudioPreview />
      </ScrollReveal>
      <ScrollReveal animation="fade-up">
        <SocialProof />
      </ScrollReveal>
      <ScrollReveal animation="scale-in">
        <Comparison />
      </ScrollReveal>
      <ScrollReveal animation="fade-up">
        <FinalCTA />
      </ScrollReveal>
    </main>
  );
}

export default LandingPage;
