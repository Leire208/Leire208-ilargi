import { useState } from "react";

function ColorPicker({
  value,
  onChange,
}) {
  const [hue, setHue] = useState(210);
  const [lightness, setLightness] = useState(55);

  function updateColor(newHue, newLightness) {
    const color = `hsl(${newHue}, 85%, ${newLightness}%)`;

    onChange(color);
  }

  function handleHueChange(e) {
    const newHue = Number(e.target.value);

    setHue(newHue);

    updateColor(
      newHue,
      lightness
    );
  }

  function handleLightnessChange(e) {
    const newLightness = Number(
      e.target.value
    );

    setLightness(newLightness);

    updateColor(
      hue,
      newLightness
    );
  }

  return (
    <div className="mt-2">

      <p className="text-white/70 mb-3">
        Color de la asignatura
      </p>

      {/* BARRA DE TONOS */}

      <div
        className="
          relative
          h-10
          rounded-full
          overflow-hidden
          shadow-inner
        "
        style={{
          background: `
            linear-gradient(
              to right,
              #ff0000 0%,
              #ffff00 16.6%,
              #00ff00 33.3%,
              #00ffff 50%,
              #0000ff 66.6%,
              #ff00ff 83.3%,
              #ff0000 100%
            )
          `,
        }}
      >
        <input
          type="range"
          min="0"
          max="360"
          value={hue}
          onChange={handleHueChange}
          className="
            absolute
            inset-0
            w-full
            h-full
            opacity-0
            cursor-pointer
          "
        />

        {/* INDICADOR */}

        <div
          className="
            pointer-events-none
            absolute
            top-1/2
            -translate-y-1/2
            w-7
            h-7
            rounded-full
            border-4
            border-white
            shadow-xl
          "
          style={{
            left: `calc(${(hue / 360) * 100}% - 14px)`,
          }}
        />
      </div>

      {/* LUMINOSIDAD */}

      <div className="mt-4">
        <p className="text-white/50 text-xs mb-2">
          Luminosidad
        </p>

        <div
          className="
            relative
            h-8
            rounded-full
            overflow-hidden
          "
          style={{
            background: `
              linear-gradient(
                to right,
                #000000,
                hsl(${hue}, 85%, 50%),
                #ffffff
              )
            `,
          }}
        >
          <input
            type="range"
            min="25"
            max="75"
            value={lightness}
            onChange={handleLightnessChange}
            className="
              absolute
              inset-0
              w-full
              h-full
              opacity-0
              cursor-pointer
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              top-1/2
              -translate-y-1/2
              w-6
              h-6
              rounded-full
              border-3
              border-white
              shadow-xl
            "
            style={{
              left: `calc(${
                ((lightness - 25) / 50) * 100
              }% - 12px)`,
            }}
          />
        </div>
      </div>

      {/* COLOR SELECCIONADO */}

      <div className="flex items-center gap-3 mt-4">

        <div
          className="
            w-9
            h-9
            rounded-xl
            border
            border-white/30
            shadow-lg
          "
          style={{
            background: value,
          }}
        />

        <div>
          <p className="text-white text-sm">
            Color seleccionado
          </p>

          <p className="text-white/40 text-xs">
            {value}
          </p>
        </div>

      </div>

    </div>
  );
}

export default ColorPicker;