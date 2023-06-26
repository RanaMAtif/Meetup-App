import PhoneIcon from "@mui/icons-material/Phone";
import { Tooltip } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { Container } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardMedia, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import { db } from "../Firebase/firbaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneOutlineTwoToneIcon from "@mui/icons-material/DoneOutlineTwoTone";

var userData = {
  fName: "",
  lName: "",
  email: "",
  phoneNo: "",
  address: "",
  dob: "",
  gender: "",
};
const ModalContent = styled("div")({
  backgroundColor: "#fff",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  padding: "16px",
  outline: "none",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const ButtonContainer = styled("div")({
  display: "flex",
  gap: "10px",
});

function ProfileCard() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [profiledata, setprofile] = useState([]);
  const { getUser } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const FetchUserData = async () => {
    const ref = await doc(db, "users", getUser().uid);
    const userdata = await getDoc(ref);

    userData = {
      fName: userdata.data().fName,
      lName: userdata.data().lName,
      email: userdata.data().email,
      phoneNo: userdata.data().phoneNo,
      address: userdata.data().address,
      dob: userdata.data().dob,
      gender: userdata.data().gender,
      image: userdata.data().image,
    };

    console.log("profile card" + userData.fName);

    setprofile(userData);
  };

  useEffect(() => {
    FetchUserData();
  }, []);

  const handleAvatarClick = () => {
    setSelectedImage(userData.image);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleUploadPhoto = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const imageUrl = e.target.result;
        setSelectedImage(imageUrl);

        const userRef = doc(db, "users", getUser().uid);
        await updateDoc(userRef, { image: imageUrl });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    window.location.reload();
  };
  const handleCancel = () => {
    handleModalClose();
  };
  return (
    <Container maxWidth="xs">
      <Card
        variant="outlined"
        sx={{ borderRadius: 5 }}
        component={Paper}
        elevation={6}
        square
      >
        <CardContent>
          <CardMedia align="center">
            <label htmlFor="avatar-upload">
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  cursor: "pointer",
                }}
              >
                <Tooltip title="Click to Add a New Photo">
                  <Avatar
                    alt={`${userData.fName} ${userData.lName}`}
                    src={userData.image}
                    sx={{ width: 80, height: 80 }}
                    onClick={handleAvatarClick}
                  />
                </Tooltip>
              </div>
            </label>
          </CardMedia>

          <Typography
            sx={{ fontSize: 30 }}
            color="text.secondary"
            variant="subtitle1"
            align="center"
          >
            {userData.fName} {userData.lName}
          </Typography>

          <Typography
            sx={{ fontSize: 20 }}
            color="text.secondary"
            variant="subtitle1"
            align="center"
            gutterBottom
          >
            <AlternateEmailIcon fontSize="small" /> {getUser().email}
          </Typography>

          <Typography
            sx={{ fontSize: 20 }}
            color="text.secondary"
            variant="subtitle1"
            align="center"
            gutterBottom
          >
            <PhoneIcon fontSize="small" /> {userData.phoneNo}
          </Typography>

          <Typography
            sx={{ fontSize: 20 }}
            color="text.secondary"
            variant="subtitle1"
            align="center"
            gutterBottom
          >
            <LocationOnIcon fontSize="medium" /> {userData.address}
          </Typography>
        </CardContent>
      </Card>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <ModalContent>
          <Typography variant="h5" component="div" id="modal-title">
            Profile Photo
          </Typography>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <CardMedia
              component="img"
              src={selectedImage}
              alt="Profile Image"
              style={{ marginBottom: "10px" }}
            />
          </div>
          <ButtonContainer>
            <Tooltip title="Add Photo">
              <IconButton
                color="primary"
                component="label"
                sx={{
                  marginTop: "10px",
                  backgroundColor: "transparent",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  "& .MuiIconButton-root": {
                    fontSize: "10rem",
                    color: "#000",
                  },
                }}
              >
                <AddPhotoAlternateIcon
                  style={{ fontSize: " 2rem", color: "blue" }}
                />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleUploadPhoto}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Done">
              <IconButton
                color="primary"
                component="label"
                sx={{
                  marginTop: "10px",
                  backgroundColor: "transparent",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                }}
                onClick={handleUpdate}
              >
                <DoneOutlineTwoToneIcon
                  style={{ fontSize: "2rem", color: "green" }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Cancel">
              <IconButton
                color="primary"
                component="label"
                sx={{
                  marginTop: "10px",
                  backgroundColor: "transparent",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                }}
                onClick={handleCancel}
              >
                <CancelIcon style={{ fontSize: "2rem", color: "red" }} />
              </IconButton>
            </Tooltip>
          </ButtonContainer>
        </ModalContent>
      </Modal>
    </Container>
  );
}
export default ProfileCard;
