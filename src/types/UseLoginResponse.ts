
interface UseLoginFormReturn {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    error: string;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export default UseLoginFormReturn;