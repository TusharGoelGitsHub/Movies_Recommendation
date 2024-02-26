import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import MovieDetailsCard from "../components/MovieDetailsCard/MovieDetailsCard";
import CircularProgress from "@mui/material/CircularProgress";
import { IMovieDetailsProps } from "../components/MovieDetailsCard/MovieDetails.types";
import classes from "../components/MovieDetailsCard/MovieDetailsCard.module.css";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<IMovieDetailsProps[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState<{
    [key: string]: IMovieDetailsProps;
  }>({});
  const [searchErrorMessage, setSearchErrorMessage] = useState("");

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (searchTerm.length >= 3) {
      // Check if search term is at least 3 characters long
      setLoading(true);
      const timeoutId = setTimeout(() => {
        fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=8b22c574`)
          .then((response) => response.json())
          .then((data) => {
            if (data.Search) {
              setSearchResults(data.Search);
            } else {
              setSearchResults([]);
            }
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setSearchResults([]);
            setLoading(false);
          });
      }, 500);
      setTypingTimeout(timeoutId);
    } else {
      setSearchResults([]);
      setLoading(false);
      setSearchErrorMessage("Type at least 3 characters");
    }
  }, [searchTerm]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setSearchErrorMessage(""); // Clear error message when search term changes
  };

  const handleFavouriteClick = (id: string) => {
    const updatedData: IMovieDetailsProps[] = searchResults.filter(
      (result) => result.imdbID === id
    );
    setIsFavourite({ ...isFavourite, [id]: updatedData[0] });
  };

  const handleUnFavouriteClick = (id: string, isFromFavourite: boolean) => {
    if (isFromFavourite) {
      const { [id]: removedFavourite, ...updatedFavourites } = isFavourite;
      setIsFavourite(updatedFavourites);
    } else {
      let updatedData = searchResults.filter((result) => {
        return result.imdbID === id;
      });
      updatedData = Object.values(isFavourite).filter((val) => {
        return val.imdbID !== updatedData[0].imdbID;
      });

      const updatedFavourites: { [key: string]: IMovieDetailsProps } = {};
      for (const movie of updatedData) {
        updatedFavourites[movie.imdbID] = movie;
      }

      setIsFavourite(updatedFavourites);
    }
  };

  return (
    <div className={classes.container}>
      <h1>🔍 Exploring Movie Magic 🔍</h1>
      <SearchBar onSearch={handleSearch} />
      {searchErrorMessage && (
        <div className={classes.errorMessage}>{searchErrorMessage}</div>
      )}
      {loading ? (
        <CircularProgress />
      ) : searchResults?.length > 0 ? (
        <div className={classes.result}>
          {searchResults.map((movie: any, index: number) => (
            <MovieDetailsCard
              key={index}
              title={movie.Title}
              year={movie.Year}
              imdbID={movie.imdbID}
              type={movie.Type}
              poster={movie.Poster}
              isFavourite={isFavourite[movie.imdbID] ? true : false}
              handleFavouriteClick={handleFavouriteClick}
              handleUnFavouriteClick={handleUnFavouriteClick}
            />
          ))}
        </div>
      ) : (
        <div className={classes.noResult}>
          OOPS, Let's try to search for more movies!
        </div>
      )}
      {!!Object.values(isFavourite).length && (
        <div>
          <h2>Favourite Movies</h2>
          <div className={classes.result}>
            {Object.values(isFavourite).map((movie: any, index: number) => (
              <MovieDetailsCard
                key={index}
                title={movie.Title}
                year={movie.Year}
                imdbID={movie.imdbID}
                type={movie.Type}
                poster={movie.Poster}
                isFavourite={true}
                handleFavouriteClick={handleFavouriteClick}
                handleUnFavouriteClick={handleUnFavouriteClick}
                isFromFavourite
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
