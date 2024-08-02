import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await axios.post('https://bfhlsss-api.vercel.app/bfhl', parsedJson);
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON or API error');
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-center text-3xl font-bold mb-6">ABCD123</h1>
            <textarea
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
              value={jsonInput}
              onChange={handleInputChange}
              placeholder="Enter JSON here"
            />
            <button
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-500 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
              onClick={handleSubmit}
            >
              Submit
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {response && (
              <div className="mt-4">
                <select
                  className="w-full px-3 py-2 mt-2 mb-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
                  multiple={true}
                  onChange={handleOptionChange}
                >
                  <option value="numbers">Numbers</option>
                  <option value="alphabets">Alphabets</option>
                  <option value="highest_alphabet">Highest Alphabet</option>
                </select>
                <div>
                  {selectedOptions.includes('numbers') && (
                    <div className="mt-4">
                      <h2 className="text-xl font-semibold mb-2">Numbers</h2>
                      <p className="text-gray-700">{JSON.stringify(response.numbers)}</p>
                    </div>
                  )}
                  {selectedOptions.includes('alphabets') && (
                    <div className="mt-4">
                      <h2 className="text-xl font-semibold mb-2">Alphabets</h2>
                      <p className="text-gray-700">{JSON.stringify(response.alphabets)}</p>
                    </div>
                  )}
                  {selectedOptions.includes('highest_alphabet') && (
                    <div className="mt-4">
                      <h2 className="text-xl font-semibold mb-2">Highest Alphabet</h2>
                      <p className="text-gray-700">{JSON.stringify(response.highest_alphabet)}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;