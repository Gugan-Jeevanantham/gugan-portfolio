import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiArrowRight, FiBriefcase, FiCode, FiUsers, FiZap, FiSun } from "react-icons/fi";
import { profile } from "../../data/portfolio";
import "./Hero.css";
import { Link as ScrollLink } from "react-scroll";
import { useRef, useState, useEffect, Suspense, lazy } from "react";

const NodeNetwork = lazy(() => import("../three/NodeNetwork"));

const STATS = [
  { icon: FiBriefcase, value: "3+", label: "Years Experience", desc: "Building enterprise ERP solutions" },
  { icon: FiCode, value: "120+", label: "UI Bug Fixing", desc: "Improved UI/UX and fixed critical bugs" },
  { icon: FiUsers, value: "10K+", label: "Records Handling", desc: "Optimized data-heavy grids & tables" },
  { icon: FiZap, value: "40%", label: "Performance Improved", desc: "Faster rendering & optimized workflows" },
];

const ROLES = ["Software Engineer", "Frontend Developer", "React.js Developer", "UI Developer", "Web Developer"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  const imgWrapRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = imgWrapRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px * 10, y: py * -10 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <Suspense fallback={null}>
          <NodeNetwork />
        </Suspense>
        <div className="hero__bg-fade" />
      </div>

      <div className="container hero__grid">
        <motion.div
          className="hero__text"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p className="eyebrow" custom={0} variants={fadeUp}>
            <FiSun aria-hidden="true" /> Hello, I'm
          </motion.p>

          <motion.h1 className="hero__name" custom={1} variants={fadeUp}>
            {profile.name}
          </motion.h1>

          <motion.h2 className="hero__role" custom={2} variants={fadeUp}>
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIndex]}
                className="gradient-text"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.h2>

          <motion.p className="hero__tagline" custom={3} variants={fadeUp}>
            Building scalable enterprise software with a strong focus on performance, usability, and clean frontend architecture.
            3+ years of experience turning complex business workflows into reliable, high-performance applications with JavaScript, React.js, API Integration and modern UI technologies.
          </motion.p>

          <motion.div className="hero__cta" custom={4} variants={fadeUp}>
            <a href={profile.resumeFile} download className="btn btn--primary">
              View Resume <FiDownload aria-hidden="true" />
            </a>
            <ScrollLink to="projects" smooth duration={500} offset={-60} className="btn btn--ghost">
              View Projects <FiArrowRight aria-hidden="true" />
            </ScrollLink>
            <ScrollLink to="contact" smooth duration={500} offset={-60} className="hero__talk-link">
              Let's Talk <FiArrowRight aria-hidden="true" />
            </ScrollLink>
          </motion.div>

                    <motion.div className="hero__stats-bar" custom={5} variants={fadeUp}>
            {STATS.map((s) => (
              <div key={s.label} className="hero__stats-bar-item">
                <span className="hero__stats-bar-icon">
                  <s.icon aria-hidden="true" />
                </span>
                <div>
                  <p className="hero__stats-bar-value">{s.value}</p>
                  <p className="hero__stats-bar-label">{s.label}</p>
                  <p className="hero__stats-bar-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__image-col"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            ref={imgWrapRef}
            className="hero__image-wrap"
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            style={{ transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
          >
            <div className="hero__image-glow" />
            <img src={`${import.meta.env.BASE_URL}Profile.jpeg`} alt={profile.name} className="hero__image" />
            <span className="hero__available-badge">
              <span className="hero__available-dot" />
              Available for hire
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}