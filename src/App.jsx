import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ReactLenis } from "lenis/react";

// Pages
import Home from "./pages/Home";
import SystemsPage from "./pages/SystemsPage";
import SystemDetail from "./pages/SystemDetail";
import LabsPage from "./pages/LabsPage";
import OpenSource from "./pages/OpenSource";
import ThinkingArticle from "./pages/ThinkingArticle";
import Connect from "./pages/Connect";
const Engage = React.lazy(() => import("./pages/Engage"));

import PageContainer from "./components/PageContainer/PageContainer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const Nav = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  React.useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { to: "/systems", label: "SYSTEMS" },
    { to: "/labs", label: "LABS" },
    { to: "/open-source", label: "OPEN SOURCE" },
    { to: "/thinking/future-of-systems", label: "THINKING" },
  ];

  return (
    <>
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

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 font-mono text-sm text-gray-300 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-neon transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/connect"
            className="text-neon border border-neon px-6 py-2 rounded-full hover:bg-neon hover:text-black transition-all"
          >
            CONNECT
          </Link>
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden relative w-32 h-32 flex flex-col justify-center items-center gap-[5px] z-50 cursor-pointer"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center"
            style={{ paddingTop: "var(--nav-height)" }}
          >
            <div className="flex flex-col items-center gap-48 font-mono text-lg text-gray-300">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.to}
                    className="hover:text-neon transition-colors tracking-widest text-xl"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
              >
                <Link
                  to="/connect"
                  className="text-neon border border-neon px-32 py-12 rounded-full hover:bg-neon hover:text-black transition-all tracking-widest text-xl"
                  onClick={() => setMenuOpen(false)}
                >
                  CONNECT
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

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
        <Route
          path="/engage"
          element={
            <PageContainer>
              <React.Suspense
                fallback={
                  <div className="h-screen w-full bg-bg flex items-center justify-center text-neon">
                    INITIALIZING...
                  </div>
                }
              >
                <Engage />
              </React.Suspense>
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
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Nav />
        <AnimatedRoutes />
      </Router>
    </ReactLenis>
  );
}

export default App;
