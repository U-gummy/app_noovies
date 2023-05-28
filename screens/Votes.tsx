import styled from "styled-components/native";

const Vote = styled.Text`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 5px;
`;

interface Props {
  vote: number;
}

const Votes: React.FC<Props> = ({ vote }) => {
  return <Vote>{vote > 0 ? `⭐️ ${vote}/10` : "Coming soon"}</Vote>;
};

export default Votes;
