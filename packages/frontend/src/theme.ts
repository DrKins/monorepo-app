import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        bgGradient: "linear(to-r, black, darkBlue)",
        minHeight: "100vh",
        color: "white",
      },
    },
  },
  colors: {
    black: "#000000",
    darkBlue: "#14213D",
    orange: "#FCA311",
    lightGray: "#E5E5E5",
    white: "#FFFFFF",
  },
  components: {
    Tabs: {
      baseStyle: {
        tab: {
          _selected: {
            color: "white",
            bg: "darkBlue",
          },
          _hover: {
            bg: "lightGray",
          },
          color: "white",
          borderColor: "white",
        },
        tabpanel: {
          bg: "lightGray",
          color: "white",
        },
      },
      variants: {
        line: (props: { mode: string }) => ({
          tab: {
            _selected: {
              borderColor: mode("primary", "accent")(props), // Border color for the selected tab
            },
          },
        }),
        solidRounded: {
          tab: {
            borderRadius: "lg",
            _selected: {
              bg: "primary",
              color: "accent",
            },
          },
        },
      },
      defaultProps: {
        variant: "line", // Default variant is 'line'
        colorScheme: "gray",
      },
    },
  },
});

export default theme;
