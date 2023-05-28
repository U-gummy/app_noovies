import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions } from "react-native";

import Slide from "../components/Slide";
import Poster from "../components/Poster";

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  padding: 0 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  margin-right: 10px;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 12px;
  color: #fff;
  margin-top: 7px;
  font-weight: 600;
`;

const Votes = styled.Text`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 5px;
`;

const HMovie = styled.View`
  padding: 0 30px;
  margin-bottom: 20px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 70%;
`;

const Overview = styled.Text`
  margin-top: 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
`;

const Release = styled.Text`
  margin-top: 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
`;

const ComingTitle = styled(ListTitle)`
  margin-bottom: 20px;
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
        containerStyle={{
          width: "100%",
          height: SCREEN_HEIGHT / 4,
          marginBottom: 20,
        }}
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

      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll
          horizontal
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
          showsHorizontalScrollIndicator={false}
        >
          {trending.map((movie: any) => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title>
                {movie.original_title.slice(0, 13)}
                {movie.original_title.length > 13 && "..."}
              </Title>
              <Votes>⭐️ {movie.vote_average}</Votes>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ComingTitle>Coming soon</ComingTitle>
      {upcoming.map((movie: any) => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title>{movie.original_title}</Title>
            <Release>
              {new Date(movie.release_date).toLocaleDateString("ko")}
            </Release>
            <Overview>
              {movie.overview.slice(0, 120)}
              {movie.overview.length > 120 && "..."}
            </Overview>
          </HColumn>
        </HMovie>
      ))}
    </Container>
  );
};
export default Movies;
