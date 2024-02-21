import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MovieInfo from "../MovieInfo/MovieInfo";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./MovieCard.scss";

function MovieCard({ movie }) {
  const { Title, Year, Poster, Genre, Runtime } = movie;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
    
  };

  return (
    <>
      <Card
        sx={{ maxWidth: 320, m: 3, display: "inline-block", minHeight: 700 }}
      >
        <CardMedia
          component="img"
          height="500"
          image={Poster}
          alt={`${Title} Poster`}
          sx={{}}
          loading="lazy"
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            gap: 1,
            justifyContent: "space-between",
            minHeight: 200,
          }}
        >
          <Typography
            gutterBottom
            color="text.primary"
            sx={{ fontWeight: "bold", height: 50 }}
            variant="h6"
            component="div"
          >
            {Title} ({Year})
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Genre: {Genre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Runtime: {Runtime} min
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Button
              sx={{ width: "50%", borderRadius: "12px", mr: 4 }}
              variant="contained"
              color="warning"
              onClick={handleOpenModal}
            >
              More Details
            </Button>

            <FavoriteBorderIcon
              sx={{
                color: "red",
                ml: 2,
                cursor: "pointer",
                mt: 1,
                fontSize: 36,
                "&:hover": {
                  color: "purple",
                  transform: "scale(1.1)",
                  transition: "all 0.3s ease",
                },
              }}
              onClick={handleFavourite}
            />
          </div>
        </CardContent>
      </Card>
      {isModalOpen && (
        <MovieInfo
          movie={movie}
          open={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default MovieCard;
