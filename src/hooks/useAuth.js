import { useAtom, useSetAtom } from 'jotai';
import { authTokenAtom } from '../atoms/authAtom';
import axiosInstance from '../api/axiosInstance';
import { useState } from 'react';

export default function useAuth() {
    const [token, setAuthToken] = useAtom(authTokenAtom); // Read and write token
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onLogin = async (username, password) => {
        setLoading(true);
        setError("");
        try {
            const res = await axiosInstance.post("/api/v1/auth/login", {
                username,
                password,
            });
            console.log(res, "response from the server");

            const { token } = res.data.data;
            setAuthToken(token);  // Set token into Jotai

        } catch (error) {
            console.error("Login failed", error);
            setError("Login failed");
        } finally {
            setLoading(false);
        }
    };

    const onLogout = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await axiosInstance.post('/api/v1/settings/logout');
            console.log(res, "response from the server");
            setAuthToken(null);
        } catch (error) {
            console.error("Logout Failed", error);
            setError("Logout failed");
        } finally {
            setLoading(false);
        }
    };

    return {
        token,        // Now `token` is exposed
        onLogin,
        onLogout,
        loading,
        error
    };
}
