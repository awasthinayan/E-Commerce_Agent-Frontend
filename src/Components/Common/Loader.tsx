import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#020617",
        color: "white",
        fontSize: "22px",
        fontWeight: 500
      }}
    >
      <motion.div
        animate={{
          opacity: [0.2, 1, 0.2],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        Loading E-Commerce Agent...
      </motion.div>
    </div>
  );
};

export default Loader;