import { motion } from "framer-motion";
import { FiCalendar, FiBriefcase, FiCode, FiBookOpen } from "react-icons/fi";
import { experience } from "../../data/portfolio";
import { useRef, useState } from "react";
import "./Experience.css";

const TAG_META = {
  HTML5: { icon: "🟧", color: "#e34f26" },
  CSS3: { icon: "🟦", color: "#1572b6" },
  JavaScript: { icon: "🟨", color: "#f7df1e" },
  jQuery: { icon: "🔵", color: "#0769ad" },
  "React JS": { icon: "⚛", color: "#61dafb" },
  "Tailwind CSS": { icon: "💧", color: "#38bdf8" },
  SQL: { icon: "🗄", color: "#38c6e0" },
  API: { icon: "🔗", color: "#6c5ce7" },
};

const ROLE_ICONS = {
  "Associate Software Engineer": FiBriefcase,
  "Programmer Analyst": FiCode,
  "Trainee": FiBookOpen,
};

function TiltCard({ children }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px * 4, y: py * -4 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`, transition: "transform 0.15s ease-out" }}
    >
      {children}
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="experience__header">
          <h2>
            WORK <span className="gradient-text">EXPERIENCE</span>
          </h2>
                    <p>A TIMELINE OF ROLES WHERE I BUILT, OPTIMIZED, AND SHIPPED REAL-WORLD ERP SOLUTIONS</p>
        </div>

        <div className="experience__timeline">
          <div className="experience__line" aria-hidden="true" />

          {experience.map((role, i) => {
            const isCurrent = i === 0;
            const RoleIcon = ROLE_ICONS[role.role] || FiBriefcase;

            return (
              <motion.div
                key={role.role}
                className={`experience__item ${isCurrent ? "experience__item--current" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="experience__dot" aria-hidden="true">
                  {String(experience.length - i).padStart(2, "0")}
                </span>

                <TiltCard>
                <div className="experience__card">
                  {/* {isCurrent && <span className="experience__current-badge"></span>} */}

                  <div className="experience__card-top">
                    <div className="experience__role-wrap">
                      <span className="experience__role-icon">
                        <RoleIcon aria-hidden="true" />
                      </span>
                      <h3>{role.role}</h3>
                    </div>

                    <span className="experience__period">
                      <FiCalendar aria-hidden="true" /> {role.period}
                    </span>
                  </div>

                  <ul className="experience__points">
                    {role.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>

                                    <div className="experience__tags">
                    {role.tags.map((tag) => {
                      const meta = TAG_META[tag] || { icon: "▹", color: "#38c6e0" };
                      return (
                        <span key={tag} className="experience__tag" style={{ "--tag-color": meta.color }}>
                          <span className="experience__tag-icon">{meta.icon}</span>
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}