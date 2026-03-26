import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../API/api.Client";
import { ENDPOINTS } from "../../API/api.Config";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      return setError("All fields are required");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (!token) {
      return setError("Invalid or expired token");
    }

    try {
      setLoading(true);

      await apiClient.put(
        ENDPOINTS.AUTH.RESET_PASSWORD(token),
        { password }
      );

      setSuccess("Password updated successfully 🎉");
      setTimeout(() => navigate("/login"), 2000);

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
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-black via-slate-900 to-slate-800 px-4">

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold mb-2 text-center">
          Create New Password
        </h2>

        <p className="text-sm text-slate-400 text-center mb-6">
          Choose a strong password to secure your account
        </p>

        {error && (
          <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded mb-4">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-500/10 text-green-400 text-sm p-2 rounded mb-4">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-400" size={18} />

            <input
              type={show ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-slate-800 border border-slate-600 focus:border-blue-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 text-slate-400"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full py-3 px-3 rounded-lg bg-slate-800 border border-slate-600 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Helper Text */}
          <p className="text-xs text-slate-400">
            Password should contain at least 6 characters, including a number and a special character for better security.
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-blue-600/60 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-[1.02]"
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <p className="text-xs text-slate-500 text-center mt-5">
          Make sure you remember your password or store it securely.
        </p>
      </motion.div>
    </div>
  );
};

export default ResetPassword;