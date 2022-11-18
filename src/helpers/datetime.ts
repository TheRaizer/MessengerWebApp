export const getFormattedLocalDateString = (): string => {
  return new Date().toLocaleString('en-US', {
    month: 'short',
    weekday: 'short',
    day: 'numeric',
  });
};

export const getFormattedLocalTimeString = (): string => {
  return new Date().toLocaleTimeString('en-US', { timeStyle: 'short' });
};
