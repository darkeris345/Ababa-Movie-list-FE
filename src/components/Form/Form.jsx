import Modal from "@mui/joy/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { postMovie } from "../../services/postMovie";
import { updateMovie } from "../../services/updateMovie";
import { toast } from "react-toastify";
import "./Form.scss";

function Form({ isOpen, onClose, setUpdate, movieDetails }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (movieDetails) {
        await updateMovie(movieDetails._id, data);
        toast.success("Movie updated successfully");
        setUpdate((update) => update + 1);
        onClose();
        reset();
      } else {
        await postMovie(data);
        onClose();
        toast.success("Movie added successfully");
        setUpdate((update) => update + 1);
        reset();
        return;
      }
    } catch (error) {
      toast.error("Error adding or updating movie");
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "30px",
          borderRadius: "10px",
          backgroundColor: "white",
          maxWidth: "350px",
          top: "20%",
          margin: "0 auto",
        }}
      >
        <div className="formHeader">
          <Typography variant="h5">Add Movie</Typography>

          <CloseIcon
            onClick={onClose}
            sx={{
              cursor: "pointer",
              color: "black",
              fontSize: "30px",
              "&:hover": {
                color: "red",
              },
            }}
          />
        </div>

        <form className="formBox" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            sx={{ mb: 2, width: "100%" }}
            label="Title"
            type="text"
            placeholder="Title"
            defaultValue={movieDetails?.Title}
            {...register("Title", { required: "Title is required" })}
            error={!!errors.Title}
            helperText={errors.Title?.message}
          />

          <TextField
            sx={{ mb: 2, width: "100%" }}
            label="Year"
            type="number"
            placeholder="Year"
            defaultValue={movieDetails?.Year}
            {...register("Year", {
              required: "Year is required",
              max: {
                value: 2024,
                message: "Year cannot be greater than 2024",
              },
              min: { value: 1960, message: "Year cannot be less than 1960" },
            })}
            error={!!errors.Year}
            helperText={errors.Year?.message}
          />

          <TextField
            sx={{ mb: 2, width: "100%" }}
            label="Runtime"
            type="number"
            placeholder="Runtime"
            defaultValue={movieDetails?.Runtime}
            {...register("Runtime", {
              required: "Runtime is required",
              max: {
                value: 300,
                message: "Runtime cannot be greater than 300 minutes",
              },
              min: {
                value: 40,
                message: "Runtime cannot be less than 40 minutes",
              },
            })}
            error={!!errors.Runtime}
            helperText={errors.Runtime?.message}
          />

          <TextField
            sx={{ mb: 2, width: "100%" }}
            label="Genre"
            type="text"
            placeholder="Genre"
            defaultValue={movieDetails?.Genre}
            {...register("Genre", { required: "Genre is required" })}
            error={!!errors.Genre}
            helperText={errors.Genre?.message}
          />

          <TextField
            sx={{ mb: 2, width: "100%" }}
            label="Plot"
            type="text"
            placeholder="Plot"
            defaultValue={movieDetails?.Plot}
            {...register("Plot", { required: "Plot is required", min: 20 })}
            error={!!errors.Plot}
            helperText={errors.Plot?.message}
          />

          <TextField
            sx={{ mb: 2, width: "100%" }}
            label="Poster url"
            type="text"
            placeholder="Poster url"
            defaultValue={movieDetails?.Poster}
            {...register("Poster", { required: "Poster is required" })}
            error={!!errors.Poster}
            helperText={errors.Poster?.message}
          />

          <Button
            type="submit"
            variant="contained"
            color="warning"
            sx={{ width: "100%" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default Form;
