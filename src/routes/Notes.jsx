import { useState } from "react";
import AddNotes from "../components/AddNotes";
import { useAuth } from "../context/AuthContext";
import NotesList from "../components/NotesList";

const Notes = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <AddNotes currentUser={currentUser}/>
      <NotesList currentUser={currentUser} />
    </>
  );
};

export default Notes;
