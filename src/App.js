import './App.css';
import React, { useState } from 'react';
import Title from './components/Title';
import UploadForm from './components/UploadForm';
import GridImage from './components/GridImage';
import Modal from './components/Modal';

function App() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="App">
      <Title />
      <UploadForm />
      <GridImage setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
}

export default App;
