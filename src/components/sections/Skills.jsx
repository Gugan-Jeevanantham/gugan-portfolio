import { useRef } from "react";
import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import {
  SiHtml5,
  SiJavascript,
  SiJquery,
  SiReact,
  SiBootstrap,
  SiTypescript,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiTailwindcss,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";
import { TbSql } from "react-icons/tb";
import { FiGrid } from "react-icons/fi";
import { skillsList, skillTicker } from "../../data/portfolio";
import "./Skills.css";

const ICONS = {
  SiHtml5,
  FaCss3Alt,
  SiJavascript,
  SiJquery,
  SiReact,
  SiBootstrap,
  SiTypescript,
  SiNodedotjs,
  SiMysql,
  TbSql,
  SiGit,
  SiGithub,
  SiPostgresql,
  SiTailwindcss,
  FiGrid,
};

const FloatingCubes = lazy(() => import("../three/FloatingCubes"));

function SkillIconCard({ skill, index }) {
  const cardRef = useRef(null);
  const Icon = ICONS[skill.icon];

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mx", `${x}%`);
    cardRef.current.style.setProperty("--my", `${y}%`);
  };

  return (
    <motion.div
      ref={cardRef}
      className="skill-icon-card"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, scale: 1.04, rotate: index % 2 === 0 ? -2 : 2 }}
      style={{ "--skill-color": skill.color }}
    >
      <div className="skill-icon-card__spotlight" aria-hidden="true" />
      <div className="skill-icon-card__inner">
        <span className="skill-icon-card__icon-wrap">
          <span className="skill-icon-card__icon-halo" aria-hidden="true" />
          <Icon className="skill-icon-card__icon" aria-hidden="true" />
        </span>
        <span className="skill-icon-card__name">{skill.name}</span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
       <section id="skills" className="skills">
      <div className="skills__3d-bg" aria-hidden="true">
        <Suspense fallback={null}>
          <FloatingCubes />
        </Suspense>
      </div>

      <div className="container">
        <div className="skills__header">
          {/* <span className="skills__badge">Expertise</span> */}
          <h2>
            TECHNICAL <span className="gradient-text">SKILLS</span>
          </h2>
<p>TOOLS AND TECHNOLOGIES I USE TO BUILD SCALABLE, PRODUCTION-READY APPLICATIONS</p>        
</div>

        <div className="skills__icon-grid">
          {skillsList.map((skill, i) => (
            <SkillIconCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>

              <div className="skills__ticker" aria-label="Additional competencies">
        <div className="skills__ticker-track skills__ticker-track--left">
          {[...skillTicker.slice(0, 9), ...skillTicker.slice(0, 9)].map((item, i) => (
            <span key={`a-${i}`} className="skills__ticker-pill">
              {item}
            </span>
          ))}
        </div>
                <div className="skills__ticker-track skills__ticker-track--right">
          {[...skillTicker.slice(9, 18).reverse(), ...skillTicker.slice(9, 18).reverse()].map((item, i) => (
            <span key={`b-${i}`} className="skills__ticker-pill skills__ticker-pill--alt">
              {item}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}