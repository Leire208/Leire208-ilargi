import { useTheme } from "../../Context/ThemeContext";

function DayCell({

  date,

  selectedDate,

  setSelectedDate,

  events = []

}) {

  const { styles } = useTheme();



  if (!date) {

    return <div className="h-20" />;

  }



  const isSelected =

    selectedDate &&

    date.getDate() === selectedDate.getDate() &&

    date.getMonth() === selectedDate.getMonth() &&

    date.getFullYear() === selectedDate.getFullYear();





  const dayEvents = events.filter(item => {

    if (!item.date) return false;

    const itemDate = new Date(item.date);

    return (

      itemDate.getDate() === date.getDate() &&

      itemDate.getMonth() === date.getMonth() &&

      itemDate.getFullYear() === date.getFullYear()

    );

  });





  function getColor(item) {

    if (item.type === "task") {

      return item.completed

        ? "#22c55e"

        : "#60a5fa";

    }

    return item.color || "#ffffff";

  }





  return (

    <button

      onClick={() => setSelectedDate(date)}

      className={`

        h-20

        rounded-2xl

        flex

        flex-col

        items-center

        justify-center

        transition

        border

        border-white/10

        ${

          isSelected

            ? "bg-white/30 scale-105"

            : "hover:bg-white/10"

        }

      `}

    >

      <span className="text-white font-semibold">

        {date.getDate()}

      </span>





      <div className="flex gap-1 mt-2 flex-wrap justify-center">

        {

          dayEvents

            .slice(0, 4)

            .map(item => (

              <span

                key={item.id}

                className="w-2 h-2 rounded-full"

                style={{

                  background: getColor(item)

                }}

              />

            ))

        }

      </div>

    </button>

  );

}

export default DayCell;