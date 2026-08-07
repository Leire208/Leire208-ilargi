import {
  Home,
  CalendarDays,
  Clock3,
  BookOpen,
  User
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useLanguage } from "../Context/LanguageContext";

function BottomNav() {

  const { texts } = useLanguage();

  const items = [

    {
      name: texts.home || "Inicio",
      icon: Home,
      path: "/"
    },

    {
      name: texts.calendar || "Calendario",
      icon: CalendarDays,
      path: "/calendar"
    },

    {
      name: texts.schedule || "Horario",
      icon: Clock3,
      path: "/schedule"
    },

    {
      name: texts.subjects || "Asignaturas",
      icon: BookOpen,
      path: "/subjects"
    },

    {
      name: texts.profile || "Perfil",
      icon: User,
      path: "/profile"
    }

  ];

  return (

    <nav

      className="
        fixed
        left-0
        right-0
        bottom-5
        z-[200]
        pointer-events-none
      "

    >

      <div

        className="
          max-w-xl
          mx-auto
          px-4
        "

      >

        <div

          className="
            pointer-events-auto
            rounded-[34px]
            border
            border-white/20
            bg-white/10
            backdrop-blur-3xl
            shadow-2xl
            flex
            justify-around
            items-center
            py-4
          "

        >

          {

            items.map(item => {

              const Icon = item.icon;

              return (

                <NavLink

                  key={item.path}

                  to={item.path}

                  className={({ isActive }) => `

                    flex
                    flex-col
                    items-center
                    gap-1
                    transition-all
                    duration-300

                    ${

                      isActive

                        ? "text-white scale-110"

                        : "text-white/60 hover:text-white"

                    }

                  `}

                >

                  <Icon size={22} />

                  <span className="text-[11px]">

                    {item.name}

                  </span>

                </NavLink>

              );

            })

          }

        </div>

      </div>

    </nav>

  );

}

export default BottomNav;