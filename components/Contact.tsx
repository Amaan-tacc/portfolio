import React, { useState, FormEvent } from "react";
import { motion, Variants } from "framer-motion";
import { AppMode } from "../types";

interface ContactProps {
  mode: AppMode;
  themeColors: { primary: string };
}

const Contact: React.FC<ContactProps> = ({ mode, themeColors }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const [result, setResult] = useState<string>("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "2b07d2c4-e559-436d-9a79-fe7ae3004029");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      setResult("Error");
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <section
      id="contact"
      className="py-12 sm:py-24 px-6 overflow-hidden relative scroll-mt-20"
    >
      {/* Decorative Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] pointer-events-none opacity-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle, ${themeColors.primary} 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16"
        >
          <div className="space-y-6 sm:space-y-8">
            <motion.h3
              variants={itemVariants}
              className="text-4xl sm:text-7xl font-display font-extrabold leading-tight"
            >
              Let's <br />
              <motion.span
                animate={{ color: themeColors.primary }}
                className="transition-colors duration-500 inline-block"
              >
                Collab.
              </motion.span>
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-xl opacity-70 max-w-md leading-relaxed"
            >
              Whether you need a sleek design or a high-performance build, I'm
              here to bring your vision to life.
            </motion.p>

            <motion.div variants={itemVariants} className="flex gap-3 sm:gap-6">
              {[
                { name: "Twitter", icon: "🐦" },
                { name: "Github", icon: "🐙" },
                { name: "Dribbble", icon: "🏀" },
                { name: "LinkedIn", icon: "💼" },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  whileHover={{
                    y: -12,
                    color: themeColors.primary,
                    borderColor: themeColors.primary,
                    boxShadow: `0 10px 30px ${themeColors.primary}33`,
                  }}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl glass border border-gray-200 dark:border-white/10 flex items-center justify-center text-xl sm:text-3xl transition-all shadow-sm bg-white/50 dark:bg-brand-dark/50"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="pt-4 sm:pt-8 flex flex-col space-y-1 sm:space-y-2"
            >
              <span className="text-[10px] uppercase font-black tracking-widest opacity-40">
                General Enquiries
              </span>
              <a
                href="mailto:hello@amaanity.com"
                className="text-lg sm:text-2xl font-display font-bold hover:opacity-100 transition-opacity"
                style={{ color: themeColors.primary }}
              >
                hello@amaanity.com
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-gray-200 dark:border-white/10 shadow-2xl glass bg-white/40 dark:bg-white/5 backdrop-blur-3xl"
          >
            <form className="space-y-6 sm:space-y-8" onSubmit={handleOnSubmit}>
              <div className="space-y-1 group">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] opacity-40">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-transparent border-b-2 border-gray-300 dark:border-white/10 py-3 sm:py-4 focus:outline-none transition-all duration-500 font-medium text-base sm:text-lg placeholder:opacity-30"
                  style={{ borderBottomColor: themeColors.primary }}
                />
              </div>
              <div className="space-y-1 group">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] opacity-40">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-transparent border-b-2 border-gray-300 dark:border-white/10 py-3 sm:py-4 focus:outline-none transition-all duration-500 font-medium text-base sm:text-lg placeholder:opacity-30"
                  style={{ borderBottomColor: themeColors.primary }}
                />
              </div>
              <div className="space-y-1 group">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] opacity-40">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell me about your project..."
                  className="w-full bg-transparent border-b-2 border-gray-300 dark:border-white/10 py-3 sm:py-4 focus:outline-none transition-all duration-500 font-medium text-base sm:text-lg resize-none placeholder:opacity-30"
                  style={{ borderBottomColor: themeColors.primary }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  backgroundColor: themeColors.primary,
                  boxShadow: `0 20px 50px ${themeColors.primary}44`,
                }}
                className="w-full py-5 sm:py-6 rounded-[1.2rem] sm:rounded-[1.5rem] text-white font-black text-lg sm:text-xl shadow-xl transition-all duration-500 overflow-hidden relative group"
              >
                <span
                  type="submit"
                  className="relative z-10 flex items-center justify-center space-x-2 sm:space-x-3"
                >
                  <span>Send</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </motion.button>
              <div>
                <span>{result}</span>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
