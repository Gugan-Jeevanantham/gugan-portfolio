import { motion } from "framer-motion";
import { FaGamepad, FaUtensils, FaHeart, FaRobot } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { projects } from "../../data/portfolio";
import ConstructionVisual from "../ui/ConstructionVisual";
import { Suspense, lazy } from "react";
import "./Projects.css";
import Card from "../ui/Card";

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
          {side.map((project, i) => (
            <Card
              key={project.name}
              href={project.link}
              icon={ICONS[project.icon]}
              color={project.color}
              title={project.name}
              description={project.description}
              tags={project.tech}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}