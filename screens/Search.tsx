import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";

import { moviesApi, tvApi } from "../api";

const Container = styled.View``;
const SearchBar = styled.TextInput`
  width: 90%;
  margin: 10px auto;
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
    </Container>
  );
};

export default Search;
