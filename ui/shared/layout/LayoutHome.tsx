import React from "react";

import type { Props } from "./types";

import AppErrorBoundary from "ui/shared/AppError/AppErrorBoundary";
import HeaderAlert from "ui/snippets/header/HeaderAlert";
import HeaderMobile from "ui/snippets/header/HeaderMobile";

import * as Layout from "./components";

const LayoutHome = ({ children }: Props) => {
  return (
    <Layout.Container>
      <Layout.NavBar />
      <HeaderMobile hideSearchBar />
      <Layout.MainArea overflow="hidden">
        <Layout.MainColumn paddingTop={{ base: 3, lg: 6 }}>
          <HeaderAlert />
          <AppErrorBoundary>{children}</AppErrorBoundary>
        </Layout.MainColumn>
      </Layout.MainArea>
      <Layout.Footer />
    </Layout.Container>
  );
};

export default LayoutHome;
