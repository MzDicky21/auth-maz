import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ForgetPasswordFormData {
  username: string;
  newPassword: string;
  confirmsPassword: string;
}

export default function ForgetPassword() {
  const [formData, setFormData] = useState<ForgetPasswordFormData>({
    username: "",
    newPassword: "",
    confirmsPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [message, setMessage] = useState<string | undefined>();

  const navigate = useNavigate()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ForgetPasswordFormData
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    setMessage(undefined);

    if (formData.newPassword !== formData.confirmsPassword) {
      setError("Invalid Password");
      return;
    }

    try {
      const res = await fetch(
        `your http localhost `,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw data.message || "There is an error!";

      setMessage("Password changed successfully 🚀");
    } catch (err) {
      setError(typeof err === "string" ? err : "Failed to update password!");
    }
  };

  const handleKembaliClik = () => {
    navigate('/auth')
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex shadow-2xl rounded-2xl overflow-hidden mt-22 justify-center">
      {/* Form */}
      <div className="flex-1 bg-white p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-center mb-4">Reset Password</h2>

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="User Name"
            value={formData.username}
            onChange={(e) => handleChange(e, "username")}
            className="w-full rounded-lg bg-gray-100 px-4 py-2"
          />

          {/* New Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={(e) => handleChange(e, "newPassword")}
              className="w-full rounded-lg bg-gray-100 px-4 py-2"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmsPassword"
              placeholder="Confirm Password"
              value={formData.confirmsPassword}
              onChange={(e) => handleChange(e, "confirmsPassword")}
              className="w-full rounded-lg bg-gray-100 px-4 py-2"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </span>
          </div>

          {/* Error & Success */}
          {error && <span className="text-sm text-red-500">{error}</span>}
          {message && <span className="text-sm text-green-500">{message}</span>}

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700"
          >
            confirm
          </button>
        </form>
      </div>

      {/* Overlay */}
      <div className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-2">
          Are you sure you want to change your password?
        </h2>
        <p className="text-sm mb-4 text-center">
          You forgot your password? <br />
          Relax, let's reset the new password here. <br />
          But remember, don't forget again 😅 <br />
          When you have finished you can return to the login page.
        </p>
        <button
          className="mt-2 px-4 py-2 border border-white rounded-lg"
          onClick={handleKembaliClik}
        >
          Back
        </button>
      </div>
    </div>
  );
}
