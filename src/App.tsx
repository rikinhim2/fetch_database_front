import React, { useState } from 'react';
import { Temporal } from '@js-temporal/polyfill';
import { saveAs } from 'file-saver';

import DateRangePicker from './components/DateRangePicker';
import Toast from './components/Toast';
import axios from './utils/axios';

function App() {
  const [count, setCount] = useState(0);
  const [openSnack, setOpenSnack] = useState(false);
  const [openErrorSnack, setOpenErrorSnack] = useState(false);

  const countCallback = async (
    from: Date | null | undefined,
    to: Date | null | undefined,
  ) => {
    const tempoFrom = from
      ? Temporal.PlainDate.from({
          year: from.getFullYear(),
          month: from.getMonth() + 1,
          day: from.getDate(),
        })
      : null;

    const tempoTo = to
      ? Temporal.PlainDate.from({
          year: to.getFullYear(),
          month: to.getMonth() + 1,
          day: to.getDate(),
        })
      : null;

    let result = null;
    try {
      result = await axios.get('/requestCount', {
        params: { from: tempoFrom?.toString(), to: tempoTo?.toString() },
      });
      setCount(result.data.recordCount);
      setOpenSnack(true);
    } catch (error) {
      setOpenErrorSnack(true);
    }
  };

  const downloadCallback = async (
    from: Date | null | undefined,
    to: Date | null | undefined,
  ) => {
    const tempoFrom = from
      ? Temporal.PlainDate.from({
          year: from.getFullYear(),
          month: from.getMonth() + 1,
          day: from.getDate(),
        })
      : null;

    const tempoTo = to
      ? Temporal.PlainDate.from({
          year: to.getFullYear(),
          month: to.getMonth() + 1,
          day: to.getDate(),
        })
      : null;

    const result = await axios.get('/downloadReport', {
      params: { from: tempoFrom?.toString(), to: tempoTo?.toString() },
      responseType: 'arraybuffer',
    });

    const blob = new Blob([result.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'report.xlsx');
  };

  return (
    <>
      <DateRangePicker
        countCallback={countCallback}
        downloadCallback={downloadCallback}
      />
      <Toast
        message={`This is a success message! ${count} is query result`}
        open={openSnack}
        callback={setOpenSnack}
        severity="success"
      />
      <Toast
        message="Error! Date range is incorrect"
        open={openErrorSnack}
        callback={setOpenErrorSnack}
        severity="warning"
      />
    </>
  );
}

export default App;
