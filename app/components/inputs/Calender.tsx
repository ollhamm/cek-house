"use client";

import React from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalenderProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const Calender: React.FC<CalenderProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  return (
    <DateRange
      ranges={[value]}
      date={new Date()}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      onChange={onChange}
      disabledDates={disabledDates}
      rangeColors={["#3d91ff"]}
    />
  );
};

export default Calender;
