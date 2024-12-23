import React, { useState } from 'react';
import Boat from '../../types/Boat';
import { SailboatIcon, Anchor, Users, DollarSign } from 'lucide-react';
import ButtonForm from '../ButtonForm';

interface BoatFormProps {
  onSubmit: (boat: Boat) => void;
  initialBoat?: Boat;
}

export default function BoatForm({ onSubmit, initialBoat }: BoatFormProps) {
  const [boat, setBoat] = useState<Boat>(
    initialBoat || {
      tuition: 0,
      type: '',
      ability: 0,
      name: '',
      model: '',
      priceHours: ''
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBoat(prevBoat => ({ ...prevBoat, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(boat);
    if (!initialBoat) {
      setBoat({
        tuition: 0,
        type: '',
        ability: 0,
        name: '',
        model: '',
        priceHours: ''
      });
    }
  };

  const inputClass = "shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out";
  const labelClass = "block text-gray-700 text-sm font-bold mb-2";

  return (
    <div className='flex justify-center' >
      <form onSubmit={handleSubmit} className="w-full h-full  max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-6">
          <label className={labelClass} htmlFor="name">
            Nombre del Bote
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={boat.name}
              onChange={handleChange}
              className={`${inputClass} pl-10`}
              required
              placeholder="Ingrese el nombre del bote"
              />
            <SailboatIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="mb-6">
          <label className={labelClass} htmlFor="tuition">
            Matrícula
          </label>
          <div className="relative">
            <input
              type="text"
              id="tuition"
              name="tuition"
              value={boat.tuition}
              onChange={handleChange}
              className={`${inputClass} pl-10`}
              required
              placeholder="Ingrese la matrícula"
              />
            <Anchor className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="mb-6">
          <label className={labelClass} htmlFor="type">
            Tipo de Bote
          </label>
          <div className="relative">
            <select
              id="type"
              name="type"
              value={boat.type}
              onChange={handleChange}
              className={`${inputClass} pl-10`}
              required
              >
              <option value="">Seleccione un tipo</option>
              <option value="VELERO">Velero</option>
              <option value="YATE">Yate</option>
              <option value="LANCHA">Lancha</option>
            </select>
            <SailboatIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="mb-6">
          <label className={labelClass} htmlFor="ability">
            Capacidad
          </label>
          <div className="relative">
            <input
              type="number"
              id="ability"
              name="ability"
              value={boat.ability}
              onChange={handleChange}
              className={`${inputClass} pl-10`}
              required
              placeholder="Ingrese la capacidad"
              />
            <Users className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="mb-6">
          <label className={labelClass} htmlFor="model">
            Modelo
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={boat.model}
            onChange={handleChange}
            className={inputClass}
            required
            placeholder="Ingrese el modelo del bote"
            />
        </div>
        <div className="mb-6">
          <label className={labelClass} htmlFor="priceHours">
            Precio por hora
          </label>
          <div className="relative">
            <input
              type="number"
              id="priceHours"
              name="priceHours"
              value={boat.priceHours}
              onChange={handleChange}
              className={`${inputClass} pl-10`}
              required
              placeholder="Ingrese el precio por hora"
              />
            <DollarSign className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <ButtonForm type='submit' > 
            {initialBoat ? 'Actualizar Bote' : 'Añadir Bote'}
          </ButtonForm>
        </div>
      </form>
    </div>
  );
}

