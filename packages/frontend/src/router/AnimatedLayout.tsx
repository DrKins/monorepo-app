import { cubicBezier, motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "slide-left" | "slide-right" | "slide";
};

// I want a fade in bottom-up - fade out top-down animation
// so these are my variants
const variants = {
  slide: {
    hidden: { opacity: 0, y: -50 },
    enter: {
      opacity: 1,
      y: 0,
      scale: [0.3, 1],
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: [1, 0.6],
      y: -20,
      transition: { duration: 0.35, ease: "easeInOut" },
    },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -50 },
    enter: {
      opacity: 1,
      scale: [0.3, 1],
      x: 0,
      transition: { duration: 0.5, ease: cubicBezier(0.5, 1, 0.89, 1) },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: { duration: 0.35, ease: cubicBezier(0.5, 1, 0.89, 1) },
    },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 50 },
    enter: {
      scale: [0.3, 1],
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: cubicBezier(0.5, 1, 0.89, 1) },
    },
    exit: {
      scale: [1, 0.3],
      opacity: 0,
      x: 50,
      transition: { duration: 0.35, ease: cubicBezier(0.5, 1, 0.89, 1) },
    },
  },
};

const AnimatedLayout = ({
  children,
  variant = "slide",
}: Props): React.JSX.Element => {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants[variant]}
      className="relative">
      {children}
    </motion.div>
  );
};

export default AnimatedLayout;
