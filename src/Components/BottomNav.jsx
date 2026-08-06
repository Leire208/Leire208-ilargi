import { NavLink } from "react-router-dom";

import { useTheme } from "../Context/ThemeContext";
import { useLanguage } from "../Context/LanguageContext";


function BottomNav() {


  const { styles } = useTheme();

  const { texts } = useLanguage();



  return (

    <div

      className={`
        fixed
        bottom-5
        left-1/2
        -translate-x-1/2
        w-[92%]
        max-w-md
        rounded-3xl
        ${styles.nav}
        shadow-2xl
        px-6
        py-4
        flex
        justify-between
        items-center
        z-[9999]
      `}

    >



      <NavLink

        to="/"

        className="text-white text-sm"

      >

        {texts.home || "Home"}

      </NavLink>




      <NavLink

        to="/calendar"

        className="text-white text-sm"

      >

        {texts.calendar}

      </NavLink>




      <NavLink

        to="/schedule"

        className="text-white text-sm"

      >

        {texts.schedule}

      </NavLink>




      <NavLink

        to="/profile"

        className="text-white text-sm"

      >

        {texts.profile}

      </NavLink>



    </div>

  );

}


export default BottomNav;