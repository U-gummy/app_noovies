import styled from "styled-components/native";
import Poster from "./Poster";

import Votes from "../screens/Votes";

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
  return (
    <Movie>
      <Poster path={posterPath} />
      <Title>
        {originalTitle.slice(0, 13)}
        {originalTitle.length > 13 && "..."}
      </Title>
      <Votes vote={voteAverage} />
    </Movie>
  );
};

export default VerticalMedia;
