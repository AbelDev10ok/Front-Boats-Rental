import { useLoginForm } from '../hooks/useFormLogin';
import { Toaster } from 'react-hot-toast';

export default function Form(){
    const { 
        formData, 
        handleInputChange, 
        error, 
        isLoading, 
        isLogin, 
        setIsLogin, 
        handleLogin, 
        handleRegister 
      } = useLoginForm();
    
      const validateForm = () => {
        const errors: { [key: string]: string } = {};
        if (!formData.email) {
          errors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          errors.email = 'Email inválido';
        }
        if (!formData.password) {
          errors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 3) {
          errors.password = 'La contraseña debe tener al menos 3 caracteres';
        }
        return errors;
      };
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
          if (isLogin) {
            await handleLogin();
          } else {
            await handleRegister();
          }
        }
      };
    
      return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <Toaster position="top-right" />
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {isLogin ? 'Iniciar sesión' : 'Registrarse'}
            </h2>
          </div>
    
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
    
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
    
                {error && (
                  <div className="text-red-600 text-sm">{error}</div>
                )}
    
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Cargando...' : (isLogin ? 'Iniciar sesión' : 'Registrarse')}
                  </button>
                </div>
              </form>
    
              <div className="mt-6">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="w-full text-center text-sm text-indigo-600 hover:text-indigo-500"
                >
                  {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
  