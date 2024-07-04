import { StatusBar } from "expo-status-bar";
import { StyleSheet, Modal, Text, View } from "react-native";
import { Link } from "expo-router";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text_style}>Aora!</Text>
      <StatusBar style="auto"></StatusBar>
      <Link href="/profile" style={styles.link_style}>Go to Profile</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    
  },

  text_style: {
    fontSize: 24,
    fontFamily: "SpaceMono-Regular",
  },

  link_style: {
    textDecorationLine: "underline",
    color: "blue",
    fontSize: 20,
    fontFamily: "SpaceMono-Regular",
  },
}); 