import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import Cookies from "js-cookie";

export default function Home({ entries }) {
  const [darkMode, setDarkMode] = useState(false);
  const [entry, setEntry] = useState(entries || []);
  const [events, setEvents] = useState("");
  const [time, setTime] = useState("");

  const handleSetEntries = async (e) => {
    setEntry([
      ...entry,
      {
        id: entry.length + 1,
        events: events,
        time: time,
      },
    ]);

    handleReset();
  };

  const handleDelete = (id) => {
    setEntry(entry.filter((item) => item.id !== id));
  };

  const handleReset = () => {
    setEvents("");
    setTime("");
  };
  useEffect(() => {
    Cookies.set("entries", JSON.stringify(entry));
  }, []);
  //set entries to cookie
  useEffect(() => {
    Cookies.set("entries", JSON.stringify(entry));
  }, [entry]);

  const getDate = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let monthIndex = new Date().getMonth();
    let monthName = monthNames[monthIndex];
    const current = new Date();
    return `${monthName}-${current.getDate()}-${current.getFullYear()}`;
  };
  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Day Planner</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900">
        <section className="  min-h-100 ">
          <nav className=" py-10 mb-12 flex justify-between ">
            <h1 className=" text-xl font-burtons dark:text-white">
              Day Planner
            </h1>
            <ul className=" flex items-center">
              {!darkMode ? (
                <li>
                  <BsFillMoonStarsFill
                    onClick={() => {
                      setDarkMode(!darkMode);
                    }}
                    className=" cursor-pointer text-2xl"
                  />
                </li>
              ) : (
                <li>
                  <BsFillSunFill
                    onClick={() => {
                      setDarkMode(!darkMode);
                    }}
                    className=" cursor-pointer text-2xl text-white"
                  />
                </li>
              )}
            </ul>
          </nav>
          <div className=" text-center p-10">
            <h2 className=" text-5xl text-teal-600 font-medium md:text-6xl ">
              Work Day Scheduler
            </h2>
            <h3 className=" text-2xl py-2 md:text-3xl dark:text-white">
              A simple calendar app for scheduling your work day
            </h3>
            <p className=" text-lg font-semibold py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white">
              {getDate()}
            </p>
          </div>
        </section>
        <section className=" min-h-screen">
          <div className=" flex justify-between items-center mb-44 p-8 shadow-lg bg-slate-300 rounded-xl dark:bg-gray-800">
            <input
              type="time"
              className=" dark:bg-gray-800 dark:text-white"
              placeholder="time"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
            />
            <input
              className=" w-1/2 h-10 rounded-md border-2 border-gray-300 dark:bg-gray-800 dark:text-white "
              placeholder="Eat, Sleep, Code"
              value={events}
              onChange={(e) => {
                setEvents(e.target.value);
              }}
            />
            <button
              className=" bg-teal-600 text-white px-4 py-2 rounded-md"
              onClick={() => handleSetEntries()}
            >
              Save
            </button>
          </div>
          <div className=" flex justify-between items-center mb-44 p-8 shadow-lg bg-slate-300 rounded-xl dark:bg-gray-800">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative dark:bg-gray-800 dark:text-white ">
                  <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                    Id
                  </th>
                  <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                    Time
                  </th>
                  <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                    Event
                  </th>

                  <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                    Actions
                  </th>
                </tr>
              </thead>
              {entry.map((item) => (
                <tbody
                  key={item.id}
                  className="block md:table-row-group dark:bg-gray-800 dark:text-white "
                >
                  <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row dark:bg-gray-800 dark:text-white ">
                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                      {item.id}
                    </td>
                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                      {item.time}
                    </td>
                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                      {item.events}
                    </td>

                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export function getServerSideProps({ req, res }) {
  return {
    props: {
      entries: JSON.parse(decodeURIComponent(req.cookies.entries)) || [],
    },
  };
}
