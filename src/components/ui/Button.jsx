import { Link as ScrollLink } from "react-scroll";

/**
 * Button — shared CTA element used across the site.
 * - Pass `scrollTo="sectionId"` for an in-page smooth-scroll link.
 * - Pass `href` for a normal/download link.
 * - Otherwise renders a real <button> (for form submits, etc.).
 */
export default function Button({
  variant = "primary", // "primary" | "ghost"
  href,
  scrollTo,
  download,
  onClick,
  type = "button",
  disabled,
  children,
  className = "",
  ...rest
}) {
  const classes = `btn btn--${variant} ${className}`.trim();

  if (scrollTo) {
    return (
      <ScrollLink to={scrollTo} smooth duration={500} offset={-60} className={classes} {...rest}>
        {children}
      </ScrollLink>
    );
  }

  if (href) {
    return (
      <a href={href} download={download} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  );
}