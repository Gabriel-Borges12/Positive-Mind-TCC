import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QuebrandoPreconceitos({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            {/* Botão Voltar */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>

            {/* Conteúdo principal */}
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                {/* Título */}
                <Text style={styles.title}>Quebrando Preconceitos</Text>

                {/* Imagem Principal */}
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1520218506609-97e56adbafd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' }}
                    style={styles.mainImage}
                    resizeMode="cover"
                />

                {/* Conteúdo */}
                <Text style={styles.content}>
                    - Entenda que buscar ajuda é um sinal de força, não de fraqueza.{"\n"}
                    - Terapia é para todos, independentemente da gravidade do problema.{"\n"}
                    - Incentive conversas abertas sobre saúde mental.{"\n"}
                    - Lembre-se: cuidar da mente é tão importante quanto cuidar do corpo.{"\n\n"}

                    A saúde mental deve ser tratada com a mesma seriedade que a saúde física. Não tenha vergonha de admitir quando precisar de ajuda, e lembre-se de que a busca por apoio é um ato de coragem e não de fraqueza.{"\n\n"}

                    Ao quebrarmos o estigma, estamos criando um ambiente mais seguro e acolhedor para todos. Vamos transformar a forma como falamos sobre saúde mental, tornando-a uma prioridade no nosso cotidiano.
                </Text>

                {/* Imagens Secundárias */}
                <Text style={styles.subtitle}>Por que quebrar preconceitos é importante?</Text>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1519222970733-f546218fa6d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' }}
                    style={styles.secondaryImage}
                    resizeMode="cover"
                />
                <Text style={styles.content}>
                    A sociedade ainda carrega preconceitos sobre saúde mental, criando barreiras para quem precisa de ajuda.{"\n"}
                    - Quebrar estigmas facilita o acesso ao tratamento.{"\n"}
                    - Promove a empatia e compreensão nas relações sociais.{"\n"}
                    - Reduz o isolamento e o sofrimento silencioso de muitas pessoas.
                </Text>

                {/* Dica visual */}
                <Text style={styles.quote}>
                    "A mente saudável é a base para uma vida plena. Invista em você e no seu bem-estar."
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff', // Alterado para branco
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: '#00796b',
        padding: 10,
        borderRadius: 50,
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 70, // Distância maior para evitar sobreposição do botão com o título
        paddingBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#004d40',
        textAlign: 'center',
        marginBottom: 20,
    },
    mainImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 20,
    },
    content: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        textAlign: 'justify',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#00796b',
        marginBottom: 10,
    },
    secondaryImage: {
        width: '100%',
        height: 150,
        borderRadius: 12,
        marginBottom: 20,
    },
    quote: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#004d40',
        textAlign: 'center',
        backgroundColor: '#b2dfdb',
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,
    },
});
