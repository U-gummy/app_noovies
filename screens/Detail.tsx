import { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

import { Movie } from "../api";
import Poster from "../components/Poster";
import { makeImagePath } from "../utils";
import { COLORS } from "../colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;
const Background = styled.Image``;
const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;
const Title = styled.Text`
  color: #fff;
  font-size: 35px;

  margin-left: 15px;
  align-self: flex-end;
  font-weight: 500;
`;
const Overview = styled.Text`
  color: ${({ theme }) => theme.textColor};
  margin-top: 20px;
  padding: 0 20px;
`;

type RootStackParamList = {
  Detail: Movie;
};
type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const title = params.original_title ?? params.original_name;
  useEffect(() => {
    setOptions({ title: "original_title" in params ? "Movie" : "TV Show" });
  }, []);
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImagePath(params.backdrop_path || "") }}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", COLORS.black]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>{title}</Title>
        </Column>
      </Header>
      <Overview>{params.overview}</Overview>
    </Container>
  );
};

export default Detail;
