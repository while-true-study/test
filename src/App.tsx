import { useState } from "react";
import Header from "./components/Header";
import TabMenu from "./components/TabMenu/TabMenu";
import SoloReels from "./components/SoloReels/SoloReels";
import MultiReels from "./components/multiReels/MultiReels";

function App() {
  const [selected, setSelected] = useState<number>(0);
  const renderTabContent = () => {
    switch (selected) {
      case 0:
        return <SoloReels />;
      case 1:
        return <MultiReels />;
      case 2:
        return <p>3번째임</p>;
      default:
        return null;
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl m-auto">
        <Header></Header>
        <TabMenu selected={selected} onChange={setSelected} />
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default App;
