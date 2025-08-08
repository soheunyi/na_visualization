import React from 'react';
import './ModernInputGroup.css';

interface InputConfig {
  name: string;
  value: number | boolean;
  type: 'number' | 'checkbox';
}

interface ModernInputGroupProps {
  title: string;
  inputs: InputConfig[];
  onChange: (inputs: InputConfig[]) => void;
  className?: string;
}

const ModernInputGroup: React.FC<ModernInputGroupProps> = ({
  title,
  inputs,
  onChange,
  className = '',
}) => {
  const handleInputChange = (index: number, newValue: number | boolean) => {
    const updatedInputs = inputs.map((input, i) =>
      i === index ? { ...input, value: newValue } : input
    );
    onChange(updatedInputs);
  };

  return (
    <div className={`modern-input-group ${className}`}>
      <h4 className="modern-input-group__title">{title}</h4>
      <div className="modern-input-group__inputs">
        {inputs.map((input, index) => (
          <div key={input.name} className="modern-input-item">
            <label className="modern-input-label">{input.name}</label>
            {input.type === 'number' ? (
              <input
                type="number"
                value={input.value as number}
                onChange={(e) => handleInputChange(index, parseFloat(e.target.value) || 0)}
                className="modern-number-input"
                step="any"
              />
            ) : (
              <div
                className={`modern-checkbox ${input.value ? 'modern-checkbox--checked' : ''}`}
                onClick={() => handleInputChange(index, !input.value)}
                role="checkbox"
                aria-checked={input.value as boolean}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handleInputChange(index, !input.value);
                  }
                }}
              >
                <div className="modern-checkbox__box">
                  {input.value && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModernInputGroup;