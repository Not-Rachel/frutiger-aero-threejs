import { div } from "framer-motion/client";
import { motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

interface FadeInProps {
  children: (onLoad: () => void) => ReactNode;
}

function FadeIn({ children }: FadeInProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, filter: "blur(3px)" }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          filter: isLoaded ? "blur(0px)" : "blur(3px)",
        }}
        transition={{ duration: 1 }}
        style={{ height: "100%", background: "none" }}
      >
        {children(() => setIsLoaded(true))}
      </motion.div>
    </div>
  );
}
export default FadeIn;
