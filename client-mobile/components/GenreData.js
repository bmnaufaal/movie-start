import { Card, Title, Paragraph, Chip } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function GenreData({ genre }) {
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
    <Card mode="contained">
      <Card.Content>
        <Title style={styles.title}>{genre.name}</Title>
      </Card.Content>
    </Card>
  );
}
