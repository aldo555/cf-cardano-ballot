import React, { ReactNode, useEffect } from "react";
import { useMatomo } from "@datapunt/matomo-tracker-react";

interface PageBaseProps {
  title: string;
  children: ReactNode;
}

const PageBase: React.FC<PageBaseProps> = ({ title, children }) => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({
      documentTitle: title,
    });
  }, [trackPageView]);

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
};

export { PageBase };
