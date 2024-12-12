'use client';

import React, { useContext } from 'react';
import { SubscriptionServiceContext } from '../../Context/SubscriptionService';
import { useRouter } from 'next/navigation';


const SubscriptionServicePage: React.FC = () => {
  const {
    currentAccount,
    connectWallet,
    subscribe,
    purchaseComic,
    canAccessComic,
    upgradeToPremium,
    error,
  } = useContext(SubscriptionServiceContext) || {};
  

  const router = useRouter();

  const comics = [
    {
      id: 0,
      title: 'The Invincible Iron Man',
      price: '0.1',
      image: '/output1.jpg',
      pdf: '/output1.pdf',
      readPage: '/comics/1',
    },
    {
      id: 1,
      title: 'Astonishing Spider-Man',
      price: '0.15',
      image: '/output2.jpg',
      pdf: '/output2.pdf',
      readPage: '/comics/2',
    },
    {
      id: 2,
      title: 'The Tick Invincible',
      price: '0.2',
      image: '/output3.jpg',
      pdf: '/output3.pdf',
      readPage: '/comics/3',
    },
    {
      id: 3,
      title: 'Batman Superman Worlds Finest',
      price: '0.25',
      image: '/output4.jpg',
      pdf: '/output4.pdf',
      readPage: '/comics/4',
    },
    {
      id: 4,
      title: 'West Coast Avengers',
      price: '0.3',
      image: '/output5.jpg',
      pdf: '/output5.pdf',
      readPage: '/comics/5',
    },
  ];

  const handleComicClick = async (comic: any) => {
    const hasAccess = await canAccessComic?.(comic.id);
  
    if (hasAccess) {
      router.push(`/comics/${comic.id}`);
    } else {
      alert('You do not have access to this comic. Please subscribe or purchase.');
    }
  };  

  const handleComicPurchase = async (comic: any) => {
    try {
      await purchaseComic(comic.id, comic.price);
      alert(`${comic.title} purchased successfully!`);

      const comicPdfUrl = comic.pdf;
      const a = document.createElement('a');
      a.href = comicPdfUrl;
      a.download = `${comic.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      alert(`Failed to purchase ${comic.title}. Please try again.`);
    }
  };  
  
  const handleSubscription = async (tier: 'Basic' | 'Premium') => {
    try {
      await subscribe(tier);
      alert(`${tier} subscription successful!`);
    } catch (error) {
      alert(`Failed to subscribe to ${tier} tier. Please try again.`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white">
      <header className="bg-gray-900 p-3 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">ComicCom</h1>
          {currentAccount ? (
            <p className="text-sm text-gray-300 p-0 m-0">Connected: {currentAccount}</p>

          ) : (
            <button
              onClick={connectWallet}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </header>
      {error && (
        <div className="bg-red-500 text-white p-4 text-center">
          <p>{error}</p>
        </div>
      )}
      <main className="flex-1 container mx-auto p-5">
        <section>
          <h2 className="text-2xl font-bold mb-5">Subscriptions</h2>
          <div className="flex gap-4 mb-8">
  <button
    onClick={() => handleSubscription('Basic')}
    className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
  >
    Subscribe to Basic
  </button>
  <button
    onClick={() => handleSubscription('Premium')}
    className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
  >
    Subscribe to Premium
  </button>
  <button
    onClick={upgradeToPremium}
    className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition"
  >
    Upgrade to Premium
  </button>
</div>

          <h2 className="text-2xl font-bold mb-5">Available Comics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {comics.map((comic) => (
              <div
                key={comic.id}
                className="bg-gray-800 rounded-lg p-5 shadow-md flex flex-col items-center"
              >
                <img
                  src={comic.image}
                  alt={comic.title}
                  className="w-64 h-96 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{comic.title}</h3>
                <p className="text-lg font-bold mb-4">{comic.price} ETH</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleComicClick(comic)}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
                  >
                    Read
                  </button>
                  <button
                    onClick={() => handleComicPurchase(comic)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
                  >
                    Buy and Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 p-5 text-center text-sm text-gray-400">
        &copy; 2024 ComicCom
      </footer>
    </div>
  );
};

export default SubscriptionServicePage;
