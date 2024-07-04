import { StatusBar } from "expo-status-bar";
import { StyleSheet, Modal, Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text_style}>Aora!</Text>
      <StatusBar style="auto"></StatusBar>
      <Link href="/profile" style={{color: 'blue'}}>Go to Profile</Link>
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
}); 