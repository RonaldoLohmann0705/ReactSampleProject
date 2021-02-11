import { createStackNavigator, createSwitchNavigator, createAppContainer } from "react-navigation"

import Login from "./screens/Login"

import Dashboard from "./screens/app/Dashboard";

// Auth Stack Navigation
const Auth = createStackNavigator({
    LoginScreen: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    }
})

// Main App Stack Navigation
const App = createStackNavigator({
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            header: null
        }
    }
})

// Switcher decides which screen loads first 
// It is a best practice to keep two separate stack for Authentication part and 
// Main Application screen which should be restricted to only Users who successfully login
// You can learn more about react-navigation on https://reactnavigation.org
const Switcher = createSwitchNavigator({
    Auth,
    App,
}, {
        initialRouteName: "Auth"
    })

const Navigation = createAppContainer(Switcher)

export default Navigation