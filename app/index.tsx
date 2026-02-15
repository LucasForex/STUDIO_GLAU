import { router } from "expo-router";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <ScrollView style={styles.content}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.subtitle}>Beleza • Elegância • Estilo</Text>
          <TouchableOpacity
            style={styles.agendarButton}
            onPress={() => router.push("/admin")}
          >
            <Text style={styles.agendarButtonText}>Área Restrita</Text>
          </TouchableOpacity>
        </View>

        {/* Título */}
        <Text style={styles.sectionTitle}>Nossos Serviços</Text>

        {/* Cards */}
        <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.card}>
            <TouchableOpacity
              style={styles.whatsappButton}
              onPress={() => Linking.openURL("https://wa.me/5598991098221")}
            >
              <Text style={styles.whatsappText}>📲 Falar no WhatsApp</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Image
              source={require("../assets/imagem1.png")}
              style={styles.cardImage}
              resizeMode="contain"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Progressiva, selagem e Botox</Text>
              <Text style={styles.cardDescription}>
                Estilo personalizado para valorizar sua beleza.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Image
              source={require("../assets/imagem2.png")}
              style={styles.cardImage}
              resizeMode="contain"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Manicure e Pedicure</Text>
              <Text style={styles.cardDescription}>
                Deixe suas unhas impecáveis e estilosas.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Image
              source={require("../assets/imagem3.png")}
              style={styles.cardImage}
              resizeMode="contain"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Machas Loiras e Iluminadas</Text>
              <Text style={styles.cardDescription}>
                Brilho, leveza e acabamento profissional.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Image
              source={require("../assets/imagem4.png")}
              style={styles.cardImage}
              resizeMode="contain"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Sombrancelha</Text>
              <Text style={styles.cardDescription}>
                Design e harmonização para realçar seu olhar.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8FB",
  },
  scrollContent: {
    alignItems: "center", // AGORA AQUI
    paddingBottom: 40,
  },
  content: {
    width: "100%",
    maxWidth: 500, // limita largura no desktop
  },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#FDE2EC",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
  },
  logo: {
    width: 200,
    height: 80,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    color: "#6D6875",
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6D6875",
    marginVertical: 25,
    marginLeft: 20,
  },
  cardsContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 6,
    width: "90%",
    alignSelf: "center",
  },
  cardImage: {
    width: 300,
    height: 600, // menor
  },
  cardContent: {
    padding: 18,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#B5838D",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
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
  whatsappButton: {
    backgroundColor: "#25D366",
    paddingVertical: 22,
    borderRadius: 35,
    alignItems: "center",
    marginTop: 20,
    elevation: 5, // sombra Android
  },
});
