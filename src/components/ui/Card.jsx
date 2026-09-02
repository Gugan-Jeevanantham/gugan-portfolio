import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

/**
 * Card — reusable bento-style project card.
 * Extracted from Projects.jsx so any future grid of linked items
 * (case studies, blog posts, etc.) can reuse the same visual pattern.
 */
export default function Card({ href, icon: Icon, color, title, description, tags = [], index = 0 }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bento-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      style={{ "--proj-color": color }}
    >
      <div className="bento-card__top">
        <span className="bento-card__icon">
          <Icon aria-hidden="true" />
        </span>
        <FiExternalLink className="bento-card__external" aria-hidden="true" />
      </div>

      <h4>{title}</h4>
      <p>{description}</p>

      <div className="bento-card__tech">
        {tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </motion.a>
  );
}