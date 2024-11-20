import { useState } from "react";
import styles from "./Notes.module.css";

const Notes = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <div
        className={`${styles.noteContainer} flex justify-center w-full pt-10`}
      >
        <p
          className={` bg-gray-400 border-2 text-gray-700 w-1/2 px-5 py-3 rounded-full cursor-pointer`}
          onClick={handlePopup}
        >
          Take a note...
        </p>
      </div>
      {showPopup && (
        <div className={`${styles.popUp} flex justify-center items-center`}>
          <div
            className={`${styles.addNote} bg-[#222426] border-2 border-white rounded-lg p-5 flex flex-col gap-4 w-1/2`}
          >
            <input
              type="text"
              placeholder="Heading"
              className="bg-transparent outline-none text-3xl placeholder:font-bold font-bold"
            />
            <textarea
              id=""
              placeholder="Write your Content here..."
              className="bg-transparent outline-none resize-none"
              rows={7}
            ></textarea>
            <div className={`btn-group flex justify-end gap-2`}>
              <button className="px-4 py-1 rounded-md bg-[#2c4646]">Add</button>
              <button className="px-4 py-1 rounded-md bg-[#2c4646]" onClick={()=>{setShowPopup(false)}}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;
