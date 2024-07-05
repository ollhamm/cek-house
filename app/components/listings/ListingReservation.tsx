"use client";
import { Range } from "react-date-range";
import React, { useState } from "react";
import Calender from "../inputs/Calender";
import { Button } from "../Button";
import Spiner from "../Spiner";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates?: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="bg-white rounded-xl items-center justify-center border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="font-semibold">${price}</div>
      </div>
      <div>
        <Calender
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value) => onChangeDate(value.selection)}
        />
        <div className="p-4">
          <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
        </div>
        <div className="p-4 flex flex-row items-center justify-between font-semibold">
          <div>Total</div>
          <div>${totalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingReservation;
