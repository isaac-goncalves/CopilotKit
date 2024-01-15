import { useCallback, useEffect, useMemo, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./style/dragList.css";
import DraggableElement from "./DraggableElement";
import styled from "styled-components";
export type ItemType = {
    id: string;
    prefix: string;
    content: string;
};

const KabanContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* height: 100%; */
    width: 100%;
    padding: 20px;
    border: 4px solid indianred;
    border-radius: 6px;
`;

const DragList = () => {
    const lists = useMemo(() => ["todo", "inProgress", "done"], []);
    
    // const getItems = (count: number, prefix: string) =>
    //     Array.from({ length: count }).map((k) => {
    //         const randomId = Math.floor(Math.random() * 1000);
    //         return {
    //             id: `item-${Date.now() + randomId}`,
    //             prefix,
    //             content: `item ${Date.now() + randomId}`
    //         };
    //     });
    // const generateLists = useCallback(
    //     () =>
    //         lists.reduce(
    //             (acc, listKey) => ({ ...acc, [listKey]: getItems(10, listKey) }),
    //             {}
    //         ),
    //     [lists]
    // );

    const staticItems = {
        todo: [
            { id: 'item-1', prefix: 'todo', content: 'Static item 1' },
            { id: 'item-2', prefix: 'todo', content: 'Static item 2' },
            // Add more static items for the 'todo' list as needed
        ],
        inProgress: [
            { id: 'item-3', prefix: 'inProgress', content: 'Static item 3' },
            { id: 'item-4', prefix: 'inProgress', content: 'Static item 4' },
            // Add more static items for the 'inProgress' list as needed
        ],
        done: [
            { id: 'item-5', prefix: 'done', content: 'Static item 5' },
            { id: 'item-6', prefix: 'done', content: 'Static item 6' },
            // Add more static items for the 'done' list as needed
        ],
    };
    
    const [elements, setElements] = useState(staticItems);

    const removeFromList = (list: ItemType[], index: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(index, 1);
        return [removed, result];
    };

    const addToList = useCallback((list: ItemType[], index: number, element) => {
        const result = Array.from(list);
        result.splice(index, 0, element);
        return result;
    }, []);

    const onDragEnd = useCallback(
        (result: DropResult) => {
            if (!result.destination) {
                return;
            }

            const listCopy: typeof elements = { ...elements };
            const sourceList = listCopy?.[result.source.droppableId];

            const [removedElement, newSourceList] = removeFromList(
                sourceList,
                result.source.index
            );

            listCopy[result.source.droppableId] = newSourceList;
            const destinationList = listCopy[result.destination.droppableId];
            listCopy[result.destination.droppableId] = addToList(
                destinationList,
                result.destination.index,
                removedElement
            );
            setElements(listCopy);
            console.log("DD", result, sourceList, listCopy);
        },
        [elements, addToList]
    );

    // useEffect(() => {
    //     setElements(staticItems);
    // }, [generateLists]);

    return (
        <KabanContainer>
            <nav
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <button>Kanban</button>
        </div>

        <div>
          <button>Sprints</button>
        </div>

        <div>
          <button>Log Out</button>
        </div>
      </nav>
      
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <p>Sprints:</p>
        <select>
          <option value="sprint-1">Sprint 1</option>
          <option value="sprint-2">Sprint 2</option>
          <option value="sprint-3">Sprint 3</option>
        </select>
        </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="list-grid">
                    {lists.map((listKey) => (
                        <DraggableElement
                            elements={elements[listKey]}
                            key={listKey}
                            prefix={listKey}
                        />
                    ))}
                </div>
            </DragDropContext>
        </KabanContainer>
    );
};

export default DragList;