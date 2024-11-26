import React, { useState } from 'react';

interface Boat {
  id: number;
  tuition: number;
  type: string;
  ability: number;
  name: string;
  model: string;
  state: string;
  priceHours: string;
}

interface BoatFormProps {
  onSubmit: (boat: Boat) => void;
  initialBoat?: Boat;
}

export default function BoatForm({ onSubmit, initialBoat }: BoatFormProps) {
  const [boat, setBoat] = useState<Boat>(
    initialBoat || {
      id: 0,
      tuition: 0,
      type: '',
      ability: 0,
      name: '',
      model: '',
      state: '',
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
        id: 0,
        tuition: 0,
        type: '',
        ability: 0,
        name: '',
        model: '',
        state: '',
        priceHours: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" bg-white shadow-md rounded px-8 pt-6 pb-8">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tuition">
          Matrícula
        </label>
        <input
          type="text"
          id="tuition"
          name="tuition"
          value={boat.tuition}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
          Tipo
        </label>
        <select
          id="type"
          name="type"
          value={boat.type}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">Seleccione un tipo</option>
          <option value="Velero">Velero</option>
          <option value="Yate">Yate</option>
          <option value="Lancha">Lancha</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tuition">
          Capacidad
        </label>
      <input
          type="text"
          id="ability"
          name="ability"
          value={boat.ability}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={boat.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">
          Modelo
        </label>
        <input
          type="text"
          id="model"
          name="model"
          value={boat.model}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
          Estado
        </label>
        <select
          id="state"
          name="state"
          value={boat.state}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">Seleccione un estado</option>
          <option value="Disponible">Disponible</option>
          <option value="En mantenimiento">En mantenimiento</option>
          <option value="Fuera de servicio">Fuera de servicio</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceHours">
          Precio por hora
        </label>
        <input
          type="number"
          id="priceHours"
          name="priceHours"
          value={boat.priceHours}
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
          {initialBoat ? 'Actualizar Bote' : 'Añadir Bote'}
        </button>
      </div>
    </form>
  );
}

