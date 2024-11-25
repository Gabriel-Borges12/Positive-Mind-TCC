import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { firebaseApp } from '../../firebase';
import { launchImageLibrary } from 'react-native-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'; // Importing SafeAreaView

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [userDocId, setUserDocId] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newBio, setNewBio] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth(firebaseApp);
        const currentUser = auth.currentUser;

        if (currentUser) {
          const db = getFirestore(firebaseApp);
          const email = currentUser.email;

          const usersCollection = collection(db, 'users');
          const q = query(usersCollection, where('email', '==', email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            setUser(userData);
            setUserDocId(userDoc.id);

            if (userData.profileImage) {
              setProfileImage(userData.profileImage);
            }
            setNewName(userData.nome || '');
            setNewBio(userData.bio || '');
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

    fetchUserData();
  }, []);

  const handleImagePick = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);

      await uploadImageToFirebase(imageUri);
    }
  };

  const uploadImageToFirebase = async (imageUri) => {
    try {
      const auth = getAuth(firebaseApp);
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error('Usuário não autenticado');
        return;
      }

      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, `profileImages/${currentUser.uid}.jpg`);

      const response = await fetch(imageUri);
      if (!response.ok) {
        console.error('Erro ao baixar a imagem para upload');
        return;
      }
      const blob = await response.blob();

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfileImageURL(downloadURL);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
    }
  };

  const updateProfileImageURL = async (url) => {
    try {
      const db = getFirestore(firebaseApp);

      if (!userDocId) {
        console.error('ID do documento do usuário não encontrado!');
        return;
      }

      const userDocRef = doc(db, 'users', userDocId);
      await updateDoc(userDocRef, { profileImage: url });
      setProfileImage(url);
    } catch (error) {
      console.error('Erro ao atualizar a URL da imagem:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const db = getFirestore(firebaseApp);

      if (!userDocId) {
        console.error('ID do documento do usuário não encontrado!');
        return;
      }

      const userDocRef = doc(db, 'users', userDocId);
      await updateDoc(userDocRef, {
        nome: newName,
        bio: newBio,
      });

      setUser((prevUser) => ({
        ...prevUser,
        nome: newName,
        bio: newBio,
      }));
      setEditing(false);
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  const handleLogout = () => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Erro ao fazer logout:', error);
      });
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleImagePick} style={styles.imageWrapper}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderImage} />
          )}
          <View style={styles.iconWrapper}>
            <Icon name="edit" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        {editing ? (
          <TextInput
            style={styles.input}
            value={newName}
            onChangeText={setNewName}
            placeholder="Escreva seu nome"
          />
        ) : (
          <Text style={styles.username}>{user.nome || 'Nome do Usuário'}</Text>
        )}

        {editing ? (
          <TextInput
            style={styles.input}
            value={newBio}
            onChangeText={setNewBio}
            placeholder="Escreva sua bio"
            multiline
          />
        ) : (
          <Text style={styles.bio}>{user.bio || 'Adicione uma bio sobre você!'}</Text>
        )}

        <Text style={styles.email}>{user.email || 'email@exemplo.com'}</Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={editing ? handleSaveChanges : () => setEditing(true)}
        >
          <Text style={styles.editButtonText}>{editing ? 'Salvar Alterações' : 'Editar Perfil'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}> Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 220,
    backgroundColor: '#25724D',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#CCCCCC',
    borderWidth: 4,
    borderColor: '#fff',
  },
  placeholderImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#CCCCCC',
    borderWidth: 4,
    borderColor: '#fff',
  },
  iconWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#25724D',
    borderRadius: 50,
    padding: 6,
  },
  card: {
    width: '90%',
    marginTop: -50,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  bio: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: '#4caf50',
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    color: '#333',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
  },
  editButton: {
    backgroundColor: '#25724D',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProfileScreen;
