import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaRegNoteSticky } from "react-icons/fa6";
import styles from "./Dashboard.module.css";
import { FiSend } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";
import logo from "../assets/Netro.png";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect } from "react";
import Loader from "../components/Loader";

const dashboard = () => {
  const {
    currentUser,
    setUsername,
    logOut,
    authLoader,
    showLoader,
    setShowLoader,
  } = useAuth();
  const navigate = useNavigate();

  const fetchUserData = async () => {
    if (currentUser) {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        console.log("UserDoc", userDoc.data().displayName);
        setUsername(userDoc.data().displayName);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!authLoader && !currentUser) {
      navigate("/login");
      console.log("User not logged in");
      console.log(currentUser);
    }
  }, [currentUser, authLoader, navigate]);

  useEffect(() => {
    setShowLoader(true);
    fetchUserData().then(() => setShowLoader(false));
  }, [currentUser]);

  return (
    <>
      {showLoader && <Loader />}
      <div className={`${styles.dashboard}`}>
        <div
          className={`${styles.sidebar} flex flex-col items-center justify-between py-6 relative`}
        >
          <div id={`${styles.logo}`} className=" font-semibold w-[50%]">
            <img src={logo} alt="" className="w-[100%]" />
          </div>
          <div
            className={`${styles.noteSection} flex items-center flex-col gap-3`}
          >
            <NavLink
              to={"notes"}
              className={({ isActive }) => {
                return `p-2 rounded-lg ${
                  isActive ? "bg-[#2C4646]" : "bg-[#30363b]"
                }`;
              }}
              title="Notes"
            >
              <FaRegNoteSticky className="text-3xl" />
            </NavLink>
            <NavLink
              to={"receive"}
              className={({ isActive }) => {
                return `p-2 rounded-lg ${
                  isActive ? "bg-[#2C4646]" : "bg-[#30363b]"
                }`;
              }}
              title="Receive"
            >
              <FiSend className="text-3xl" />
            </NavLink>
          </div>
          <div
            id="logout"
            className=" bg-red-600 hover:bg-red-500 p-2 rounded-lg"
            title="Logout"
            onClick={logOut}
          >
            <MdOutlineLogout className="text-3xl" />
          </div>
        </div>
        <div className={`${styles.content}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default dashboard;
