import { useState } from "react";
import { StyleSheet, View, FlatList, ScrollView } from "react-native";
import { useQuery, gql } from "@apollo/client";
import MovieData from "../components/MovieData";
import { Button, Text, Chip } from "react-native-paper";
import { GET_GENRES, GET_MOVIES } from "../config/queries";

export default function MovieList({ navigation }) {
  const {
    loading: moviesLoading,
    data: movies,
    error: moviesError,
  } = useQuery(GET_MOVIES);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
    },
  });

  const renderItem = ({ item }) => {
    return (
      <MovieData movie={item} key={item.id} navigation={navigation}></MovieData>
    );
  };

  if (moviesLoading)
    return (
      <View style={styles.container}>
        <Button loading={true} mode="contained">
          Loading
        </Button>
      </View>
    );
  if (moviesError) return <Text>Error ${moviesError.message}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={movies?.movies}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
