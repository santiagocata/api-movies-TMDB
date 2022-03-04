import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useParams } from "react-router";
import axios from "axios";

import React, { useEffect, useState, useContext } from "react";

import { UserContext } from "../contexts/UserContext";

export default function Detail() {
  const { id } = useParams();

  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios.get(`/api/movies/${id}`).then((res) => {
      setMovie(res.data);
    });
  }, [id]);

  const { user, setUser } = useContext(UserContext);

  const handleFavorites = function () {
    axios.put("/api/users/toggleFavorite", { movie }).then((user) => {
      setUser(user.data);
    });
  };

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"xl"}
            alt={"product image"}
            src={
              movie.poster_path &&
              `https://image.tmdb.org/t/p/original/${movie.poster_path}`
            }
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "50%", lg: "100%" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {movie.original_title}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              {movie.production_companies && movie.production_companies[0].name}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                {movie.tagline}
              </Text>
              <Text fontSize={"lg"}>{movie.overview}</Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                GENRES
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  {movie.genres &&
                    movie.genres.map((genre, i) => {
                      return <ListItem key={i}>{genre.name}</ListItem>;
                    })}
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Movie Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Release date:
                  </Text>{" "}
                  {movie.release_date}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Language:
                  </Text>{" "}
                  {movie.spoken_languages && movie.spoken_languages[0].name}
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            onClick={handleFavorites}
            rounded={"lg"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              boxShadow: "lg",
            }}
          >
            {user.favorites && user.favorites.includes(movie.id)
              ? "Remove from favorites"
              : "Add to favorites"}
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
