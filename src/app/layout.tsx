import Header from "./components/Header";
import "./globals.css";
import ReactQueryProvider from "@/utils/ReactQueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Loco</title>
      </head>
      <ReactQueryProvider>
        <body className="antialiased bg-gray-50">
          <Header />
          {children}
        </body>
      </ReactQueryProvider>
    </html>
  );
}
