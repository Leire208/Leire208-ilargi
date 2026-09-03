import { useTheme } from "../Context/ThemeContext";

const stars = [
  { top: "9%", left: "8%", size: 1 },
  { top: "15%", left: "19%", size: 1 },
  { top: "11%", left: "72%", size: 1.5 },
  { top: "22%", left: "87%", size: 1 },
  { top: "30%", left: "57%", size: 1 },
  { top: "38%", left: "91%", size: 1 },
  { top: "47%", left: "12%", size: 1 },
  { top: "55%", left: "78%", size: 1 },
  { top: "65%", left: "44%", size: 1.5 },
  { top: "73%", left: "89%", size: 1 },
  { top: "82%", left: "17%", size: 1 },
  { top: "89%", left: "63%", size: 1 },
  { top: "94%", left: "34%", size: 1 },
];

function SkyBackground({ children }) {
  const { theme } = useTheme();

  return (
    <div className="relative min-h-[100dvh] isolate overflow-x-clip">

      {/* =====================================================
          CIELO FIJO
      ====================================================== */}

      <div className="fixed inset-0 z-0 overflow-hidden">

        {/* ===================================================
            BASE
        ==================================================== */}

        <div
          className={`
            absolute
            inset-0
            transition-all
            duration-[5000ms]
            ease-in-out

            ${
              theme === "day"
                ? `
                  bg-[linear-gradient(
                    155deg,
                    #b9f3ff_0%,
                    #72d8f7_24%,
                    #38aee8_52%,
                    #367bc4_78%,
                    #315eae_100%
                  )]
                `
                : ""
            }

            ${
              theme === "sunset"
                ? `
                  bg-[linear-gradient(
                    155deg,
                    #9beaff_0%,
                    #62c9f4_22%,
                    #4e9ee8_45%,
                    #536fca_70%,
                    #4651a2_100%
                  )]
                `
                : ""
            }

            ${
              theme === "night"
                ? `
                  bg-[linear-gradient(
                    155deg,
                    #386eb4_0%,
                    #285995_25%,
                    #234b91_50%,
                    #283d87_75%,
                    #1d2868_100%
                  )]
                `
                : ""
            }
          `}
        />

        {/* ===================================================
            DÍA
        ==================================================== */}

        {theme === "day" && (
          <>
            {/* Gran luz superior */}

            <div
              className="
                absolute
                -top-[25%]
                right-[-10%]
                w-[760px]
                h-[760px]
                rounded-full
                bg-white/[0.42]
                blur-[120px]
                animate-[sunDrift_24s_ease-in-out_infinite]
              "
            />

            {/* Cyan brillante */}

            <div
              className="
                absolute
                top-[8%]
                left-[-18%]
                w-[700px]
                h-[650px]
                rounded-full
                bg-cyan-200/[0.28]
                blur-[130px]
                animate-[cloudDrift_30s_ease-in-out_infinite]
              "
            />

            {/* Azul cielo */}

            <div
              className="
                absolute
                top-[35%]
                left-[18%]
                w-[620px]
                h-[420px]
                rounded-full
                bg-sky-300/[0.18]
                blur-[130px]
              "
            />

            {/* Turquesa inferior */}

            <div
              className="
                absolute
                bottom-[-20%]
                left-[-10%]
                w-[700px]
                h-[520px]
                rounded-full
                bg-cyan-400/[0.12]
                blur-[150px]
              "
            />

            {/* Azul profundo */}

            <div
              className="
                absolute
                bottom-[-25%]
                right-[-12%]
                w-[800px]
                h-[600px]
                rounded-full
                bg-blue-800/[0.20]
                blur-[150px]
              "
            />

            {/* Brillo atmosférico */}

            <div
              className="
                absolute
                top-[48%]
                left-[35%]
                w-[500px]
                h-[220px]
                rounded-full
                bg-white/[0.08]
                blur-[110px]
              "
            />
          </>
        )}

        {/* ===================================================
            TARDE
        ==================================================== */}

        {theme === "sunset" && (
          <>
            {/* Luz clara del cielo */}

            <div
              className="
                absolute
                -top-[18%]
                right-[-12%]
                w-[760px]
                h-[700px]
                rounded-full
                bg-cyan-100/[0.32]
                blur-[130px]
                animate-[sunDrift_26s_ease-in-out_infinite]
              "
            />

            {/* Azul turquesa */}

            <div
              className="
                absolute
                top-[5%]
                left-[-18%]
                w-[700px]
                h-[650px]
                rounded-full
                bg-cyan-300/[0.22]
                blur-[140px]
                animate-[cloudDrift_32s_ease-in-out_infinite]
              "
            />

            {/* Azul intenso */}

            <div
              className="
                absolute
                top-[30%]
                left-[22%]
                w-[650px]
                h-[480px]
                rounded-full
                bg-blue-500/[0.20]
                blur-[150px]
              "
            />

            {/* Lavanda azulada */}

            <div
              className="
                absolute
                top-[42%]
                right-[5%]
                w-[550px]
                h-[450px]
                rounded-full
                bg-indigo-400/[0.18]
                blur-[150px]
              "
            />

            {/* Azul inferior */}

            <div
              className="
                absolute
                bottom-[-25%]
                left-[-10%]
                w-[800px]
                h-[600px]
                rounded-full
                bg-blue-900/[0.28]
                blur-[160px]
              "
            />
          </>
        )}

        {/* ===================================================
            NOCHE
        ==================================================== */}

        {theme === "night" && (
          <>
            {/* Azul luminoso superior */}

            <div
              className="
                absolute
                -top-[18%]
                right-[-12%]
                w-[760px]
                h-[700px]
                rounded-full
                bg-sky-400/[0.16]
                blur-[150px]
                animate-[sunDrift_30s_ease-in-out_infinite]
              "
            />

            {/* Azul eléctrico */}

            <div
              className="
                absolute
                top-[12%]
                left-[-20%]
                w-[720px]
                h-[680px]
                rounded-full
                bg-blue-500/[0.17]
                blur-[160px]
                animate-[cloudDrift_35s_ease-in-out_infinite]
              "
            />

            {/* Índigo */}

            <div
              className="
                absolute
                top-[35%]
                left-[25%]
                w-[650px]
                h-[500px]
                rounded-full
                bg-indigo-500/[0.15]
                blur-[160px]
              "
            />

            {/* Cyan inferior */}

            <div
              className="
                absolute
                bottom-[-22%]
                right-[-8%]
                w-[800px]
                h-[550px]
                rounded-full
                bg-cyan-500/[0.08]
                blur-[170px]
              "
            />

            {/* Azul profundo */}

            <div
              className="
                absolute
                bottom-[-25%]
                left-[-15%]
                w-[750px]
                h-[600px]
                rounded-full
                bg-blue-950/[0.30]
                blur-[160px]
              "
            />

            {/* Estrellas */}

            {stars.map((star, index) => (
              <span
                key={index}
                className="
                  absolute
                  rounded-full
                  bg-sky-100
                  opacity-[0.48]
                "
                style={{
                  top: star.top,
                  left: star.left,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
              />
            ))}

            {/* Estrellas especiales */}

            <span
              className="
                absolute
                top-[18%]
                left-[74%]
                w-[3px]
                h-[3px]
                rounded-full
                bg-cyan-100/80
                blur-[1px]
              "
            />

            <span
              className="
                absolute
                top-[43%]
                left-[27%]
                w-[2px]
                h-[2px]
                rounded-full
                bg-sky-200/80
                blur-[1px]
              "
            />

            <span
              className="
                absolute
                top-[72%]
                left-[61%]
                w-[2px]
                h-[2px]
                rounded-full
                bg-blue-100/70
                blur-[1px]
              "
            />
          </>
        )}

        {/* ===================================================
            ATMÓSFERA GENERAL
        ==================================================== */}

        {/* Luz superior */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(
              ellipse_at_50%_-10%,
              rgba(255,255,255,0.18),
              transparent_48%
            )]
            pointer-events-none
          "
        />

        {/* Brillo central azul */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(
              ellipse_at_center,
              rgba(120,220,255,0.08),
              transparent_65%
            )]
            pointer-events-none
          "
        />

        {/* Ligera profundidad en los bordes */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(
              ellipse_at_center,
              transparent_48%,
              rgba(20,55,110,0.16)_100%
            )]
            pointer-events-none
          "
        />

        {/* Capa inferior */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[35%]
            bg-gradient-to-t
            from-blue-950/[0.18]
            via-transparent
            to-transparent
            pointer-events-none
          "
        />
      </div>

      {/* =====================================================
          CONTENIDO
      ====================================================== */}

      <div className="relative z-10 min-h-[100dvh]">
        {children}
      </div>

      {/* =====================================================
          MOVIMIENTO DEL CIELO
      ====================================================== */}

      <style>{`
        @keyframes sunDrift {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(-35px, 20px, 0) scale(1.06);
          }
        }

        @keyframes cloudDrift {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(30px, -18px, 0) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}

export default SkyBackground;