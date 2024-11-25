import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // SafeAreaView
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

import logo from '../assets/image5.png';
import emailIcon from '../assets/icons8-nova-mensagem-50.png';
import passwordIcon from '../assets/icons8-lock-50.png';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        setEmail('');
        setPassword('');
        navigation.navigate('PassoAPasso', { screen: 'PassoAPasso' });
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login: ', error);
      let errorMessage = '';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'E-mail inválido.';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'E-mail ou senha incorretos.';
          break;
        default:
          errorMessage = 'Ocorreu um erro ao tentar fazer login.';
      }
      Alert.alert('Erro', errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.logoText}>Positive Mind</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.welcomeText}>Seja-bem vindo</Text> {/* Texto H1 */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>E-mail</Text>
          <View style={styles.inputWrapper}>
            <Image source={emailIcon} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Senha</Text>
          <View style={styles.inputWrapper}>
            <Image source={passwordIcon} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
          </View>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword} onPress={() => navigation.navigate('RedefinirSenha')}>
            Esqueceu sua senha?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>ou</Text>
        <Text style={styles.signupText}>
          É novo por aqui?{' '}
          <Text style={styles.signupLink} onPress={() => navigation.navigate('Cadastro')}>
            Cadastre-se
          </Text>
        </Text>

        {/* Direitos reservados */}
        <Text style={styles.footerText}>Todos os direitos reservados a Positive Mind</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F5F2',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    marginTop: 60,
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginTop: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B7349',
    marginBottom: 20, // Espaçamento entre o texto e o formulário
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    color: '#555',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  inputIcon: {
    position: 'absolute',
    left: 15,
    top: 15,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    paddingLeft: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#71BE99',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#71BE99',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1B7349',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    marginBottom: 10,
    color: '#555',
  },
  signupText: {
    color: '#555',
    marginBottom: 20, // Espaçamento entre o texto e o rodapé
  },
  signupLink: {
    color: '#71BE99',
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
