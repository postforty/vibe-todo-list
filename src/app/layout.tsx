import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vibe To-Do | Premium Task Management",
  description: "A sleek, modern to-do list powered by Supabase and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
