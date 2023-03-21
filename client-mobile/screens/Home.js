import { useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

export default function Home({ navigation }) {
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

  return (
    <View>
      <ScrollView>
        {movies?.map((movie) => {
          return (
            <Card
              onPress={() => {
                navigation.navigate("Detail", {
                  id: movie.id,
                });
              }}
            >
              <Card.Content>
                <Card.Cover source={{ uri: movie.imgUrl }} />
                <Title>{movie.title}</Title>
                <Paragraph>{movie.Genre.name}</Paragraph>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
}
