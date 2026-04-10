import { createIcon } from '../createIcon'

// Navigation
export const ChevronLeftIcon = createIcon({
  name: 'ChevronLeft',
  path: 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z',
  defaultAccessibilityLabel: 'Back',
})

export const ChevronRightIcon = createIcon({
  name: 'ChevronRight',
  path: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
  defaultAccessibilityLabel: 'Forward',
})

export const ChevronDownIcon = createIcon({
  name: 'ChevronDown',
  path: 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z',
  defaultAccessibilityLabel: 'Expand',
})

export const ChevronUpIcon = createIcon({
  name: 'ChevronUp',
  path: 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z',
  defaultAccessibilityLabel: 'Collapse',
})

export const ArrowBackIcon = createIcon({
  name: 'ArrowBack',
  path: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
  defaultAccessibilityLabel: 'Go back',
})

export const MenuIcon = createIcon({
  name: 'Menu',
  path: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  defaultAccessibilityLabel: 'Menu',
})

// Actions
export const CloseIcon = createIcon({
  name: 'Close',
  path: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  defaultAccessibilityLabel: 'Close',
})

export const AddIcon = createIcon({
  name: 'Add',
  path: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  defaultAccessibilityLabel: 'Add',
})

export const EditIcon = createIcon({
  name: 'Edit',
  path: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  defaultAccessibilityLabel: 'Edit',
})

export const DeleteIcon = createIcon({
  name: 'Delete',
  path: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
  defaultAccessibilityLabel: 'Delete',
})

export const SearchIcon = createIcon({
  name: 'Search',
  path: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  defaultAccessibilityLabel: 'Search',
})

export const MoreVertIcon = createIcon({
  name: 'MoreVert',
  path: 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
  defaultAccessibilityLabel: 'More options',
})

export const SettingsIcon = createIcon({
  name: 'Settings',
  path: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
  defaultAccessibilityLabel: 'Settings',
})

// Status
export const CheckIcon = createIcon({
  name: 'Check',
  path: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  defaultAccessibilityLabel: 'Checked',
})

export const CheckCircleIcon = createIcon({
  name: 'CheckCircle',
  path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  defaultAccessibilityLabel: 'Success',
})

export const ErrorIcon = createIcon({
  name: 'Error',
  path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  defaultAccessibilityLabel: 'Error',
})

export const WarningIcon = createIcon({
  name: 'Warning',
  path: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
  defaultAccessibilityLabel: 'Warning',
})

export const InfoIcon = createIcon({
  name: 'Info',
  path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
  defaultAccessibilityLabel: 'Information',
})

// Communication
export const NotificationsIcon = createIcon({
  name: 'Notifications',
  path: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z',
  defaultAccessibilityLabel: 'Notifications',
})

export const SendIcon = createIcon({
  name: 'Send',
  path: 'M2.01 21L23 12 2.01 3 2 10l15 2-15 2z',
  defaultAccessibilityLabel: 'Send',
})

export const AttachFileIcon = createIcon({
  name: 'AttachFile',
  path: 'M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z',
  defaultAccessibilityLabel: 'Attach file',
})

// Content
export const HomeIcon = createIcon({
  name: 'Home',
  path: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  defaultAccessibilityLabel: 'Home',
})

export const PersonIcon = createIcon({
  name: 'Person',
  path: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  defaultAccessibilityLabel: 'Person',
})

export const StarIcon = createIcon({
  name: 'Star',
  path: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  defaultAccessibilityLabel: 'Star',
})

export const CalendarIcon = createIcon({
  name: 'Calendar',
  path: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z',
  defaultAccessibilityLabel: 'Calendar',
})

export const FilterIcon = createIcon({
  name: 'Filter',
  path: 'M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z',
  defaultAccessibilityLabel: 'Filter',
})

export const SortIcon = createIcon({
  name: 'Sort',
  path: 'M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z',
  defaultAccessibilityLabel: 'Sort',
})

export const VisibilityIcon = createIcon({
  name: 'Visibility',
  path: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
  defaultAccessibilityLabel: 'Visible',
})

export const VisibilityOffIcon = createIcon({
  name: 'VisibilityOff',
  path: 'M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z',
  defaultAccessibilityLabel: 'Hidden',
})

export const ShareIcon = createIcon({
  name: 'Share',
  path: 'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z',
  defaultAccessibilityLabel: 'Share',
})
