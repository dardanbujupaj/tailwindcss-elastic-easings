import plugin from "tailwindcss/plugin";
import * as easings from "./easings";

type Options = {
  resolution: number;
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
  function ({ resolution }: { resolution: number } = { resolution: 30 }) {
    return {
      theme: {
        extend: {
          transitionTimingFunction: generateTimingFunctions(resolution),
        },
      },
    };
  },
);

function generateTimingFunctions(resolution: number = 30) {
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
