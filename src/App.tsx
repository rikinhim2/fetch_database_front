import React from 'react';
import DateRangePicker from './components/DateRangePicker';

function App() {
  const callbackHandler = (
    from: Date | null | undefined,
    to: Date | null | undefined,
  ) => {
    console.log(from);
    console.log(to);
  };

  return <DateRangePicker callbackHandler={callbackHandler} />;
}

export default App;
