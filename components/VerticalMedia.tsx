import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

import Poster from "./Poster";

import Votes from "../screens/Votes";
import { useNavigation } from "@react-navigation/native";

const Movie = styled.View`
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
}

const VerticalMedia: React.FC<Props> = ({
  posterPath,
  originalTitle,
  voteAverage,
}: Props) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail" });
  };

  return (
    <TouchableOpacity onPress={goToDetail}>
      <Movie>
        <Poster path={posterPath} />
        <Title>
          {originalTitle.slice(0, 13)}
          {originalTitle.length > 13 && "..."}
        </Title>
        <Votes vote={voteAverage} />
      </Movie>
    </TouchableOpacity>
  );
};

export default VerticalMedia;
