import styled from "styled-components/native";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";

import { makeImagePath } from "../utils";
import Poster from "./Poster";
import { Movie } from "../api";

const Item = styled.View`
  flex: 1;
`;

const BackgroundImage = styled.Image``;

const Wrapper = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text<{ isDark: boolean }>`
  color: ${({ isDark, theme }) => (isDark ? "#fff" : theme.textColor)};
  font-size: 20px;
  font-weight: 600;
`;

const Column = styled.View`
  width: 50%;
  margin-left: 30px;
`;

const Overview = styled.Text<{ isDark: boolean }>`
  color: ${({ isDark }) =>
    isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)"};
  font-size: 12px;
  margin-top: 10px;
`;

const Votes = styled(Overview)<{ isDark: boolean }>`
  margin-top: 5px;
`;

interface Props {
  movie: {
    backdropPath: string;
    posterPath: string;
    originalTitle: string;
    overview: string;
    voteAverage: number;
  };
  fullData: Movie;
}

const Slide: React.FC<Props> = ({ movie, fullData }) => {
  const isDark = useColorScheme() === "dark";

  const { backdropPath, posterPath, originalTitle, overview, voteAverage } =
    movie;

  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: { ...fullData },
    });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <Item>
        <BackgroundImage
          source={{ uri: makeImagePath(backdropPath) }}
          style={StyleSheet.absoluteFill}
        />
        <BlurView
          blurAmount={2}
          style={StyleSheet.absoluteFill}
          blurType={isDark ? "dark" : "light"}
        >
          <Wrapper>
            <Poster path={posterPath} />
            <Column>
              <Title isDark={isDark}>{originalTitle}</Title>
              <Overview isDark={isDark}>{overview.slice(0, 50)}...</Overview>
              {voteAverage > 0 && (
                <Votes isDark={isDark}> ⭐️ {voteAverage} / 10</Votes>
              )}
            </Column>
          </Wrapper>
        </BlurView>
      </Item>
    </TouchableWithoutFeedback>
  );
};
export default Slide;
