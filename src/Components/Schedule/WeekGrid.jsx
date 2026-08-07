import { useState } from "react";

import { useTheme } from "../../Context/ThemeContext";
import { useSchedule } from "../../Context/ScheduleContext";

import AddClassModal from "./AddClassModal";
import EditClassModal from "./EditClassModal";

const days = [
  "L",
  "M",
  "X",
  "J",
  "V"
];

const hours = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00"
];

function WeekGrid() {

  const { styles } = useTheme();
  const { classes } = useSchedule();

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [selected, setSelected] = useState({
    day: null,
    hour: null
  });

  const [selectedClass, setSelectedClass] = useState(null);

  function getClass(day, hour) {

    return classes.find(item =>

      item.day === day &&
      item.start === hour

    );

  }

  function clickCell(day, hour) {

    const existing = getClass(day, hour);

    if (existing) {

      setSelectedClass(existing);
      setEditOpen(true);
      return;

    }

    setSelected({
      day,
      hour
    });

    setAddOpen(true);

  }

  return (

    <>

      <section

        className={`
          rounded-3xl
          shadow-xl
          ${styles.card}
        `}

      >

        <div

          className="
            overflow-auto
            max-h-[70vh]
          "

        >

          <div className="grid grid-cols-6 min-w-[700px]">

            <div />

            {

              days.map(day => (

                <div

                  key={day}

                  className="
                    py-4
                    text-center
                    text-white
                    font-semibold
                    border-b
                    border-white/10
                  "

                >

                  {day}

                </div>

              ))

            }

            {

              hours.map(hour => (

                <div

                  key={hour}

                  className="contents"

                >

                  <div

                    className="
                      h-24
                      flex
                      items-start
                      justify-center
                      pt-2
                      text-white/60
                      text-sm
                      border-r
                      border-white/10
                    "

                  >

                    {hour}

                  </div>                  {

                    days.map(day => {

                      const item = getClass(day, hour);

                      return (

                        <button

                          key={day + hour}

                          onClick={() => clickCell(day, hour)}

                          className="
                            h-24
                            border
                            border-white/10
                            p-2
                            hover:bg-white/5
                            transition-all
                            duration-200
                            text-left
                          "

                        >

                          {

                            item && (

                              <div

                                className="
                                  h-full
                                  rounded-xl
                                  p-3
                                  shadow-lg
                                  overflow-hidden
                                  flex
                                  flex-col
                                  justify-center
                                "

                                style={{

                                  background:

                                    item.color ||

                                    "rgba(255,255,255,0.2)"

                                }}

                              >

                                <span

                                  className="
                                    font-semibold
                                    text-white
                                    text-sm
                                    truncate
                                  "

                                >

                                  {item.subjectName}

                                </span>

                                {

                                  item.room && (

                                    <span

                                      className="
                                        text-xs
                                        text-white/80
                                        truncate
                                        mt-1
                                      "

                                    >

                                      📍 {item.room}

                                    </span>

                                  )

                                }

                              </div>

                            )

                          }

                        </button>

                      );

                    })

                  }

                </div>

              ))

            }

          </div>

        </div>

      </section>

      <AddClassModal

        open={addOpen}

        close={() => setAddOpen(false)}

        day={selected.day}

        hour={selected.hour}

      />

      <EditClassModal

        open={editOpen}

        close={() => setEditOpen(false)}

        item={selectedClass}

      />

    </>

  );

}

export default WeekGrid;