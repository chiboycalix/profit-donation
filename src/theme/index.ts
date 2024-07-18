import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#00b96b",
    borderRadius: 4,
    colorLinkActive: "#00b96b",
    colorLink: "#00b96b",
    fontFamily: "'Montserrat', sans-serif",
  },
  components: {
    Button: {
      colorPrimary: "#00b96b",
      algorithm: true,
      fontWeightStrong: 600,
    },
    Input: {
      colorPrimary: "#00b96b",
      fontWeightStrong: 600,
    },
    Typography: {
      fontFamily: "'Montserrat', sans-serif",
    },
  },
};

export default theme;
