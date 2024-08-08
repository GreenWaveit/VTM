import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import styles from "./index.module.css"; // Import your styles

interface Option {
  id: string;
  name: string;
}

interface SearchableSingleSelectProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchableSingleSelect: React.FC<SearchableSingleSelectProps> = ({
  options,
  selectedValue,
  onChange,
  placeholder = "Select...",
}) => {
  const [searchTerm, setSearchTerm] = useState(selectedValue);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, options]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true); // Open dropdown when typing
  };

  const handleOptionClick = (option: Option) => {
    onChange(option.name);
    setSearchTerm(option.name); // Update input field with selected value
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const handleInputClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    setSearchTerm(selectedValue); // Ensure the search term matches the selected value
  }, [selectedValue]);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onClick={handleInputClick}
        placeholder={placeholder}
        className={styles.searchInput}
      />
      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          {filteredOptions.length === 0 ? (
            <div className={styles.noOptions}>No options found</div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                className={`${styles.dropdownOption} ${
                  searchTerm === option.name ? styles.selected : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableSingleSelect;
