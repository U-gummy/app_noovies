import { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Dimensions,
  Linking,
  StyleSheet,
  TouchableOpacity,
  Share,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { useQuery } from "react-query";

import { Movie, moviesApi, tvApi } from "../api";
import Poster from "../components/Poster";
import { makeImagePath } from "../utils";
import { COLORS } from "../colors";
import Loader from "../components/Loader";

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
const Data = styled.View`
  padding: 0 20px;
`;
const Overview = styled.Text`
  color: ${({ theme }) => theme.textColor};
  margin: 20px 0;
`;

const VideoButton = styled.TouchableOpacity`
  flex-direction: row;
`;
const ButtonText = styled.Text`
  color: #fff;
  font-weight: 500;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10;
`;

type RootStackParamList = {
  Detail: Movie;
};
type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const isMovie = "original_title" in params;
  const title = params.original_title ?? params.original_name;

  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    moviesApi ? moviesApi.detail : tvApi.detail,
    { enabled: isMovie }
  );

  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}`
      : data.homepage;

    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\nCheck it out: ${homepage}`,
        title,
      });
    } else {
      await Share.share({
        url: homepage,
        title,
      });
    }
  };

  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share-outline" color="white" size={24} />
    </TouchableOpacity>
  );

  const openYoutubeLink = async (videoId: string) => {
    const baseUrl = `https://m.youtube.com/watch?v=${videoId}`;
    // await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };

  useEffect(() => {
    setOptions({
      title: isMovie ? "Movie" : "TV Show",
    });
  }, []);

  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImagePath(params.backdrop_path || "") }}
        />
        <LinearGradient
          colors={["transparent", COLORS.black]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>{title}</Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading && <Loader />}
        {data?.videos?.results?.map((video: any) => (
          <VideoButton
            key={video.key}
            onPress={() => openYoutubeLink(video.key)}
          >
            <Ionicons name="logo-youtube" color="white" size={24} />
            <ButtonText>{video.name}</ButtonText>
          </VideoButton>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
