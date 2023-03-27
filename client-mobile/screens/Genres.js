import { useTheme } from "@react-navigation/native";
import { GET_GENRES } from "../config/queries";
import { useQuery, gql } from "@apollo/client";
import { View, StyleSheet, FlatList } from "react-native";
import GenreData from "../components/GenreData";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { Appbar, Text, Button } from "react-native-paper";

export default function Genres({ navigation }) {
  const {
    loading: genresLoading,
    data: genres,
    error: genresError,
  } = useQuery(GET_GENRES);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
    },
  });

  const renderItem = ({ item }) => {
    return <GenreData genre={item} key={item.id}></GenreData>;
  };

  if (genresLoading)
    return (
      <View style={styles.container}>
        <Button loading={true} mode="contained">
          Loading
        </Button>
      </View>
    );
  if (genresError) return <Text>Error ${genresError.message}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={genres?.genres}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
