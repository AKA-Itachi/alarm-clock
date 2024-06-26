import useAudio from "@/hooks/use-audio";
import ThemeSelector from "@/components/theme-selector/theme-selector";
import Sizes from "@/components/size-selector/size-selector";
import Divider from "../divider";

const ClockActions = ({ updateTheme, updateSize, defaultSize }) => {
  const [playing, toggleTick] = useAudio("./tick.mp3");

  return (
    <div className="relative flex min-w-[200px] cursor-pointer flex-col gap-y-5 h-[43vh]">
      <div className="flex gap-x-3">
        <div className="flex h-6 items-center">
          <input
            id="ticking"
            name="ticking"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-slate-50 focus:ring-indigo-600"
            onChange={toggleTick}
          />
        </div>

        <div className="text-sm leading-6">
          <label htmlFor="tiking" className="font-medium text-black">
            Enable clock ticking ({playing ? "on" : "off"})
          </label>
        </div>
      </div>

      <Divider name="SIZING" />

      <Sizes updateSize={updateSize} defaultSize={defaultSize} />

      <Divider name="THEMING" />

      <ThemeSelector updateTheme={updateTheme} />
    </div>
  );
};

export default ClockActions;
