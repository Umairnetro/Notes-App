import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import styles from "./AddNotes.module.css";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

const AddNotes = ({
  currentUser,
  editingNote,
  setEditibleNote,
  showPopup,
  setShowPopup,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { showLoader, setShowLoader } = useAuth();

  console.log(editingNote, Boolean(editingNote));

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setShowPopup(true);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleAddNote = async () => {
    setShowLoader(true);
    if (!currentUser) {
      alert("Please login to add notes.");
      return;
    }

    try {
      console.log("LET ME IN =====");
      console.log("=====", Boolean(title), Boolean(content));
      if (!title || !content) {
        console.log("=====", Boolean(title), Boolean(content));
        alert("Please enter title and content.");
        return;

        setShowLoader(false);
      }

      if (editingNote) {
        const noteRef = doc(db, "notes", editingNote.id);
        console.log({ noteRef });

        await updateDoc(noteRef, {
          title,
          content,
          Timestamp: Timestamp.now(),
        });
      } else {
        await addDoc(collection(db, "notes"), {
          title,
          content,
          userId: currentUser.uid,
          timestamp: Timestamp.now(),
        });
        console.log("Note added successfully!");
      }
    } catch (error) {
      console.log("Error adding note:", error);
    } finally {
      setShowLoader(false);
    }
  };

  const handleClose = () => {
    setShowPopup(false);
    setEditibleNote(null);
  };

  return (
    <>
      <div
        className={`${styles.noteContainer} flex justify-center w-full pt-10`}
        onClick={handlePopup}
      >
        {!editingNote && (
          <p
            className={`bg-gray-400 border-2 text-gray-700 w-1/2 px-5 py-3 rounded-full cursor-pointer`}
          >
            Take a note...
          </p>
        )}
      </div>
      {showPopup && (
        <div
          className={`${styles.popUp} flex justify-center items-center z-20`}
        >
          <div
            className={`${styles.addNote} bg-[#222426] border-2 border-white rounded-lg p-5 flex flex-col gap-4 w-1/2`}
          >
            <input
              type="text"
              placeholder="Heading"
              className="bg-transparent outline-none text-3xl placeholder:font-bold font-bold"
              onChange={(e) => {
                setTitle(e.target.value);
                console.log(title);
              }}
              value={title}
            />
            <textarea
              id=""
              placeholder="Write your Content here..."
              className="bg-transparent outline-none resize-none"
              rows={7}
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
            <div className={`btn-group flex justify-end gap-2`}>
              <button
                className="px-4 py-1 rounded-md bg-[#2c4646]"
                onClick={handleAddNote}
              >
                Add
              </button>
              <button
                className="px-4 py-1 rounded-md bg-[#2c4646]"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showLoader && <Loader />}
    </>
  );
};

export default AddNotes;
