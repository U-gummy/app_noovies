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
  movie: any;
}

const VerticalMedia: React.FC<Props> = ({ movie }) => {
  return (
    <Movie>
      <Poster path={movie.poster_path} />
      <Title>
        {movie.original_title.slice(0, 13)}
        {movie.original_title.length > 13 && "..."}
      </Title>
      <Votes vote={movie.vote_average} />
    </Movie>
  );
};

export default VerticalMedia;
