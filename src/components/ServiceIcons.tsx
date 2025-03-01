import React from 'react';
import BrainCardLogo from './BrainCardLogo';

// Custom SVG icons for services
export const GoogleDriveIcon = () => (
  <svg viewBox="0 0 87.3 78.4" className="w-full h-full">
    <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066DA"/>
    <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0-1.2 4.5h27.45l16.2-28z" fill="#00AC47"/>
    <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.85L73.55 76.8z" fill="#EA4335"/>
    <path d="M43.65 25L57.4 1.2c-1.35-.8-2.9-1.2-4.5-1.2H34.4c-1.6 0-3.15.45-4.5 1.2l13.75 23.8z" fill="#00832D"/>
    <path d="M59.85 53H32.4l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h45.5c1.6 0 3.15-.45 4.5-1.2L59.85 53z" fill="#2684FC"/>
    <path d="M73.4 26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.2 28h27.45c0-1.55-.4-3.1-1.2-4.5l-12.7-22z" fill="#FFBA00"/>
  </svg>
);

export const DropboxIcon = () => (
  <svg viewBox="0 0 43 40" className="w-full h-full">
    <path d="M12.6 0L0 8.3l8.7 7 12.6-8.3L12.6 0zm17.8 0l-12.6 8.3 12.6 8.3 8.7-7L30.4 0zM0 23.6l12.6 8.3 8.7-7-12.6-8.3L0 23.6zm30.4 1.3L17.8 33.2l8.7 7 12.6-8.3-8.7-7zm-13.9 2l-8.7 7L12.6 40l8.7-7-4.8-6.1z" fill="#0061FF"/>
  </svg>
);

export const SalesforceIcon = () => (
  <svg viewBox="0 0 48 32" className="w-full h-full">
    <path d="M11.5 16.3c-.3-.4-.7-.7-1.2-.9-.5-.2-1.1-.3-1.7-.3-.4 0-.8.1-1.2.2-.4.1-.7.3-1 .5-.3.2-.5.5-.7.8-.2.3-.3.7-.3 1.1 0 .4.1.8.3 1.1.2.3.4.6.7.8.3.2.6.4 1 .5.4.1.8.2 1.2.2.6 0 1.2-.1 1.7-.3.5-.2.9-.5 1.2-.9.3-.4.5-.8.7-1.3.1-.5.2-1 .2-1.5h-1.5c0 .4-.1.7-.2 1-.1.3-.2.5-.4.7z" fill="#00A1E0"/>
  </svg>
);

export const OneDriveIcon = () => (
  <svg viewBox="0 0 48 32" className="w-full h-full">
    <path d="M27.8 12.3c-.2-1.1-.7-2.1-1.4-2.9-.7-.8-1.6-1.4-2.7-1.9-1-.4-2.2-.6-3.4-.6-1.6 0-3 .3-4.3 1-1.3.7-2.3 1.6-3 2.8-.7 1.2-1.1 2.7-1.1 4.3 0 1.6.4 3 1.1 4.2.7 1.2 1.7 2.2 3 2.8 1.3.7 2.7 1 4.3 1 1.2 0 2.4-.2 3.4-.6 1.1-.4 2-1 2.7-1.9.7-.8 1.2-1.8 1.4-2.9h-3.2c-.2.6-.5 1.2-1 1.6-.5.4-1 .8-1.7 1-.7.2-1.4.3-2.1.3-1.1 0-2-.2-2.9-.7-.9-.5-1.5-1.1-2-1.9-.5-.8-.7-1.8-.7-2.9 0-1.1.2-2.1.7-2.9.5-.8 1.1-1.5 2-1.9.9-.5 1.8-.7 2.9-.7.7 0 1.4.1 2.1.3.7.2 1.2.5 1.7 1 .5.4.8 1 1 1.6h3.2z" fill="#0078D4"/>
  </svg>
);

export const NotionIcon = () => (
  <svg viewBox="0 0 48 32" className="w-full h-full">
    <path d="M14 25.5c1.4 1.1 2.9 1.6 4.4 1.6 1.6 0 2.9-.4 4-1.3 1.1-.9 1.6-2.1 1.6-3.7v-9.6h-3v9.4c0 .8-.2 1.4-.7 1.9-.4.5-1.1.7-1.9.7-.9 0-1.7-.3-2.4-.8v-11.2h-3v13h.9z" fill="#000000"/>
  </svg>
);

export const BoxIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 48 32" className={className || "w-6 h-6"}>
    <path d="M24 8.4l8.3 4.8v9.6L24 27.6l-8.3-4.8v-9.6L24 8.4zM24 6L13.7 12v12L24 30l10.3-6V12L24 6z" fill="#0061D5"/>
  </svg>
);

// Export the new BrainCardLogo component
export { BrainCardLogo };

export default {
  GoogleDriveIcon,
  DropboxIcon,
  SalesforceIcon,
  OneDriveIcon,
  NotionIcon,
  BoxIcon
}; 