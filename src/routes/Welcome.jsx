import React from "react";
import { useAuth } from "../context/AuthContext";

const Welcome = () => {
  const { username } = useAuth();
  
  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1 className="text-5xl font-semibold">Welcome {username || 'to dashboard'}</h1>
    </div>
  );
};

export default Welcome;
