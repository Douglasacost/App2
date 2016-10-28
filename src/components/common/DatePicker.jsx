import React from 'react';
import { DateField } from 'react-date-picker';
import 'react-date-picker/index.css';

export default () => {
  return <DateField
    dateFormat="YYYY-MM-DD"
  />
}