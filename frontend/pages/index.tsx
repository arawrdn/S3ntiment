import dynamic from 'next/dynamic';
import React from 'react';

// Mengimpor HomeContent secara dinamis dan mematikan Server-Side Rendering (SSR).
// INI ADALAH SOLUSI KRUSIAL untuk error Web3Modal/Prerendering.
const DynamicHomeContent = dynamic(
  () => import('../components/HomeContent'),
  { 
    ssr: false, // Wajib: Komponen ini hanya dimuat di browser (Client-Side).
    loading: () => (
        <div className="min-h-screen flex items-center justify-center bg-black text-yellow-400">
            <p>Loading Web3 components...</p>
        </div>
    )
  }
);

const HomePage = () => {
  // Hanya merender komponen yang dimuat secara dinamis
  return <DynamicHomeContent />;
};

export default HomePage;
