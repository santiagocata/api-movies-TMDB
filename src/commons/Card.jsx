import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Link
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import React, { useContext } from "react";
import { Link as Linked } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface RatingProps {
  rating: number;
  numReviews: number;
}

function Rating({ rating, numReviews }: RatingProps) {
  return (
    <Box d="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
}
function Card({ movie }) {
  const data = {
    isNew:
      movie.release_date && movie.release_date.slice(0, 4) === "2022"
        ? true
        : false,
    imageURL:
      movie.poster_path &&
      `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
    name: movie.title,
    rating: movie.vote_average / 2,
    numReviews: movie.vote_count,
  };

  const { user, setUser } = useContext(UserContext);
  let navigate = useNavigate();

  const handleFavorites = function (e) {
    user.id
      ? axios.put("/api/users/toggleFavorite", { movie }).then((user) => {
          setUser(user.data);
        })
      : navigate("/signup");
  };

  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        _hover={{ w: "xs" }}
      >
        {data.isNew && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
          />
        )}

        <Linked to={`/movie/${movie.id}`}>
          <Image
            src={data.imageURL}
            alt={`Picture of ${data.name}`}
            roundedTop="lg"
          />
        </Linked>

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {data.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                PREMIERE
              </Badge>
            )}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="l"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {data.name.length > 17
                ? data.name.slice(0, 17).concat("...")
                : data.name}
            </Box>
            <Tooltip
              label={
                user.favorites && user.favorites.includes(movie.id)
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
              bg="white"
              placement={"top"}
              color={"gray.800"}
              fontSize={"1.2em"}
            >
              <chakra.a
                display={"flex"}
                _hover={{ color: "blue", stroke: "blue" }}
              >
                  <Icon
                    as={
                      user.favorites && user.favorites.includes(movie.id)
                        ? IoIosHeart
                        : IoIosHeartEmpty
                    }
                    h={7}
                    w={7}
                    alignSelf={"center"}
                    onClick={handleFavorites}
                    _hover={{ color: "pink", stroke: "pink" }}
                  />
              </chakra.a>
            </Tooltip>
          </Flex>
          <Flex justifyContent="space-between" alignContent="center">
            <Rating rating={data.rating} numReviews={data.numReviews} />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default Card;
