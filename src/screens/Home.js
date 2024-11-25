import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Dimensions, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import firebase from '../../firebase.js'; // Importa o Firebase e Auth
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

const screenWidth = Dimensions.get('window').width;

const frases = [
  "Acredite em si mesmo e tudo será possível.",
  "O sucesso nasce do querer, da determinação e persistência.",
  "Se você traçar metas absurdamente altas e falhar, seu fracasso será muito melhor que o sucesso de todos.",
  "Não tenha medo da mudança. Coisas boas se vão para que melhores possam vir.",
  "A persistência é o caminho do êxito.",
  "Só existe um êxito: a capacidade de viver a vida do seu jeito."
];

export default function Home({ navigation }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const db = getFirestore(firebase);
          const email = user.email;

          const usersCollection = collection(db, 'users');
          const q = query(usersCollection, where('email', '==', email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUsername(userData.nome || 'Usuário');
          } else {
            console.log('Documento do usuário não encontrado!');
          }
        } else {
          console.log('Nenhum usuário autenticado encontrado!');
        }
      } catch (error) {
        console.error('Erro ao buscar o nome do usuário:', error);
      }
    };

    fetchUsername();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Erro ao fazer logout:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}> {/* Wrap main content with SafeAreaView */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Bem-vindo(a) de volta,</Text>
          <Text style={styles.username}>{username}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.motivationalContainer}>
          <Text style={styles.motivationalText}>Frase Diária Motivadora</Text>
          <Swiper
            style={styles.wrapper}
            showsButtons={false}
            loop={true}
            autoplay={true}
            autoplayTimeout={5}
            showsPagination={false}
          >
            {frases.map((frase, index) => (
              <View style={styles.slide} key={index}>
                <Text style={styles.motivationalQuote}>"{frase}"</Text>
              </View>
            ))}
          </Swiper>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.imageButton}>
            <Image source={require('../assets/logo-site.png')} style={styles.imageButtonImage} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações sobre saúde mental</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.rowContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('HealthDetail')} style={styles.card}>
                <Image source={require('../assets/depressao.jpg')} style={styles.cardImage} />
                <Text style={styles.cardTitle}>Depressão</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Ansiedade')} style={styles.card}>
                <Image source={require('../assets/ansiedade.jpg')} style={styles.cardImage} />
                <Text style={styles.cardTitle}>Ansiedade</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Estresse')} style={styles.card}>
                <Image source={require('../assets/estresse.jpg')} style={styles.cardImage} />
                <Text style={styles.cardTitle}>Estresse</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercícios e Técnicas</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.rowContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('BreathingExercise')} style={styles.card}>
                <Image source={require('../assets/respiracao.jpg')} style={styles.cardImage} />
                <Text style={styles.cardTitle}>Respiração controlada</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('MuscleRelaxation')} style={styles.card}>
                <Image source={require('../assets/relaxamento.jpg')} style={styles.cardImage} />
                <Text style={styles.cardTitle}>Relaxamento muscular</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('MemoryGame')} style={styles.card}>
                <Image source={require('../assets/jogoMemoria.jpg')} style={styles.cardImage} />
                <Text style={styles.cardTitle}>Jogo da memória</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recomendado para você</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.rowContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Dicas')} style={styles.card}>
                <Image source={require('../assets/dicas.jpg')} style={styles.cardImage} />
                <Text style={styles.cardTitle}>Dicas sobre saúde mental</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Custos')} style={styles.card}>
                <Image source={require('../assets/custos.jpg')} style={styles.cardImage} />
                <Text style={styles.cardTitle}>Custos de sessões</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('QuebrandoPreconceitos')} style={styles.card}>
                <Image source={require('../assets/quebrandoPreconceitos.jpg')} style={styles.cardImage} />
                <Text style={styles.cardTitle}>Como quebrar estigmas?</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  welcome: {
    fontSize: 16,
    color: '#333',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#00796b',
    padding: 8,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  motivationalContainer: {
    backgroundColor: '#1C5739',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  motivationalText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  wrapper: {
    width: screenWidth * 0.8,
    height: 120,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  motivationalQuote: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
  imageButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  imageButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  section: {
    margin: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  card: {
    width: 120,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 80,
    resizeMode: 'cover',
  },
  cardTitle: {
    padding: 5,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
});
