import { styled } from "@mui/system";
import { MatxVerticalNav } from "app/components";
import useSettings from "app/hooks/useSettings";
import { navigations } from "app/navigations";
import { navigations1 } from "app/navigations1";
import { navigations2 } from "app/navigations2";
import { Fragment } from "react";
import Scrollbar from "react-perfect-scrollbar";
import PerfectScrollbar from "react-perfect-scrollbar";

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: "1rem",
  paddingRight: "1rem",
  position: "relative",
}));

const SideNavMobile = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: "100vw",
  background: "rgba(0, 0, 0, 0.54)",
  zIndex: -1,
  [theme.breakpoints.up("lg")]: { display: "none" },
}));

const Sidenav = ({ children }) => {
  const { settings, updateSettings } = useSettings();

  if (
    sessionStorage.getItem("groupId") === "12" ||
    sessionStorage.getItem("groupId") === "14"
  ) {
    var navReturn = <MatxVerticalNav items={navigations1} />;
  } else if (
    sessionStorage.getItem("groupId") === "1" ||
    sessionStorage.getItem("groupId") === "11" ||
    sessionStorage.getItem("groupId") === "10"
  ) {
    navReturn = <MatxVerticalNav items={navigations} />;
  } else {
    navReturn = <MatxVerticalNav items={navigations2} />;
  }

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + "Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };
  return (
    <Fragment>
      <PerfectScrollbar>
        {children}

        {navReturn}
      </PerfectScrollbar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: "close" })} />
    </Fragment>
  );
};

export default Sidenav;
