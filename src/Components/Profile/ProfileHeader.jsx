import { User } from "lucide-react";

import { useUser } from "../../Context/UserContext";
import { useTheme } from "../../Context/ThemeContext";

function ProfileHeader() {

  const { user } = useUser();
  const { styles } = useTheme();

  return (

    <section
      className={`
        rounded-3xl
        p-8
        text-center
        shadow-xl
        ${styles.card}
      `}
    >

      <div
        className="
          w-28
          h-28
          mx-auto
          rounded-full
          bg-white/20
          flex
          items-center
          justify-center
          border
          border-white/30
        "
      >

        <User
          size={48}
          className="text-white"
        />

      </div>

      <h1 className="text-3xl font-bold text-white mt-6">

        {user.name}

      </h1>

      <p className="text-white/70 mt-2">

        {user.career}

      </p>

    </section>

  );

}

export default ProfileHeader;