import React, { useState, useRef, useEffect } from 'react';
import './ModernSelect.css';

interface Option {
  value: string | any;
  label: string;
}

interface ModernSelectProps {
  label: string;
  options: Option[];
  value?: string;
  onChange: (option: Option) => void;
  className?: string;
}

const ModernSelect: React.FC<ModernSelectProps> = ({
  label,
  options,
  value,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find(opt => typeof opt.value === 'string' ? opt.value === value : opt.label === value) || options[0] || null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={`modern-select-container ${className}`}>
      <label className="modern-select-label">{label}</label>
      <div className="modern-select" ref={dropdownRef}>
        <div
          className={`modern-select__trigger ${isOpen ? 'modern-select__trigger--open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className="modern-select__value">
            {selectedOption?.label || 'Select option'}
          </span>
          <div className="modern-select__arrow">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        
        {isOpen && (
          <div className="modern-select__dropdown">
            <div className="modern-select__options" role="listbox">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`modern-select__option ${
                    selectedOption?.value === option.value ? 'modern-select__option--selected' : ''
                  }`}
                  onClick={() => handleOptionClick(option)}
                  role="option"
                  aria-selected={selectedOption?.value === option.value}
                >
                  <span className="modern-select__option-text">{option.label}</span>
                  {selectedOption?.value === option.value && (
                    <div className="modern-select__check">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M13.5 4.5L6 12L2.5 8.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernSelect;