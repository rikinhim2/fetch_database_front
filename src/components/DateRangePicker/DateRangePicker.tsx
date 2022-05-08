import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';

import styles from './DateRangePicker.module.scss';

interface DateRangePickerProps {
  countCallback(
    from: Date | null | undefined,
    to: Date | null | undefined,
  ): void;
  downloadCallback(
    from: Date | null | undefined,
    to: Date | null | undefined,
  ): void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  countCallback,
  downloadCallback,
}) => {
  const [valueFrom, setValueFrom] = useState<Date | null>(new Date());
  const [valueTo, setValueTo] = useState<Date | null>(new Date());

  const onClickCount = (
    from: Date | null | undefined,
    to: Date | null | undefined,
  ) => {
    countCallback(from, to);
  };

  const onClickDownload = (
    from: Date | null | undefined,
    to: Date | null | undefined,
  ) => {
    downloadCallback(from, to);
  };

  return (
    <div className={styles.pickerBox}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          className={styles.datePicker}
          label="Start Date"
          value={valueFrom}
          onChange={(value) => {
            setValueFrom(value);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <div className={styles.hSpacer} />
        <DatePicker
          className={styles.datePicker}
          label="End Date"
          value={valueTo}
          onChange={(value) => {
            setValueTo(value);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <div className={styles.hSpacer} />
        <Button
          className={styles.button}
          variant="outlined"
          onClick={() => {
            onClickCount(valueFrom, valueTo);
          }}
        >
          Count
        </Button>
        <div className={styles.hSpacer} />
        <Button
          className={styles.button}
          variant="contained"
          onClick={() => {
            onClickDownload(valueFrom, valueTo);
          }}
        >
          Download
        </Button>
      </LocalizationProvider>
    </div>
  );
};

export default DateRangePicker;
