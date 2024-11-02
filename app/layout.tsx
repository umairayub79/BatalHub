import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";

const balochiNastalik = localFont({
  src: "../public/fonts/BalochiNastalik-Regular.woff2",
  variable: "--font-balochi",
  display: "swap",
  preload: true,
});

const amiri = localFont({
  src: [
    {
      path: "../public/fonts/Amiri-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Amiri-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-amiri",
  display: "swap",
  preload: true,
});

const ibmPlexSansArabic = localFont({
  src: [
    {
      path: "../public/fonts/IBMPlexSansArabic-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/IBMPlexSansArabic-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-sans-arabic",
  display: "swap",
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bal"
      dir="rtl"
      suppressHydrationWarning
      className={`${balochiNastalik.variable} ${amiri.variable} ${ibmPlexSansArabic.variable}`}
    >
      <head>
        <link
          rel="preload"
          href="/fonts/BalochiNastalik-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <title>بلوچی بتل</title>
      </head>
      <body className="font-primary antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <Navbar />
            <main className="min-h-screen bg-background animate-in">
              {children}
            </main>
            <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
