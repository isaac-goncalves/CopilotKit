"use client";
import { CopilotProvider } from "@copilotkit/react-core";
import { CopilotSidebarUIProvider } from "@copilotkit/react-ui";
import "@copilotkit/react-textarea/styles.css"; // also import this if you want to use the CopilotTextarea component
import "@copilotkit/react-ui/styles.css"; // also import this if you want to use the chatbot component

export default function RootLayout({children}) {
  return (
    <CopilotProvider chatApiEndpoint="/path_to_copilotkit_endpoint/see_below">
      {/* <CopilotSidebarUIProvider> */}
        {children}
      {/* </CopilotSidebarUIProvider> */}
    </CopilotProvider>
  );
}