import { Metadata } from 'next';
import "@/styles/globals.css";

export const metadata: Metadata = {
    title: 'DOC Hike Finder',
    description: 'An offline hiking app for the DOC tracks in New Zealand',
    icons: [
        {
            url: '/favicon.ico',
            rel: 'icon',
            type: 'image/x-icon',
        },
    ],
    manifest: '/site.webmanifest',
  }

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
