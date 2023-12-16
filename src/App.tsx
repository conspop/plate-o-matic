import { useState } from "react";

type Plate = {
  id: string;
  weight: number;
  unit: Unit;
};

type Unit = "lb" | "kg";

function App() {
  const [barWeightInLbs] = useState<number>(45);
  const [plates, setPlates] = useState<Plate[]>([]);
  const [displayUnit, setDisplayUnit] = useState<Unit>("lb");

  const [inputWeight, setInputWeight] = useState<number>(0);

  const addPlate = (plate: Plate) => {
    setPlates((prevPlates) => [...prevPlates, plate]);
  };

  const removePlate = (id: string) => {
    setPlates((prevPlates) => prevPlates.filter((plate) => plate.id !== id));
  };

  const handleAddPlate = (unit: Unit) => {
    if (unit === "lb") {
      addPlate({ weight: inputWeight, unit: "lb", id: generateId() });
    } else {
      addPlate({ weight: inputWeight, unit: "kg", id: generateId() });
    }
    setInputWeight(0);
  };

  const handleRemovePlate = (id: string) => {
    removePlate(id);
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleNumberTap = (number: number) => {
    setInputWeight((prevInputWeight) =>
      parseInt(`${prevInputWeight}${number}`)
    );
  };

  const handlePointFiveTap = () => {
    setInputWeight((prevInputWeight) => parseFloat(`${prevInputWeight}.5`));
  };

  const handleClearTap = () => {
    setInputWeight(0);
  };

  const totalWeightInLbs =
    plates.reduce((acc, plate) => {
      if (plate.unit === "lb") {
        return acc + plate.weight;
      } else {
        return acc + plate.weight * 2.20462;
      }
    }, 0) + barWeightInLbs;

  const totalWeightInDisplayUnit =
    displayUnit === "lb" ? totalWeightInLbs : totalWeightInLbs / 2.20462;

  return (
    <div className="h-screen grid grid-rows-2">
      <div className="grid grid-rows-2">
        <div className="flex justify-center items-center text-5xl gap-2">
          <div className="text-7xl">{Math.round(totalWeightInDisplayUnit)}</div>
          <div className="border p-2 text-base">
            <button
              className={`p-2 ${displayUnit === "lb" ? "bg-blue-300" : ""}`}
              onClick={() => setDisplayUnit("lb")}
            >
              LBs
            </button>
            <button
              className={`p-2 ${displayUnit === "kg" ? "bg-blue-300" : ""}`}
              onClick={() => setDisplayUnit("kg")}
            >
              KGs
            </button>
          </div>
        </div>
        <div className="flex items-center p-2">
          <div className="w-6 bg-black h-6"></div>
          {plates.reverse().map((plate) => {
            return (
              <div
                key={plate.id}
                className="flex flex-col justify-center items-center border-4 border-black w-12 h-52"
                onClick={() => handleRemovePlate(plate.id)}
              >
                <div className="text-xl">{plate.weight}</div>
                <div className="text-xl">{plate.unit}</div>
              </div>
            );
          })}
          <div className="flex-grow bg-black h-6"></div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-2xl flex justify-center py-4">{inputWeight}</div>
        <div className="grid grid-cols-4 grid-rows-4 w-full p-4">
          <div onClick={() => handleNumberTap(7)}>7</div>
          <div onClick={() => handleNumberTap(8)}>8</div>
          <div onClick={() => handleNumberTap(9)}>9</div>
          <div></div>
          <div onClick={() => handleNumberTap(4)}>4</div>
          <div onClick={() => handleNumberTap(5)}>5</div>
          <div onClick={() => handleNumberTap(6)}>6</div>
          <div></div>
          <div onClick={() => handleNumberTap(1)}>1</div>
          <div onClick={() => handleNumberTap(2)}>2</div>
          <div onClick={() => handleNumberTap(3)}>3</div>
          <div onClick={() => handleAddPlate("kg")}>KGs</div>
          <div onClick={handlePointFiveTap}>.5</div>
          <div onClick={() => handleNumberTap(0)}>0</div>
          <div onClick={handleClearTap}>C</div>
          <div onClick={() => handleAddPlate("lb")}>LBs</div>
        </div>
      </div>
    </div>
  );
}

export default App;
