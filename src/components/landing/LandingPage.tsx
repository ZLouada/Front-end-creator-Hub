import Hero from './components/Hero';
import { Header} from '../header/Header';
import LocalAdvantage from './components/LocalAdvantage';
import TierPreview from './components/TierPreview';
import StudioPreview from './components/StudioPreview';
import SocialProof from './components/SocialProof';
import Comparison from './components/Comparison';
import FinalCTA from './components/FinalCTA';

const LandingPage= () => {
  return (
    <main className="bg-white dark:bg-[#0C0C0F] min-h-screen">
      <Header />
      <Hero />
      <LocalAdvantage />
      <TierPreview />
      <StudioPreview />
      <SocialProof />
      <Comparison />
      <FinalCTA />
    </main>
  );
}

export default LandingPage;