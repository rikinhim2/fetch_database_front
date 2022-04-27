import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';

import styles from './DateRangePicker.module.scss';

interface DateRangePickerProps {
  callbackHandler(
    from: Date | null | undefined,
    to: Date | null | undefined,
  ): void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  callbackHandler,
}) => {
  const [valueFrom, setValueFrom] = useState<Date | null>(new Date());
  const [valueTo, setValueTo] = useState<Date | null>(new Date());

  const onClickHandler = (
    from: Date | null | undefined,
    to: Date | null | undefined,
  ) => {
    callbackHandler(from, to);
  };

  return (
    <div className={styles.pickerBox}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start Date"
          value={valueFrom}
          onChange={(value) => {
            setValueFrom(value);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <div className={styles.hSpacer} />
        <DatePicker
          label="End Date"
          value={valueTo}
          onChange={(value) => {
            setValueTo(value);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <div className={styles.hSpacer} />
        <Button
          variant="outlined"
          onClick={() => {
            onClickHandler(valueFrom, valueTo);
          }}
        >
          Download
        </Button>
      </LocalizationProvider>
    </div>
  );
};

export default DateRangePicker;
