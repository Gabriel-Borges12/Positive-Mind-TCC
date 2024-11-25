import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';

export default function Ansiedade({ navigation }) {
  useEffect(() => {
    document.body.style.overflow = 'auto'; // Garante que a rolagem funcione no React Native Web
  }, []);
  return (
      <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Ansiedade</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={{ flexGrow: 1 }}>
        {/* Seção: Como Identificar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como Identificar</Text>
          <Text style={styles.sectionContent}>
            A ansiedade pode ser identificada por sintomas como preocupação excessiva, palpitações, sudorese, tremores, tensão muscular e cansaço. Ela pode variar de leve a grave e interferir nas atividades diárias.
          </Text>

          {/* Imagem ilustrativa */}
          <Image source={require('../assets/ansiedade.png')} style={styles.image} />

          <Text style={styles.sectionContent}>
            A ansiedade pode ocorrer em várias situações, como no trabalho, nos estudos ou em interações sociais. O primeiro passo para lidar com ela é reconhecê-la e buscar estratégias para o controle emocional.
          </Text>
        </View>

        {/* Seção: Como Evitar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como Evitar</Text>
          <Text style={styles.sectionContent}>
            Evitar a ansiedade envolve práticas como:
            {'\n'}• Manter uma rotina de sono adequada.
            {'\n'}• Praticar exercícios físicos regularmente.
            {'\n'}• Meditar ou usar técnicas de respiração profunda.
            {'\n'}• Limitar a ingestão de cafeína e álcool.
          </Text>

          {/* Imagem ilustrativa */}
          <Image source={require('../assets/ansiedade3.png')} style={styles.image} />

          <Text style={styles.sectionContent}>
            Além disso, manter uma alimentação saudável e procurar momentos de lazer também pode ajudar na prevenção da ansiedade. O autocuidado é essencial para uma vida equilibrada.
          </Text>
        </View>

        {/* Seção: Como Tratar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como Tratar</Text>
          <Text style={styles.sectionContent}>
            O tratamento da ansiedade pode incluir:
            {'\n'}• Terapia cognitivo-comportamental (TCC).
            {'\n'}• Técnicas de relaxamento e mindfulness.
            {'\n'}• Medicamentos, prescritos por um profissional de saúde.
            {'\n'}• Apoio de amigos e familiares.
          </Text>

          {/* Imagem ilustrativa */}
          <Image source={require('../assets/ansiedade2.png')} style={styles.image} />

          <Text style={styles.sectionContent}>
            O tratamento deve ser individualizado e é sempre importante buscar a ajuda de profissionais especializados para lidar com a ansiedade de forma eficaz.
          </Text>
        </View>

        {/* Seção: Estratégias Complementares */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estratégias Complementares</Text>
          <Text style={styles.sectionContent}>
            Algumas abordagens complementares podem ser úteis, tais como:
            {'\n'}• Yoga e alongamento para relaxar o corpo e mente.
            {'\n'}• Técnicas de aromaterapia e massagem.
            {'\n'}• Grupos de apoio e terapias alternativas.
          </Text>

          {/* Imagem ilustrativa */}
          <Image source={require('../assets/ansiedade4.png')} style={styles.image} />

          <Text style={styles.sectionContent}>
            Essas práticas ajudam no alívio dos sintomas e proporcionam uma sensação de bem-estar. É importante sempre verificar com um especialista se essas abordagens podem ser combinadas com o tratamento médico convencional.
          </Text>
        </View>
      </ScrollView>
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f4f4f4',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    backgroundColor: '#00796b',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollContent: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
  },
});