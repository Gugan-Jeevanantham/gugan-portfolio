import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import "./Loader.css";

export default function Loader() {
  const progress = useMotionValue(0);
  const displayProgress = useTransform(progress, (value) =>
    Math.round(value)
  );

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const unsubscribe = displayProgress.on("change", (value) => {
      setPercentage(value);
    });

    // 0 → 80 quickly
    const quickLoad = animate(progress, 80, {
      duration: 0.8,
      ease: "easeOut",
    });

    // 80 → 100 slowly after reaching 80
    const timer = setTimeout(() => {
      animate(progress, 100, {
        duration: 3,
        ease: "linear",
      });
    }, 850);

    return () => {
      unsubscribe();
      quickLoad.stop();
      clearTimeout(timer);
    };
  }, [progress, displayProgress]);

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="loader__content">

        <div className="loader__top">
          <span className="loader__label">
            INITIALIZING PORTFOLIO
          </span>

          <span className="loader__percentage">
            {percentage}%
          </span>
        </div>

        <div className="loader__bar">
          <motion.div
            className="loader__bar-fill"
            style={{
              width: useTransform(progress, (value) => `${value}%`),
            }}
          />
        </div>

        <div className="loader__status">
          <span>
            {percentage < 80
              ? "Loading core modules..."
              : percentage < 100
              ? "Compiling interface..."
              : "System ready."}
          </span>

          <span className="loader__status-code">
            {percentage < 100 ? "0x" + percentage.toString(16).padStart(2, "0") : "OK"}
          </span>
        </div>

      </div>
    </motion.div>
  );
}