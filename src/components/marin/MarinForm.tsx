import { useState } from "react"
import Marin from "../../types/Marin";
import ButtonForm from "../ButtonForm";

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

      const inputClass = "shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out";
      const labelClass = "block text-gray-700 text-sm font-bold mb-2";

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className=" w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-6">
                    <label 
                        className={labelClass} 
                        htmlFor="tuition">
                        Nombre
                    </label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={marin.name}
                    onChange={handleChange}
                    className={`${inputClass} pl-10`}
                    required
                    />
                </div>
                <div className="mb-4">
                <label 
                    className={labelClass}
                    htmlFor="tuition"
                >
                        Apellido
                    </label>
                    <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    minLength={4}
                    maxLength={20}
                    value={marin.lastname}
                    onChange={handleChange}
                    className={inputClass}
                    required
                    />
                </div>
                <div className="mb-4">
                <label 
                    className={labelClass}
                    htmlFor="tuition">
                        Dni
                    </label>
                    <input
                    type="text"
                    id="dni"
                    name="dni"
                    min={8}
                    max={8}
                    value={marin.dni}
                    onChange={handleChange}
                    className={labelClass}
                    required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <ButtonForm type='submit' > 
                        {initialMarin ? 'Actualizar Marin' : 'Añadir Marin'}
                    </ButtonForm>
                </div>
            </form>
        </div>
    )
}