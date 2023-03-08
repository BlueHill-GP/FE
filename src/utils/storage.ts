export const getAccessToken = (): string | null => {
  return localStorage.getItem("la");
};

export const setAccessToken = (token: string): void => {
    localStorage.setItem("la", token);
    const a = localStorage.getItem("la");
};

export const clearAccessToken = (): void => {
  localStorage.removeItem("la");
};

export const clearAllStorage = (): void => {
  localStorage.clear()
};
