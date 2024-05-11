import useClock from "@/hooks/use-clock";
import useTheme from "@/hooks/use-theme";
import useSize from "@/hooks/use-size";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import AnalogClockActions from "@/components/analog-clock/clock-action";
import DaylightIcon from "@/components/analog-clock/daylight-icon";
import AlarmList from "@/components/alarm-list/alarm-list";

const AnalogClock = ({ defaultSize = "medium", defaultTheme = "neutral" }) => {
  const [timing, isDaytime] = useClock();
  const [theme, updateTheme] = useTheme(defaultTheme);
  const [size, lastSize, updateSize] = useSize(defaultSize);

  const tabsArray = [
    {
      label: "Clock Preferences",
      value: "preferences",
      component: (
        <AnalogClockActions
          updateTheme={updateTheme}
          updateSize={updateSize}
          defaultSize={lastSize}
        />
      ),
    },
    {
      label: "Alarms",
      value: "alarms",
      component: <AlarmList />,
    },
  ];

  const clockNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="flex w-full cursor-pointer flex-wrap items-center justify-center gap-x-40 gap-y-0 h-min">
      <Tabs value="preferences" className="w-80 bg-white rounded-lg shadow-md">
        <TabsHeader className="border-b border-gray-200">
          {tabsArray.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              activeClassName="text-sky-800"
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {tabsArray.map(({ value, component }) => (
            <TabPanel key={value} value={value} className="p-4">
              {component}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>

      <div className="group relative flex cursor-pointer items-center justify-center text-sm">
        <DaylightIcon isDaytime={isDaytime} lastSize={lastSize} />

        <div
          className={`${size?.dimension} ${theme?.main} ${theme?.shadow} relative flex items-center justify-center rounded-full`}
        >
          {clockNumbers.map((num) => (
            <label
              key={num}
              className={`absolute ${size?.numbers} text-center`}
              style={{ transform: `rotate(calc(${num}*(360deg/12)))` }}
            >
              <span
                className={`inline-block`}
                style={{ transform: `rotate(calc(${num}*(-360deg/12)))` }}
              >
                {num}
              </span>
            </label>
          ))}

          <section className="box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); absolute z-50 flex h-4 w-4 justify-center">
            {/* Clock center */}
            <span
              className={`${size?.center} ${theme?.hand.center} absolute z-50 flex rounded-full before:absolute before:left-0.5 before:top-0.5 before:h-3 before:w-3 before:justify-center before:rounded-full`}
            ></span>
            {/* Second hand */}
            <span
              className={`${size?.hands?.second} ${theme?.hand.second} absolute bottom-1.5 z-30 w-1 origin-bottom rounded-md`}
              style={timing.updateSeconds}
            ></span>
            {/* Minute hand */}
            <span
              className={`${size?.hands?.minute} ${theme?.hand.minute} absolute bottom-1.5 z-20 origin-bottom rounded-md`}
              style={timing.updateMinutes}
            ></span>
            {/* Hour hand */}
            <span
              className={`${size?.hands?.hour} ${theme?.hand.hour} absolute bottom-1.5 z-10 origin-bottom divide-zinc-100 rounded-md`}
              style={timing.updateHours}
            ></span>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AnalogClock;
