import { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import MovieData from "../components/MovieData";

export default function MovieList({ navigation }) {
  const [movies, setMovies] = useState([]);
  const fetchMoviesData = async () => {
    fetch("https://api.pilem-start.shop/movies")
      .then(async (res) => {
        if (!res.ok) throw await res.text();
        return res.json();
      })
      .then((data) => setMovies(data))
      .catch((error) => console.log(error));
  };

  useState(() => {
    fetchMoviesData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => (
          <MovieData movie={item} navigation={navigation}></MovieData>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
