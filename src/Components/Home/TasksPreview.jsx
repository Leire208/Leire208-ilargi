import { CheckCircle2, Circle } from "lucide-react";

import { useTasks } from "../../Context/TaskContext";
import { useTheme } from "../../Context/ThemeContext";

function TasksPreview() {

  const { tasks, toggleTask } = useTasks();

  const { styles } = useTheme();

  const todayTasks = tasks.slice(0, 3);

  return (

    <section
      className={`
        rounded-3xl
        p-6
        shadow-xl
        ${styles.card}
      `}
    >

      <h2 className="text-xl font-semibold text-white mb-5">

        Tareas de hoy

      </h2>

      {

        todayTasks.length === 0

        ?

        <p className="text-white/70">

          No tienes tareas pendientes.

        </p>

        :

        <div className="space-y-4">

          {

            todayTasks.map(task => (

              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  text-left
                "
              >

                {

                  task.completed

                  ?

                  <CheckCircle2
                    size={22}
                    className="text-green-300 flex-shrink-0"
                  />

                  :

                  <Circle
                    size={22}
                    className="text-white/80 flex-shrink-0"
                  />

                }

                <span

                  className={`
                    transition-all

                    ${
                      task.completed

                      ?

                      "line-through text-white/50"

                      :

                      "text-white"
                    }
                  `}

                >

                  {task.title}

                </span>

              </button>

            ))

          }

        </div>

      }

    </section>

  );

}

export default TasksPreview;