import React, { useState, useRef } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const qrRef = useRef(null);

  const generateQr = () => {
    if (!input.trim()) return;
    const encoded = encodeURIComponent(input);
    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encoded}&size=200x200`;
    setQrUrl(url);
  };

  const downloadQr = async () => {
    if (!qrUrl) return;

    const response = await fetch(qrUrl);
    const blob = await response.blob();
    const urlObject = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = urlObject;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(urlObject);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-blue-600">QR Code Generator</h1>

        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter text or URL"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={generateQr}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Generate QR Code
        </button>

        {qrUrl && (
          <div className="space-y-4">
            <img
              ref={qrRef}
              src={qrUrl}
              alt="Generated QR"
              className="mx-auto border-4 border-gray-200 rounded"
            />

            <button
              onClick={downloadQr}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
