import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        green: {
          "50": "#e4ffe4",
          "100": "#c4ffc5",
          "200": "#90ff93",
          "300": "#50ff5c",
          "400": "#00ff1a",
          "500": "#00e61d",
          "600": "#00b81c",
          "700": "#008b16",
          "800": "#076d18",
          "900": "#0b5c1a",
          "950": "#00340c",
        },
      },
    },
  },
};
