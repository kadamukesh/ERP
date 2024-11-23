import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //  3 seconds
    const timer = setTimeout(() => {
      navigate("/index2");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const letters = "Customized ERP Solutions for Modern Learning".split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // prathi letters ki delay
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-900">
      <motion.div
        className="flex flex-wrap gap-2 justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className={`text-4xl font-bold ${
              letter === " " ? "w-4" : "text-white"
            }`}
            variants={letterVariants}
            whileHover={{ scale: 1.2, color: "#0ef" }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default Welcome;
