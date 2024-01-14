import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem.tsx";
import { ItemType } from "./interface/index.tsx";

type ComponentType = {
  prefix: string;
  elements: Array<string>;
};

const DraggableElement = ({ prefix, elements }: ComponentType) => {
  return (
    <div className="droppable">
      <h5>  
        {prefix.toLocaleUpperCase()}
      </h5>

      <StrictModeDroppable droppableId={`${prefix}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {elements.map((item: ItemType, index: number) => (
              <ListItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
};

export default DraggableElement;

const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
      const animation = requestAnimationFrame(() => setEnabled(true));
      return () => {
        cancelAnimationFrame(animation);
        setEnabled(false);
      };
    }, []);
    if (!enabled) {
      return null;
    }
    return <Droppable {...props}>{children}</Droppable>;
  };
