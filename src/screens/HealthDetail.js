import React, { useEffect } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

function HealthDetail({ navigation }) {
  // Ajuste para rolagem em ambientes web
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* Cabeçalho com o botão de voltar */}
      <View style={styles.header}>
        <Text style={styles.title}>Depressão</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo rolável */}
      <ScrollView style={styles.scrollContent} contentContainerStyle={{ flexGrow: 1 }}>
        
        {/* Seção: Como Identificar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como Identificar</Text>
          <Text style={styles.sectionContent}>
            A depressão pode ser identificada por sintomas como:
            {'\n'}• Tristeza profunda e persistente.
            {'\n'}• Perda de interesse nas atividades diárias.
            {'\n'}• Falta de energia e cansaço constante.
            {'\n'}• Distúrbios no sono, como insônia ou excesso de sono.
            {'\n'}• Alterações no apetite, resultando em perda ou ganho de peso.
            {'\n'}• Pensamentos de desesperança ou suicídio.
            {'\n'}Caso esses sintomas persistam por mais de duas semanas, é crucial procurar ajuda profissional.
          </Text>
          {/* Imagem ilustrativa */}
          <Image source={require('../assets/depressao1.png')} style={styles.image} resizeMode="contain" />
        </View>

        {/* Seção: Como Evitar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como Evitar</Text>
          <Text style={styles.sectionContent}>
            Para prevenir a depressão, considere as seguintes práticas:
            {'\n'}• Manter uma rotina equilibrada e saudável.
            {'\n'}• Estabelecer uma rede de apoio emocional.
            {'\n'}• Praticar atividades físicas regularmente, como caminhadas e yoga.
            {'\n'}• Meditar ou praticar mindfulness para reduzir o estresse.
            {'\n'}• Buscar apoio ao se sentir emocionalmente sobrecarregado.
          </Text>
          {/* Imagem ilustrativa */}
          <Image source={require('../assets/depressao2.png')} style={styles.image} resizeMode="contain" />
        </View>

        {/* Seção: Como Tratar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como Tratar</Text>
          <Text style={styles.sectionContent}>
            O tratamento da depressão pode incluir:
            {'\n'}• Terapia psicológica, como a Terapia Cognitivo-Comportamental (TCC).
            {'\n'}• Medicamentos antidepressivos, sempre sob supervisão médica.
            {'\n'}• Técnicas de relaxamento, como meditação e exercícios de respiração.
            {'\n'}• Adotar um estilo de vida saudável, incluindo uma dieta equilibrada.
            {'\n'}• Participar de grupos de apoio e buscar apoio de amigos e familiares.
          </Text>
          {/* Imagem ilustrativa */}
          <Image source={require('../assets/depressao3.png')} style={styles.image} resizeMode="contain" />
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

export default HealthDetail;