// src/admin/Pages/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { ENV } from "../env/environment";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validation = useFormik({
    initialValues: { email: "test@nbt.com", password: "nbt123" },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(`${ENV.BASE_URL}/public/auth/login`, {
          email: values.email,
          password: values.password,
        });

        const { token, user } = response.data;
        login(`Bearer ${token}`, user);
        navigate("/admin");
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Login failed");
      } finally {
        setLoading(false);
      }
    },
  });

  const inputCls = (fieldName) => {
    const hasError = validation.touched[fieldName] && validation.errors[fieldName];
    return `w-full px-4 py-3.5 border rounded-2xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition text-sm ${
      hasError
        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
        : "border-slate-200 focus:border-green-400 focus:ring-green-100"
    }`;
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');`}</style>
      <div
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{ fontFamily: "'Sora',sans-serif", background: "#f8fafc" }}
      >
        {/* Decorative background blobs */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: "linear-gradient(135deg,#062A4D,#404569)" }}
        />
        <div
          className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full opacity-[0.07]"
          style={{ background: "linear-gradient(135deg,#062A4D,#404569)" }}
        />

        <div className="relative w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header band */}
            <div
              className="px-8 pt-10 pb-16 text-center relative"
              style={{ background: "linear-gradient(135deg, #062A4D 0%, #404569 100%)" }}
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg mx-auto mb-4 flex items-center justify-center overflow-hidden">
                <img src="/assets/img/nbt-logo.png" alt="NBT" className="w-11 h-11 object-contain" />
              </div>
              <h1 className="text-white text-2xl font-extrabold tracking-tight">Welcome Back</h1>
              <p className="text-white/70 text-sm mt-1">Sign in to manage your tours</p>
            </div>

            {/* Form card — overlaps the header band */}
            <div className="px-8 pb-8 -mt-8 relative">
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                  }}
                  className="space-y-5"
                >
                  {/* Email */}
                  <div className="space-y-1.5">
  <label className="text-sm font-semibold text-slate-700">Email</label>
  <div className="flex items-center border border-slate-200 rounded-2xl bg-white focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100 transition px-4">
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="text-slate-400 flex-shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
    <input
      name="email"
      type="email"
      placeholder="Enter your email"
      value={validation.values.email}
      onChange={validation.handleChange}
      onBlur={validation.handleBlur}
      className="w-full py-3.5 pl-3 bg-transparent outline-none border-none text-slate-800 placeholder-slate-400 text-sm"
    />
  </div>
  {validation.touched.email && validation.errors.email && (
    <p className="text-red-500 text-xs font-medium">{validation.errors.email}</p>
  )}
</div>

                  {/* Password */}
                  <div className="space-y-1.5">
  <label className="text-sm font-semibold text-slate-700">Password</label>
  <div className="flex items-center border border-slate-200 rounded-2xl bg-white focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100 transition px-4">
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="text-slate-400 flex-shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
    <input
      name="password"
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      value={validation.values.password}
      onChange={validation.handleChange}
      onBlur={validation.handleBlur}
      className="w-full py-3.5 pl-3 pr-2 bg-transparent outline-none border-none text-slate-800 placeholder-slate-400 text-sm"
    />
    <button
      type="button"
      onClick={() => setShowPassword((s) => !s)}
      className="text-slate-400 hover:text-slate-600 transition flex-shrink-0"
      tabIndex={-1}
    >
      {showPassword ? (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.343 6.343m3.535 3.535L3 3m18 18l-3.35-3.35" />
        </svg>
      ) : (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  </div>
  {validation.touched.password && validation.errors.password && (
    <p className="text-red-500 text-xs font-medium">{validation.errors.password}</p>
  )}
</div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl font-bold text-white text-base transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
                    style={{
                      background: loading ? "#404569" : "linear-gradient(135deg, #062A4D 0%, #404569 100%)",
                      boxShadow: "0 8px 24px rgba(21, 29, 74, 0.30)",
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Logging in…
                      </>
                    ) : (
                      "Log In"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <p className="text-center text-slate-400 text-xs mt-6">
            North Blossom Travel and Tours — Admin Panel
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;