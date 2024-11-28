import { useState } from "react"
import Marin from "../types/Marin";

interface MarinFormProps {
    onSubmit: (boat: Marin) => void;
    initialMarin?: Marin;
  }

export default function MarinForm({onSubmit,initialMarin}: MarinFormProps){
    const [marin,setMarin] = useState<Marin>(initialMarin || {
        id:0,
        name:'',
        lastname:'',
        dni: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setMarin(prevMarin => ({ ...prevMarin, [name]: value }));
      };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(marin);
        if (!initialMarin) {
          setMarin({
            id: 0,
            name: '',
            lastname: '',
            dni: ''
          });
        }
      };

    return (
        <form onSubmit={handleSubmit} className=" bg-white shadow-md rounded px-8 pt-6 pb-8">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tuition">
                    Nombre
                </label>
                <input
                type="text"
                id="name"
                name="name"
                value={marin.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tuition">
                    Apellido
                </label>
                <input
                type="text"
                id="lastname"
                name="lastname"
                value={marin.lastname}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tuition">
                    Dni
                </label>
                <input
                type="text"
                id="dni"
                name="dni"
                value={marin.dni}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                >
                {initialMarin ? 'Actualizar Marin' : 'Añadir Marin'}
                </button>
            </div>
        </form>
    )
}