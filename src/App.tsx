import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Github, Linkedin, Mail, Download, Moon, Sun, ExternalLink } from "lucide-react";

// --- Small reusable Typewriter (no external libs) ---
function Typewriter({ words, speed = 80, pause = 1200 }: { words: string[]; speed?: number; pause?: number }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    if (!deleting && subIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const delta = deleting ? speed / 2 : speed;
    const t = setTimeout(() => setSubIndex((s) => s + (deleting ? -1 : 1)), delta);
    return () => clearTimeout(t);
  }, [subIndex, deleting, index, words, speed, pause]);

  const text = words[index % words.length].slice(0, subIndex);
  return (
    <span className="inline-flex items-center">
      <span className="whitespace-pre">{text}</span>
      <span className="ml-0.5 h-6 w-[2px] bg-indigo-500 animate-pulse" />
    </span>
  );
}

// --- Flip Card component ---
function FlipCard({ title, tech, desc, github, demo }: { title: string; tech: string; desc: string; github?: string; demo?: string }) {
  return (
    <div className="[perspective:1000px] w-full sm:w-[320px]">
      <div className="relative h-64 w-full transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 rounded-2xl bg-white dark:bg-zinc-900 shadow-md p-5 grid place-items-center [backface-visibility:hidden]">
          <div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 text-center">{title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center mt-2">{tech}</p>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 rounded-2xl bg-indigo-600 text-white p-5 [transform:rotateY(180deg)] [backface-visibility:hidden] grid">
          <div className="self-center">
            <p className="text-sm opacity-95">{desc}</p>
            <div className="flex items-center gap-3 mt-4">
             
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Floating Skill Bubble ---
function SkillBubble({ label, delay = 0 }: { label: string; delay?: number }) {
  const floatVariants = {
    initial: { y: 0 },
    animate: { y: [0, -8, 0] },
  };
  return (
    <motion.span
      variants={floatVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 3, repeat: Infinity, delay, ease: "easeInOut" }}
      className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200 shadow-sm border border-indigo-100 dark:border-indigo-800 text-sm"
    >
      {label}
    </motion.span>
  );
}

// --- Section wrapper to animate on view ---
function RevealSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0, transition: { duration: 0.6 } });
  }, [inView, controls]);
  return (
    <motion.section ref={ref} initial={{ opacity: 0, y: 20 }} animate={controls}>
      {children}
    </motion.section>
  );
}

