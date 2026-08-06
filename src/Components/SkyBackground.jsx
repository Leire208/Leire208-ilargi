import { useTheme } from "../Context/ThemeContext";

const stars = [
  { top: "8%", left: "15%", size: 2 },
  { top: "14%", left: "70%", size: 3 },
  { top: "22%", left: "35%", size: 2 },
  { top: "28%", left: "82%", size: 2 },
  { top: "38%", left: "10%", size: 3 },
  { top: "46%", left: "58%", size: 2 },
  { top: "56%", left: "25%", size: 2 },
  { top: "64%", left: "78%", size: 3 },
  { top: "74%", left: "42%", size: 2 },
  { top: "86%", left: "18%", size: 2 },
  { top: "90%", left: "68%", size: 3 }
];

function SkyBackground({ children }) {

  const { theme, styles } = useTheme();

  return (

    <div
      className={`
        relative
        min-h-screen
        overflow-hidden
        bg-gradient-to-b
        ${styles.background}
        transition-all
        duration-1000
      `}
    >

      {/* Capa de contraste */}
      <div
        className={`
          absolute
          inset-0
          ${styles.overlay}
        `}
      />

      {/* Sol */}
      {theme === "day" && (

        <div
          className="
            absolute
            top-12
            right-12
            w-24
            h-24
            rounded-full
            bg-yellow-300
            shadow-[0_0_100px_rgba(255,230,120,0.7)]
          "
        />

      )}

      {/* Atardecer */}
      {theme === "sunset" && (

        <div
          className="
            absolute
            top-20
            right-12
            w-20
            h-20
            rounded-full
            bg-orange-300
            shadow-[0_0_90px_rgba(255,170,80,0.7)]
          "
        />

      )}

      {/* Luna y estrellas */}
      {theme === "night" && (

        <>

          <div
            className="
              absolute
              top-14
              right-10
              w-20
              h-20
              rounded-full
              bg-white
              shadow-[0_0_80px_rgba(255,255,255,0.5)]
            "
          />

          {stars.map((star, index) => (

            <span
              key={index}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`
              }}
            />

          ))}

        </>

      )}

      {/* Nubes de día */}
      {theme === "day" && (

        <>
          <div className="absolute top-28 left-10 w-40 h-14 rounded-full bg-white/50 blur-sm" />
          <div className="absolute top-44 right-24 w-52 h-16 rounded-full bg-white/40 blur-sm" />
          <div className="absolute top-72 left-1/3 w-44 h-14 rounded-full bg-white/35 blur-sm" />
        </>

      )}

      {/* Contenido */}
      <div className="relative z-10">

        {children}

      </div>

    </div>

  );

}

export default SkyBackground;