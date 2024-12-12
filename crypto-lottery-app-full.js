// src/App.js
import React, { useState, useEffect } from 'react';
import LotteryCard from './components/LotteryCard';
import AdModal from './components/AdModal';
import WithdrawButton from './components/WithdrawButton';

function App() {
  const [userBalance, setUserBalance] = useState(0);
  const [watchedAds, setWatchedAds] = useState(0);
  const [canWithdraw, setCanWithdraw] = useState(false);

  const simulateYouTubeAd = () => {
    const adReward = Math.random() * 0.0001;
    setUserBalance(prev => prev + adReward);
    setWatchedAds(prev => prev + 1);
  };

  const withdrawCrypto = () => {
    if (canWithdraw) {
      alert('Retiro de criptomonedas en proceso');
    }
  };

  useEffect(() => {
    setCanWithdraw(userBalance >= 0.001);
  }, [userBalance]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <LotteryCard 
        balance={userBalance} 
        watchedAds={watchedAds}
      />
      <AdModal onWatchAd={simulateYouTubeAd} />
      <WithdrawButton 
        canWithdraw={canWithdraw} 
        onWithdraw={withdrawCrypto} 
      />
    </div>
  );
}

export default App;

// src/components/LotteryCard.js
import React from 'react';

function LotteryCard({ balance, watchedAds }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-center">CryptoLotería</h1>
      <div className="text-center mt-4">
        <p>Saldo Actual: {balance.toFixed(6)} BTC</p>
        <p>Anuncios Vistos: {watchedAds}</p>
      </div>
    </div>
  );
}

export default LotteryCard;

// src/components/AdModal.js
import React from 'react';

function AdModal({ onWatchAd }) {
  return (
    <div className="mt-4 text-center">
      <button 
        onClick={onWatchAd}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ver Anuncio de YouTube
      </button>
    </div>
  );
}

export default AdModal;

// src/components/WithdrawButton.js
import React from 'react';

function WithdrawButton({ canWithdraw, onWithdraw }) {
  return (
    <div className="mt-4 text-center">
      <button 
        onClick={onWithdraw}
        disabled={!canWithdraw}
        className={`px-4 py-2 rounded ${
          canWithdraw 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {canWithdraw ? 'Retirar Crypto' : 'Saldo Insuficiente'}
      </button>
    </div>
  );
}

export default WithdrawButton;
