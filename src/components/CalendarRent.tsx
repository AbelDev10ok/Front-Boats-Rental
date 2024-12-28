import Calendar from "react-calendar";

// interface CalendarRentProps {
//   handleDateChange: (date: Date[] ) => void; 
// }

// {handleDateChange }: CalendarRentProps
export default function CalendarRent() {
    return (
      <Calendar 
        // onChange={handleDateChange}
        minDate={new Date()}
        selectRange={true}
        className={'calendar'}
        locale='en'
        formatLongDate={()=>{
          return ('YYYY-MM-dd');
        }}
      />
    );
  }