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
  headerControls: {
    position: "absolute",
    top: "16px",
    right: "16px",
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
        <div className={styles.headerControls}>
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Button
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

