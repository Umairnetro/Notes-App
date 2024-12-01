import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Loader from "./Loader";
import { useAuth } from "../context/AuthContext";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const SignUp = () => {
  const {
    auth,
    showMessage,
    setShowMessage,
    showLoader,
    setShowLoader,
    setAuthLoader,
    authLoader,
    currentUser,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!username & !email && !password) {
      setShowMessage("Please fill in all fields.");
      return;
    }

    if (!username || username.length < 3) {
      setShowMessage("Username must be at least 3 characters long.");
      return;
    }

    try {
      setShowLoader(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log("User object:", user);

      await updateProfile(user, {
        displayName: username,
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: username,
        createdDate: new Date(),
      });

      setShowMessage("Sign up successful");
      navigate("/login");
    } catch (error) {
      console.log(error);

      if (error.code === "auth/email-already-in-use") {
        setShowMessage("Email already in use");
      } else if (error.code === "auth/invalid-email") {
        setShowMessage("Please enter a valid email");
      } else {
        setShowMessage("Something went wrong, please try again");
      }
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    setAuthLoader(true);
    if (authLoader && currentUser) {
      navigate("/dashboard");
      console.log("User not logged in");
      console.log(currentUser);
    }
  }, [currentUser, authLoader, navigate]);

  return (
    <>
      <div className="flex flex-col gap-4 bg-white px-4 py-6 w-[30%] rounded-lg">
        <h2 className="text-3xl text-[#3d6969] upper text-center font-medium mb-2">
          Sign up
        </h2>
        <input
          className="bg-gray-200 border-2 border-gray-300 rounded-full px-3 py-2 focus:border-[#3d6969] outline-none text-gray-600 duration-300"
          type="text"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
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
            type="password"
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
