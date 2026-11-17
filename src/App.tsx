import { useState } from 'react';
import OpeningScreen from './components/OpeningScreen';
import Bouquet from './components/Bouquet';
import './index.css';

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <OpeningScreen visible={!opened} onOpen={() => setOpened(true)} />
      <Bouquet visible={opened} />
    </div>
  );
}
