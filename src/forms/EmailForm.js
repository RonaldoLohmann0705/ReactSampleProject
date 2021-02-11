import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, Button, Text } from 'react-native';
import { setToken } from '../api/token';

const EmailForm = ({ buttonText, onSubmit, onAuthentication, children }) => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submit = () => {
        onSubmit(email, password).then(res => {
            if (res.status == 201) {
                alert("usuário criado!");
            }
            setToken(res.data.data.id);
            onAuthentication(res.data.data);
        })
            .catch(error => {
                console.log(error);
                alert(error.error);
            });

    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={(text) => onChangeEmail(text)}
                value={email}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => onChangePassword(text)}
                value={password}
                secureTextEntry
            />
            <Button title={buttonText} onPress={submit} />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            {children}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
    },
});

export default EmailForm;