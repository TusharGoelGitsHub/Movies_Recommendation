export interface IMovieDetailsProps {
  title: string;
  year: string;
  imdbID: string;
  type: string;
  poster: string;
  isFavourite: boolean;
  handleFavouriteClick: (id: string) => void;
  handleUnFavouriteClick: (id: string, isFromFav: boolean) => void;
  isFromFavourite?: boolean;
}
