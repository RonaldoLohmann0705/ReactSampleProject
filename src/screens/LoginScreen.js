// import React from 'react';
// import { View, Text, Button } from 'react-native';
// // import { login } from '../api/mock';

// const LoginScreen = ({ navigation }) => {
//     const loginUser = () => {
//         // login('test@test.ca', 'password')
//         //     .then(() => {
//         //         navigation.navigate('Home');
//         //     })
//         //     .catch((err) => console.log('error:', err.message));
//     };

//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>LoginScreen</Text>
//             <Button title="Log in" onPress={loginUser} />
//             <Button
//                 title="Create account"
//             // onPress={() => navigation.navigate('CreateAccount')}
//             />
//         </View>
//     );
// };

// export default LoginScreen;

import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { login } from '../api/LoginService';
import EmailForm from '../forms/EmailForm';
import { getToken } from '../api/token';

const LoginScreen = ({ navigation }) => {
    constructor(props) {
        const token = getToken();
    }
    return (
        <EmailForm
            buttonText="Log in"
            onSubmit={login}
            onAuthentication={(user) => navigation.navigate('Home', {
                user: user
            })}
        >
            <Button
                title="Create account"
                onPress={() => navigation.navigate('CreateAccount')}
            />
        </EmailForm >
    );
};

export default LoginScreen;