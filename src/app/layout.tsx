import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthProvider from './components/AuthProvider';

export const metadata: Metadata = {
  title: 'TaskRebel - Your Ultimate Task Management App',
  description: 'Boost your productivity with TaskRebel, the cutting-edge task management app built with Next.js. Organize, prioritize, and conquer your to-do list with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang='en'>
      <head>
        <link rel="icon" href="/task-rebel.png" />
      </head>
      <body
      >
        <AuthProvider>
          <Header />
          <main className='px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden'>
            <div
              className='absolute inset-0 opacity-20'
              style={ {
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")',
              } }
            ></div>
            <div className='relative z-10'>
              { children }
            </div>
          </main>

          <Footer />
        </AuthProvider>
      </body>
    </html >
  );
}
