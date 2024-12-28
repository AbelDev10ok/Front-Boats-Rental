import { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from 'lucide-react';
import Boat from "../types/Boat";

interface RentalCalendarProps {
    onDateChange: (startDate: Date | null , endDate: Date | null ) => void;
    handleBoatClick: (boat: Boat) => void;
  }
  

export default function RentalCalendar({ onDateChange }: RentalCalendarProps) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isSingleDate, setIsSingleDate] = useState(false);
  
    const handleDateChange = (dates: [Date | null, Date | null]) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
      onDateChange(start, end);
    };
  
    const toggleDateMode = () => {
      setIsSingleDate(!isSingleDate);
      setStartDate(null);
      setEndDate(null);
      onDateChange(null,null);
    };
  
    return (
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* <div className="bg-blue-600 text-white p-4">
          <h2 className="text-2xl font-bold">Seleccionar Fechas</h2>
        </div> */}
        <div className=" text-white p-4 ">
            <h3 className=" text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <Calendar className="mr-2" /> Selecciona tus Fechas
            </h3>
        </div>
        <div className="p-4">
          <button
            onClick={toggleDateMode}
            className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isSingleDate ? 'Cambiar a Rango' : 'Cambiar a Fecha Única'}
          </button>
          <div className="relative">
            <DatePicker
              selected={startDate}
              onChange={isSingleDate ? 
                (date: Date | null) => handleDateChange([date, null]) : 
                (dates: [Date | null, Date | null]) => handleDateChange(dates)
              }
              startDate={startDate}
              endDate={endDate}
              selectsRange={!isSingleDate}
              minDate={new Date()} // Esto deshabilita las fechas anteriores a hoy
              isClearable={true}
              showPopperArrow={false}
              inline
              calendarClassName="bg-white rounded-lg overflow-hidden"
              wrapperClassName="w-full"
              dayClassName={date => 
                date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear()
                  ? "bg-blue-100 rounded-full font-bold text-blue-600"
                  : "hover:bg-gray-100 rounded-full"
              }
              monthClassName={() => "font-semibold text-gray-700"}
              weekDayClassName={() => "font-medium text-gray-500 uppercase text-xs"}
              fixedHeight
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="flex items-center justify-between px-2 py-2">
                  <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className="text-gray-600 hover:text-gray-800">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-lg font-bold text-gray-800">
                    {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </span>
                  <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className="text-gray-600 hover:text-gray-800">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            />
          </div>
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <p className="text-lg font-semibold text-gray-800">
              {isSingleDate
                ? startDate
                  ? `Fecha seleccionada: ${startDate.toLocaleDateString()}`
                  : 'Selecciona una fecha'
                : startDate && endDate
                ? `Rango: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                : startDate
                ? `Inicio: ${startDate.toLocaleDateString()}`
                : 'Selecciona un rango de fechas'}
            </p>
          </div>
        </div>
      </div>
    );
}