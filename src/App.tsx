import { useState, useEffect } from "react";
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  makeStyles,
  tokens,
  Button,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from "@fluentui/react-components";
import {
  CodeRegular,
  MailRegular,
  WeatherSunnyRegular,
  WeatherMoonRegular,
  PaintBrushRegular,
  LocalLanguageGlobeRegular,
} from "@fluentui/react-icons";
import mascotIcon from "./assets/mascot-icon.png";
import bgImage from "./assets/background.jpg";
import policeIcon from "./assets/police-icon.png";
import { I18nProvider, useI18n } from "./i18n";

const useStyles = makeStyles({
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    position: "relative",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  titleBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    zIndex: 2,
    "@media (max-width: 768px)": {
      padding: "0 16px",
    },
  },
  titleBarBrand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
    color: "inherit",
  },
  titleBarIcon: {
    height: "28px",
    width: "28px",
    objectFit: "contain",
  },
  titleBarName: {
    fontSize: "18px",
    lineHeight: "28px",
    fontWeight: 600,
  },
  titleBarControls: {
    display: "flex",
    gap: "8px",
  },
  hero: {
    width: "50%",
    marginLeft: "auto",
    padding: "48px 56px",
    textAlign: "left",
    borderRadius: "8px 0 0 8px",
    "@media (max-width: 768px)": {
      width: "100%",
      marginLeft: 0,
      padding: "32px 24px",
      borderRadius: 0,
      borderLeft: "none",
      borderRight: "none",
    },
  },
  brand: {
    display: "flex",
    alignItems: "center",
  },
  brandIcon: {
    height: "32px",
    marginRight: "16px",
  },
  brandName: {
    margin: 0,
    fontSize: "28px",
    lineHeight: "36px",
    fontWeight: 600,
  },
  title: {
    margin: "36px 0 8px",
    fontSize: "14px",
    fontWeight: 400,
  },
  divider: {
    border: "none",
    borderTop: "1px solid",
    margin: "8px 0",
  },
  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  actionBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    minWidth: "120px",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: "20px",
    "& svg": {
      width: "24px",
      height: "24px",
    },
  },
  footer: {
    fontSize: "14px",
    margin: 0,
  },
  filing: {
    position: "absolute",
    bottom: "16px",
    right: "16px",
    display: "flex",
    alignItems: "center",
    columnGap: "16px",
    rowGap: "4px",
    flexWrap: "wrap",
    zIndex: 1,
    "@media (max-width: 768px)": {
      left: "16px",
      right: "16px",
      bottom: "16px",
      justifyContent: "center",
    },
  },
  filingLink: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  policeIcon: {
    height: "16px",
    width: "16px",
    objectFit: "contain",
  },
});

type ThemeMode = "light" | "dark" | "system";

function getSavedTheme(): ThemeMode {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark" || saved === "system") return saved;
  return "system";
}

function AppContent() {
  const styles = useStyles();
  const { t, setLang } = useI18n();
  const [themeMode, setThemeMode] = useState<ThemeMode>(getSavedTheme);
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isDark = themeMode === "dark" || (themeMode === "system" && systemDark);

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
    localStorage.setItem("theme", mode);
  };

  const themeIcon = themeMode === "light"
    ? <WeatherSunnyRegular />
    : themeMode === "dark"
    ? <WeatherMoonRegular />
    : <PaintBrushRegular />;

  const textColor = isDark ? "#ffffff" : "#000000";
  const cardBg = isDark ? "rgba(30,30,30,0.85)" : "rgba(255,255,255,0.8)";
  const cardBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)";
  const lineColor = isDark ? "#666666" : "#9a9a9a";

  return (
    <FluentProvider theme={isDark ? webDarkTheme : webLightTheme}>
      <div className={styles.wrapper}>
        {/* Top title bar */}
        <div
          className={styles.titleBar}
          style={{
            backgroundColor: cardBg,
            borderBottom: `1px solid ${cardBorder}`,
          }}
        >
          <a
            className={styles.titleBarBrand}
            href="https://mascot-lab.com"
          >
            <img
              src={mascotIcon}
              className={styles.titleBarIcon}
              alt="Mascot Lab"
            />
            <span className={styles.titleBarName} style={{ color: textColor }}>
              Mascot Lab
            </span>
          </a>
          <div className={styles.titleBarControls}>
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Button
                appearance="subtle"
                icon={themeIcon}
                aria-label={t.theme}
              />
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem
                  icon={<WeatherSunnyRegular />}
                  onClick={() => handleThemeChange("light")}
                >
                  {t.light}
                </MenuItem>
                <MenuItem
                  icon={<WeatherMoonRegular />}
                  onClick={() => handleThemeChange("dark")}
                >
                  {t.dark}
                </MenuItem>
                <MenuItem
                  icon={<PaintBrushRegular />}
                  onClick={() => handleThemeChange("system")}
                >
                  {t.system}
                </MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Button
                appearance="subtle"
                icon={<LocalLanguageGlobeRegular />}
                aria-label={t.lang}
              />
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem onClick={() => setLang("zh")}>
                  中文
                </MenuItem>
                <MenuItem onClick={() => setLang("en")}>
                  English
                </MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
          </div>
        </div>
        <div
          className={styles.hero}
          style={{
            backgroundColor: cardBg,
            borderLeft: `1px solid ${cardBorder}`,
            borderTop: `1px solid ${cardBorder}`,
            borderBottom: `1px solid ${cardBorder}`,
          }}
        >
          {/* Brand */}
          <div className={styles.brand}>
            <img
              src={mascotIcon}
              className={styles.brandIcon}
              alt="Mascot Lab"
            />
            <h2 className={styles.brandName} style={{ color: textColor }}>Mascot Lab</h2>
          </div>

          {/* Title */}
          <p className={styles.title} style={{ color: textColor }}>{t.title}</p>

          <hr className={styles.divider} style={{ borderTopColor: lineColor }} />

          {/* Buttons */}
          <div className={styles.actions}>
            <Button
              appearance="primary"
              size="large"
              className={styles.actionBtn}
              icon={<CodeRegular />}
              onClick={() => window.open("https://github.com/cyprinus-carpio", "_blank")}
            >
              {t.githubBtn}
            </Button>
            <Button
              size="large"
              className={styles.actionBtn}
              icon={<MailRegular />}
              onClick={() => window.location.href = "mailto:Mascot0820@outlook.com"}
            >
              {t.contactBtn}
            </Button>
          </div>

          <hr className={styles.divider} style={{ borderTopColor: lineColor }} />

          <p className={styles.footer} style={{ color: textColor }}>
            {t.footer}
          </p>
        </div>

        {/* Filing info (ICP & Public Security) */}
        <div className={styles.filing} style={{ color: "#000000" }}>
          <a
            className={styles.filingLink}
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            鄂 ICP 备 2026041682 号 - 1
          </a>
          <a
            className={styles.filingLink}
            href="https://beian.mps.gov.cn/#/query/webSearch?code=42050002421120"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={policeIcon}
              className={styles.policeIcon}
              alt="公安备案图标"
            />
            鄂公网安备 42050002421120 号
          </a>
        </div>
      </div>
    </FluentProvider>
  );
}

function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

export default App;

