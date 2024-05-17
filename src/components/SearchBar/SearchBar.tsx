import React, { useState, useEffect, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";

interface Props {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = debounce(onSearch, 1000);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleInputChange}
        style={{ width: "100%", marginBottom: 100 }}
      />
    </div>
  );
};

export default SearchBar;
