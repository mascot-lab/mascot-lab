import { useState, useEffect, useRef } from "react";
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  makeStyles,
  tokens,
  Button,
  CompoundButton,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from "@fluentui/react-components";
import {
  CodeRegular,
  ArrowDownRegular,
  StoreMicrosoftFilled,
  ChatHelpRegular,
  DocumentLinkRegular,
  WeatherSunnyRegular,
  WeatherMoonRegular,
  PaintBrushRegular,
  LocalLanguageGlobeRegular,
} from "@fluentui/react-icons";
import mascotIcon from "./assets/mascot-icon.png";
import acesIcon from "./assets/aces-icon.png";
import bgImage from "./assets/background.jpg";
import policeIcon from "./assets/police-icon.png";
import { I18nProvider, useI18n } from "./i18n";

const useStyles = makeStyles({
  wrapper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  titleBar: {
    flexShrink: 0,
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    zIndex: 2,
    "@media (max-width: 600px)": {
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
  scrollArea: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    position: "relative",
  },
  hero: {
    position: "relative",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "48px 56px",
    "@media (max-width: 600px)": {
      padding: "32px 24px",
    },
  },
  sectionContent: {
    width: "100%",
    maxWidth: "760px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  moreBtn: {
    position: "absolute",
    bottom: "32px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 5,
  },
  moreBtnCorner: {
    position: "absolute",
    right: "24px",
    bottom: "24px",
    zIndex: 5,
    "@media (max-width: 600px)": {
      right: "16px",
      bottom: "16px",
    },
  },
  brand: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
    "@media (max-width: 600px)": {
      display: "grid",
      justifyContent: "center",
    },
  },
  bottomBar: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    flexWrap: "wrap",
    padding: "8px 24px",
    zIndex: 10,
    "@media (max-width: 768px)": {
      flexDirection: "column-reverse",
      alignItems: "center",
      justifyContent: "center",
      rowGap: "4px",
      padding: "8px 16px",
    },
  },
  copyright: {
    margin: 0,
    fontSize: "14px",
  },
  filing: {
    display: "flex",
    alignItems: "center",
    columnGap: "16px",
    rowGap: "4px",
    flexWrap: "wrap",
    "@media (max-width: 768px)": {
      flexDirection: "column",
      alignItems: "center",
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
  const [isLowHeight, setIsLowHeight] = useState(
    () => window.innerHeight <= 640
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const onResize = () => setIsLowHeight(window.innerHeight <= 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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
  const maskBg = isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.4)";

  const section2Ref = useRef<HTMLDivElement>(null);
  const scrollToMore = () => {
    section2Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const mainContent = (
    <>
      <div className={styles.brand}>
        <img
          src={mascotIcon}
          className={styles.brandIcon}
          alt="Mascot Lab"
        />
        <h2 className={styles.brandName} style={{ color: textColor }}>Mascot Lab</h2>
      </div>

      <p className={styles.title} style={{ color: textColor }}>{t.title}</p>

      <div className={styles.actions}>
        <CompoundButton
          as="a"
          href="https://github.com/mascot-lab"
          target="_blank"
          rel="noopener noreferrer"
          secondaryContent="@mascot-lab"
          icon={<CodeRegular />}
        >
          Mascot Lab
        </CompoundButton>
        <CompoundButton
          as="a"
          href="https://github.com/cyprinus-carpio"
          target="_blank"
          rel="noopener noreferrer"
          secondaryContent="@cyprinus-carpio"
          icon={<CodeRegular />}
        >
          {t.githubBtn}
        </CompoundButton>
      </div>
    </>
  );

  const acesContent = (
    <>
      <div className={styles.brand}>
        <img
          src={acesIcon}
          className={styles.brandIcon}
          alt="Anti-Cheat Exam System"
        />
        <h2 className={styles.brandName} style={{ color: textColor }}>{t.acesName}</h2>
      </div>

      <p className={styles.title} style={{ color: textColor }}>{t.acesDesc}</p>

      <div className={styles.actions}>
        <CompoundButton
          as="a"
          href="https://apps.microsoft.com/detail/9P8KZRS8JBX3"
          target="_blank"
          rel="noopener noreferrer"
          appearance="primary"
          secondaryContent={t.acesStoreSecondary}
          icon={<StoreMicrosoftFilled />}
        >
          {t.acesStore}
        </CompoundButton>
        <CompoundButton
          as="a"
          href="https://aces.mascot-lab.com"
          target="_blank"
          rel="noopener noreferrer"
          secondaryContent="aces.mascot-lab.com"
          icon={<DocumentLinkRegular />}
        >
          {t.acesDocs}
        </CompoundButton>
        <CompoundButton
          as="a"
          href="https://github.com/mascot-lab/anti-cheat-exam-system/issues"
          target="_blank"
          rel="noopener noreferrer"
          secondaryContent={t.acesFeedbackSecondary}
          icon={<ChatHelpRegular />}
        >
          {t.acesFeedback}
        </CompoundButton>
      </div>
    </>
  );

  const bottomBarEl = (
    <div
      className={styles.bottomBar}
      style={{
        color: textColor,
        backgroundColor: cardBg,
        borderTop: `1px solid ${cardBorder}`,
      }}
    >
      <p className={styles.copyright}>{t.footer}</p>
      <div className={styles.filing} style={{ color: textColor }}>
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
  );

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
        {/* Section 1 */}
        <div className={styles.scrollArea}>
          <div className={styles.hero} style={{ backgroundColor: maskBg }}>
            <div className={styles.sectionContent}>{mainContent}</div>
            <Button
              className={isLowHeight ? styles.moreBtnCorner : styles.moreBtn}
              appearance="secondary"
              icon={<ArrowDownRegular />}
              onClick={scrollToMore}
            >
              {t.seeMore}
            </Button>
          </div>

          {/* Section 2 */}
          <div
            ref={section2Ref}
            className={styles.hero}
            style={{ backgroundColor: maskBg }}
          >
            <div className={styles.sectionContent}>{acesContent}</div>
          </div>

          {/* Bottom bar shown only at the very bottom on short viewports */}
          {isLowHeight && bottomBarEl}
        </div>

        {/* Bottom bar docked normally */}
        {!isLowHeight && bottomBarEl}
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

