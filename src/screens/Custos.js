import React, {useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CustoTerapia() {
  const navigation = useNavigation();
  useEffect(() => {
    document.body.style.overflow = 'auto';  // Permitir rolagem no corpo
  }, []);
  
  return (
    <View style={styles.container}>
      {/* Botão Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Custos de Sessões de Terapia</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Sessão Individual</Text>
          <Text style={styles.content}>
            - Preço médio: R$ 150 - R$ 300 por hora.
            {"\n"}- Indicada para foco em questões pessoais e específicas.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Terapia em Grupo</Text>
          <Text style={styles.content}>
            - Preço médio: R$ 50 - R$ 100 por pessoa.
            {"\n"}- Excelente para compartilhamento de experiências e suporte em grupo.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Terapia Online</Text>
          <Text style={styles.content}>
            - Preço médio: R$ 100 - R$ 200 por hora.
            {"\n"}- Oferece flexibilidade e conforto, ideal para quem tem agendas apertadas.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Pacotes e Descontos</Text>
          <Text style={styles.content}>
            - Muitas clínicas oferecem pacotes mensais ou descontos para sessões contínuas.
            {"\n"}- Verifique políticas de reembolso e flexibilidade de horários.
          </Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Saiba mais sobre benefícios de terapia</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf5f4',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#00796b', 
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 60, 
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

