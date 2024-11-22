import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "./Loader";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const { auth, showMessage, setShowMessage, showLoader, setShowLoader } =
    useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  console.log(auth);

  const handleSignUp = async () => {
    try {
      setShowLoader(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        setShowMessage("email already in use");
      } else if (error.code === "auth/invalid-email") {
        setShowMessage("please enter a valid email");
      }
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 bg-white px-4 py-6 w-[30%] rounded-lg">
        <h2 className="text-3xl text-[#3d6969] upper text-center font-medium mb-2">
          Sign up
        </h2>
        <input
          className="bg-gray-200 border-2 border-gray-300 rounded-full px-3 py-2 focus:border-[#3d6969] outline-none text-gray-600 duration-300"
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex flex-col">
          <input
            className="bg-gray-200 flex-grow border-2 border-gray-300 rounded-full px-3 py-2 focus:border-[#3d6969] outline-none text-gray-600 duration-300"
            type="text"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {showMessage && (
            <p className="text-red-500 before:content-['*']">{showMessage}</p>
          )}
        </div>

        <button
          onClick={handleSignUp}
          className="bg-[#2c4646] text-white px-5 py-2 rounded-full border-2 border-[#2c4646] hover:bg-transparent hover:text-[#2c4646] duration-300 self-center"
        >
          Sign up
        </button>
      </div>
      <p className="mt-2">
        Already have an account?&nbsp;
        <Link
          to="/login"
          onClick={() => setShowMessage("")}
          className="hover:text-gray-400 underline"
        >
          Login
        </Link>
      </p>
      {showLoader && <Loader />}
    </>
  );
};

export default SignUp;
