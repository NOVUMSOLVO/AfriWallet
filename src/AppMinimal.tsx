function App() {
  console.log('Minimal App rendered');
  
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">AfriWallet Test</h1>
        <p className="text-gray-600">If you can see this, React is working!</p>
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p className="text-green-800">✓ React is rendering</p>
          <p className="text-green-800">✓ Tailwind CSS is loading</p>
          <p className="text-green-800">✓ Basic setup is working</p>
        </div>
      </div>
    </div>
  );
}

export default App;
