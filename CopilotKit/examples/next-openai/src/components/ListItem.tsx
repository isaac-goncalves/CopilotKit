import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled, { keyframes } from "styled-components";

const gradientAnimation = keyframes`
0% {
  background-position: 0% 50%;
}
50% {
  background-position: 400% 50%;
}
100% {
  background-position: 0% 50%;
}
`;

const StyledDragItem = styled.div`
position: relative;
padding: 10px;
border-radius: 6px;
background: white;
margin: 0 0 8px 0;
display: grid;
grid-gap: 20px;
flex-direction: column;
overflow: hidden; /* Ensure the gradient overflow is hidden */

&::before,
&::after {
  content: '';
  display: block;
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  z-index: -1;
  background: linear-gradient(45deg, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000);
  /* border-radius: 6px 6px 0 0; */

  animation: ${gradientAnimation} 15s ease infinite;
}
`;

const ListItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <StyledDragItem
            // className="drag-item"
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <span>Content</span>
            <h4>{item.id}</h4>
          </StyledDragItem>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
