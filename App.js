import React from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";

import Root from "./navigation/Root";

export default function App() {
  const [loaded] = Font.useFonts(Ionicons.font);

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}
