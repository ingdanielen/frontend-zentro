import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Buscar productos...', onSearch, initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(value);
    }
  };

  return (
    <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2">
      <Search className="text-gray-400 mr-2" size={20} />
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent outline-none text-gray-800 w-full text-base"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar; 