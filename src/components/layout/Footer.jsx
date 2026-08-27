import { FiLinkedin, FiGithub, FiInstagram, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { profile } from "../../data/portfolio";
import "./Footer.css";

const SOCIALS = [
  { icon: FaWhatsapp, href: profile.social.whatsapp, label: "WhatsApp" },
  { icon: FiInstagram, href: profile.social.instagram, label: "Instagram" },
  { icon: FiGithub, href: profile.social.github, label: "GitHub" },
  { icon: FiLinkedin, href: profile.social.linkedin, label: "LinkedIn" },
  { icon: FiMail, href: `mailto:${profile.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow" aria-hidden="true" />
      <div className="container footer__inner">
                        <a href={`mailto:${profile.email}`} className="footer__command">
          <span style={{ color: "var(--accent-success)" }}>$</span> npm install gugan-j --save-your-team
          <span className="footer__command-cursor" aria-hidden="true" />
        </a>

        <div id="footer-connect" className="footer__socials">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="footer__social-link"
            >
              <s.icon aria-hidden="true" />
            </a>
          ))}
        </div>

        <p className="footer__copyright">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}