import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import styles from "./AddNotes.module.css";
import { MdDelete } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const NotesList = ({ currentUser }) => {
  const [notes, setNotes] = useState([]);
  const { showLoader, setShowLoader } = useAuth();

  useEffect(() => {
    setShowLoader(true);
    if (!currentUser) return;

    const notesRef = collection(db, "notes");
    const q = query(
      notesRef,
      where("userId", "==", currentUser.uid),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const notesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(notesData);
        setShowLoader(false);
      },
      (error) => {
        console.log(error);
        setShowLoader(false);
      }
    );
    return () => unsubscribe();
  }, [currentUser]);


  return (
    <>
      <div className="flex justify-center items-start gap-4 mt-10 flex-wrap bg-[#30363b]">
        {notes.map((note) => {
          return (
            <>
              <div
                key={note.id}
                className={` ${styles.note} flex flex-col w-[20%] min-h-[200px] overflow-hidden border-2 border-red-400 rounded-md`}
              >
                <div className="px-3 py-1">
                  <h2 className="font-semibold text-2xl mb-1">{note.title}</h2>
                  <p className="text-ellipsis overflow-hidden">
                    {note.content}
                  </p>
                </div>
                <div className={`${styles.noteOptions}`}>
                  <button className="delete">
                    <MdDelete
                      className={"text-xl hover:text-red-500 duration-300"}
                      title="Delete"
                    />
                  </button>
                  <button className="share">
                    <FaShareSquare
                      className={"text-xl hover:text-[#5ba5a5] duration-300"}
                      title={"Share"}
                    />
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
      {/* {showLoader && <Loader />} */}
    </>
  );
};

export default NotesList;
