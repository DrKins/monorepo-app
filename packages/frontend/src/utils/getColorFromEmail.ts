export const getColorFromEmail = (email: string) => {
  const hash = email
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 80%)`;
};
