import type { AppProps } from 'next/app';
import '../styles/mainpage.module.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
