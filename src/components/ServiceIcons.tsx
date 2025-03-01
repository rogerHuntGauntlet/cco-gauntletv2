import React from 'react';

// Custom SVG icons for services
export const GoogleDriveIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 87.3 78.4" className={className || "w-6 h-6"}>
    <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066DA"/>
    <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0-1.2 4.5h27.45l16.2-28z" fill="#00AC47"/>
    <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.85L73.55 76.8z" fill="#EA4335"/>
    <path d="M43.65 25L57.4 1.2c-1.35-.8-2.9-1.2-4.5-1.2H34.4c-1.6 0-3.15.45-4.5 1.2l13.75 23.8z" fill="#00832D"/>
    <path d="M59.85 53H32.4l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h45.5c1.6 0 3.15-.45 4.5-1.2L59.85 53z" fill="#2684FC"/>
    <path d="M73.4 26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.2 28h27.45c0-1.55-.4-3.1-1.2-4.5l-12.7-22z" fill="#FFBA00"/>
  </svg>
);

export const DropboxIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 43 40" className={className || "w-6 h-6"}>
    <path d="M12.6 0L0 8.3l8.7 7 12.6-8.3L12.6 0zm17.8 0l-12.6 8.3 12.6 8.3 8.7-7L30.4 0zM0 23.6l12.6 8.3 8.7-7-12.6-8.3L0 23.6zm30.4 1.3L17.8 33.2l8.7 7 12.6-8.3-8.7-7zm-13.9 2l-8.7 7L12.6 40l8.7-7-4.8-6.1z" fill="#0061FF"/>
  </svg>
);

export const SalesforceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 48 32" className={className || "w-6 h-6"}>
    <path d="M24 4c-6.63 0-12 5.37-12 12s5.37 12 12 12c6.63 0 12-5.37 12-12s-5.37-12-12-12zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fill="#00A1E0"/>
  </svg>
);

export const OneDriveIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 48 32" className={className || "w-6 h-6"}>
    <path d="M18.14 11.84c0-2.88 2.34-5.22 5.22-5.22 2.2 0 4.1 1.4 4.86 3.32 1.18-.54 2.46-.84 3.8-.84 5.04 0 9.14 4.1 9.14 9.14 0 5.04-4.1 9.14-9.14 9.14H6.8c-3.74 0-6.8-3.06-6.8-6.8 0-3.74 3.06-6.8 6.8-6.8 1.36 0 2.7.4 3.8 1.16.44-1.76 2.04-3.1 3.94-3.1z" fill="#0078D4"/>
  </svg>
);

export const NotionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 48 48" className={className || "w-6 h-6"}>
    <path d="M10 10h28v28H10V10z" fill="#fff"/>
    <path d="M16 16v16h16V16H16zm14 14H18V18h12v12z" fill="#000"/>
  </svg>
);

export const BoxIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 48 32" className={className || "w-6 h-6"}>
    <path d="M24 8.4l8.3 4.8v9.6L24 27.6l-8.3-4.8v-9.6L24 8.4zM24 6L13.7 12v12L24 30l10.3-6V12L24 6z" fill="#0061D5"/>
  </svg>
);

export default {
  GoogleDriveIcon,
  DropboxIcon,
  SalesforceIcon,
  OneDriveIcon,
  NotionIcon,
  BoxIcon
}; 