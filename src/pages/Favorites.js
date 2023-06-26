import React from "react";
import { useState, useEffect, useContext } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { AllMeetupConext } from "../contexts/AllMeetupConext";

function FavoritesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { value1, value2 } = useContext(AllMeetupConext);
  const [loadedMeetups, setLoadedMeetups] = value1;
  const [meetupsdata, setmeetupsdata] = useState([]);

  useEffect(() => {
    setIsLoading(false);
    const meetups = [];

    loadedMeetups.map((loadedmeetupcards) => {
      if (loadedmeetupcards?.like === true) {
        meetups.push(loadedmeetupcards);
      }

      setmeetupsdata(meetups);
      setIsLoading(false);
    });
  }, []);
  console.log("Favorite.js use effect used");

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Favorites</h1>
      <MeetupList meetups={meetupsdata} />
    </section>
  );
}

export default FavoritesPage;
