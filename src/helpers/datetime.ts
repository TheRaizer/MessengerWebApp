export const getFormattedLocalDateString = (date?: Date): string => {
  const dateToFormat = date || new Date();

  return dateToFormat.toLocaleString('en-US', {
    month: 'short',
    weekday: 'short',
    day: 'numeric',
  });
};

export const getFormattedLocalTimeString = (date?: Date): string => {
  const dateToFormat = date || new Date();
  return dateToFormat.toLocaleTimeString('en-US', { timeStyle: 'short' });
};
