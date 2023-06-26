import React from "react";
import ImgMediaCard from "../../ui/ImgMediaCard";
import { useState } from "react";

function MeetupList(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {props.meetups.length === 0 ? (
        <h3>No Meetups to Show</h3>
      ) : (
        props.meetups.map((meetup) => (
          <ImgMediaCard cardprops={meetup} key={meetup.key} />
        ))
      )}
    </>
  );
}
export default MeetupList;
