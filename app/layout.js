import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import toast, { Toaster } from 'react-hot-toast';

import Layout from "../components/Layout/Layout";


export const metadata = {
  title: "Home page",
  description: "Generated by create next app",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
  
          <Layout >
          {children}
          <Toaster />
        </Layout>
      

      </body>
    </html>
  );
}
