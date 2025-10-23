import dynamic from 'next/dynamic';
import React from 'react';

// Mengimpor AppContent secara dinamis dan mematikan Server-Side Rendering (SSR).
const DynamicAppContent = dynamic(
  () => import('../components/AppContent'),
  { 
    ssr: false, // SOLUSI WAJIB: Mematikan SSR untuk menghindari error Web3Modal.
    loading: () => (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-yellow-400">
            <p>Loading application resources...</p>
        </div>
    )
  }
);

const App = () => {
  // Hanya merender komponen yang dimuat secara dinamis
  return <DynamicAppContent />;
};

export default App;
