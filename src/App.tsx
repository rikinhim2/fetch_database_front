import React, { useState } from 'react';
import { Temporal } from '@js-temporal/polyfill';
import fileDownload from 'js-file-download';
import DateRangePicker from './components/DateRangePicker';
import axios from './utils/axios';

function App() {
  const [count, setCount] = useState(0);

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

    const result = await axios.get('/requestCount', {
      params: { from: tempoFrom?.toString(), to: tempoTo?.toString() },
    });

    setCount(result.data.recordCount);
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
    });

    const blob = new Blob([result.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    fileDownload(blob, 'file1.xlsx');

    setCount(result.data.recordCount);
  };

  return (
    <>
      <DateRangePicker
        countCallback={countCallback}
        downloadCallback={downloadCallback}
      />
      <h1>{count}</h1>
    </>
  );
}

export default App;
