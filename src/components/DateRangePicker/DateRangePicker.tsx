import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';

interface DateRangePickerProps {
  callbackHandler(
    from: Date | null | undefined,
    to: Date | null | undefined,
  ): void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  callbackHandler,
}) => {
  const [valueFrom, setValueFrom] = useState<Date | null>();
  const [valueTo, setValueTo] = useState<Date | null>();

  const onClickHandler = (
    from: Date | null | undefined,
    to: Date | null | undefined,
  ) => {
    callbackHandler(from, to);
    console.log(from);
    console.log(to);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Start Date"
        value={valueFrom}
        onChange={(value) => {
          setValueFrom(value);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <DatePicker
        label="End Date"
        value={valueTo}
        onChange={(value) => {
          setValueTo(value);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <Button
        variant="outlined"
        onClick={() => {
          onClickHandler(valueFrom, valueTo);
        }}
      >
        Outlined
      </Button>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
