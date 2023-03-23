import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Title, Chip, Text } from "react-native-paper";

export default function Detail({ route, navigation }) {
  const { id } = route.params;
  const [movie, setMovie] = useState({});

  const fetchMovieDetail = async (id) => {
    fetch("https://api.pilem-start.shop/movies/" + id)
      .then(async (res) => {
        if (!res.ok) throw await res.text();
        return res.json();
      })
      .then((data) => setMovie(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchMovieDetail(id);
    navigation.setOptions({ title: movie.title });
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
    },
    title: {
      fontWeight: "600",
      alignSelf: "center",
    },
    footer: {
      padding: 10,
      backgroundColor: "#3F00FF",
      color: "#FFFFFF",
      borderRadius: 10,
      overflow: "hidden",
      marginHorizontal: 3,
    },
    synopsis: {
      textAlign: "justify",
    },
  });

  return (
    <View style={styles.container}>
      <Card
        mode="contained"
        onPress={() => {
          navigation.navigate("Detail", {
            id: movie.id,
          });
        }}
      >
        <Card.Cover
          style={{ borderBottomEndRadius: 0 }}
          source={{ uri: movie.imgUrl }}
        />
        <Card.Content>
          <Title style={styles.title}>{movie.title}</Title>
          <View style={{ alignSelf: "center", flexDirection: "row" }}>
            <Chip icon="star">{movie.rating}</Chip>
            <Chip mode="contained" icon="movie-roll">
              {movie.Genre?.name}
            </Chip>
          </View>
          <Text style={styles.synopsis} variant="bodyMedium">
            {movie.synopsis}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}
