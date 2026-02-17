import useDocumentSEO from "../hooks/useDocumentSEO";
import Hero from "../components/Hero/Hero";
import SystemsGrid from "../components/SystemsGrid/SystemsGrid";
import LabsGrid from "../components/LabsGrid/LabsGrid";
import Timeline from "../components/Timeline/Timeline";
import ConnectTerminal from "../components/ConnectTerminal/ConnectTerminal";
import Signals from "../components/Signals/Signals";

const Home = () => {
  useDocumentSEO({
    title: "Full-Stack Engineer & Systems Architect",
    description:
      "Tarunya Kesharwani builds calm, intelligent systems — AI-powered tools, offline-capable products, and scalable web applications for real-world problems.",
  });

  return (
    <main className="w-full bg-bg min-h-screen">
      <Hero />
      <Signals />
      <SystemsGrid />
      <LabsGrid />
      <Timeline />
      <ConnectTerminal />
    </main>
  );
};

export default Home;
