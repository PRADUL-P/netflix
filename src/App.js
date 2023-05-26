import React from 'react';
import { originals, action, comedy, horror, romance, thriller, documentary, fantasy } from "./urls";
import "./components/NavBar/NavBar.css";
import "./App.css";
import NavBar from './components/NavBar/NavBar';
import Banner from './components/Banner/Banner';
import RowPost from './components/RowPost/RowPost';

function App() {
  return (
    <div>
      <NavBar />
      <Banner />
      <RowPost url={originals} title="Netflix Originals" />
      <RowPost url={action} title="Action" isSmall />
      <RowPost url={comedy} title="Comedy" isSmall />
      <RowPost url={horror} title="Horror" isSmall />
      <RowPost url={romance} title="Romance" isSmall />
      <RowPost url={thriller} title="Thriller" isSmall />
      <RowPost url={documentary} title="Documentary" isSmall />
      <RowPost url={fantasy} title="Fantasy" isSmall />
    </div>
  );
}

export default App;
