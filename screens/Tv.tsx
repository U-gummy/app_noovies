import { RefreshControl, ScrollView } from "react-native";
import { useQuery, useQueryClient } from "react-query";

import { tvApi } from "../api";
import Loader from "../components/Loader";
import HorizontalList from "../components/HorizontalList";

const Tv = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: todayIsLoading,
    data: todayData,
    isRefetching: isRefetchingToday,
  } = useQuery(["tv", "today"], tvApi.airingToday);
  const {
    isLoading: topIsLoading,
    data: topData,
    isRefetching: isRefetchingTop,
  } = useQuery(["tv", "top"], tvApi.topRated);
  const {
    isLoading: trendingIsLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery(["tv", "trending"], tvApi.trending);
  const loading = todayIsLoading || topIsLoading || trendingIsLoading;

  const onRefreshing = () => {
    queryClient.refetchQueries(["tv"]);
  };
  const refreshing =
    isRefetchingToday || isRefetchingTop || isRefetchingTrending;

  console.log("refreshing: ", refreshing);
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
      <HorizontalList title="Trending TV" data={trendingData.results} />
      <HorizontalList title="Airing Today" data={todayData.results} />
      <HorizontalList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
};

export default Tv;
