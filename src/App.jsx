import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Pages (Lazy Loaded)
const Home = React.lazy(() => import("./pages/Home"));
const SystemsPage = React.lazy(() => import("./pages/SystemsPage"));
const SystemDetail = React.lazy(() => import("./pages/SystemDetail"));
const Blogs = React.lazy(() => import("./pages/Blogs"));
const Connect = React.lazy(() => import("./pages/Connect"));
const ResumePage = React.lazy(() => import("./pages/ResumePage"));
const Engage = React.lazy(() => import("./pages/Engage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

import PageContainer from "./components/PageContainer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
const Footer = React.lazy(() => import("./components/Footer.jsx"));
import CustomCursor from "./components/CustomCursor.jsx";
import Nav from "./components/Nav.jsx";
import MarioRunner from "./components/MarioRunner.jsx";

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
          path="/blogs"
          element={
            <PageContainer>
              <Blogs />
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
        <Route
          path="*"
          element={
            <React.Suspense fallback={<div className="h-screen w-full bg-[#0A0A0A]"></div>}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <Nav />
      <React.Suspense fallback={<div className="h-screen w-full bg-[#0b0d12] flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-white/40">Initialising Core...</div>}>
        <AnimatedRoutes />
        <Footer />
      </React.Suspense>
      <MarioRunner />
    </>
  );
}

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppContent />
      </Router>
    </ReactLenis>
  );
}

export default App;
