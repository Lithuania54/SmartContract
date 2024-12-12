import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { SubscriptionServiceProvider } from '../../Context/SubscriptionService'; // Import the provider

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GFG App',
  description: 'Integrating front-end with smart contracts',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap children with SubscriptionServiceProvider */}
        <SubscriptionServiceProvider>
          <div>{children}</div>
        </SubscriptionServiceProvider>
      </body>
    </html>
  );
}
