import AnalogClock from "@/components/analog-clock/analog-clock.jsx";

function App() {
  return (
    <div className="flex flex-col bg-sky-900 text-slate-200">
      <header className="flex w-full justify-between px-10 py-12">
        <div className="flex h-10 items-center">
          <h1 className="hidden pl-4 text-center text-2xl md:flex">
            Analog clock
          </h1>
        </div>
      </header>

      <main className="flex h-[calc(100vh-140px)] w-full px-10">
        <AnalogClock />
      </main>
    </div>
  );
}

export default App;
