import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useEffect, useState } from "react";
import { BlurView } from "@react-native-community/blur";

import { makeImagePath } from "../utils";

const Container = styled.ScrollView``;

const Item = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BackgroundImage = styled.Image``;

const Wrapper = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
`;

const Column = styled.View`
  width: 50%;
  margin-left: 30px;
`;

const Overview = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  margin-top: 10px;
`;

const Votes = styled(Overview)`
  margin-top: 5px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const API_KEY = "660b23621fced3d4e50247c34d107d94";

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const isDark = useColorScheme() === "dark";

  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();

    setNowPlaying(results);
    setLoading(false);
  };

  useEffect(() => {
    getNowPlaying();
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
        {nowPlaying.map(
          ({
            id,
            backdrop_path,
            poster_path,
            original_title,
            overview,
            vote_average,
          }) => (
            <Item key={id}>
              <BackgroundImage
                source={{ uri: makeImagePath(backdrop_path) }}
                style={StyleSheet.absoluteFill}
              />
              <BlurView
                blurAmount={2}
                style={StyleSheet.absoluteFill}
                blurType={isDark ? "dark" : "light"}
              >
                <Wrapper>
                  <Poster
                    source={{ uri: makeImagePath(poster_path) }}
                    style={StyleSheet.absoluteFill}
                  />
                  <Column>
                    <Title>{original_title}</Title>
                    <Overview>{overview.slice(0, 50)}...</Overview>
                    {vote_average > 0 && (
                      <Votes> ⭐️ {vote_average} / 10</Votes>
                    )}
                  </Column>
                </Wrapper>
              </BlurView>
            </Item>
          )
        )}
      </Swiper>
    </Container>
  );
};
export default Movies;
