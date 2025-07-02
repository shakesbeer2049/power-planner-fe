import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "AWESOME!😍",
  "GREAT!🔥",
  "YOU DID IT!🎉",
  "FANTASTIC!🌟",
  "IMPRESSIVE!💪",
  "WELL DONE!👏",
];

const DoneForToday = ({ trigger }: { trigger: boolean }) => {
  const [word, setWord] = useState("");

  useEffect(() => {
    if (trigger) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setWord(randomWord);

      setTimeout(() => {
        setWord(""); // Clear the word to trigger hide
      }, 2000); // Hide after 2 seconds
    }
  }, [trigger]);

  return (
    <AnimatePresence>
      {word && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-5xl font-bold text-blue-500">{word}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DoneForToday;
