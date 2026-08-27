import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import "./Navbar.css";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <a href={import.meta.env.BASE_URL} className="navbar__logo">
  G
</a>

        <nav className={`navbar__links ${open ? "navbar__links--open" : ""}`}>
          {LINKS.map((link) => (
            <Link
              key={link.id}
              to={link.id}
              smooth
              duration={500}
              offset={-80}
              spy
              activeClass="navbar__link--active"
              className="navbar__link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className={`navbar__burger ${open ? "navbar__burger--open" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}