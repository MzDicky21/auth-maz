import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  role: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

export default function SignPage() {
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const [formDataRegister, setFormDataRegister] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [formDataLogin, setFormDataLogin] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [error, setError] = useState<string | undefined>();

  // ----------------- HANDLER -----------------
  const handleChangeRegister = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof RegisterFormData
  ) => {
    setFormDataRegister((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleChangeLogin = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof LoginFormData
  ) => {
    setFormDataLogin((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    try {
      console.log("Register Data:", formDataRegister);
      // TODO: API call register
    } catch (err) {
      setError("Failed Register!");
    }
  };

  const handleCompleksLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    try {
      console.log("Login Data:", formDataLogin);
      // TODO: API call login
    } catch (err) {
      setError("Failed Log in!");
    }
  };

  const togglePasswordVisibilityRegister = () => {
    setShowPasswordRegister((prev) => !prev);
  };

  const togglePasswordVisibilityLogin = () => {
    setShowPasswordLogin((prev) => !prev);
  };

  const handleSingUpClik = () => setIsSignUpActive(true);
  const handleSignInClik = () => setIsSignUpActive(false);

  // ----------------- UI -----------------
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-4xl min-h-[480px] mx-auto flex rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 bg-white">
        {/* ---------------- SIGN UP ---------------- */}
        <div
          className={`absolute top-0 h-full flex items-center justify-center w-1/2 p-6 transition-all duration-700
          ${isSignUpActive ? "translate-x-full opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <form
            onSubmit={handleSubmitRegister}
            className="bg-white w-full flex flex-col gap-3 text-center p-4 rounded-lg"
          >
            <h1 className="text-xl font-bold">Create Account</h1>
            <input
              type="text"
              placeholder="Nama"
              value={formDataRegister.username}
              onChange={(e) => handleChangeRegister(e, "username")}
              className="w-full bg-gray-100 rounded-lg px-4 py-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={formDataRegister.email}
              onChange={(e) => handleChangeRegister(e, "email")}
              className="w-full bg-gray-100 rounded-lg px-4 py-2"
            />
            <div className="relative w-full">
              <input
                type={showPasswordRegister ? "text" : "password"}
                placeholder="Password"
                value={formDataRegister.password}
                onChange={(e) => handleChangeRegister(e, "password")}
                className="w-full bg-gray-100 rounded-lg px-4 py-2"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibilityRegister}
              >
                {showPasswordRegister ? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
            </div>
            <input
              type="text"
              placeholder="Role"
              value={formDataRegister.role}
              onChange={(e) => handleChangeRegister(e, "role")}
              className="w-full bg-gray-100 rounded-lg px-4 py-2"
            />
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700"
            >
              Submit
            </button>
          </form>
        </div>

        {/* ---------------- SIGN IN ---------------- */}
        <div
          className={`absolute top-0 left-0 h-full flex items-center justify-center w-1/2 p-6 transition-all duration-700
          ${isSignUpActive ? "translate-x-full opacity-0 z-0" : "opacity-100 z-10"}`}
        >
          <form
            onSubmit={handleCompleksLogin}
            className="bg-white w-full flex flex-col gap-3 text-center p-4 rounded-lg"
          >
            <h1 className="text-xl font-bold">Log In</h1>
            <input
              type="email"
              placeholder="Email"
              value={formDataLogin.email}
              onChange={(e) => handleChangeLogin(e, "email")}
              className="w-full bg-gray-100 rounded-lg px-4 py-2"
            />
            <div className="relative w-full">
              <input
                type={showPasswordLogin ? "text" : "password"}
                placeholder="Password"
                value={formDataLogin.password}
                onChange={(e) => handleChangeLogin(e, "password")}
                className="w-full bg-gray-100 rounded-lg px-4 py-2"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibilityLogin}
              >
                {showPasswordLogin ? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <a
              href="/forget-password"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot Password?
            </a>
            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700"
            >
              Log in
            </button>
          </form>
        </div>

        {/* ---------------- OVERLAY ---------------- */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-20 transition-transform duration-700
          ${isSignUpActive ? "-translate-x-full" : "translate-x-0"}`}
        >
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white w-[200%] h-full flex">
            {/* RIGHT SIDE (Sign In Panel) */}
            {isSignUpActive ?
              <div className="flex flex-col justify-center items-center text-center p-8 w-1/2">
                <h2 className="text-2xl font-bold">Welcome back!</h2>
                <p className="text-sm mb-4">Please log in with your personal details</p>
                <button
                  className="border border-white px-6 py-2 rounded-full"
                  onClick={handleSignInClik}
                >
                  Log in
                </button>
              </div>

              :
              <div className="flex flex-col justify-center items-center text-center p-8 w-1/2">
                <h2 className="text-2xl font-bold">
                  Welcome to our application
                </h2>
                <p className="text-sm mb-4">
                  Please register first and start your journey with us
                  exploring the world of programming
                </p>
                <button
                  className="border border-white px-6 py-2 rounded-full"
                  onClick={handleSingUpClik}
                >
                  Register
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
