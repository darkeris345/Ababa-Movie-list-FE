import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MovieInfo from "../MovieInfo/MovieInfo";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getFavouriteMovies } from "../../services/get";
import { updateData } from "../../services/updateUser";
import { deleteMovieFromFavorites } from "../../services/updateUser";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./MovieCard.scss";

function MovieCard({ movie, setUpdate }) {
  const { _id, Title, Year, Poster, Genre, Runtime } = movie;
  const { user } = useAuthContext();
  const userId = user?._id;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

  const handleFavourite = async () => {
    setIsFavourite(!isFavourite);

    try {
      if (isFavourite) {
        await deleteMovieFromFavorites(userId, _id);
        toast.warning("Movie removed from favorites");
        setUpdate((update) => update + 1);
      } else {
        await updateData(userId, { favouriteListes: _id });
        toast.success("Movie added to favorites");
        setUpdate((update) => update + 1);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  useEffect(() => {
    const checkFavouriteStatus = async () => {
      try {
        const response = await getFavouriteMovies(userId);
        const isMovieFavorite = response.some((movie) => movie._id === _id);
        setIsFavourite(isMovieFavorite);
      } catch (error) {
        console.error("Error checking favorites:", error);
      }
    };

    checkFavouriteStatus();
  }, [userId, _id]);

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
              sx={{ width: "50%", borderRadius: "10px", mr: 4 }}
              variant="contained"
              color="warning"
              onClick={toggleModal}
            >
              More Details
            </Button>

            {isFavourite ? (
              <FavoriteIcon
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
            ) : (
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
            )}
          </div>
        </CardContent>
      </Card>
      {isModalOpen && (
        <MovieInfo movie={movie} open={isModalOpen} onClose={toggleModal} />
      )}
    </>
  );
}

export default MovieCard;
