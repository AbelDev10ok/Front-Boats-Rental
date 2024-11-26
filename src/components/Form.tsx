import { useLoginForm } from '../hooks/useFormLogin';



export default function Form(){
    const {email, setEmail, password, setPassword, error, handleSubmit}  = useLoginForm();

    
    return (
        <div className="h-70% bg-white px-10 py-10 rounded-3xl border-2 border-gray-100">
            <h1 className="text-5xl text-center font-semibold">Welcome Back</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">Welcome back! Please enter your details</p>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSubmit} className="mt-3">
                <div>
                    <label 
                        className="text-lg font-medium"
                        htmlFor="email">Email</label>
                    <input 
                        className="w-full border-2 border-gray-100 rounder-xl p-4 mt-1 bg-transparent"
                        type="emain"
                        placeholder="Enter you email"
                        name="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                     />
                </div>
                <div>
                    <label 
                        className="text-lg font-medium"
                        htmlFor="password">Password</label>
                    <input 
                        className="w-full border-2 border-gray-100 rounder-xl p-4 mt-1 bg-transparent"
                        type="text"
                        placeholder="Enter you password"
                        name="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                     />
                </div>
                <div className="mt-2 flex justify-between items-center">
                    <div>
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                        />
                        <label className="ml-2 font-medium text-base " htmlFor="remember">Remember me for 30 days</label>
                    </div>
                    <button className="font-medium text-base text-purple-500">Forgot password</button>
                </div>
                <div className="mt-4  flex justify-center gap-y-4">
                    <button 
                        type='submit'
                        className="hover:bg-purple-700 py-2 w-1/2 bg-purple-500 text-white text-lg font-bold">
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    )
}
