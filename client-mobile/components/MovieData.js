import { Card, Title, Paragraph, Chip } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function MovieData({ movie, navigation }) {
  const styles = StyleSheet.create({
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
  });

  return (
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
          <Chip icon="star">{movie?.rating}</Chip>
          <Chip mode="contained" icon="movie-roll">
            {movie.genre.name}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );
}
