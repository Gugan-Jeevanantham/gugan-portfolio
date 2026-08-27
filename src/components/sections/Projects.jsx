import { motion } from "framer-motion";
import { FaGamepad, FaUtensils, FaHeart, FaRobot } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { projects } from "../../data/portfolio";
import ConstructionVisual from "../ui/ConstructionVisual";
import { Suspense, lazy } from "react";
import "./Projects.css";

const ICONS = { FaGamepad, FaUtensils, FaHeart, FaRobot };
const RotatingCrystal = lazy(() => import("../three/RotatingCrystal"));

export default function Projects() {
  const { flagship, side } = projects;

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="projects__header">
          {/* <span className="skills__badge">Portfolio</span> */}
          <h2>
            FEATURED <span className="gradient-text">PROJECTS</span>
          </h2>
<p>A SELECTION OF PRODUCTION AND PERSONAL PROJECTS THAT SHOWCASE MY ENGINEERING APPROACH</p>        </div>

        {/* ---- Flagship spotlight ---- */}
        <motion.a
          href={flagship.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flagship-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flagship-card__glow" aria-hidden="true" />
          <div className="flagship-card__left">
            <span className="flagship-card__badge">Flagship · {flagship.company}</span>
            <h3>{flagship.name}</h3>
            <p className="flagship-card__module">{flagship.category} — {flagship.module}</p>
            <p className="flagship-card__desc">{flagship.description}</p>
            <div className="flagship-card__tech">
              {flagship.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <span className="flagship-card__link">
              View Project <FiExternalLink aria-hidden="true" />
            </span>
          </div>
            <div className="flagship-card__right" aria-hidden="true">
            <div className="flagship-card__orb" />
            <div className="flagship-card__3d-bg">
              <Suspense fallback={null}>
                <RotatingCrystal />
              </Suspense>
            </div>
            <ConstructionVisual />
          </div>
        </motion.a>

        {/* ---- Bento grid of personal projects ---- */}
        <div className="bento-grid">
          {side.map((project, i) => {
            const Icon = ICONS[project.icon];
            return (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                key={project.name}
                className="bento-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                style={{ "--proj-color": project.color }}
              >
                <div className="bento-card__top">
                  <span className="bento-card__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <FiExternalLink className="bento-card__external" aria-hidden="true" />
                </div>

                <h4>{project.name}</h4>
                <p>{project.description}</p>

                <div className="bento-card__tech">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}