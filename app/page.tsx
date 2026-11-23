import { Nav, Calculator } from "@/components/Chrome";
import ScrollCounter from "@/components/ScrollCounter";
import Hero from "@/components/Hero";
import ServiceDetail from "@/components/ServiceDetail";
import { PlatformBar } from "@/components/Sections";
import { Founders, Process, Team } from "@/components/ProcessTeam";
import Locations from "@/components/Locations";
import { Dashboard, Contact, Footer, Proof } from "@/components/Closing";
import Veranda from "@/components/Veranda";

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollCounter />
      <main id="main">
        <Hero />
        <Founders />
        <Locations />
        <Proof />
        <Calculator />
        <PlatformBar />
        <ServiceDetail />
        <Process />
        <Team />
        <Dashboard />
        <Veranda />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
