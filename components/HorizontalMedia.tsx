import styled from "styled-components/native";
import Poster from "./Poster";

const Title = styled.Text`
  font-size: 12px;
  color: #fff;
  margin-top: 7px;
  font-weight: 600;
`;

const HMovie = styled.View`
  padding: 0 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 70%;
`;

const Overview = styled.Text`
  margin-top: 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
`;

const Release = styled.Text`
  margin-top: 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
`;
interface Props {
  movie: any;
}

const HorizontalMedia: React.FC<Props> = ({ movie }) => {
  return (
    <HMovie>
      <Poster path={movie.poster_path} />
      <HColumn>
        <Title>{movie.original_title}</Title>
        <Release>
          {new Date(movie.release_date).toLocaleDateString("ko")}
        </Release>
        <Overview>
          {movie.overview.slice(0, 120)}
          {movie.overview.length > 120 && "..."}
        </Overview>
      </HColumn>
    </HMovie>
  );
};

export default HorizontalMedia;
