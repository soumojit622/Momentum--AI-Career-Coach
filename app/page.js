"use client";
import HeroSection from "@/components/HeroSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { WobbleCard } from "@/components/ui/wobble-card";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";
import { motion } from "framer-motion";
import Image from "next/image";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";

import { AnimatedBeamMultipleOutputDemo } from "@/components/AnimatedBeam";
import { AnimatedListDemo } from "@/components/AnimatedListDemo";
import { Calendar } from "@/components/ui/calendar";
import { LampContainer } from "@/components/ui/lamp";
import { Marquee } from "@/components/ui/marquee";
import { Particles } from "@/components/ui/particles";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { ShineBorder } from "@/components/ui/shine-border";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaChalkboardTeacher,
  FaMicrophoneAlt,
  FaPen,
  FaShieldAlt,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import { RainbowButton } from "@/components/ui/rainbow-button";

const logos = [
  "/logos/one.svg",
  "/logos/two.svg",
  "/logos/three.svg",
  "/logos/four.svg",
  "/logos/five.svg",
  "/logos/six.svg",
  "/logos/seven.svg",
  "/logos/eight.svg",
  "/logos/nine.svg",
  "/logos/ten.svg",
];
export const stats = [
  {
    title: "Smart Resume Builder",
    description:
      "Leverage AI to generate a tailored resume in minutes, ensuring it aligns with the latest industry standards and job requirements.",
    icon: <FaPen size={30} />, // Icon for resume building (Pen)
  },
  {
    title: "AI-Driven Mock Interviews",
    description:
      "Prepare for interviews with AI-powered mock interview sessions, designed to simulate real-world scenarios and boost your confidence.",
    icon: <FaMicrophoneAlt size={30} />, // Icon for mock interviews (Microphone)
  },
  {
    title: "Personalized Career Pathways",
    description:
      "Get AI-generated career advice based on your skills, interests, and goals, helping you make informed decisions about your professional journey.",
    icon: <FaUserTie size={30} />, // Icon for career pathways (Tie symbolizing professional career)
  },
  {
    title: "Instant Career Coaching",
    description:
      "Receive personalized, on-demand coaching from AI experts, helping you navigate job opportunities and career growth.",
    icon: <FaChalkboardTeacher size={30} />, // Icon for career coaching (Chalkboard Teacher)
  },
  {
    title: "Scalable to Your Needs",
    description:
      "Whether you’re a recent graduate or an experienced professional, our platform scales to meet the unique needs of every user.",
    icon: <FaUsers size={30} />, // Icon for scalability (Multiple users)
  },
  {
    title: "Data Privacy and Security",
    description:
      "We guarantee the privacy of your personal data with encrypted storage and full compliance with industry security standards.",
    icon: <FaShieldAlt size={30} />, // Icon for security (Shield)
  },
];

// FOR BENTO GRID
const files = [
  {
    name: "resume_builder_guide.pdf",
    body: "Guide for creating professional resumes using Momentum's AI-powered builder.",
  },
  {
    name: "career_coaching_insights.xlsx",
    body: "User career data analysis and personalized coaching insights from Momentum's AI.",
  },
  {
    name: "ui_design_assets.svg",
    body: "UI design assets for Momentum, including logos, icons, and layout designs.",
  },
  {
    name: "data_security_keys.gpg",
    body: "GPG keys for securing sensitive data and user interactions within Momentum.",
  },
  {
    name: "ai_model_backup.txt",
    body: "Backup of AI models used in Momentum for career coaching, with restore instructions.",
  },
];

const featurees = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description:
      "Momentum automatically saves your career coaching files as you interact with the platform.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description:
      "Stay up-to-date with real-time notifications as you interact with Momentum.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: Share2Icon,
    name: "Integrations",
    description:
      "Momentum supports 100+ integrations with tools to help boost your career progress.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description:
      "Use Momentum's calendar to track career milestones and deadlines by date.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
  },
];

