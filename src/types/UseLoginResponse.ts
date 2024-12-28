
interface UseLoginFormReturn {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    error: string;
    handleSubmitLog: (e: React.FormEvent) => Promise<void>;
    handleSubmitRegister:(e: React.FormEvent) => Promise<void>;
}

export default UseLoginFormReturn;