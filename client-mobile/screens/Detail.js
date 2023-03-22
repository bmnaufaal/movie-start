import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

export default function Detail({ route, navigation }) {
  const { id } = route.params;
  const [movie, setMovie] = useState([]);

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

  //   console.log(movie);

  return (
    <View>
      <Card>
        <Card.Content>
          <Card.Cover source={{ uri: movie.imgUrl }} />
          <Title>{movie.title}</Title>
          {/* <Paragraph>{movie.Genre.name}</Paragraph> */}
        </Card.Content>
      </Card>
    </View>
  );
}
