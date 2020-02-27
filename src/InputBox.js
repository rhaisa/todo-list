import React from 'react';
import App from './App';

export default function InputBox({ onChange, value }) {
  return (
    <input
      value={value}
      className="inputbox"
      placeholder="Enter the task"
      onChange={onChange}
    />
  );
}
