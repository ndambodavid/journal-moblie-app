import { View, Text } from 'react-native'
import React from 'react'
import LoginScreen from 'react-native-login-screen'
import { router } from 'expo-router';
import { useAuth } from './context/AuthContext';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [registerUi, setRegisterUi] = React.useState<boolean>(false);
    const {onLogin, onRegister} = useAuth();

    const login = async () => {
        const result = await onLogin!(email, password);
        if (result && result.error) {
            alert(result.msg);
        }
        if (result.success) {
            alert("login successful")
            router.replace("(tabs)")
        }
    }

    // we automatically call the login after a successful registration
    const register = async () => {
        const result = await onRegister!(email, password);
        if (result && result.error) {
            alert(result.msg);
        } else {
            login();
        }
    }

    const updateUi = () => {
        if (registerUi) {
            setRegisterUi(false);
        } else {
            setRegisterUi(true);
        }
    }
    return (
        <>
            {
                registerUi ? (
                    <LoginScreen
                        logoImageSource={require('@/assets/images/react-logo.png')}
                        onLoginPress={() => register()}
                        onSignupPress={() => updateUi()}
                        signupText='Already have an account?'
                        loginButtonText='Register'
                        disableSocialButtons={true}
                        onEmailChange={setEmail}
                        onPasswordChange={setPassword}
                    />
                ) : (
                    <LoginScreen
                        logoImageSource={require('@/assets/images/react-logo.png')}
                        onLoginPress={() => login()}
                        onSignupPress={() => updateUi()}
                        disableSocialButtons={true}
                        onEmailChange={setEmail}
                        onPasswordChange={setPassword}
                    />
                )
            }
        </>

    )
}

export default Login