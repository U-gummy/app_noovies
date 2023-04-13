import React from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./navigation/Tabs";

export default function App() {
  const [loaded] = Font.useFonts(Ionicons.font);

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
