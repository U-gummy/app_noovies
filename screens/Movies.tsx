import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions } from "react-native";

import Slide from "../components/Slide";

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const API_KEY = "660b23621fced3d4e50247c34d107d94";

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();

    setTrending(results);
  };

  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setUpcoming(results);
  };

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();

    setNowPlaying(results);
  };

  const getData = async () => {
    await Promise.all([getTrending(), getNowPlaying(), getUpcoming()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={4}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie: any) => (
          <Slide
            key={movie.id}
            movie={{
              backdropPath: movie.backdrop_path,
              posterPath: movie.poster_path,
              originalTitle: movie.original_title,
              overview: movie.overview,
              voteAverage: movie.voteAverage,
            }}
          />
        ))}
      </Swiper>
    </Container>
  );
};
export default Movies;
