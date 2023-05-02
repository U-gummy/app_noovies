import styled from "styled-components/native";

import { makeImagePath } from "../utils";

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

interface Props {
  path: string;
}

const Poster: React.FC<Props> = ({ path }) => {
  return <Image source={{ uri: makeImagePath(path) }} />;
};

export default Poster;
