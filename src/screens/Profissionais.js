import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Modal,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firestore } from '../../firebase';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

// Importação das imagens locais
import borgesImage from '../assets/productoOwnerBorges.jpeg';
import marianeImage from '../assets/desenvolvedoraMariane.jpg';
import leonardoImage from '../assets/desenvolvedorLeonardo.jpg';
import luisImage from '../assets/desenvolvedorLuis.jpg';

const professionalsData = [
    {
        id: '1',
        name: 'Gabriel Borges',
        rating: 5,
        city: 'São Paulo',
        image: borgesImage,
        phone: '(11) 98765-4321',
        age: 34,
        address: 'Av. Paulista, 1000',
        workingHours: 'Seg - Sex: 9h - 18h',
    },
    {
        id: '2',
        name: 'Mariane Letícia',
        rating: 4.5,
        city: 'Rio de Janeiro',
        image: marianeImage,
        phone: '(21) 91234-5678',
        age: 29,
        address: 'Rua da Glória, 500',
        workingHours: 'Seg - Sáb: 10h - 17h',
    },
    {
        id: '3',
        name: 'Leonardo Lopes',
        rating: 5,
        city: 'Belo Horizonte',
        image: leonardoImage,
        phone: '(31) 92345-6789',
        age: 40,
        address: 'Av. Afonso Pena, 1200',
        workingHours: 'Seg - Qui: 8h - 16h',
    },
    {
        id: '4',
        name: 'Luis Augusto',
        rating: 4.5,
        city: 'Curitiba',
        image: luisImage,
        phone: '(41) 99876-5432',
        age: 37,
        address: 'Rua XV de Novembro, 800',
        workingHours: 'Seg - Sex: 9h - 19h',
    },
];

const App = () => {
    const [searchText, setSearchText] = useState('');
    const [filteredProfessionals, setFilteredProfessionals] = useState(professionalsData);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [userRating, setUserRating] = useState({});

    const handleSearch = () => {
        setLoading(true);
        const filtered = professionalsData.filter(
            (pro) =>
                pro.name.toLowerCase().includes(searchText.toLowerCase()) ||
                pro.city.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredProfessionals(filtered);
        setLoading(false);
    };

    const handleProfileView = (professional) => {
        setSelectedProfessional(professional);
        setModalVisible(true);
    };

    const handleRating = (professionalId, rating) => {
        const userId = 'uid123'; // Substitua pelo ID do usuário logado (use autenticação)
        setUserRating((prevRatings) => ({
            ...prevRatings,
            [professionalId]: rating,
        }));
        saveRating(userId, professionalId, rating); // Salva a avaliação no Firestore
        setModalVisible(false);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.profilePic}>
                <Image source={item.image} style={styles.image} />
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.starsContainer}>
                    {Array.from({ length: 5 }, (_, i) => (
                        <Ionicons
                            key={i}
                            name="star"
                            size={20}
                            color={i < (userRating[item.id] || 0) ? '#FDD835' : '#C5C5C5'}
                        />
                    ))}
                </View>
                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={() => handleProfileView(item)}
                >
                    <Text style={styles.profileButtonText}>Ver perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}> {/* Wrapping with SafeAreaView */}
            <Text style={styles.title}>Encontre os melhores psicólogos da região</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Onde você está?"
                    placeholderTextColor="#B0C4DE" // Evita piscar no placeholder
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Ionicons name="search-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            <FlatList
                data={filteredProfessionals}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedProfessional && (
                            <>
                                <Text style={styles.modalTitle}>{selectedProfessional.name}</Text>
                                <Image source={selectedProfessional.image} style={styles.modalImage} />
                                <Text style={styles.modalText}>Telefone: {selectedProfessional.phone}</Text>
                                <Text style={styles.modalText}>Idade: {selectedProfessional.age} anos</Text>
                                <Text style={styles.modalText}>Endereço: {selectedProfessional.address}</Text>
                                <Text style={styles.modalText}>Horário de serviço: {selectedProfessional.workingHours}</Text>

                                <Text style={styles.modalText}>Avalie este profissional:</Text>
                                <View style={styles.starsContainer}>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <TouchableOpacity
                                            key={i}
                                            onPress={() => handleRating(selectedProfessional.id, i + 1)}
                                        >
                                            <Ionicons
                                                name="star"
                                                size={30}
                                                color={i < (userRating[selectedProfessional.id] || 0) ? '#FDD835' : '#C5C5C5'}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>Fechar</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView> 
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FAFA',
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 20,
        color: '#2A4D69',
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
        color: '#2A4D69',
        outlineStyle: 'none', // Remove o contorno no foco
        borderColor: 'transparent', // Caso o contorno ainda apareça
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 16,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    profilePic: {
        marginRight: 16,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#2A4D69',
    },
    cardContent: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: '#2A4D69',
    },
    starsContainer: {
        flexDirection: 'row',
    },
    profileButton: {
        marginTop: 12,
        backgroundColor: '#56C5A8',
        borderRadius: 20,
        paddingVertical: 8,
        alignItems: 'center',
    },
    profileButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        width: '85%',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 15,
        color: '#2A4D69',
    },
    modalText: {
        fontSize: 16,
        marginVertical: 5,
        color: '#4A4A4A',
    },
    modalImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginVertical: 15,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#FF5C5C',
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
});

export default App;
