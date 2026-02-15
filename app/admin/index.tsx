import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { deletarAgendamento, listarAgendamentos } from "../../services/api";

export default function AdminAgenda() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    async function verificarLogin() {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        router.replace("/login");
      }
    }

    verificarLogin();
  }, []);

  async function carregar() {
    const response = await listarAgendamentos();
    setDados(response);
  }

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, []),
  );

  async function logout() {
    await AsyncStorage.removeItem("token");
    router.replace("/login");
  }

  async function remover(id) {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente excluir este agendamento?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await deletarAgendamento(id);
            carregar();
          },
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Agendamentos</Text>

      <FlatList
        data={dados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>{new Date(item.data).toLocaleString()}</Text>
            <Text>{item.telefone}</Text>
            <Text>{item.observacao}</Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => remover(item.id)}
            >
              <Text style={{ color: "#fff" }}>Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => router.push(`/admin/editar/${item.id}`)}
            >
              <Text style={{ color: "#fff" }}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/admin/novo")}
      >
        <Text style={styles.addButtonText}>+ Novo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF8FB",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6D6875",
    marginBottom: 15,
    marginTop: 25,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
  },
  nome: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#B5838D",
  },
  deleteButton: {
    backgroundColor: "#E57373",
    marginTop: 10,
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
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
  addButton: {
    backgroundColor: "#F8C8DC",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    fontWeight: "bold",
    color: "#6D6875",
  },
  editButton: {
    backgroundColor: "#64B5F6",
    marginTop: 10,
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#E57373",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 15,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
