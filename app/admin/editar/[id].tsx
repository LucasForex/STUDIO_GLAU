import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { atualizarAgendamento, buscarAgendamento } from "../../../services/api";

export default function Editar() {
  const { id } = useLocalSearchParams();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [observacao, setObservacao] = useState("");
  const [data, setData] = useState("");
  const [mostrarPicker, setMostrarPicker] = useState(false);

  useEffect(() => {
    async function verificarLogin() {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        router.replace("/login");
      }
    }

    verificarLogin();
  }, []);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const dados = await buscarAgendamento(id);

    setNome(dados.nome);
    setTelefone(dados.telefone);
    setObservacao(dados.observacao);

    setData(dados.data);
  }

  function formatarDataLocal(date) {
    const ano = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const dia = String(date.getDate()).padStart(2, "0");
    const hora = String(date.getHours()).padStart(2, "0");
    const minuto = String(date.getMinutes()).padStart(2, "0");
    const segundo = String(date.getSeconds()).padStart(2, "0");

    return `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
  }

  async function salvar() {
    await atualizarAgendamento(id, {
      nome,
      telefone,
      observacao,
      data,
    });

    router.replace("/admin");
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.label}>Data e Hora</Text>
      {/* 🔥 Campo data e hora */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setMostrarPicker(true)}
      >
        <Text>
          {data
            ? new Date(data).toLocaleString("pt-BR")
            : "Selecione data e hora"}
        </Text>
      </TouchableOpacity>

      {mostrarPicker && (
        <DateTimePicker
          value={data ? new Date(data) : new Date()}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            setMostrarPicker(false);
            if (selectedDate) {
              setData(formatarDataLocal(selectedDate));
            }
          }}
        />
      )}
      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
        style={styles.input}
      />
      <Text style={styles.label}>Telefone</Text>
      <TextInput
        value={telefone}
        onChangeText={setTelefone}
        placeholder="Telefone"
        style={styles.input}
      />
      <Text style={styles.label}>Observação</Text>
      <TextInput
        value={observacao}
        onChangeText={setObservacao}
        placeholder="Observação"
        style={styles.input}
      />

      <Button title="Salvar" onPress={salvar} />
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
    marginBottom: 20,
  },
  field: {
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6D6875",
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  button: {
    backgroundColor: "#F8C8DC",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#6D6875",
    fontWeight: "bold",
  },
});
