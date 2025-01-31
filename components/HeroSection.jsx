"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Cover } from "./ui/cover";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";
import { RainbowButton } from "./ui/rainbow-button";
import { TextAnimate } from "./ui/text-animate";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
            Your AI Career Coach for
            <br />
            <Cover>Professional Success</Cover>
          </h1>
          <TextAnimate
            animation="blurInUp"
            by="character"
            className="mx-auto text-center px-4 text-sm text-muted-foreground sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-[90%] sm:max-w-[600px]"
          >
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
          </TextAnimate>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <RainbowButton className="px-6 py-2">Get Started</RainbowButton>
          </Link>
          <Link href="#">
            <InteractiveHoverButton>Watch Demo</InteractiveHoverButton>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
