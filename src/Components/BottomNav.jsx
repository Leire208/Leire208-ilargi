import { 
  Home,
  CalendarDays,
  Clock3,
  BookOpen,
  User
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useLanguage } from "../Context/LanguageContext";



function BottomNav(){


  const { texts } = useLanguage();




  const items = [


    {

      name:texts.home || "Inicio",

      icon:Home,

      path:"/"

    },


    {

      name:texts.calendar || "Calendario",

      icon:CalendarDays,

      path:"/calendar"

    },


    {

      name:texts.schedule || "Horario",

      icon:Clock3,

      path:"/schedule"

    },


    {

      name:texts.subjects || "Asignaturas",

      icon:BookOpen,

      path:"/subjects"

    },


    {

      name:texts.profile || "Perfil",

      icon:User,

      path:"/profile"

    }


  ];








  return (



    <nav


      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        px-4
        pb-6
      "


    >




      <div


        className="
          max-w-xl
          mx-auto
          rounded-[32px]
          bg-white/10
          backdrop-blur-3xl
          border
          border-white/20
          shadow-xl
          flex
          justify-around
          items-center
          py-3
        "


      >






        {


          items.map(item=>{


            const Icon = item.icon;



            return (


              <NavLink


                key={item.path}


                to={item.path}


                className={({isActive})=>`

                  flex

                  flex-col

                  items-center

                  gap-1

                  text-xs

                  transition

                  ${
                    isActive

                    ? "text-white scale-110"

                    : "text-white/60"

                  }

                `}


              >



                <Icon size={22}/>


                <span>


                  {item.name}


                </span>



              </NavLink>


            );


          })


        }







      </div>




    </nav>



  );


}



export default BottomNav;