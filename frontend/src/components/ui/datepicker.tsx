import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarDays } from "lucide-react";

type DatepickerProps = {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
};

const Datepicker: React.FC<DatepickerProps> = ({ selectedDate, onChange }) => {
  return (
    <DatePicker
      showIcon
      icon={<CalendarDays />}
      selected={selectedDate}
      onChange={onChange}
      dateFormat=" yyyy-MM-dd "
      className="w-full text-sm border px-3 py-2 rounded"
    />
  );
};

export default Datepicker;