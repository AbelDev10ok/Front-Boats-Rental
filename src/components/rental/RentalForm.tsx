import React, { useState } from 'react';
import RentalResponse from '../../types/RentalResponse';
import ButtonForm from '../ButtonForm';


interface RentalFormProps {
  onSubmit: (boat: RentalResponse) => void;
  initialRental?: RentalResponse;
}

export default function BoatForm({ onSubmit, initialRental }: RentalFormProps) {
    const [rentalData, setRentalData] = useState<RentalResponse>(
        initialRental || {
          id: 0,
          dateInit: '',
          dateEnd: '',
          state: '', //pend,conf,canc
          total: 0,
          username:'',
          tuitionBoat:0,
        }
      );
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    
        const { name, value } = e.target;

        setRentalData(prevRental => ({
                ...prevRental,[name]: value}));

    
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(rentalData);
        if (!initialRental) {
          setRentalData({
            id: 0,
            dateInit: '',
            dateEnd: '',
            state: '',
            total: 0,
            username:'',
            tuitionBoat:0,
          });
        }
      };

  const inputClass = "shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out";
  const labelClass = "block text-gray-700 text-sm font-bold mb-2";

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8">

      <div className="mb-4">
        <label 
          className={labelClass} 
          htmlFor="dateInit">
            Fecha de Inicio
        </label>
        <input 
        className={`${inputClass} pl-10`}
        type="date" 
        id="dateInit" 
        name="dateInit" 
        value={rentalData.dateInit} 
        onChange={handleChange} required />
      </div>
      <div className="mb-4">
        <label 
          className={labelClass} 
          htmlFor="dateEnd">
            Fecha de Fin
        </label>
        <input 
        className={`${inputClass} pl-10`}
        type="date" 
        id="dateEnd" 
        name="dateEnd" 
        value={rentalData.dateEnd} 
        onChange={handleChange} required />
      </div>
        <input 
        className={`${inputClass} pl-10`}
        type="hidden" 
        id="userId" 
        name="userId" 
        value={rentalData.username} 
        onChange={handleChange}  />
      <div className="mb-4">
        <label 
          className={labelClass} 
          htmlFor="total">
            Total
        </label>
        <input 
        className={`${inputClass} pl-10`}
        type="number" 
        id="total" 
        name="total" value={rentalData.total} readOnly /> {/* Make total read-only */}
      </div>

      <div className="mb-4">
      <label 
        className={labelClass}
        htmlFor="state">Estado de la renta</label>
        <select
          className={`${inputClass} pl-10`}
          id="state"
          name="state"
          value={rentalData.state}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un estado</option>
          <option value="PENDIENTE">Pendiente</option>
          <option value="CONFIRMADO">Confirmada</option>
          <option value="CANCELADO">Cancelada</option>
          <option value="FINALIZADA">Finalizado</option>
        </select>
      </div>

      <ButtonForm type='submit' > 
        {initialRental ? 'Actualizar Renta' : 'Añadir Renta'}
      </ButtonForm>
    </form>
  );
}

