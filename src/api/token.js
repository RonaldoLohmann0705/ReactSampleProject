import AsyncStorage from 'react-native';

export const getToken = async () => {
    const value = await AsyncStorage.getItem('@auth_token');
};

export const setToken = async (token) => {
    try {
        await AsyncStorage.setItem('@auth_token', token);
    } catch (e) {
        return null;
    }
};