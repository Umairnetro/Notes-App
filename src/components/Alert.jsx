import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Alert = ({ message, onConfirm, onCancel }) => {
  const [visible, setVisible] = useState(true);
  const { setAlertMessage, noteToDelete, setNoteToDelete } = useAuth();
  const duration = noteToDelete ? 10000 : 3000;

  console.log(noteToDelete);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setAlertMessage(null);
      console.log(">>>>>>>>", visible);
    }, duration);
    return () => {
      clearTimeout(timer);
    };
  }, [duration, setAlertMessage, setVisible, setNoteToDelete]);

  return (
    <div
      className={` text-sm flex justify-between items-center text-gray-800 rounded-full bg-gray-50 dark:bg-[#2c4646] border border-gray-300 dark:text-gray-200 fixed left-1/2 -translate-x-1/2 top-5 z-30 ${
        noteToDelete ? "w-1/2 px-2 py-2" : "px-4 py-3"
      }`}
      role="alert"
    >
      <div>
        <span className={`font-medium ${noteToDelete ? "ml-3" : ""}`}>
          Note Alert:{" "}
        </span>
        {message}
      </div>
      {noteToDelete && (
        <div className="flex gap-1">
          <button
            className="rounded-full px-3 py-2 bg-red-500"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            className="rounded-full px-3 py-2 bg-[#1c2b2b]"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Alert;
