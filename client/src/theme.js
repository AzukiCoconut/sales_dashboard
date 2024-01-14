// COLOR DESIGN TOKENS EXPORT
export const tokensDark = {
  secondary: {
    // Lighter to darker shades of grey
    0: "#ffffff", // Manually adjusted
    10: "#f6f6f6", // Manually adjusted
    50: "#f0f0f0", // Manually adjusted
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000" // Manually adjusted
  },

  primary: {
    // Shades of teal
    100: "#cfdddb",
    200: "#9fbbb7",
    300: "#6e9894",
    400: "#3e7670",
    500: "#0e544c",
    600: "#0b433d",
    700: "#08322e",
    800: "#06221e",
    900: "#03110f"
  }

  // secondary: {
  //   // Shades of yellow
  //   50: "#f0f0f0", // Manually adjusted
  //   100: "#fff6e0",
  //   200: "#ffedc2",
  //   300: "#ffe3a3",
  //   400: "#ffda85",
  //   500: "#ffd166",
  //   600: "#cca752",
  //   700: "#997d3d",
  //   800: "#665429",
  //   900: "#332a14",
  // },
};

// FUNCTION THAT REVERSES THE COLOR PALETTE
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// MUI THEME SETTINGS
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // Palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400]
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[0]
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500]
            }
          }
        : {
            // Palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.secondary[50],
              light: tokensDark.secondary[100]
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.primary[600],
              light: tokensDark.primary[700]
            },
            background: {
              default: tokensDark.secondary[0],
              alt: tokensDark.secondary[50]
            }
          })
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14
      }
    }
  };
};
