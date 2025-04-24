import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToasterProvider from '@/components/shared/ToasterProvider' 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Team Builder",
  description: "Building teams made simple for cohort students",
  icons: {
    icon: "./favicon.svg", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToasterProvider  /> 
      </body>
    </html>
  );
}
