import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainStack from "./navigators/MainStack";
import { NavigationContainer } from "@react-navigation/native";
import Tab from "./navigators/Tab";

export default function App() {
  return (
    <NavigationContainer>
      {/* <MainStack /> */}
      <Tab />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
