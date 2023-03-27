import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { useTheme } from "@react-navigation/native";
import Genres from "../screens/Genres";

export default function GenreStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      initialRouteName="Genre List"
    >
      <Stack.Screen name="Genres List" component={Genres} />
    </Stack.Navigator>
  );
}