const reviews = [
  {
    name: "Arjun",
    username: "@arjun",
    body: "This app has truly transformed the way I work. It's amazing how easy it is to use.",
    img: "https://avatar.vercel.sh/arjun",
  },
  {
    name: "Priya",
    username: "@priya",
    body: "I am completely amazed! The features are so well thought out. It's a must-have.",
    img: "https://avatar.vercel.sh/priya",
  },
  {
    name: "Rahul",
    username: "@rahul",
    body: "This app has taken my productivity to the next level. I can't imagine working without it.",
    img: "https://avatar.vercel.sh/rahul",
  },
  {
    name: "Ananya",
    username: "@ananya",
    body: "I love the design and ease of use. It's definitely one of the best tools I've used.",
    img: "https://avatar.vercel.sh/ananya",
  },
  {
    name: "Siddharth",
    username: "@siddharth",
    body: "Absolutely incredible! It's smooth, reliable, and so user-friendly. Highly recommend!",
    img: "https://avatar.vercel.sh/siddharth",
  },
  {
    name: "Aaradhya",
    username: "@aaradhya",
    body: "I was blown away by the performance and speed. It has made my work so much easier.",
    img: "https://avatar.vercel.sh/aaradhya",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function LandingPage() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);
  return (
    <>
      <div className="grid-background"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-6 sm:mb-8 md:mb-12">
          Powerful Features for Your Career Growth
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full px-4 md:px-6">
          {/* Feature 1 - AI Performance */}
          <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-gray-900 min-h-[500px] lg:min-h-[300px] relative p-6 md:p-8 rounded-xl">
            <div className="max-w-xs md:max-w-sm">
              <h2 className="text-left text-lg md:text-2xl lg:text-3xl font-semibold tracking-tight text-white">
                Revolutionizing AI Performance ⚡
              </h2>
              <p className="mt-4 text-left text-sm md:text-base text-gray-300">
                Experience ultra-fast processing speeds and enhanced AI
                capabilities, optimized for real-time applications.
              </p>
            </div>
            <Image
              src="/dashboard.svg"
              width={500}
              height={500}
              alt="AI Processing"
              className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>

          {/* Feature 2 - Security & Reliability */}
          <WobbleCard containerClassName="col-span-1 min-h-[300px] p-6 md:p-8 bg-gray-800 rounded-xl">
            <h2 className="max-w-80 text-left text-lg md:text-2xl lg:text-3xl font-semibold tracking-tight text-white">
              Unparalleled Security 🔒
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-sm md:text-base text-gray-300">
              Our AI infrastructure ensures end-to-end encryption and compliance
              with the highest security standards.
            </p>
          </WobbleCard>

          {/* Feature 3 - AI Integration */}
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-gray-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px] relative p-6 md:p-8 rounded-xl">
            <div className="max-w-sm md:max-w-lg">
              <h2 className="text-left text-lg md:text-2xl lg:text-3xl font-semibold tracking-tight text-white">
                Seamless AI Integration 🚀
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-sm md:text-base text-gray-300">
                Easily integrate our AI with your existing platforms, providing
                scalable and intelligent automation.
              </p>
            </div>
            <Image
              src="/dashboard.png"
              width={500}
              height={500}
              alt="AI Integration"
              className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-6 sm:mb-8 md:mb-12">
          Key Features to Boost Your Career
        </h2>

        <div className="max-w-5xl mx-auto px-8">
          <HoverEffect items={stats} />
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-6 sm:mb-8 md:mb-12">
          Essential Tools to Accelerate Your Career Growth
        </h2>

        <div className="container mx-auto px-4 md:px-6">
          <BentoGrid>
            {featurees.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              Four simple steps to accelerate your career growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-gradient-to-r from-gray-700 to-black text-white shadow-xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-2xl">{item.title}</h3>
                <p className="text-sm opacity-80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* testimonial */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Users Say
          </h2>

          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-400">
              Find answers to common questions about our platform.
            </p>
          </div>

          <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-lg space-y-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold text-gray-300 hover:text-gray-400 transition-all duration-200">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 mt-2 text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* lamp section */}
      <section className="w-full">
        <div className="mx-auto py-24 rounded-lg">
          <LampContainer>
            <motion.div
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="mt-8 text-center"
            >
              <h1 className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-4xl font-medium tracking-tight text-white md:text-7xl">
                Ready to Accelerate Your Career?
              </h1>
              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl text-gray-500">
                Join thousands of professionals who are advancing their careers
                with AI-powered guidance.
              </h2>
              <Link href="/dashboard" passHref>
                {/* <Button
                  size="lg"
                  variant="secondary"
                  className="h-11 mt-9 animate-bounce"
                >
                  Start Your Journey Today{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button> */}
                <div className="flex justify-center mt-16">
                  <RainbowButton className="flex items-center hover:opacity-80">
                    Start Your Journey Today{" "}
                  </RainbowButton>
                </div>
              </Link>
            </motion.div>
          </LampContainer>
        </div>
      </section>

      {/*trusted brands */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-center text-4xl font-bold mb-6">
              Trusted by Industry Leaders
            </h2>
          </div>
          <div className="relative w-full overflow-hidden">
            <motion.div
              className="flex space-x-8 md:space-x-12"
              initial={{ x: "0%" }}
              animate={{ x: "-100%" }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror", // Smooth back-and-forth motion
                duration: 12, // Slow and natural animation
                ease: "linear",
              }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt="Company Logo"
                  className="h-10 w-auto md:h-12 opacity-90"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/*newsletter brands */}
      <section className="w-full pt-32">
        <ShineBorder
          className="relative flex h-[400px] w-[80%] flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl mx-auto my-auto"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative w-full overflow-hidden">
              <motion.section
                className="w-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <div className="max-w-2xl mx-auto text-center">
                  <motion.h3
                    className="text-4xl font-semibold text-white drop-shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    Stay Updated with Our Newsletter
                  </motion.h3>
                  <motion.p
                    className="text-gray-400 mt-2 drop-shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    Subscribe to receive the latest updates, offers, and news.
                  </motion.p>

                  <motion.div
                    className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="mt-4 sm:mt-0 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                      Subscribe
                    </button>
                  </motion.div>
                </div>
              </motion.section>
            </div>
          </div>
          <Particles
            className="absolute inset-0 z-0"
            quantity={100}
            ease={80}
            color={color}
            refresh
          />
        </ShineBorder>
      </section>
    </>
  );
}
