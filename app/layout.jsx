import "./globals.css";

export const metadata = {
  title: "PlayZone – Snake",
  description: "Simple web arcade. First game: Snake."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

