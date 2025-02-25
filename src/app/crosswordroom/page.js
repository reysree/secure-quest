"use client";
import React from "react";
import { motion } from "framer-motion";

export default function CrossWordRoom() {
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-white"
    >
      <h1 className="text-4xl font-bold text-black">
        Welcome to the Next Level!
      </h1>
    </motion.div>
  );
}
