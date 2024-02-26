import React, { useState, useEffect, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";

interface Props {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Debounce function
  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Debounced search function
  const debouncedSearch = debounce(onSearch, 1000); // Adjust the delay as needed

  // Trigger search when searchTerm changes with debounce
  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  // Handle input change
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
