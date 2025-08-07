"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import SignupTop10 from "./SignupTop10";
import Footer from "./Footer";
// import { useAuth } from '../contexts/AuthContext'

const AuthForms = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
      } else {
        // Validation for signup
        if (!formData.name || !formData.age) {
          throw new Error("Please fill in all fields");
        }
        if (parseInt(formData.age) < 1) {
          throw new Error("Please enter a valid age");
        }

        const { error } = await signUp(
          formData.email,
          formData.password,
          formData.name,
          formData.age
        );
        if (error) throw error;

        setError("Check your email for verification link!");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({
      name: "",
      age: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#0d0f11]">
      <nav className="relative h-[550px] md:h-[750px] bg-[#0d0f11] shadow overflow-hidden">

        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/dxswkuhfi/image/upload/v1754334545/signup_cover_vu8mf3.jpg"
          alt="Home page Banner"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
        <div className=" relative max-w-screen-2xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center w-[120px] md:w-[200px]">
              <img src="/images/logo.png" alt="Playflix Logo" />
            </div>

          </div>
          <div className="max-w-md w-full space-y-8 mx-auto">

            <div className="mt-8 space-y-6 mx-auto bg-black/60 p-12 rounded-md">
              <h2 className=" text-center text-3xl font-extrabold text-gray-300">
                {isLogin ? "Sign in " : "Create new account"}
              </h2>
              <div className="shadow-sm space-y-px bg-transparent">
                {!isLogin && (
                  <>
                    <div>
                      <input
                        name="name"
                        type="text"
                        required={!isLogin}
                        className="appearance-none bg-transparent my-2 rounded-none relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-500 text-gray-100 rounded-sm focus:outline-none focus:ring-white focus:border-gray-300 focus:z-10 sm:text-sm"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <input
                        name="age"
                        type="number"
                        required={!isLogin}
                        min="1"
                        className="appearance-none bg-transparent my-2 rounded-none relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-500 text-gray-100 rounded-sm focus:outline-none focus:ring-white focus:border-gray-300 focus:z-10 sm:text-sm"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}

                <div>
                  <input
                    name="email"
                    type="email"
                    required
                    className="appearance-none bg-transparent my-2 rounded-none relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-500 text-gray-100 rounded-sm focus:outline-none focus:ring-white focus:border-gray-300 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <input
                    name="password"
                    type="password"
                    required
                    className="appearance-none bg-transparent my-2 rounded-none relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-500 text-gray-100 rounded-sm focus:outline-none focus:ring-white focus:border-gray-300 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}

              <div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-[18px] font-medium rounded-md text-white bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={toggleForm}
                  className="font-medium text-gray-300"
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Sign in"}
                </button>
              </div>
            </div>

          </div>

        </div>
      </nav>
      <SignupTop10/>
      <Footer/>
    </div>
    
  );
};

export default AuthForms;
