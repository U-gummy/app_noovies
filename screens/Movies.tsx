import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.textColor};
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => (
  <Btn onPress={() => navigate("Stack", { screen: "Three" })} style={{}}>
    <Title>Movies</Title>
  </Btn>
);
export default Movies;
