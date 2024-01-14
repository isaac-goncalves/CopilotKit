"use client";

import {
  CopilotProvider,
  useMakeCopilotActionable,
  useMakeCopilotReadable,
} from "@copilotkit/react-core";
import { CopilotSidebarUIProvider } from "@copilotkit/react-ui";
import { useState } from "react";
import styled from 'styled-components';
import Sidebar from "../../components/Sidebar";
import ToDoListGenerator from "../../components/ToDoListGenerator";
import DragList from "../../components/DragList";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;


const HelloWorld = () => {
  return (
    <CopilotProvider chatApiEndpoint="/api/copilotkit/openai">
      <CopilotSidebarUIProvider>
      <AppContainer>
        {/* <Presentation /> */}
          <Sidebar
            onSelectItem={(item: string) => {
              console.log(item);
            }}
          />
          <MainContent>
            {/* <h1>VITE KANBAN</h1> */}
            {/* Input field with insert what u want to do and spinner to show loading,
             it will take the input and send to a backend that will process the intent with NLP models
             and return a list of steps to do the prompted message */}
            <ToDoListGenerator />
            <DragList />
          </MainContent>
        </AppContainer>
      </CopilotSidebarUIProvider>
    </CopilotProvider>
  );
};

const Presentation = () => {
  const [state, setState] = useState({
    message: "Hello World!",
    backgroundImage: "none",
  });

  useMakeCopilotReadable("This is the current slide: " + JSON.stringify(state));
  useMakeCopilotActionable(
    {
      name: "presentSlide",
      description: "Present a slide in the presentation you are giving.",
      argumentAnnotations: [
        {
          name: "message",
          type: "string",
          description:
            "A message to display in the presentation slide, max 30 words, but make it informative.",
          required: true,
        },
        {
          name: "backgroundImage",
          type: "string",
          description:
            "What to display in the background of the slide (i.e. 'dog' or 'house'), or 'none' for a blank background",
          required: true,
        },
      ],
      implementation: async (message, backgroundImage) => {
        setState({
          message: message,
          backgroundImage: backgroundImage,
        });
      },
    },
    [],
  );

  return <Slide {...state} />;
};

type SlideProps = {
  message: string;
  backgroundImage: string;
};

const Slide = ({ message, backgroundImage }: SlideProps) => {
  if (backgroundImage !== "none") {
    backgroundImage =
      'url("https://source.unsplash.com/featured/?' + encodeURIComponent(backgroundImage) + '")';
  }
  return (
    <div
      className="h-screen w-full flex flex-col justify-center items-center text-5xl text-white bg-cover bg-center bg-no-repeat p-10 text-center"
      style={{
        backgroundImage,
        textShadow: "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
      }}
    >
      {message}
    </div>
  );
};

export default HelloWorld;
