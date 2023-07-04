import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";

import { moviesApi, tvApi } from "../api";
import Loader from "../components/Loader";
import HorizontalList from "../components/HorizontalList";

const Container = styled.View``;
const SearchBar = styled.TextInput`
  width: 90%;
  margin: 10px auto 50px;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: #fff;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesDate,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesApi.search, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvDate,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, {
    enabled: false,
  });
  const onChangeText = (text: string) => {
    setQuery(text);
  };
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTv();
  };
  console.log("mmmm", moviesLoading, moviesDate);
  console.log("tttt", tvLoading, tvDate);
  return (
    <Container>
      <SearchBar
        placeholder="Search form Movie or TV Show"
        placeholderTextColor="gray"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || (tvLoading && <Loader />)}
      {moviesDate && (
        <HorizontalList title="Movies Results" data={moviesDate.results} />
      )}
      {tvDate && <HorizontalList title="TV Results" data={tvDate.results} />}
    </Container>
  );
};

export default Search;
