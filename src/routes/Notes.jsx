import { useState } from "react";
import AddNotes from "../components/AddNotes";
import { useAuth } from "../context/AuthContext";
import NotesList from "../components/NotesList";

const Notes = () => {
  const { currentUser } = useAuth();
  const [editibleNote, setEditibleNote] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleEdit = (note) => {
    setEditibleNote(note);
    setShowPopup(true);
  };

  return (
    <>
      <AddNotes
        currentUser={currentUser}
        editingNote={editibleNote}
        setEditibleNote={setEditibleNote}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
      <NotesList currentUser={currentUser} onEdit={handleEdit} />
    </>
  );
};

export default Notes;
