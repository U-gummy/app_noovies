import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import { useQuery, useQueryClient } from "react-query";

import Slide from "../components/Slide";
import VerticalMedia from "../components/VerticalMedia";
import HorizontalMedia from "../components/HorizontalMedia";
import { moviesApi } from "../api";

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

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ComingTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const VSeparator = styled.View`
  width: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchNowPlaying,
  } = useQuery(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchUpcoming,
  } = useQuery(["movies", "upcoming"], moviesApi.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchTrending,
  } = useQuery(["movies", "trending"], moviesApi.trending);

  const onRefreshing = () => {
    queryClient.refetchQueries(["movies"]);
  };

  const renderVMedia = ({ item }: { item: any }) => (
    <VerticalMedia movie={item} />
  );

  const renderHMedia = ({ item }: { item: any }) => (
    <HorizontalMedia movie={item} />
  );

  const movieKeyExtractor = (item: any) => String(item.id);
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchNowPlaying || isRefetchUpcoming || isRefetchTrending;
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
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
            {nowPlayingData.results.map((movie: any) => (
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
              data={trendingData.results}
              horizontal
              keyExtractor={movieKeyExtractor}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              ItemSeparatorComponent={VSeparator}
              showsHorizontalScrollIndicator={false}
              renderItem={renderVMedia}
            />
          </ListContainer>
          <ComingTitle>Coming soon</ComingTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
    />
  );
};
export default Movies;
