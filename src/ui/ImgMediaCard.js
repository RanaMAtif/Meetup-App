import * as React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase/firbaseConfig";

function ImgMediaCard({ cardprops }) {
  const refresh = () => window.location.reload(true);
  const [favButton, setFavButton] = React.useState(cardprops.like);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  console.log("Image card component executed");
  const onFavClick = (cardProp) => {
    setFavButton((preValue) => (cardProp.like = !preValue));

    const ref = doc(db, "meetuplist", cardProp.key);
    try {
      updateDoc(ref, cardProp);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = async (cardProp) => {
    try {
      const docRef = doc(db, "meetuplist", cardProp.key);
      await deleteDoc(docRef);
      refresh();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  const handleConfirmDelete = () => {
    handleDelete(cardprops);
    setOpenDeleteDialog(false);
  };

  const openConfirmationDialog = () => {
    setOpenDeleteDialog(true);
  };

  const closeConfirmationDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <Card sx={{ margin: "12px 0" }}>
      <CardMedia component="img" alt="Media Card" image={cardprops.image} />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {cardprops.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {cardprops.address}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {cardprops.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          color="secondary"
          aria-label="add an alarm"
          size="large"
          onClick={() => onFavClick(cardprops)}
        >
          {!favButton ? (
            <FavoriteBorderIcon fontSize="large" />
          ) : (
            <FavoriteIcon fontSize="large" />
          )}
        </IconButton>
        <IconButton
          color="secondary"
          aria-label="delete"
          size="large"
          onClick={openConfirmationDialog}
        >
          <DeleteIcon fontSize="medium" style={{ color: "red" }} />
        </IconButton>
      </CardActions>
      <Dialog
        open={openDeleteDialog}
        onClose={closeConfirmationDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Meetup?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this meetup?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmationDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
export default ImgMediaCard;
