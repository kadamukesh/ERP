import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/index2");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const text = "Customized ERP Solutions";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
    <div className="flex items-center justify-center min-h-screen bg-red-900 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            className={`inline-block text-2xl sm:text-3xl md:text-4xl font-bold ${
              letter === " " ? "w-2 sm:w-3 md:w-4" : "text-white"
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
