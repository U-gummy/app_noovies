import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

import Poster from "./Poster";

import Votes from "../screens/Votes";
import { useNavigation } from "@react-navigation/native";
import { Movie } from "../api";

const Container = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  font-size: 12px;
  color: #fff;
  margin-top: 7px;
  font-weight: 600;
`;

interface Props {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  fullData: Movie;
}

const VerticalMedia: React.FC<Props> = ({
  posterPath,
  originalTitle,
  voteAverage,
  fullData,
}: Props) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: { ...fullData },
    });
  };

  return (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <Poster path={posterPath} />
        <Title>
          {originalTitle.slice(0, 13)}
          {originalTitle.length > 13 && "..."}
        </Title>
        <Votes vote={voteAverage} />
      </Container>
    </TouchableOpacity>
  );
};

export default VerticalMedia;
