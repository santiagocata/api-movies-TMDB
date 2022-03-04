import { SimpleGrid } from "@chakra-ui/react";
import Card from "../commons/Card";


import React from "react";

export default function Grilla({ movies }) {
  return (
    <SimpleGrid minChildWidth="300px" spacing="30px">
      {movies.map((movie, i) => {
        return <Card key={i} movie={movie} />;
      })}
    </SimpleGrid>
  );
}
