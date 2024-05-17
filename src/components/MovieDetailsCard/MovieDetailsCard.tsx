import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { IMovieDetailsProps } from "./MovieDetails.types";

import classes from "./MovieDetailsCard.module.css";

const MovieDetailsCard = (props: IMovieDetailsProps) => {
  const { title, year, poster, type, isFavourite, imdbID } = props;

  return (
    <Card className={classes.movieCard}>
      <div className={classes.cardContainer}>
        <CardMedia
          component="img"
          height="140"
          image={poster !== "N/A" ? poster : "/Movie.jpg"}
          alt={title}
          className={classes.imageStyles}
        />

        <div
          className={classes.favouriteStyles}
          onClick={() =>
            isFavourite
              ? props.handleUnFavouriteClick(
                  imdbID,
                  props?.isFromFavourite ?? false
                )
              : props.handleFavouriteClick(imdbID)
          }
        >
          <img
            src={isFavourite ? "/heart-filled.svg" : "heart.svg"}
            alt="Favourite"
            className={classes.favourite}
          />
        </div>
      </div>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className={classes.movieCardTitle}
          title={title}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ cursor: "default" }}
        >
          Year: {year} | Type: {type}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieDetailsCard;
