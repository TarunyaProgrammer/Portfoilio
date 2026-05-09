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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Pages (Lazy Loaded)
const Home = React.lazy(() => import("./pages/Home"));
const SystemsPage = React.lazy(() => import("./pages/SystemsPage"));
const SystemDetail = React.lazy(() => import("./pages/SystemDetail"));
const LabsPage = React.lazy(() => import("./pages/LabsPage"));
const Blogs = React.lazy(() => import("./pages/Blogs"));
const ThinkingArticle = React.lazy(() => import("./pages/ThinkingArticle"));
const Connect = React.lazy(() => import("./pages/Connect"));
const ResumePage = React.lazy(() => import("./pages/ResumePage"));
const Engage = React.lazy(() => import("./pages/Engage"));

import PageContainer from "./components/PageContainer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
const Footer = React.lazy(() => import("./components/Footer.jsx"));
import CustomCursor from "./components/CustomCursor.jsx";
import Magnetic from "./components/Magnetic.jsx";

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
    { to: "/", label: "About" },
    { to: "/systems", label: "Portfolio" },
    { to: "/labs", label: "Laboratory" },
    { to: "/blogs", label: "Blogs" },
    { to: "/resume", label: "Resume" },
  ];

  return (
    <>
      <nav
        style={{ height: "var(--nav-height)" }}
        className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 flex justify-between items-center bg-white/90 backdrop-blur-md"
      >
        <div className="flex items-center gap-16">
          <Link
            to="/"
            className="flex flex-col group relative"
          >
            <span 
              style={{ fontFamily: "'Pinyon Script', cursive" }}
              className="text-4xl text-black group-hover:scale-105 transition-transform duration-500 lowercase leading-none"
            >
              Tarunya
            </span>
            <span className="text-[9px] font-bold text-black/20 uppercase tracking-[0.3em] mt-0.5 group-hover:text-black transition-colors">
              Systems Architect
            </span>
          </Link>
          <div className="hidden md:flex gap-10 font-bold text-[11px] tracking-[0.1em] items-center">
            {navLinks.map((link) => (
              <Magnetic key={link.to}>
                <Link
                  to={link.to}
                  className="text-black/40 hover:text-black transition-all hover:tracking-[0.2em] duration-500 uppercase px-4 py-2"
                >
                  {link.label}
                </Link>
              </Magnetic>
            ))}
          </div>
        </div>

        <div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/connect"
              className="text-sm font-bold border-b-2 border-black pb-1 hover:pb-2 transition-all flex items-center gap-2 group"
            >
              Book A Call
              <motion.svg 
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </Link>
          </motion.div>
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-[6px] z-50"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-6 h-[1.5px] bg-black transition-all duration-500 ${
              menuOpen ? "rotate-45 translate-y-[7.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-black transition-all duration-500 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-black transition-all duration-500 ${
              menuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed inset-0 z-40 bg-white md:hidden flex flex-col px-12 pt-48"
          >
            <div className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em] mb-12">
              navigation
            </div>
            <div className="flex flex-col items-start gap-8 text-6xl text-black leading-none tracking-tighter">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                >
                  <Link
                    to={link.to}
                    className="font-bold hover:italic transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + navLinks.length * 0.1, duration: 0.8 }}
                className="mt-12 w-full"
              >
                <Link
                  to="/connect"
                  className="block w-full text-center py-6 bg-black text-white font-bold text-2xl uppercase tracking-widest"
                  onClick={() => setMenuOpen(false)}
                >
                  Connect
                </Link>
              </motion.div>
            </div>
            
            <div className="mt-auto mb-12 text-[10px] font-bold text-black/20 uppercase tracking-[0.5em] text-center">
              &copy; 2026 Tarunya
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
          path="/blogs"
          element={
            <PageContainer>
              <Blogs />
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
          path="/resume"
          element={
            <PageContainer>
              <ResumePage />
            </PageContainer>
          }
        />
        <Route
          path="/engage"
          element={
            <PageContainer>
              <React.Suspense
                fallback={
                  <div className="h-screen w-full bg-bg flex items-center justify-center text-text font-heading text-2xl italic">
                    Loading Story...
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
        <CustomCursor />
        <Nav />
        <React.Suspense fallback={<div className="h-screen w-full bg-white flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-black/20">Initialising Core...</div>}>
          <AnimatedRoutes />
          <Footer />
        </React.Suspense>
      </Router>
    </ReactLenis>
  );
}

export default App;
