export const formatDate = (date) => {
  if (!date || !(date instanceof Date) || isNaN(date)) {
    return "N/A";
  }
  return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
};