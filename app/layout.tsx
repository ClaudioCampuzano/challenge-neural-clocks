import '@/styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NeuralClocks',
  description: 'Herramienta para optimizar los tiempos siguiendo la metodologia pomodoro',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>{children}</body>
  </html>
);

export default RootLayout;
