import { useEffect, useState } from "react";
import AddNotes from "../components/AddNotes";
import { useAuth } from "../context/AuthContext";
import NotesList from "../components/NotesList";
import Alert from "../components/Alert";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const Notes = () => {
  const {
    currentUser,
    confirm,
    setConfirm,
    noteToDelete,
    setNoteToDelete,
    alertMessage,
    setAlertMessage,
  } = useAuth() || "";
  const [editibleNote, setEditibleNote] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleDelete = (noteID) => {
    setNoteToDelete(noteID);
  };

  const handleEdit = (note) => {
    setEditibleNote(note);
    setShowPopup(true);
  };

  const handleCancel = () => {
    setConfirm(false);
    setNoteToDelete(null);
    setAlertMessage(null);
  };

  const handleConfirm = () => {
    setConfirm(true);
    console.log(alertMessage);
  };

  useEffect(() => {
    const deleteNote = async () => {
      if (noteToDelete){
        setAlertMessage("Are you sure you want to delete this note?");
      }
      try {
        if (confirm && noteToDelete) {
          const noteRef = doc(db, "notes", noteToDelete);
          await deleteDoc(noteRef);
          setConfirm(null)
          setNoteToDelete(null);
          setAlertMessage("Note deleted successfully!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    deleteNote();
  }, [confirm, noteToDelete]);

  return (
    <>
      {alertMessage && (
        <Alert
          message={alertMessage}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
      <AddNotes
        currentUser={currentUser}
        editingNote={editibleNote}
        setEditibleNote={setEditibleNote}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
      <NotesList
        currentUser={currentUser}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Notes;
