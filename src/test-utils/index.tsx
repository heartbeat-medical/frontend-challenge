import React from "react";
import { render, RenderOptions } from "@testing-library/react";

interface CustomRenderOptions extends RenderOptions {
  initialHistory?: string[];
}

const customRender = (ui: any, options: CustomRenderOptions = {}) => {
  const { initialHistory, ...rest } = options;

  // Provide any context that the components may be expecting
  const Wrapper: React.FC = ({ children }) => <>{children}</>;
  return render(ui, { wrapper: Wrapper, ...rest });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
