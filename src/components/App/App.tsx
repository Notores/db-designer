/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import {Generate} from "../Generate/Generate";
import {Canvas} from "../Canvas/Canvas";
import {SideBar} from "../Layout/SideBar";
import {Header} from "../Layout/Header";

import './App.scss';

const App: React.FC = () => {
  const [showGenerate, setShowGenerate] = useState<boolean>(false);
  return (
    <div className="App">
        <Header showGenerate={showGenerate} setShowGenerate={setShowGenerate}  />
        <Canvas />
        <SideBar/>
        <Generate isOpen={showGenerate} onClose={() => setShowGenerate(false)} />
    </div>
  );
};

export default App;