// --- Timeline item ---
function TimelineItem({ when, title, points }: { when: string; title: string; points: string[] }) {
  return (
    <div className="relative pl-8 pb-8">
      <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-indigo-500 ring-4 ring-indigo-200 dark:ring-indigo-900" />
      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{title}</h4>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">{when}</p>
      <ul className="list-disc text-sm text-zinc-700 dark:text-zinc-300 ml-4 space-y-1">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

export default function PortfolioCreative() {
  const [dark, setDark] = useState(true);

  // --- Data ---
  const words = useMemo(
    () => [
      "Real‑Time Dashboards",
      "Chat Apps",
      "Scalable APIs",
      "Event‑Driven Systems",
    ],
    []
  );

  const skills = [
    "Java",
    "Spring Boot",
    "Kafka",
    "Redis",
    "SQL",
    "React",
    "TypeScript",
    "Tailwind CSS",
    
    "Git",
  ];

  const projects = [
  {
    title: "Real-Time Metrics Dashboard",
    tech: "Java, Spring Boot, Kafka, Redis, React",
    desc: `Developed a real-time analytics dashboard using Kafka for streaming data.
Backend powered by Spring Boot to process and store events efficiently.
Provides low-latency visualizations for monitoring system performance.
Integrated PostgreSQL for storing historical metrics and logs.
Scalable architecture for multiple concurrent users.`,
  },
  {
    title: "Career Portal",
    tech: "React, Node.js, Python",
    desc: `Built a job portal for candidates and recruiters.
Implemented secure authentication with JWT and role-based access.
Responsive frontend with React and Tailwind CSS.
Backend using Django for handling job postings and applications.
MySQL database for storing user profiles, jobs, and applications.`,
  },
  {
    title: "HR Dashboard",
    tech: "React Native, TypeScript, Spring Boot",
    desc: `Mobile dashboard for freelancers to track tasks, earnings, and work status.
Backend REST APIs built with Spring Boot.
React Native mobile app with real-time updates.
Integrated PostgreSQL for user and task management.
Provides notifications and analytics for freelancers on-the-go.`,
  },
];


  // --- dark mode on <html> for Tailwind 'dark:' ---
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 transition-colors">
      {/* NAV */}
      <nav className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-bold text-lg tracking-tight">Saveri Gavvala</div>
          <div className="flex items-center gap-3">
            <a href="#projects" className="text-sm hover:underline">Projects</a>
            <a href="#skills" className="text-sm hover:underline">Skills</a>
            <a href="#contact" className="text-sm hover:underline">Contact</a>
            <button
              onClick={() => setDark((d) => !d)}
              className="ml-2 inline-flex items-center gap-2 rounded-2xl border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-sm shadow-sm hover:shadow transition"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />} {dark ? "Light" : "Dark"}
            </button>
            <a
              href="/Saveri_Re.pdf" // replace with resume url
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 text-white px-3 py-1.5 text-sm shadow hover:bg-indigo-500"
            >
              <Download className="h-4 w-4" /> Resume
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="max-w-6xl mx-auto px-4 pt-10 pb-6 grid md:grid-cols-[auto,1fr] items-center gap-8">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
          <div className="relative w-36 h-36 rounded-full border-4 border-indigo-500 shadow-xl overflow-hidden group">
            {/* Replace /profile.jpg with your actual path. Works without backend. */}
            <img src="/Profile.jpg" alt="Profile" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <span className="absolute inset-0 ring-2 ring-inset ring-transparent group-hover:ring-indigo-300/70 rounded-full transition" />
          </div>
        </motion.div>
        <div>
          <motion.h1 initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }} className="text-3xl md:text-4xl font-extrabold">
            Hi, I’m Saveri 👋
          </motion.h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-300">
            I build <Typewriter words={words} />
          </p>
          <p className="mt-4 max-w-2xl text-zinc-700 dark:text-zinc-400">
            Associate Software Engineer with 1.2 years of startup experience. Focused on Java + Spring Boot backend and React frontends. Passionate about real‑time systems, clean APIs, and delightful UI.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a href="#projects" className="rounded-2xl bg-indigo-600 text-white px-4 py-2 shadow hover:bg-indigo-500">See Projects</a>
            <a href="#contact" className="rounded-2xl border border-zinc-300 dark:border-zinc-700 px-4 py-2">Contact</a>
          </div>
        </div>
      </header>

      {/* SKILLS */}
      <RevealSection>
        <section id="skills" className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold">Skills</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Hover bubbles • subtle floating animation</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {skills.map((s, i) => (
              <SkillBubble key={s} label={s} delay={(i % 5) * 0.2} />
            ))}
          </div>
        </section>
      </RevealSection>

      {/* EXPERIENCE TIMELINE */}
      <RevealSection>
        <section className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold">Experience</h2>
          <div className="mt-6 relative">
            <div className="absolute left-1 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
            <TimelineItem
              when="Apr 2025 – Present"
              title="Associate Software Engineer-Lora It Innovations Pvt Ltd"
              points={[
                "Built REST APIs with Spring Boot for microservices",
                "Integrated Kafka for event streaming + Redis caching",
                "Collaborated with React team on metrics dashboard",
                "Wrote unit/integration tests and optimized queries",
              ]}
            />
          </div>
        </section>
      </RevealSection>

      {/* PROJECTS */}
      <RevealSection>
        <section id="projects" className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Flip a card to read details</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <FlipCard key={p.title} title={p.title} tech={p.tech} desc={p.desc}  />)
            )}
          </div>
        </section>
      </RevealSection>

      {/* CONTACT */}
      <RevealSection>
        <section id="contact" className="max-w-6xl mx-auto px-4 py-12">
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold">Let’s talk</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                Open to Java/React roles. Available immediately. Based in India.
              </p>
            </div>
            <div className="flex items-center gap-4 md:justify-end">
              <a
                href="https://github.com/Saveri23" // replace
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 hover:shadow"
              >
                <Github className="h-5 w-5 group-hover:rotate-6 transition" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/saveri-gavvala-b14166238" // replace
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 hover:shadow"
              >
                <Linkedin className="h-5 w-5 group-hover:-translate-y-0.5 transition" /> LinkedIn
              </a>
              <a
                href="mailto:saverigavvala@gmail.com" // replace
                className="group inline-flex items-center gap-2 rounded-full bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-500"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition" /> Email
              </a>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* FOOTER */}
      <footer className="py-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
        © {new Date().getFullYear()} Saveri Gavvala — built with React · Tailwind · Framer Motion
      </footer>
    </div>
  );
}
