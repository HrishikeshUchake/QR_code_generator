import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  const generateQr = () => {
    if (!input.trim()) return;
    const encoded = encodeURIComponent(input);
    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encoded}&size=200x200`;
    setQrUrl(url);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6">QR Code Generator</h1>

      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter text or URL"
        className="w-80 p-2 border rounded mb-4 focus:outline-none focus:ring"
      />

      <button
        onClick={generateQr}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded mb-6"
      >
        Generate
      </button>

      {qrUrl && (
        <div className="shadow-lg p-4 bg-white rounded">
          <img src={qrUrl} alt="QR Code" />
        </div>
      )}
    </div>
  );
}
