import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import { MaterialIcons } from "@expo/vector-icons";
import MainStack from "./MainStack";
import { useState } from "react";
const Tab = createMaterialBottomTabNavigator();

export default function TabActions() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color="black" />
          ),
        }}
        component={MainStack}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ color }) => {
            <MaterialIcons name="home" size={24} color="black" />;
          },
        }}
        component={Settings}
      />
    </Tab.Navigator>
  );
}
