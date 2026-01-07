import Hero from "../components/Hero/Hero";
import SystemsGrid from "../components/SystemsGrid/SystemsGrid";
import LabsGrid from "../components/LabsGrid/LabsGrid";
import Timeline from "../components/Timeline/Timeline";
import ConnectTerminal from "../components/ConnectTerminal/ConnectTerminal";

const Home = () => {
  return (
    <main className="w-full bg-bg min-h-screen">
      <Hero />
      <SystemsGrid />
      <LabsGrid />
      <Timeline />
      <ConnectTerminal />
    </main>
  );
};

export default Home;
