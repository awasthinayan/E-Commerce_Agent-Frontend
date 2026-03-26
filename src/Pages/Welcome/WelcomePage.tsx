import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const sectionVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(true);

  const theme = {
  background: darkMode
    ? "linear-gradient(135deg,#0f172a,#1e293b,#020617)"
    : "linear-gradient(135deg,#f1f5f9,#e2e8f0,#f8fafc)",

  text: darkMode ? "#ffffff" : "#0f172a",

  subText: darkMode ? "#cbd5f5" : "#475569",

  card: darkMode ? "#1e293b" : "#f1f5f9", // soft card (not pure white)

  border: darkMode ? "#334155" : "#e2e8f0",

  hover: darkMode ? "#334155" : "#e2e8f0",
};

  return (
    <div
      style={{
        background: theme.background,
        color: theme.text,
        fontFamily: "Inter, sans-serif",
        transition: "all 0.3s ease",
      }}
    >
      {/* 🔥 NAVBAR */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 10%",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2>E-Commerce Agent</h2>

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Auth Buttons */}
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "10px 18px",
              background: "transparent",
              border: "1px solid gray",
              borderRadius: "6px",
              cursor: "pointer",
              color: theme.text,
            }}
          >
            Sign In
          </button>

          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "10px 18px",
              background: "#2563eb",
              border: "none",
              borderRadius: "6px",
              color: "white",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* HERO */}
      <section
  style={{
    minHeight: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10%",
    gap: "40px",
  }}
>
  {/* LEFT CONTENT */}
  <div style={{ flex: 1 }}>
    <h1 style={{ fontSize: "58px", fontWeight: 700 }}>
      Intelligent Product Discovery <br /> Powered by AI
    </h1>

    <p
      style={{
        fontSize: "20px",
        color: theme.subText,
        marginTop: "20px",
        maxWidth: "600px",
      }}
    >
      Compare products across platforms instantly using AI. Make smarter
      buying decisions without wasting time.
    </p>

    <button
      onClick={() => navigate("/register")}
      style={{
        marginTop: "30px",
        padding: "16px 36px",
        fontSize: "18px",
        background: "#2563eb",
        border: "none",
        borderRadius: "8px",
        color: "white",
        cursor: "pointer",
      }}
    >
      Get Started →
    </button>
  </div>

{/* RIGHT SIDE VISUAL */}
<motion.img
  src="/Images/ecommerce_agent_banner.svg"
  alt="Analytics dashboard"
  style={{
    width: "100%",
    maxWidth: "500px",
    borderRadius: "16px",
  }}
  animate={{ y: [0, -12, 0] }}
  transition={{ duration: 5, repeat: Infinity }}
/>
</section>

      {/* FEATURES */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ padding: "100px 10%" }}
      >
        <h2 style={{ fontSize: "40px", marginBottom: "40px" }}>
          Features
        </h2>

        <div style={{ display: "flex", gap: "30px" }}>
          {["AI Comparison", "Live Pricing", "Smart Suggestions"].map(
            (item, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: theme.card,
                  padding: "30px",
                  borderRadius: "12px",
                }}
              >
                <h3>{item}</h3>
                <p style={{ color: theme.subText }}>
                  Analyze products across multiple platforms instantly.
                </p>
              </div>
            )
          )}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          padding: "120px 10%",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "42px" }}>
          Start your smart shopping journey 🚀
        </h2>

        <button
          onClick={() => navigate("/register")}
          style={{
            marginTop: "30px",
            padding: "16px 36px",
            fontSize: "18px",
            background: "#2563eb",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Sign Up Free
        </button>
      </motion.section>

              {/* FOOTER */}
        <footer
          style={{
            padding: "60px 10% 30px",
            borderTop: `1px solid ${theme.border}`,
            marginTop: "60px",
          }}
        >
          {/* TOP FOOTER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "40px",
              marginBottom: "40px",
            }}
          >
            {/* BRAND */}
            <div style={{ maxWidth: "300px" }}>
              <h2 style={{ marginBottom: "10px" }}>E-Commerce Agent</h2>
              <p style={{ color: theme.subText, fontSize: "14px" }}>
                AI-powered personalized shopping assistant that helps you make smarter
                buying decisions based on your preferences and behavior.
              </p>
            </div>

            {/* LINKS */}
            <div>
              <h4 style={{ marginBottom: "10px" }}>Quick Links</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ cursor: "pointer", color: theme.subText }}>Home</span>
                <span style={{ cursor: "pointer", color: theme.subText }}>Features</span>
                <span style={{ cursor: "pointer", color: theme.subText }}>About</span>
              </div>
            </div>

            {/* CONTACT / SOCIAL */}
            <div>
              <h4 style={{ marginBottom: "10px" }}>Connect</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <a
                  href="https://github.com/awasthinayan/E-Commerce_Agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "#2563eb" }}
                >
                  GitHub ↗
                </a>
                <span style={{ color: theme.subText }}>Email: nayanawasthi2015@gmail.com</span>
              </div>
            </div>
          </div>

          {/* BOTTOM FOOTER */}
          <div
            style={{
              borderTop: `1px solid ${theme.border}`,
              paddingTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
              fontSize: "13px",
              color: theme.subText,
            }}
          >
            <span>
              © {new Date().getFullYear()} Nayan Awasthi. All rights reserved.
            </span>

            <span style={{ opacity: 0.8 }}>
              Built with ❤️ using React & TypeScript
            </span>
          </div>
        </footer>
    </div>
  );
};

export default WelcomePage;