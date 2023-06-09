import React from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";

import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./styled";

const queryClient = new QueryClient();

export default function App() {
  const [loaded] = Font.useFonts(Ionicons.font);

  const isDark = useColorScheme() === "dark";

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
