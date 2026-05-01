// src/components/ui/Button.jsx
import React from 'react';

export default function Button(props) {
  let variant = props.variant;
  if (!variant) {
    variant = 'solid';
  }

  // Basic styles that apply to all buttons
  let bgColor = 'rgba(0, 242, 255, 0.05)';
  let textColor = '#00f2ff'; // accent
  let borderColor = 'rgba(0, 242, 255, 0.2)'; // accent-glow
  let shadow = '0 0 10px rgba(0, 242, 255, 0.1)';
  let padding = '8px 24px';
  let borderRadius = '2px';

  if (variant === 'ghost') {
    bgColor = 'transparent';
    textColor = '#8bb6d9'; // text-secondary
    borderColor = 'transparent';
    shadow = 'none';
  } else if (variant === 'icon') {
    bgColor = 'rgba(255, 255, 255, 0.03)';
    textColor = '#8bb6d9';
    borderColor = 'rgba(255, 255, 255, 0.05)';
    shadow = 'none';
    padding = '8px';
    borderRadius = '8px'; // radius-md
  }

  const combinedStyle = {
    padding: padding,
    borderRadius: borderRadius,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    transition: 'all 0.3s',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '11px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    border: `1px solid ${borderColor}`,
    backgroundColor: bgColor,
    color: textColor,
    boxShadow: shadow,
  };
  
  // Custom properties passed down
  if (props.style) {
    Object.assign(combinedStyle, props.style);
  }

  function handleMouseEnter(e) {
    if (variant === 'solid') {
      e.currentTarget.style.backgroundColor = 'rgba(0, 242, 255, 0.15)';
      e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 242, 255, 0.5), inset 0 0 10px rgba(0, 242, 255, 0.2)';
      e.currentTarget.style.borderColor = '#00f2ff';
      e.currentTarget.style.color = 'white';
      e.currentTarget.style.transform = 'skewX(-10deg)';
    } else {
      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
      e.currentTarget.style.color = 'white';
      if (variant === 'icon') {
        e.currentTarget.style.borderColor = '#00f2ff';
      }
    }
  }

  function handleMouseLeave(e) {
    e.currentTarget.style.backgroundColor = bgColor;
    e.currentTarget.style.boxShadow = shadow;
    e.currentTarget.style.borderColor = borderColor;
    e.currentTarget.style.color = textColor;
    e.currentTarget.style.transform = 'skewX(0deg)';
  }

  return (
    <button 
      style={combinedStyle} 
      className={`${props.className || ''} group`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={props.onClick}
      disabled={props.disabled}
      title={props.title}
    >
      <span style={{ 
        position: 'relative', 
        zIndex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        transform: 'skewX(0deg)' 
      }}>
        {props.children}
      </span>
      {/* Glow scan effect */}
      <div className="scan-effect" style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '50%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(0, 242, 255, 0.2), transparent)',
        transform: 'skewX(-25deg)',
        transition: '0s'
      }} />
    </button>
  );
}
