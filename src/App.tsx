// @ts-nocheck
import classNames from 'classnames';
import './App.css';
import { getClassicHolidays, getClassicHolidaysAfterMessup } from './helpers/date-helper';
import { useState } from 'react';

const imageConfig = {
  image1: "bg-[linear-gradient(rgba(0,_0,_0,_0.5),rgba(0,_0,_0,_0.5)),url('/img/World_of_Warcraft_Classic_20th_Anniversary_Realms_Screenshots_(2).jpg')]",
  image2: "bg-[linear-gradient(rgba(0,_0,_0,_0.5),rgba(0,_0,_0,_0.5)),url('/img/World_of_Warcraft_Classic_20th_Anniversary_Realms_Screenshots_(3).jpg')]",
  image3: "bg-[linear-gradient(rgba(0,_0,_0,_0.5),rgba(0,_0,_0,_0.5)),url('/img/World_of_Warcraft_Classic_20th_Anniversary_Realms_Screenshots_(4).jpg')]",
  image4: "bg-[linear-gradient(rgba(0,_0,_0,_0.5),rgba(0,_0,_0,_0.5)),url('/img/World_of_Warcraft_Classic_20th_Anniversary_Realms_Screenshots_(5).jpg')]",
  image5: "bg-[linear-gradient(rgba(0,_0,_0,_0.5),rgba(0,_0,_0,_0.5)),url('/img/World_of_Warcraft_Classic_20th_Anniversary_Realms_Screenshots_(6).jpg')]",
  image6: "bg-[linear-gradient(rgba(0,_0,_0,_0.5),rgba(0,_0,_0,_0.5)),url('/img/World_of_Warcraft_Classic_20th_Anniversary_Realms_Screenshots_(7).jpg')]",
}

const CalendarCell = ({ day, mcReset, bwlReset, aqReset, warsongStarts, arathiStarts,
  alteracStarts, warsongContinues, arathiContinues, alteracContinues, warsongEnds, arathiEnds,
  alteracEnds, hidden, today, isPast }) => {
  return <article className={classNames("w-[130px] h-[130px] p-1 rounded-[1px] border-[2px] border-orange-400 text-white bg-orange-600 relative overflow-hidden", isPast ? "opacity-50" : "", hidden === true ? "invisible" : "", today === true ? "animate-glow" : "", today === true ? "animate-wiggle" : "")}>
    <h1 className='leading-none text-left text-2xl'>{day}</h1>
    <ul className='flex flex-col gap-[10px]'>
      {mcReset && (<li className='leading-none text-left text-xs bg-red-900 p-1 -ml-1 rounded-[1px] min-h-[32px]'>Molten Core reset</li>)}
      {bwlReset && (<li className='leading-none text-left text-xs bg-orange-900 p-1 -ml-1 rounded-[1px] min-h-[32px]'>BWL reset</li>)}
      {aqReset && (<li className='leading-none text-left text-xs bg-purple-900 p-1 -ml-1 rounded-[1px] min-h-[32px]'>AQ reset</li>)}
      {warsongStarts && (<li className='leading-none text-left text-xs bg-purple-900 p-1 -ml-1 -mr-1 rounded-[1px] min-h-[32px]'>Warsong Gulch begins at 12:00am</li>)}
      {arathiStarts && (<li className='leading-none text-left text-xs bg-amber-500 p-1 -ml-1 -mr-1 rounded-[1px] min-h-[32px]'>Arathi Basin begins at 12:00am</li>)}
      {alteracStarts && (<li className='leading-none text-left text-xs bg-blue-900 p-1 -ml-1 -mr-1 rounded-[1px] min-h-[32px]'>Alterac Valley begins at 12:00am</li>)}
      {warsongContinues && (<li className='leading-none text-left text-xs bg-purple-900 p-1 -ml-1 -mr-1 rounded-[1px] min-h-[32px]'>Warsong Gulch continues</li>)}
      {arathiContinues && (<li className='leading-none text-left text-xs bg-amber-500 p-1 -ml-1 -mr-1 rounded-[1px] min-h-[32px]'>Arathi Basin continues</li>)}
      {alteracContinues && (<li className='leading-none text-left text-xs bg-blue-900 p-1 -ml-1 -mr-1 rounded-[1px] min-h-[32px]'>Alterac Valley continues</li>)}
      {warsongEnds && (<li className='leading-none text-left text-xs bg-purple-900 p-1 -ml-1 rounded-[1px] min-h-[32px]'>Warsong Gulch ends at 12:00am</li>)}
      {arathiEnds && (<li className='leading-none text-left text-xs bg-amber-500 p-1 -ml-1 rounded-[1px] min-h-[32px]'>Arathi Basin ends at 12:00am</li>)}
      {alteracEnds && (<li className='leading-none text-left text-xs bg-blue-900 p-1 -ml-1 rounded-[1px] min-h-[32px]'>Alterac Valley ends at 12:00am</li>)}
    </ul>
    {today === true && (<div className='absolute -right-[20px] -bottom-[20px] bg-violet-500 h-[40px] w-[40px] -rotate-45'></div>)}
  </article>
}

