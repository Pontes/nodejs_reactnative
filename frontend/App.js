import React, { useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import BemVindoScreen from './screens/BemVindoScreen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, Button, Alert, SafeAreaView } from 'react-native';
import axios from 'axios';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="BemVindo" component={BemVindoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post('http://localhost:3000/api/user/login', { email, password })
      .then(response => {
        navigation.navigate('BemVindo'); 
      })
      .catch(error => {
        Alert.alert('Falha ao efetuar Login: ' + error.message);
      });
  };

  return (
    <View style={styles.container}>

      <Image source={require('./img/logo.png')} style={styles.marginImg} />

      <Text style={styles.titulo}>EFETUAR LOGIN</Text>
      <TextInput 
        style={styles.inputs}
        onChangeText={text => setEmail(text.toLocaleLowerCase())}
        value={email}
        placeholder='Email'
        autoCapitalize='none'
      />
       <TextInput 
        style={styles.inputs}
        onChangeText={setPassword}
        value={password}
        placeholder='Password'
        secureTextEntry={true}
      />
      <View style={styles.botoes}>
        <Button
          title="LOGAR"
          onPress={handleLogin}
        />
        {/* <Button
          title="CADASTRAR"
          onPress={handleRegister}
        /> */}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    color: '#B0C4DE',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputs:{
    borderColor: '#efefef',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    width: 220,
    margin: 8,
    padding: 8,
  },
  marginImg:{
    marginBottom: 20,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
