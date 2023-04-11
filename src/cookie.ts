import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option? : any) => {
  cookies.set(name, value, { ...option });
};

export const getCookie = (name: string) => {
  const getcookie = cookies.get(name);
  console.log('cookie', getcookie);
  return getcookie;
};

export const setHeaders = (token: any) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});
