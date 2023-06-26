import NewMeetupmuiform from "../components/meetups/NewMeetupmuiform";
import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase/firbaseConfig";
import { toast } from "react-toastify";

function NewMeetupPage() {
  function addMeetupHandler(meetupData) {
    const ref = collection(db, "meetuplist");
    try {
      addDoc(ref, meetupData);
      toast.success("Meetup added successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (e) {
      console.log(e);
      toast.danger("Meetup Failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupmuiform onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;
