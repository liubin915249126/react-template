import * as React from "react";

import { DragDropContext, Droppable,Draggable } from "react-beautiful-dnd";

const genRandom = ()=>Math.random() 

const list:any = [];

for(let i = 0; i < 200; i++){
    list.push({id: i+''})
}

const getItemStyle = (
    // draggableStyle: any, 
    isDragging: any
    ) => ({
    color: '#fff',   
    padding: "10px",
    borderBottom: '1px solid #333',
    // userSelect: 'none',
    background: isDragging ? 'lightgreen' : 'grey',
    // ...draggableStyle
  });
  
  const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    width: 250
  });

const Sort: React.FC = (props) => {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
          <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
          >
            {list.map((item: any,index: number) => (
                <Draggable key={index} draggableId={item.id} index={index} >
                  {// tslint:disable-next-line:no-shadowed-variable
                  (provided, snapshot) => (
                      <div>
                        <div
                            ref={provided.innerRef}
                            style={getItemStyle(
                                // provided.draggableStyle,
                                snapshot.isDragging
                            )}
                            {...provided.dragHandleProps}
                        >
                          {index}
                        </div>
                        {provided.placeholder}
                      </div>
                  )}
                </Draggable>
            ))}
            {provided.placeholder}
          </div>
      )}
    </Droppable>
  </DragDropContext>
  );
};

export default Sort;
