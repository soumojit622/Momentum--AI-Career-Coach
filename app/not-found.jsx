"use client";

import { Particles } from "@/components/ui/particles";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

export default function NotFoundPage() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full text-white overflow-hidden">
      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 flex justify-center items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[300px] h-[300px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-purple-500 opacity-30 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[250px] h-[250px] sm:w-[220px] sm:h-[220px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] bg-blue-500 opacity-20 rounded-full blur-[120px]"
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center relative z-10 px-4 sm:px-6 md:px-8 lg:px-16"
      >
        <h1 className="text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 sm:text-6xl md:text-7xl lg:text-9xl">
          404
        </h1>
        <p className="text-lg text-gray-300 mt-3 italic sm:text-base md:text-lg lg:text-xl">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        {/* Glassmorphic Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 px-8 py-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 relative sm:px-6 sm:py-4 md:px-8 md:py-6"
        >
          <div className="absolute inset-x-10 w-[30%] -bottom-px bg-gradient-to-r from-transparent via-purple-500 to-transparent h-[1px] opacity-50" />
          <div className="absolute inset-x-20 w-[50%] -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[1px] opacity-50" />
          <p className="text-gray-300 sm:text-sm md:text-base">
            It seems you've lost your way. Click below to return home!
          </p>
        </motion.div>

        {/* Back Button */}
        <motion.div
          className="mt-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/">
            <motion.button
              whileHover={{
                scale: 1.1,
                background: "linear-gradient(135deg, #6D28D9, #9333EA)",
                boxShadow: "0px 0px 15px rgba(147, 51, 234, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-800 to-purple-900 text-white font-semibold rounded-lg shadow-lg transition-all border border-purple-700 sm:px-4 sm:py-2 md:px-6 md:py-3"
            >
              Go Home
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Particles (Background Effect) */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
}
