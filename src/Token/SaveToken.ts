export const SaveToken = (token: string) => {
  document.cookie = `authToken=${token};`;
};
