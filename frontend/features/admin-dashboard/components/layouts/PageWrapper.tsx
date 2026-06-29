import { type ReactNode } from "react";

type PageWrapperProps = {
    children: ReactNode;
  };

const PageWrapper = ({children}: PageWrapperProps) => {
  return <div className="font-jost px-7 py-4 ">{children}</div>;
};

export default PageWrapper;
