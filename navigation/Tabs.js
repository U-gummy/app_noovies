import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";

import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { COLORS } from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: isDark ? COLORS.black : "#fff" },
        tabBarActiveTintColor: isDark ? COLORS.yellow : COLORS.black,
        tabBarInactiveTintColor: isDark ? "#d2dae2" : "#808e9b",
        headerStyle: {
          backgroundColor: isDark ? COLORS.black : "#fff",
        },
        headerTitleStyle: {
          color: isDark ? "#fff" : COLORS.black,
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          headerRight: () => (
            <View>
              <Text style={{ color: "#fff" }}>삭제</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen name="Tv" component={Tv} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default Tabs;
