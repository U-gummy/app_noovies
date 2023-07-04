import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { Dimensions, FlatList } from "react-native";
import { useQuery, useQueryClient } from "react-query";

import Slide from "../components/Slide";
import HorizontalMedia from "../components/HorizontalMedia";
import { Movie, MovieResponse, moviesApi } from "../api";
import Loader from "../components/Loader";
import HorizontalList from "../components/HorizontalList";
import { useState } from "react";

const ListTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  padding: 0 20px;
`;

const ComingTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const { isLoading: upcomingLoading, data: upcomingData } =
    useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);

  const onRefreshing = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  return loading ? (
    <Loader />
  ) : (
    upcomingData && (
      <FlatList
        onRefresh={onRefreshing}
        refreshing={refreshing}
        ListHeaderComponent={
          <>
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
              {nowPlayingData?.results.map((movie: Movie) => (
                <Slide
                  key={movie.id}
                  movie={{
                    backdropPath: movie.backdrop_path || "",
                    posterPath: movie.poster_path || "",
                    originalTitle: movie.original_title,
                    overview: movie.overview,
                    voteAverage: movie.vote_average,
                  }}
                  fullData={movie}
                />
              ))}
            </Swiper>
            {trendingData && (
              <HorizontalList
                title="Trending Movies"
                data={trendingData.results}
              />
            )}
            <ComingTitle>Coming soon</ComingTitle>
          </>
        }
        data={upcomingData.results}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={HSeparator}
        renderItem={({ item }) => <HorizontalMedia movie={item} />}
      />
    )
  );
};
export default Movies;
