import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";

function MovieInfo({ movie, open, onClose }) {
  const { Title, Year, Plot } = movie;

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: 300,
            height: 200,
            borderRadius: "lg",
            p: 5,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            {Title} ({Year}) Details
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            {Plot}
          </Typography>
        </Sheet>
      </Modal>
    </>
  );
}

export default MovieInfo;
