import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Login from '../screens/Login';
import Index from '../screens/Index';
import Cadastro from '../screens/Cadastro';
import Tutorial from '../screens/Tutorial';
import RedefinirSenha from '../screens/RedefinirSenha'; 
import AlertCadastro from '../screens/AlertCadastro';
import HomeTeste from '../screens/Home';
import Profissionais from '../screens/Profissionais';
import SplashScreen from '../screens/SplashScreen';
import DiarioEmocional from '../screens/DiarioEmocional';
import Perfil from '../screens/Perfil';  
import PassoAPasso from '../screens/PassoAPasso'; 
import Feedback from '../screens/Feedback';
import HealthDetail from '../screens/HealthDetail';
import Ansiedade from '../screens/Ansiedade';
import Estresse from '../screens/Estresse';
import BreathingExercise from '../screens/BreathingExercise';
import MuscleRelaxation from '../screens/MuscleRelaxation';
import MemoryGame from '../screens/MemoryGame';
import Dicas from '../screens/Dicas';
import Custos from '../screens/Custos';
import QuebrandoPreconceitos from '../screens/QuebrandoPreconceitos';


const Stack = createStackNavigator();
const TabBottom = createBottomTabNavigator();

// Navegação para as telas de autenticação (Login e Cadastro)
function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Tutorial"
                component={Tutorial}
            />
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="Cadastro"
                component={Cadastro}
            />
            <Stack.Screen
                name="Home"
                component={TabBottomRoutes}
            />
            <Stack.Screen
                name="AlertCadastro"
                component={AlertCadastro}
            />
             <Stack.Screen
                name="RedefinirSenha"
                component={RedefinirSenha}
            />
              <Stack.Screen
                name="HomeTeste"
                component={HomeTeste}
            />
              <Stack.Screen
                name="Profissionais"
                component={Profissionais}
            />
             <Stack.Screen
                name="Diário"
                component={DiarioEmocional}
            />
             <Stack.Screen
                name="PassoAPasso"
                component={PassoAPasso}
            />
            <Stack.Screen
                name="Feedback"
                component={Feedback}
            />
             <Stack.Screen
                name="HealthDetail"
                component={HealthDetail}
            />
             <Stack.Screen
                name="Ansiedade"
                component={Ansiedade}
            />
             <Stack.Screen
                name="Estresse"
                component={Estresse}
            />
             <Stack.Screen
                name="BreathingExercise"
                component={BreathingExercise}
            />
            <Stack.Screen
                name="MuscleRelaxation"
                component={MuscleRelaxation}
            />
            <Stack.Screen
                name="MemoryGame"
                component={MemoryGame}
            />
             <Stack.Screen
                name="Dicas"
                component={Dicas}
            />
             <Stack.Screen
                name="Custos"
                component={Custos}
            />
             <Stack.Screen
                name="QuebrandoPreconceitos"
                component={QuebrandoPreconceitos}
            />
        </Stack.Navigator>
    );
}

// Navegação para as telas principais do aplicativo (Home, Motivacao, Index)
function TabBottomRoutes() {
    return (
        <TabBottom.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
            tabBarOptions={{
                activeTintColor: '#86BAA0',
                inactiveTintColor: '#D3D3D3',
            }}
        >
            <TabBottom.Screen
                name="Início"
                component={HomeTeste}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
             {/* <TabBottom.Screen
                name="Index"
                component={Index}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'albums' : 'albums-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            /> */}
             <TabBottom.Screen
                name="Profissionais"
                component={Profissionais}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'person' : 'person-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <TabBottom.Screen
                name="Diário"
                component={DiarioEmocional}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'book' : 'book-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            {/* <TabBottom.Screen
                name="Feedback"
                component={Feedback}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'person' : 'person-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            /> */}
            {/* Nova tela de perfil adicionada aqui */}
            <TabBottom.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'person-circle' : 'person-circle-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </TabBottom.Navigator>
    );
}

// Componente principal que decide qual navegação mostrar baseado no estado de autenticação
export default function AppNavigation({ isAuthenticated }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <Stack.Screen name="Main" component={TabBottomRoutes} />
            ) : (
                <Stack.Screen name="Auth" component={AuthStack} />
            )}
        </Stack.Navigator>
    );
}