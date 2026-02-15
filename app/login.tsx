import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const entrar = async () => {
    const response = await fetch(
      "https://lucasfranken.cloud/accounts/login_api",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      },
    );

    if (response.ok) {
      const data = await response.json();
      await AsyncStorage.setItem("token", data.token);
      router.replace("/admin");
    } else {
      alert("Login inválido");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.agendarButton}
          onPress={() => router.push("/")}
        >
          <Text style={styles.agendarButtonText}>Página Inicial</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Área Administrativa</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={entrar}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8FB",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 20,
    width: "100%",
    maxWidth: 350,
    elevation: 5,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#6D6875",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#F8C8DC",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#6D6875",
  },
  agendarButton: {
    marginTop: 20,
    marginHorizontal: 40,
    backgroundColor: "#F8C8DC",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  agendarButtonText: {
    color: "#6D6875",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
