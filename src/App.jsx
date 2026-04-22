import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HeroChallenge from "./components/HeroChallenge";
import HeroBuild from "./components/HeroBuild";
import Stats from "./components/Stats";
import HowItWorks from "./components/HowItWorks";
import UrgencyBar from "./components/UrgencyBar";
import Deliverables from "./components/Deliverables";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import ChallengeForm from "./components/ChallengeForm";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ReactGA from "react-ga4";
import AnalyticsTracker from "./components/AnalyticsTracker";

ReactGA.initialize("G-YM2LZ8L4VH");

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <UrgencyBar />
      <Deliverables />
      <Testimonials />
      <FAQ />
      <ChallengeForm />
      <Footer />
    </>
  );
}

function StartTheChallengePage() {
  return (
    <>
      <Navbar homePath="/start-the-challenge" />
      <HeroChallenge />
      <Stats />
      <HowItWorks />
      <UrgencyBar />
      <Deliverables />
      <Testimonials />
      <FAQ />
      <Footer privacyPath="/start-the-challenge/privacy-policy" />
    </>
  );
}

function BuildWithAIPage() {
  return (
    <>
      <Navbar homePath="/build-with-ai" />
      <HeroBuild />
      <Stats />
      <HowItWorks />
      <UrgencyBar />
      <Deliverables />
      <Testimonials />
      <FAQ />
      <Footer privacyPath="/build-with-ai/privacy-policy" />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/start-the-challenge" element={<StartTheChallengePage />} />
        <Route path="/build-with-ai" element={<BuildWithAIPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/start-the-challenge/privacy-policy"
          element={<PrivacyPolicy homePath="/start-the-challenge" />}
        />
        <Route
          path="/build-with-ai/privacy-policy"
          element={<PrivacyPolicy homePath="/build-with-ai" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
