import { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { MovieResponse, tvApi } from "../api";
import Loader from "../components/Loader";
import HorizontalList from "../components/HorizontalList";

const Tv: React.FC<NativeStackScreenProps<any, "TV">> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: todayIsLoading, data: todayData } =
    useQuery<MovieResponse>(["tv", "today"], tvApi.airingToday);
  const { isLoading: topIsLoading, data: topData } = useQuery<MovieResponse>(
    ["tv", "top"],
    tvApi.topRated
  );
  const { isLoading: trendingIsLoading, data: trendingData } =
    useQuery<MovieResponse>(["tv", "trending"], tvApi.trending);
  const loading = todayIsLoading || topIsLoading || trendingIsLoading;

  const onRefreshing = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 30 }}
      refreshControl={
        <RefreshControl onRefresh={onRefreshing} refreshing={refreshing} />
      }
    >
      {trendingData && (
        <HorizontalList title="Trending TV" data={trendingData.results} />
      )}
      {todayData && (
        <HorizontalList title="Airing Today" data={todayData.results} />
      )}
      {topData && (
        <HorizontalList title="Top Rated TV" data={topData.results} />
      )}
    </ScrollView>
  );
};

export default Tv;
