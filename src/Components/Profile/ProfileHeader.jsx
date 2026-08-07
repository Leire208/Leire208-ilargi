import { useRef } from "react";
import { User, Camera } from "lucide-react";

import { useUser } from "../../Context/UserContext";
import { useTheme } from "../../Context/ThemeContext";

function ProfileHeader() {

  const { user, updatePhoto } = useUser();

  const { styles } = useTheme();

  const inputRef = useRef(null);

  function openPicker() {

    inputRef.current?.click();

  }

  function changePhoto(event) {

    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      updatePhoto(reader.result);

    };

    reader.readAsDataURL(file);

  }

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

      <input

        ref={inputRef}

        type="file"

        accept="image/*"

        hidden

        onChange={changePhoto}

      />

      <button

        type="button"

        onClick={openPicker}

        className="
          relative
          w-28
          h-28
          mx-auto
          rounded-full
          bg-white/20
          border
          border-white/30
          overflow-hidden
          flex
          items-center
          justify-center
          transition-all
          duration-300
          hover:scale-105
        "

      >

        {

          user.photo ? (

            <img

              src={user.photo}

              alt="Perfil"

              className="
                w-full
                h-full
                object-cover
              "

            />

          ) : (

            <User

              size={48}

              className="text-white"

            />

          )

        }

        <div

          className="
            absolute
            bottom-1
            right-1
            w-9
            h-9
            rounded-full
            bg-black/40
            backdrop-blur-xl
            border
            border-white/20
            flex
            items-center
            justify-center
          "

        >

          <Camera

            size={18}

            className="text-white"

          />

        </div>

      </button>

      <h1

        className="
          text-3xl
          font-bold
          text-white
          mt-6
        "

      >

        {user.name}

      </h1>

      <p

        className="
          text-white/70
          mt-2
        "

      >

        {user.career}

      </p>

      {

        user.university && (

          <p

            className="
              text-white/50
              text-sm
              mt-1
            "

          >

            {user.university}

          </p>

        )

      }

    </section>

  );

}

export default ProfileHeader;