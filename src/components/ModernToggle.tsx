import React from 'react';
import './ModernToggle.css';

interface ModernToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const ModernToggle: React.FC<ModernToggleProps> = ({
  label,
  checked,
  onChange,
  className = '',
}) => {
  return (
    <div className={`modern-toggle-container ${className}`}>
      <label className="modern-toggle-label">{label}</label>
      <div
        className={`modern-toggle ${checked ? 'modern-toggle--checked' : ''}`}
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onChange(!checked);
          }
        }}
      >
        <div className="modern-toggle__track">
          <div className="modern-toggle__thumb" />
        </div>
      </div>
    </div>
  );
};

export default ModernToggle;