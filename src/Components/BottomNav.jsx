import { NavLink } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

function BottomNav() {

  const { styles } = useTheme();

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
        justify-around
        items-center
        z-[9999]
      `}
    >

      <NavLink 
        to="/"
        className="text-white text-sm"
      >
        Home
      </NavLink>

      <NavLink 
        to="/calendar"
        className="text-white text-sm"
      >
        Calendar
      </NavLink>

      <NavLink 
        to="/schedule"
        className="text-white text-sm"
      >
        Schedule
      </NavLink>

      <NavLink 
        to="/profile"
        className="text-white text-sm"
      >
        Profile
      </NavLink>

    </div>

  );

}

export default BottomNav;