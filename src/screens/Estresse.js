import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

export default function Estresse({ navigation }) {
  useEffect(() => {
    document.body.style.overflow = 'auto'; // Garante que a rolagem funcione no React Native Web
  }, []);

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Estresse</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* ScrollView para conteúdo */}
      <ScrollView style={styles.scrollContent} contentContainerStyle={{ flexGrow: 1 }}>
        {/* Seção: Como Identificar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como Identificar</Text>
          <Text style={styles.sectionContent}>
            O estresse pode ser identificado por sintomas como irritabilidade, cansaço extremo, insônia, falta de concentração, dores de cabeça e tensões musculares. Ele pode surgir devido a diversas situações desafiadoras e, se não tratado, pode levar a problemas mais sérios de saúde.
          </Text>

          {/* Imagem ilustrativa */}
          <Image source={require('../assets/estresse1.png')} style={styles.image} />

          <Text style={styles.sectionContent}>
            É importante prestar atenção em mudanças no humor e no comportamento, pois esses podem ser sinais de que o estresse está afetando a saúde mental.
          </Text>
        </View>

        {/* Seção: Como Evitar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como Evitar</Text>
          <Text style={styles.sectionContent}>
            Algumas formas de evitar o estresse incluem:
            {'\n'}• Estabelecer uma rotina de atividades relaxantes.
            {'\n'}• Praticar hobbies e atividades que tragam prazer.
            {'\n'}• Realizar exercícios físicos regularmente.
            {'\n'}• Manter uma alimentação equilibrada e saudável.
            {'\n'}• Administrar melhor o tempo e definir prioridades.
          </Text>

          {/* Imagem ilustrativa */}
          <Image source={require('../assets/estresse2.png')} style={styles.image} />

          <Text style={styles.sectionContent}>
            Incorporar momentos de autocuidado na rotina pode prevenir o acúmulo de estresse.
          </Text>
        </View>

        {/* Seção: Como Tratar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como Tratar</Text>
          <Text style={styles.sectionContent}>
            O tratamento do estresse pode envolver:
            {'\n'}• Terapia com um psicólogo para desenvolver estratégias de enfrentamento.
            {'\n'}• Técnicas de relaxamento como yoga e meditação.
            {'\n'}• Práticas de respiração profunda para reduzir a tensão.
            {'\n'}• Redução da carga de trabalho e melhor gestão do tempo.
            {'\n'}• Medicação, se necessário, sempre com orientação médica.
          </Text>

          {/* Imagem ilustrativa */}
          <Image source={require('../assets/estresse3.png')} style={styles.images} />

          <Text style={styles.sectionContent}>
            Buscar ajuda profissional é fundamental para lidar com o estresse crônico.
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
    height: 220,
    borderRadius: 8,
    marginVertical: 10,
  },
  images: {
    width: '100%',
    height: 220, // Defina a altura como você preferir
    borderRadius: 8,
    marginVertical: 10,
    alignSelf: 'center',
  },

});