import { View, Text, Button } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Detail"
        onPress={() => {
          navigation.navigate("Detail", {
            id: 1
          });
        }}
      />
    </View>
  );
}
