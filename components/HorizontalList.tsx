import { FlatList } from "react-native";
import styled from "styled-components/native";

import VerticalMedia from "../components/VerticalMedia";
import { Movie } from "../api";
const ListTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  padding: 0 20px;
  margin-bottom: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

export const HorizontalSeparator = styled.View`
  width: 20px;
`;

interface Props {
  title: string;
  data: Movie[];
}

const HorizontalList: React.FC<Props> = ({ title, data }) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={HorizontalSeparator}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        renderItem={({ item }) => (
          <VerticalMedia
            posterPath={item.poster_path || ""}
            originalTitle={item.original_title ?? item.original_name}
            voteAverage={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
};

export default HorizontalList;
