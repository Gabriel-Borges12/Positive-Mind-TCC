import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function DicasSaúdeMental() {
    const navigation = useNavigation();

    useEffect(() => {
        document.body.style.overflow = 'auto';  // Permitir rolagem no corpo
      }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Botão de voltar */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Home')}
                activeOpacity={0.7}
            >
                <Ionicons name="arrow-back" size={28} color="#ffffff" />
            </TouchableOpacity>

            {/* Conteúdo principal */}
            <ScrollView
                style={styles.scrollView} 
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Dicas de Saúde Mental</Text>

                {sections.map((section, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <Text style={styles.content}>{section.content}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}


const sections = [
    {
        title: "1. Cuide do Corpo, Cuide da Mente",
        content:
            "- Pratique exercícios físicos regularmente, mesmo que sejam leves, como uma caminhada.\n" +
            "- Durma de 7 a 9 horas por noite para restaurar a energia mental.\n" +
            "- Mantenha uma alimentação equilibrada, rica em frutas, vegetais e alimentos naturais.",
    },
    {
        title: "2. Pratique a Atenção Plena (Mindfulness)",
        content:
            "- Tire 5 minutos por dia para fazer uma respiração consciente.\n" +
            "- Observe o momento presente, concentrando-se em detalhes ao seu redor.",
    },
    {
        title: "3. Reserve um Tempo para Você",
        content:
            "- Dedique um momento do dia para algo que você ama, como ler ou praticar um hobby.\n" +
            "- Evite sobrecarregar-se com tarefas; aprenda a dizer 'não' quando necessário.",
    },
    {
        title: "4. Fortaleça Suas Conexões Sociais",
        content:
            "- Passe tempo de qualidade com amigos e familiares.\n" +
            "- Participe de grupos e atividades comunitárias que te interessem.",
    },
    {
        title: "5. Busque Ajuda Profissional",
        content:
            "- Consulte um psicólogo ou terapeuta para lidar com desafios emocionais.\n" +
            "- Não hesite em procurar apoio, pois cuidar da mente é fundamental.",
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3f2fd', 
    },
    scrollView: {
        flex: 1, 
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
    contentContainer: {
        paddingTop: 80, 
        paddingHorizontal: 20,
        paddingBottom: 40, 
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#004d40',
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 6,
        borderLeftWidth: 5,
        borderLeftColor: '#00796b', 
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#00796b',
        marginBottom: 8,
    },
    content: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
});