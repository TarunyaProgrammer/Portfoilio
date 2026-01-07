import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ReactLenis } from "lenis/react";

// Pages
import Home from "./pages/Home";
import SystemsPage from "./pages/SystemsPage";
import SystemDetail from "./pages/SystemDetail";
import LabsPage from "./pages/LabsPage";
import OpenSource from "./pages/OpenSource";
import ThinkingArticle from "./pages/ThinkingArticle";
import Connect from "./pages/Connect";

const Nav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-bg/80 backdrop-blur-md border-b border-[#1f2330]">
    <div>
      <Link
        to="/"
        className="text-2xl font-bold font-heading text-white tracking-tighter"
      >
        Tarunya <span className="text-neon">Systems</span>
      </Link>
    </div>
    <div className="hidden md:flex gap-8 font-mono text-sm text-gray-300 items-center">
      <Link to="/systems" className="hover:text-neon transition-colors">
        SYSTEMS
      </Link>
      <Link to="/labs" className="hover:text-neon transition-colors">
        LABS
      </Link>
      <Link to="/open-source" className="hover:text-neon transition-colors">
        OPEN SOURCE
      </Link>
      <Link
        to="/thinking/future-of-systems"
        className="hover:text-neon transition-colors"
      >
        THINKING
      </Link>
      <Link
        to="/connect"
        className="text-neon border border-neon px-6 py-2 rounded-full hover:bg-neon hover:text-black transition-all"
      >
        CONNECT
      </Link>
    </div>
  </nav>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/systems" element={<SystemsPage />} />
        <Route path="/systems/:slug" element={<SystemDetail />} />
        <Route path="/labs" element={<LabsPage />} />
        <Route path="/open-source" element={<OpenSource />} />
        <Route path="/thinking/:slug" element={<ThinkingArticle />} />
        <Route path="/connect" element={<Connect />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      <Router>
        <Nav />
        <AnimatedRoutes />
      </Router>
    </ReactLenis>
  );
}

export default App;
