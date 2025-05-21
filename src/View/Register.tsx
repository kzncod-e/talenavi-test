import React from "react";
import bg from "/login-bg.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Register = () => {
  const [email, setEmail] = React.useState("eve.holt@reqres.in");
  const [password, setPassword] = React.useState("pistol");

  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // console.log(email, password);
      setIsLoading(true);
      const res = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        console.log("Registration successful", result);
        toast("🦄 Registration successful!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            // console.log("Toast closed");
            navigate("/sign-in");
          },
        });
        // Handle successful registration (e.g., redirect to login page)
      }
      if (!res.ok) {
        console.log("Registration failed", result);
        toast("🦄 Registration failed !", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            // console.log("Toast closed");
            navigate("/sign-up");
          },
        });
        // Handle registration failure (e.g., show error message)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" w-full items-center mix-blend-overlay relative justify-center min-h-screen bg-gray-100">
      <div className=" opacity-70 absolute h-full w-full bg-black"></div>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh", // optional: full screen height
        }}
        className="bg-position-center    flex justify-center items-center w-full h-full z-40 bg-cover">
        {/* <div className="bg-[#FBFBFB] shadow-2xl h-[10rem] z-50 w-[8rem] rounded"></div> */}
        <div className="bg-white px-6 py-12  rounded-xl shadow-md w-80 relative">
          {/* Close button (X) */}

          {/* Title */}
          <h2 className="text-xl font-semibold mb-4">Sign up</h2>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <div className="mb-3">
                <label htmlFor="" className="text-xs text-gray-400 mb-1 block">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder=""
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-200"
                />
              </div>

              {/* Password input */}
              <div className="mb-3 relative">
                <label htmlFor="" className="text-xs text-gray-400 mb-1 block">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder=""
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-200"
                />
              </div>
              <button
                type="submit"
                className="w-full disabled:bg-gray-400 bg-[#4E71FF] text-white py-2 rounded-full mt-3 text-sm cursor-not-allowed"
                disabled={!email || !password || isLoading}>
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <svg
                      className="animate-spin h-5 w-5  text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  </div>
                ) : (
                  "Sign up"
                )}
              </button>
            </div>

            {/* Sign in button (disabled look) */}

            {/* Remember me & Need help */}
            <div className="flex text-[#666666] justify-between items-center mt-3 text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-1" />
                Remember me
              </label>
              <a href="#" className=" hover:underline">
                Need help?
              </a>
            </div>
          </form>

          {/* Sign up link */}
          <div className="mt-5 text-[#666666] text-sm ">
            already have an account?{" "}
            <Link
              to={"/sign-in"}
              className="text-black font-medium hover:underline">
              Sign in
            </Link>
          </div>

          {/* reCAPTCHA notice */}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Register;
