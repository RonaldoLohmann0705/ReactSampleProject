import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import EmailForm from '../forms/EmailForm';
import { createAccount } from '../api/LoginService';

const CreateAccountScreen = ({ navigation }) => {
    return (
        <EmailForm
            buttonText="Sign up"
            onSubmit={createAccount}
            onAuthentication={() => navigation.navigate('Home')}
        >
            <Button
                title="Back to log in"
                onPress={() => navigation.navigate('Login')}
            />
        </EmailForm>
    );
};

export default CreateAccountScreen;