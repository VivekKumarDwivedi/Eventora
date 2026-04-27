import React from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email,password) => {
       try{
        const {data} = await api.post('/auth/login', { email, password });
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        return data;
       } catch (error) {
        console.error('Login Failed:', error);
        throw error;
       }
    };

    const register = async (name, email,password)=> {
        try{
            const {data} = await api.post('/auth/register', { name, email, password });
            setUser(data);
            return data;
        } catch (error) {
            console.error('Register Failed:', error);
            throw error;
        }
    }
    const verifyOtp = async ()=>{
        try{
            const {data} = await api.post('/auth/verify-otp');
            setUser(data);
            localStorage.setItem('user',JSON.stringify(data));
            localStorage.setItem('token',data.token);
            return data;
        } catch (error) {
            console.error('Verify OTP Failed:', error);
            throw error;
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };
    
    return (
        <AuthContext.Provider value={{ user, loading, login, logout, verifyOtp, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return React.useContext(AuthContext);
}