import React from 'react';import {NavigationContainer} from '@react-navigation/native';
import {View, Text, StyleSheet, Image} from 'react-native';

const BemVindoScreen = () => {
    return (
        <View style={StyleSheet.container}>
            <View >
                <Image source={require("../img/background.png")} />
            </View>
            <Text style={StyleSheet.title}>Bem-vindo ao Sistema!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#ffffff",
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        fontSize: 20,
    }
    
});

export default BemVindoScreen;