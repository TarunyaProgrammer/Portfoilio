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

import PageContainer from "./components/PageContainer/PageContainer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const Nav = () => (
  <nav
    style={{ height: "var(--nav-height)" }}
    className="fixed top-0 left-0 right-0 z-50 px-6 flex justify-between items-center bg-bg/80 backdrop-blur-md border-b border-[#1f2330]"
  >
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
        <Route
          path="/"
          element={
            <PageContainer noPadding>
              <Home />
            </PageContainer>
          }
        />
        <Route
          path="/systems"
          element={
            <PageContainer>
              <SystemsPage />
            </PageContainer>
          }
        />
        <Route
          path="/systems/:slug"
          element={
            <PageContainer>
              <SystemDetail />
            </PageContainer>
          }
        />
        <Route
          path="/labs"
          element={
            <PageContainer>
              <LabsPage />
            </PageContainer>
          }
        />
        <Route
          path="/open-source"
          element={
            <PageContainer>
              <OpenSource />
            </PageContainer>
          }
        />
        <Route
          path="/thinking/:slug"
          element={
            <PageContainer noPadding>
              {/* ThinkingArticle has its own custom layout/hero */}
              <ThinkingArticle />
            </PageContainer>
          }
        />
        <Route
          path="/connect"
          element={
            <PageContainer>
              <Connect />
            </PageContainer>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      <Router>
        <ScrollToTop />
        <Nav />
        <AnimatedRoutes />
      </Router>
    </ReactLenis>
  );
}

export default App;
