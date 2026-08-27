// import { useRef, useState, Suspense, lazy } from "react";
// import { motion } from "framer-motion";
// import { FiDownload, FiArrowRight } from "react-icons/fi";
// import { FaLinkedinIn, FaGithub, FaEnvelope, FaInstagram, FaWhatsapp } from "react-icons/fa6";
// import { profile } from "../../data/portfolio";
// import "./Hero.css";
// import { Link as ScrollLink } from "react-scroll";

// const NodeNetwork = lazy(() => import("../three/NodeNetwork"));

// const SOCIALS = [
//   { icon: FaLinkedinIn, href: profile.social.linkedin, label: "LinkedIn" },
//   { icon: FaGithub, href: profile.social.github, label: "GitHub" },
//   { icon: FaWhatsapp, href: profile.social.whatsapp, label: "WhatsApp" },
//   { icon: FaEnvelope, href: `mailto:${profile.email}`, label: "Email" },
//   { icon: FaInstagram, href: profile.social.instagram, label: "Instagram" },
// ];

// const fadeUp = {
//   hidden: { opacity: 0, y: 28 },
//   show: (i = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
//   }),
// };

// export default function Hero() {
//   const imgWrapRef = useRef(null);
//   const [tilt, setTilt] = useState({ x: 0, y: 0 });

//   const handleMouseMove = (e) => {
//     const rect = imgWrapRef.current.getBoundingClientRect();
//     const px = (e.clientX - rect.left) / rect.width - 0.5;
//     const py = (e.clientY - rect.top) / rect.height - 0.5;
//     setTilt({ x: px * 10, y: py * -10 });
//   };

//   const resetTilt = () => setTilt({ x: 0, y: 0 });

//   return (
//     <section id="home" className="hero">
//       <div className="hero__bg" aria-hidden="true">
//         <Suspense fallback={null}>
//           <NodeNetwork />
//         </Suspense>
//         <div className="hero__bg-fade" />
//       </div>

//       <div className="container hero__grid">
//         <motion.div
//           className="hero__text"
//           initial="hidden"
//           animate="show"
//           variants={{ show: { transition: { staggerChildren: 0.1 } } }}
//         >
//           <motion.p className="eyebrow" custom={0} variants={fadeUp}>
//             Hello, I'm
//           </motion.p>

//           <motion.h1 className="hero__name" custom={1} variants={fadeUp}>
//             {profile.name}
//           </motion.h1>

//           <motion.h2 className="hero__role" custom={2} variants={fadeUp}>
//             <span className="gradient-text">{profile.role}</span>
//           </motion.h2>

//           <motion.p className="hero__tagline" custom={3} variants={fadeUp}>
//             Software Engineer with 3+ years building enterprise ERP applications using React.js,
//             JavaScript &amp; Kendo UI. Specialized in optimizing high-performance UI systems and
//             resolving complex production issues.
//           </motion.p>

//                     <motion.div className="hero__cta" custom={4} variants={fadeUp}>
//             <a href={profile.resumeFile} download className="btn btn--primary">
//               View Resume <FiDownload aria-hidden="true" />
//             </a>
//                         <ScrollLink to="projects" smooth duration={500} offset={-60} className="btn btn--ghost">
//               View Projects <FiArrowRight aria-hidden="true" />
//             </ScrollLink>
//           </motion.div>

//           <motion.div className="hero__socials" custom={5} variants={fadeUp}>
//             {SOCIALS.map((s) => (
//               <a
//                 key={s.label}
//                 href={s.href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label={s.label}
//                 className="hero__social-link"
//               >
//                 <s.icon aria-hidden="true" />
//               </a>
//             ))}
//           </motion.div>
//         </motion.div>

//         <motion.div
//           className="hero__image-col"
//           initial={{ opacity: 0, x: 40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
//         >
//           <div
//             ref={imgWrapRef}
//             className="hero__image-wrap"
//             onMouseMove={handleMouseMove}
//             onMouseLeave={resetTilt}
//             style={{ transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
//           >
//             <div className="hero__image-glow" />
//             <img src="/Profile.jpeg" alt={profile.name} className="hero__image" />
//             <div className="hero__image-ring" />
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

import { useRef, useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiArrowRight, FiBriefcase, FiCode, FiUsers, FiZap, FiSun } from "react-icons/fi";
import { FaLinkedinIn, FaGithub, FaEnvelope, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { profile } from "../../data/portfolio";
import "./Hero.css";
import { Link as ScrollLink } from "react-scroll";

const NodeNetwork = lazy(() => import("../three/NodeNetwork"));

const SOCIALS = [
  { icon: FaLinkedinIn, href: profile.social.linkedin, label: "LinkedIn" },
  { icon: FaGithub, href: profile.social.github, label: "GitHub" },
  { icon: FaWhatsapp, href: profile.social.whatsapp, label: "WhatsApp" },
  { icon: FaEnvelope, href: `mailto:${profile.email}`, label: "Email" },
  { icon: FaInstagram, href: profile.social.instagram, label: "Instagram" },
];

const STATS = [
  { icon: FiBriefcase, value: "3+", label: "Years Experience" },
  { icon: FiCode, value: "120+", label: "UI Bug Fixing" },
  { icon: FiUsers, value: "10K+", label: "Records Handling" },
  { icon: FiZap, value: "100%", label: "Commitment" },
];

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
            <span className="gradient-text">{profile.role}</span>
          </motion.h2>

                    <motion.p className="hero__tagline" custom={3} variants={fadeUp}>
            I engineer enterprise ERP systems that scale — from 40% faster data
            grids handling 10,000+ records to GST-compliant billing workflows
            trusted by 50+ daily users.
          </motion.p>

          <motion.div className="hero__cta" custom={4} variants={fadeUp}>
            <a href={profile.resumeFile} download className="btn btn--primary">
              View Resume <FiDownload aria-hidden="true" />
            </a>
            <ScrollLink to="projects" smooth duration={500} offset={-60} className="btn btn--ghost">
              View Projects <FiArrowRight aria-hidden="true" />
            </ScrollLink>
          </motion.div>

          <motion.div className="hero__connect" custom={5} variants={fadeUp}>
            {/* <span className="hero__connect-label">Let's Connect</span> */}
            <div className="hero__socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="hero__social-link"
                >
                  <s.icon aria-hidden="true" />
                </a>
              ))}
            </div>
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
                <div className="hero__image-ring" />
          </div>
        </motion.div>
            </div>

      <ScrollLink to="skills" smooth duration={500} offset={-40} className="hero__scroll-indicator" aria-label="Scroll to skills">
        <span />
      </ScrollLink>

      <div className="container" style={{ width: "100%" }}>
        <motion.div
          className="hero__stats-bar"
          style={{ width: "100%" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
                    {STATS.map((s) => (
            <div key={s.label} className="hero__stats-bar-item">
              <span className="hero__stats-bar-icon">
                <s.icon aria-hidden="true" />
              </span>
              <div>
                <p className="hero__stats-bar-value">{s.value}</p>
                <p className="hero__stats-bar-label">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}