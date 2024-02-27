import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Modal from "@mui/joy/Modal";
import Button from "@mui/joy/Button";
import { deleteMovie } from "../../services/deleteMovie";
import { useState } from "react";
import { toast } from "react-toastify";
import Form from "../Form/Form";
function AdminMovieButtons({ movie, setUpdate }) {
  const { _id, Title, Year, Poster, Genre, Runtime, Plot } = movie;
  const [open, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedMovie, setEditedMovie] = useState({
    _id: _id,
    Title: Title,
    Year: Year,
    Poster: Poster,
    Genre: Genre,
    Runtime: Runtime,
    Plot: Plot,
  });

  const handleModal = (isOpen) => {
    setModalOpen(isOpen);
  };

  const handleDelete = async (_id) => {
    try {
      await deleteMovie(_id);
      setOpen(false);
      toast.success("Movie deleted successfully");
      setUpdate((update) => update + 1);
    } catch (error) {
      toast.error("Error deleting movie");
    }
  };

  return (
    <>
      <EditNoteIcon
        sx={{
          color: "red",
          ml: 2,
          cursor: "pointer",
          fontSize: 36,
          "&:hover": {
            color: "purple",
            transform: "scale(1.1)",
            transition: "all 0.3s ease",
          },
        }}
        onClick={() => {
          setEditedMovie({
            _id,
            Title,
            Year,
            Poster,
            Genre,
            Plot,
            Runtime,
          });
          handleModal(true);
        }}
      />
      <DeleteForeverIcon
        sx={{
          color: "red",
          ml: 2,
          cursor: "pointer",
          fontSize: 36,
          "&:hover": {
            color: "purple",
            transform: "scale(1.1)",
            transition: "all 0.3s ease",
          },
        }}
        onClick={() => setOpen(true)}
      />

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div
          style={{
            top: "20%",
            position: "absolute",
            width: "100%",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "10px 10px 20px #ccc",
              width: "300px",
              margin: "auto",
            }}
          >
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this movie?</p>
            <Button
              color="danger"
              variant="soft"
              onClick={() => handleDelete(_id)}
              sx={{ mr: 2, fontWeight: "bold", borderRadius: "10px" }}
            >
              Yes
            </Button>
            <Button
              color="success"
              variant="soft"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
      <Form
        isOpen={isModalOpen}
        onClose={() => handleModal(false)}
        setUpdate={setUpdate}
        movieDetails={editedMovie}
      />
    </>
  );
}

export default AdminMovieButtons;
