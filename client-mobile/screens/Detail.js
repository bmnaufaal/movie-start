import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image, ScrollView } from "react-native";
import { Card, Title, Chip, Button, Text } from "react-native-paper";
import { useQuery, gql } from "@apollo/client";
import { GET_MOVIE_DETAIL } from "../config/queries";

export default function Detail({ route, navigation }) {
  const { id } = route.params;
  const { loading, data, error } = useQuery(GET_MOVIE_DETAIL, {
    variables: {
      movieDetailId: id,
    },
  });

  useEffect(() => {
    navigation.setOptions({ title: data?.movieDetail.title });
  }, [data?.movieDetail]);

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
      marginBottom: 15,
    },
    casts: {
      flexDirection: "row",
    },
  });

  if (loading)
    return (
      <View style={styles.container}>
        <Button loading={true} mode="contained">
          Loading
        </Button>
      </View>
    );
  if (error) return <Text>Error ${error.message}</Text>;

  const renderItem = ({ item }) => {
    return (
      <View style={{ width: "50%" }}>
        <Card.Cover
          style={{ marginHorizontal: 5 }}
          source={{ uri: item.profilePict }}
        />
        <Title style={styles.title}>{item.name}</Title>
      </View>
    );
  };

  return (
    <ScrollView>
      <Card mode="contained">
        <Card.Cover source={{ uri: data?.movieDetail.imgUrl }} />
        <Card.Content>
          <Title style={styles.title}>{data?.movieDetail.title}</Title>
          <View style={{ alignSelf: "center", flexDirection: "row" }}>
            <Chip icon="star">{data?.movieDetail.rating}</Chip>
            <Chip mode="contained" icon="movie-roll">
              {data?.movieDetail.genre.name}
            </Chip>
          </View>
          <Text style={styles.synopsis} variant="bodyMedium">
            {data?.movieDetail.synopsis}
          </Text>
          <FlatList
            scrollEnabled={false}
            numColumns={2}
            key={data.movieDetail.casts.id}
            data={data?.movieDetail.casts}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ></FlatList>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
