import { Nav, Calculator } from "@/components/Chrome";
import ScrollCounter from "@/components/ScrollCounter";
import Hero from "@/components/Hero";
import VillaJourney from "@/components/VillaJourney";
import ServiceDetail from "@/components/ServiceDetail";
import { PlatformBar } from "@/components/Sections";
import { Process, Team } from "@/components/ProcessTeam";
import Locations from "@/components/Locations";
import { Dashboard, AlaCarte, Contact, Footer, Proof } from "@/components/Closing";

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollCounter />
      <main id="main">
        <Hero />
        <VillaJourney />
        <Proof />
        <Calculator />
        <PlatformBar />
        <ServiceDetail />
        <Locations />
        <Process />
        <Team />
        <Dashboard />
        <AlaCarte />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
