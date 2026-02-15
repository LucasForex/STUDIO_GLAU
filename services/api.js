import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://lucasfranken.cloud/api";

export async function listarAgendamentos() {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/glau/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  return response.json();
}

export async function criarAgendamento(dados) {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/glau/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(dados),
  });

  return response.json();
}

export async function deletarAgendamento(id) {
  const token = await AsyncStorage.getItem("token");
  await fetch(`${BASE_URL}/glau/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
}

export async function buscarAgendamento(id) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/glau/${id}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return response.json();
}

export async function atualizarAgendamento(id, dados) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/glau/${id}/`, {
    method: "PUT", // ou PATCH
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(dados),
  });

  return response.json();
}
