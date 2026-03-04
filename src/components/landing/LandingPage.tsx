import Hero from './components/Hero';
import { Header} from '../header/Header';
import { Footer } from '../footer/Footer';
import LocalAdvantage from './components/LocalAdvantage';
import TierPreview from './components/TierPreview';
import StudioPreview from './components/StudioPreview';
import SocialProof from './components/SocialProof';
import Comparison from './components/Comparison';
import FinalCTA from './components/FinalCTA';

const LandingPage= () => {
  return (
    <main className="bg-white min-h-screen">
      <Header />
      <Hero />
      <LocalAdvantage />
      <TierPreview />
      <StudioPreview />
      <SocialProof />
      <Comparison />
      <FinalCTA />
      <Footer />
    </main>
  );
}

export default LandingPage;