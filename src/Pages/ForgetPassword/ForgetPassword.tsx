import { useState } from "react";
import apiClient from "../../API/api.Client";
import { ENDPOINTS } from "../../API/api.Config";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) return setError("Email is required");

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return setError("Enter a valid email address");
    }

    try {
      setLoading(true);

      await apiClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });

      setSuccess("Reset link sent to your email 📩");
      setEmail("");

    } catch (error: unknown) {
      if(error instanceof Error){
        console.log(error?.message);
      } else {
        alert("Something went wrong")
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black px-4">

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-800/50 backdrop-blur-lg p-8  rounded-2xl shadow-2xl text-white"
      >
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Forgot Password
        </h2>

        <p className="text-sm text-slate-400 mb-6 text-center">
          Enter your email and we’ll send you a reset link
        </p>

        {error && (
          <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded mb-3">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-500/10 text-green-400 text-sm p-2 rounded mb-3">
            {success}
          </p>
        )}

        {/* Email Input */}
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-4 text-slate-400" size={20} />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-green-500 outline-none"
          />
        </div>

        {/* Helper Text */}
        <p className="text-xs text-slate-400 mb-5">
          Make sure to enter the email associated with your account. You’ll receive a reset link shortly.
        </p>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            loading
              ? "bg-green-600/60 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02]"
          }`}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {/* Extra UX */}
        <p className="text-xs text-slate-500 text-center mt-5">
          Didn’t receive the email? Check spam or try again.
        </p>
      </motion.form>
    </div>
  );
};

export default ForgotPassword;