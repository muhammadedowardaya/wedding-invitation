'use client';
import React, { useState } from 'react';

interface FloatingLabelInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => void;
  label: string;
  type?: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ id, name, value, onChange, label, type = 'text' }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mt-4">
      <label
        htmlFor={id}
        className={`absolute transition-all duration-300 ${isFocused || value ? '-top-6 left-0 text-xs' : 'top-2 left-2'}`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e, name)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="border p-2 w-full"
      />
    </div>
  );
};

export default FloatingLabelInput;
