import { NavigationContainer } from "@react-navigation/native";
import BottomNavigationScreen from "./navigators/BottomNavigation";
import { MD3DarkTheme as DefaultTheme,Provider as PaperProvider } from "react-native-paper";
import { withTheme } from 'react-native-paper';

export default function App() {
  const theme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
    },
  };


  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <BottomNavigationScreen />
      </NavigationContainer>
    </PaperProvider>
  );
}
