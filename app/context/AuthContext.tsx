import { Children, createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: (email: string, password: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onUpdate?: (id: string, email: string, password: string) => Promise<any>
    onLogout?: () => Promise<any>
}

export const TOKEN_KEY = 'my-jwt';
export const CURRENT_USER = 'user';
export const API_URL = 'http://192.168.81.185:5000/api';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            const user = await SecureStore.getItemAsync(CURRENT_USER);
            console.log('====================================');
            console.log('stored token', token);
            console.log('stored user', user);
            console.log('====================================');

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            }

            setAuthState({
                token: token,
                authenticated: true
            });
        }
        loadToken()

    }, []);


    const register = async (email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/user/register`, { email, password });
        } catch (error: any) {
            return { error: true, msg: (error).response.data.msg }
        }
    }

    const login = async (email: string, password: string) => {
        
        try {
            const result = await axios.post(`${API_URL}/user/login`, { email, password });
            console.log("result login", result.data);
            
            setAuthState({
                token: result.data.accessToken,
                authenticated: true
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.accessToken);
            await SecureStore.setItemAsync(CURRENT_USER, result.data.user);
            
            return result.data;
        } catch (error: any) {
            console.error("Error login", error.message);
            
            return { error: true, msg: error.response.data.message }
        }
    }

    const update = async (id: string, email: string, password: string) => {
        
        try {
            const result = await axios.put(`${API_URL}/user/update`, { id, email, password });
            console.log("result user update", result.data);

            await SecureStore.setItemAsync(CURRENT_USER, result.data.user);
            
            return result.data;
        } catch (error: any) {
            console.error("Error login", error.message);
            
            return { error: true, msg: error.response.data.message }
        }
    }

    const logout = async () => {
        // delete token from storage
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        // update HTTP headers
        axios.defaults.headers.common['Authorization'] = '';

        // reset auth state
        setAuthState({
            token: null,
            authenticated: false
        })
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        onUpdate: update,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}