import { View, Text, Button } from "react-native";

export default function Detail({ route, navigation }) {
  const { id } = route.params;
  console.log(route.params);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>id: {id}</Text>
      <Button
        title="Back to Home"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}
