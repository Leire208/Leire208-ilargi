import { X } from "lucide-react";

import { useTheme } from "../../Context/ThemeContext";

function SettingsModal({

  open,

  close,

  title,

  children

}) {

  const { styles } = useTheme();

  if (!open) return null;

  return (

    <div

      className="
        fixed
        inset-0
        z-[150]
        bg-black/40
        backdrop-blur-sm
        flex
        items-end
      "

      onClick={close}

    >

      <section

        onClick={(e) => e.stopPropagation()}

        className={`
          w-full
          rounded-t-[36px]
          p-6
          ${styles.card}
        `}

      >

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-white">

            {title}

          </h2>

          <button onClick={close}>

            <X className="text-white"/>

          </button>

        </div>

        {children}

      </section>

    </div>

  );

}

export default SettingsModal;