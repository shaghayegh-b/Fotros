import "./App.css";
import img from "./assets/Fotros.png"
function App() {
  return (
    <>
      <h1>Fotros</h1>
      <h2>فطروس</h2>
      <div className="w-10 h-10 rounded-full">
      <img src={img} alt="Ftros" className="" />
      </div>
      <img src={img} alt="Ftros" className="" />
    </>
  );
}

export default App;
