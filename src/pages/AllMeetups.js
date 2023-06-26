import { useState, useEffect, useContext } from "react";
import React from "react";
import MeetupList from "../components/meetups/MeetupList";
import { AllMeetupConext } from "../contexts/AllMeetupConext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firbaseConfig";

function AllMeetupsPage() {
  const fetchMeetupList = async () => {
    const docRef = collection(db, "meetuplist");
    const querySnapshot = await getDocs(docRef);
    const meetups = [];
    querySnapshot.forEach((doc) => {
      console.log(doc?.id, " => ", doc.data());
      const key = doc?.id;

      const meetup = {
        key,
        ...doc.data(),
      };

      meetups.push(meetup);
    });
    console.log(meetups);
    setLoadedMeetups(meetups);
  };

  const { value1, value2 } = useContext(AllMeetupConext);
  const [loadedMeetups, setLoadedMeetups] = value1;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetchMeetupList();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}

export default AllMeetupsPage;
