import { useState } from "react";
import Button from "@mui/material/Button";
import Form from "../Form/Form";

function AddMovie({ setUpdate }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModal = (isOpen) => {
    setModalOpen(isOpen);
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        size="large"
        onClick={() => handleModal(true)}
      >
        Add Movie
      </Button>

      <Form
        isOpen={isModalOpen}
        onClose={() => handleModal(false)}
        setUpdate={setUpdate}
      />
    </>
  );
}

export default AddMovie;
