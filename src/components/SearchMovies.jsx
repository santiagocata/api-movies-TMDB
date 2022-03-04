import { Stack, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

import { useInput } from "../hooks/useInput";
import axios from "axios";

import { MoviesContext } from "../contexts/MoviesContext";
import { useContext } from "react";

export default function SearchMovies() {
  const search = useInput();
  const { setMovies } = useContext(MoviesContext);

  const handleSearch = function (e) {
    if (e.key === "Enter") {
      const tmdbAPI = "https://api.themoviedb.org/3";
      const key = "?api_key=150f8c450574e64a44aeb30c4268fb92";
      axios
        .get(`${tmdbAPI}/search/movie${key}&query=${search.value}&page=1`)
        .then((response) => {
          setMovies(response.data.results);
          search.onChange({ target: { value: "" } });
        });
    }
  };

  return (
    <Stack
      flex={{ base: 1, md: 1 }}
      justify={"flex-end"}
      direction={"row"}
      pr={6}
      pl={6}
    >
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="tel"
          placeholder="Search by name"
          onKeyDown={handleSearch}
          {...search}
        />
      </InputGroup>
    </Stack>
  );
}