/**
 * @param {int} The month number, 0 based
 * @param {int} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function addMonths(date, months) {
  var d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date;
}

const monthToName = (month) => {
  let name;
  switch (month) {
    case 0:
      name = "January";
      break;
    case 1:
      name = "February";
      break;
    case 2:
      name = "March";
      break;
    case 3:
      name = "April";
      break;
    case 4:
      name = "May";
      break;
    case 5:
      name = "June";
      break;
    case 6:
      name = "July";
      break;
    case 7:
      name = "August";
      break;
    case 8:
      name = "September";
      break;
    case 9:
      name = "October";
      break;
    case 10:
      name = "November";
      break;
    case 11:
      name = "December";
      break;
    default:
      name = "Unknown";
      break;
  }

  return name;
}

function App() {
  const rand = Math.floor(Math.random() * Object.keys(imageConfig).length) + 1;
  const image = imageConfig[`image${rand}`];

  // const [days, setDays] = useState(() => getDaysInMonth(new Date().getMonth(), new Date().getFullYear()));
  // const [month, setMonth] = useState(new Date().getMonth());
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const warsongEpoch = new Date(2020, 2, 13);
  const arathiEpoch = new Date(2020, 2, 20);
  const alteracEpoch = new Date(2020, 3, 3);
  const start = new Date(2020, 2, 13);

  // New epochs and dates after blizz mess up.
  // There seems to be no break weekend between battlegrounds starting in 2025
  // and battlegrounds have been reset to WSG.
  const warsongEpochNew = new Date(2025, 0, 3);
  const arathiEpochNew = new Date(2025, 0, 10);
  const alteracEpochNew = new Date(2025, 0, 17);
  const startNew = new Date(2025, 0, 3);

  if (month === undefined || month === null || year === undefined || year === null) {
    return null;
  }

  let holidaysThisYear;

  if (year >= 2025) {
    holidaysThisYear = getClassicHolidaysAfterMessup(
      year,
      warsongEpochNew,
      arathiEpochNew,
      alteracEpochNew,
      startNew
    );
  } else {
    holidaysThisYear = getClassicHolidays(
      year,
      warsongEpoch,
      arathiEpoch,
      alteracEpoch,
      start
    );
  }

  let days = getDaysInMonth(month, new Date().getFullYear());

  if (days.length === 0) {
    return null;
  }

  const padding = days[0]?.getDay();

  for (let i = 0; i < padding - 1; i++) {
    days.unshift(null);
  }

  holidaysThisYear = holidaysThisYear.flat();

  const holidaysThisMonth = holidaysThisYear.filter(
    (holiday) => {
      if (holiday.date === "") {
        return false;
      }
      return holiday.date.getMonth() === month;
    }
  );

  return (
    <div className={`h-screen bg-cover ${image} flex flex-col items-center`}>
      <div className='w-[1000px]'>
        <h1 className="text-3xl text-white">
          WoW Classic Calendar
        </h1>
        <h2 className="text-2xl text-white">{monthToName(month)} {year}</h2>
        {/* <input type="checkbox" id="classic-era" name="classic-era" value="classic-era" />
        <label for="classic-era" className='text-white'> 20th Anniversary / Classic era</label>
        <input type="checkbox" id="cataclysm" name="cataclysm" value="cataclysm" />
        <label for="cataclysm" className='text-white'> Cataclysm</label> */}
        <div className='flex flex-row justify-end gap-[10px] mr-[10px] mb-2'>
          <button type="button" className='cursor-pointer text-white border-[2px] p-1 border-red-400 bg-red-600 w-[130px]' onClick={() => {
            // zero indexed month.
            const newMonth = month > 0 ? month - 1 : month;
            if (month > 0) {
              setMonth(newMonth);
            } else {
              const newYear = year - 1;
              setYear(newYear);
              setMonth(11);
            }

          }}>Previous</button>
          <button type="button" className='cursor-pointer text-white border-[2px] p-1 border-red-400 bg-red-600 w-[130px]' onClick={() => {
            // zero indexed month.
            const newMonth = month < 11 ? month + 1 : month;
            if (month < 11) {
              setMonth(newMonth);
            } else {
              const newYear = year + 1;
              setYear(newYear);
              setMonth(0);
            }
          }}>Next</button>
        </div>
        <div className='flex flex-wrap gap-[10px] max-w-7xl'>
          <p className='w-[130px] text-white'>Monday</p>
          <p className='w-[130px] text-white'>Tuesday</p>
          <p className='w-[130px] text-white'>Wednesday</p>
          <p className='w-[130px] text-white'>Thursday</p>
          <p className='w-[130px] text-white'>Friday</p>
          <p className='w-[130px] text-white'>Saturday</p>
          <p className='w-[130px] text-white'>Sunday</p>
          {days.map((value, i) => {
            const holiday = holidaysThisMonth.find(x => x.date.getDate?.() === value?.getDate() || x.date.getDate?.() + 1 === value?.getDate() || x.date.getDate?.() + 2 === value?.getDate() || x.date.getDate?.() + 3 === value?.getDate() || x.date.getDate?.() + 4 === value?.getDate());
            const hide = value === null;

            const warsongStarts = holiday?.date.getDate?.() === value?.getDate() && holiday?.key === "warsong";
            const arathiStarts = holiday?.date.getDate?.() === value?.getDate() && holiday?.key === "arathi";
            const alteracStarts = holiday?.date.getDate?.() === value?.getDate() && holiday?.key === "alterac";

            const warsongContinues = (holiday?.date.getDate?.() + 1 === value?.getDate()
              || holiday?.date.getDate?.() + 2 === value?.getDate()
              || holiday?.date.getDate?.() + 3 === value?.getDate()) && holiday?.key === "warsong";
            const arathiContinues = (holiday?.date.getDate?.() + 1 === value?.getDate()
              || holiday?.date.getDate?.() + 2 === value?.getDate()
              || holiday?.date.getDate?.() + 3 === value?.getDate()) && holiday?.key === "arathi";
            const alteracContinues = (holiday?.date.getDate?.() + 1 === value?.getDate()
              || holiday?.date.getDate?.() + 2 === value?.getDate()
              || holiday?.date.getDate?.() + 3 === value?.getDate()) && holiday?.key === "alterac";

            const warsongEnds = holiday?.date.getDate?.() + 4 === value?.getDate() && holiday?.key === "warsong";
            const arathiEnds = holiday?.date.getDate?.() + 4 === value?.getDate() && holiday?.key === "arathi";
            const alteracEnds = holiday?.date.getDate?.() + 4 === value?.getDate() && holiday?.key === "alterac";

            var d = new Date();
            d.setHours(0, 0, 0, 0);
            const isPast = value < d;

            return (<CalendarCell key={i} day={value?.getDate()} warsongStarts={warsongStarts}
              arathiStarts={arathiStarts} alteracStarts={alteracStarts} warsongContinues={warsongContinues}
              arathiContinues={arathiContinues} alteracContinues={alteracContinues} warsongEnds={warsongEnds}
              arathiEnds={arathiEnds} alteracEnds={alteracEnds} hidden={hide} today={new Date().getDate() === value?.getDate() && new Date().getMonth() === value?.getMonth()} isPast={isPast} />);
          })}
        </div>
      </div>
    </div>
  )
}

export default App;
