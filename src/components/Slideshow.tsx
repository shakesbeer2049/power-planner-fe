// components/Slideshow.tsx
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const images = [
  "/assets/screenshots/user-profile.webp",
  "/assets/screenshots/tasks.webp",
  "/assets/screenshots/stats.webp",
  "/assets/screenshots/lead.webp",
  "/assets/screenshots/add.webp",
];

const Slideshow = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // 3s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[400px] rounded-xl overflow-hidden shadow-xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`screenshot-${index + 1}`}
          className="w-full h-full object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
    </div>
  );
};

export default Slideshow;
