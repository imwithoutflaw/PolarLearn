import React from "react";
import AppLayout from "./AppLayout.jsx";

export default function AppShell({ sidebarControls, children }) {
  return <AppLayout sidebarControls={sidebarControls}>{children}</AppLayout>;
}