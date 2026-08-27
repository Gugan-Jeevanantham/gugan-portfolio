import { useState, Suspense, lazy } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FiUser, FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiLoader } from "react-icons/fi";
import { profile } from "../../data/portfolio";
import "./Contact.css";

const ConnectOrb = lazy(() => import("../three/ConnectOrb"));

// ---- Fill these in from your EmailJS dashboard (emailjs.com > Account) ----
const EMAILJS_SERVICE_ID = "service_5a4soop"; 
const EMAILJS_TEMPLATE_ID = "template_h0rsfmd"; 
const EMAILJS_PUBLIC_KEY = "YO4ZxhXygM8r7sbBq";

const INFO_CARDS = [
  { icon: FiUser, label: "Name", value: profile.name, color: "#38c6e0" },
  { icon: FiPhone, label: "Phone", value: profile.phone, color: "#6c5ce7" },
  { icon: FiMail, label: "Email", value: profile.email, color: "#ff8a5c" },
  { icon: FiMapPin, label: "Location", value: profile.location, color: "#00e5a0" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.subject.trim()) next.subject = "Subject is required";
    if (!form.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    const minSpinner = new Promise((resolve) => setTimeout(resolve, 3000));
    const sendMail = emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
      },
      EMAILJS_PUBLIC_KEY
    );

    try {
      await Promise.all([sendMail, minSpinner]);
      setStatus("idle");
      setForm({ name: "", email: "", subject: "", message: "" });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      await minSpinner;
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__orb-bg" aria-hidden="true">
        <Suspense fallback={null}>
          <ConnectOrb />
        </Suspense>
      </div>
      
      <div className="container">
        <div className="contact__header">
          {/* <span className="skills__badge">Get In Touch</span> */}
          <h2>
            LET'S <span className="gradient-text">CONNECT</span>
          </h2>
          <p>LET'S DISCUSS YOUR PROJECT AND CREATE SOMETHING AMAZING</p>
        </div>

        <div className="contact-layout">
          <motion.div
            className="contact-cards"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
                        {INFO_CARDS.map((item) => (
              <div key={item.label} className="contact-card" style={{ "--card-color": item.color }}>
                <span className="contact-card__icon">
                  <item.icon aria-hidden="true" />
                </span>
                <p className="contact-card__value">{item.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="contact-form-panel"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3>Contact Us</h3>

            <form onSubmit={handleSubmit} noValidate>
              <div className="cf-field">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  required
                  className={errors.name ? "cf-input cf-input--error" : "cf-input"}
                />
                {errors.name && <span className="cf-error">{errors.name}</span>}
              </div>

              <div className="cf-field">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  required
                  className={errors.email ? "cf-input cf-input--error" : "cf-input"}
                />
                {errors.email && <span className="cf-error">{errors.email}</span>}
              </div>

              <div className="cf-field">
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject Name"
                  required
                  className={errors.subject ? "cf-input cf-input--error" : "cf-input"}
                />
                {errors.subject && <span className="cf-error">{errors.subject}</span>}
              </div>

              <div className="cf-field">
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  className={errors.message ? "cf-input cf-input--error" : "cf-input"}
                />
                {errors.message && <span className="cf-error">{errors.message}</span>}
              </div>

              <button type="submit" className="cf-submit" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <FiLoader className="cf-spinner" aria-hidden="true" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <FiSend aria-hidden="true" />
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="cf-status-error">Something went wrong. Please try again.</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

            {createPortal(
        <AnimatePresence>
          {showToast && (
            <motion.div
              className="cf-toast"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <FiCheckCircle aria-hidden="true" />
              Message sent successfully!
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}