import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sakshi Bansal",
  description: "by Sakshi Bansal",
};




export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
       <Head>
  {/* Preconnect to Google Fonts */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

  {/* Anton Font */}
  <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />

  {/* Bebas Neue, Inconsolata, Big Shoulders, Plus Jakarta Sans */}
  <link 
    href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inconsolata:wdth,wght@93.1,200&family=Big+Shoulders:opsz,wght@10..72,100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" 
    rel="stylesheet" 
  />
</Head>


      <body
        className={`${geistSans.variable} ${geistMono.variable}   xs:p-4`}
      >
        {children}
      </body>
      <script
  type="text/javascript"
  src="https://assets.calendly.com/assets/external/widget.js"
  async
></script>
    </html>
  );
}
