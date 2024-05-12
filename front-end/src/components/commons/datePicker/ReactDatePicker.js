import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReactDatePicker = () => {
    const [startDate, setStartDate] = useState('');
    const dateRef = useRef(null);

    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            ref={dateRef}
        ></DatePicker>
    )
};
export default ReactDatePicker;