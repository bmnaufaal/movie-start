import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieList from "../screens/MovieList";
import Detail from "../screens/Detail";
const Stack = createNativeStackNavigator();
import { useTheme } from "@react-navigation/native";
import Genres from "../screens/Genres";

export default function MainStack() {
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
      initialRouteName="Home"
    >
      <Stack.Screen name="Movies List" component={MovieList} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}
