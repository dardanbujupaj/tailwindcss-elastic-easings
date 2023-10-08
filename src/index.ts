import plugin from "tailwindcss/plugin";
import * as defaultEasings from "./easings";

type Options = {
  resolution?: number;
  customEasings?: Record<string, (value: number) => number>;
};

export = plugin.withOptions<Options>(
  function () {
    return function ({ addVariant }) {
      addVariant(
        "no-elastic",
        "@supports not (transition-timing-function: linear(0, 1))",
      );
    };
  },
  function ({ resolution, customEasings } = {}) {
    return {
      theme: {
        extend: {
          transitionTimingFunction: generateTimingFunctions(
            resolution,
            customEasings,
          ),
        },
      },
    };
  },
);

function generateTimingFunctions(
  resolution: number = 30,
  customEasings: Record<string, (value: number) => number> = {},
) {
  const easings = {
    ...defaultEasings,
    ...customEasings,
  };

  return Object.fromEntries(
    Object.entries(easings).map(([name, easingFunction]) => {
      const tailwindName = name.replace(
        /[A-Z]/g,
        (letter) => `-${letter.toLowerCase()}`,
      );

      const values = Array(resolution)
        .fill(0)
        .map((_, i) => easingFunction(i / resolution));

      return [tailwindName, `linear(${values.join(", ")})`];
    }),
  );
}
