import React, { useState, useCallback, useRef, useEffect } from "react";
import { Table } from "antd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

const type = "DraggableBodyRow";

const list: any[] = [];
for (let i = 0; i < 200; i++) {
  list.push({
    key: i + "1",
    name: "index" + i,
    age: 32,
    address: "New York No. 1 Lake Park",
  });
}

const DraggableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}: any) => {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor: any) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? " drop-over-downward" : " drop-over-upward",
      };
    },
    drop: (item: any) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ""}`}
      style={{ cursor: "move", ...style }}
      {...restProps}
    />
  );
};

const DragSortingTable: React.FC = () => {
  const [data, setData] = useState(list);

  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };
  const changePosition = (index: number, target: number) => {
    [data[index], data[target]] = [data[target], data[index]]
    setData([...data])
  };
  const changePosition1 = (index: number, item:any) => {
    data.splice(index, 1);
    data.unshift(item)
    setData([...data])
  };
  const changePosition2 = (index: number, item:any) => {
    data.splice(index, 1);
    data.push(item)
    setData([...data])
  };
  const columns = [
    {
      title: "opera",
      dataIndex: "opera",
      key: "opera",
      render: (text: any, record: object, index: number) => {
        return (
          <div>
            <span onClick={() => changePosition(index, index-1)}>上移</span>&nbsp;&nbsp;
            <span onClick={() => changePosition(index, index+1)}>下移</span>&nbsp;&nbsp;
            <span onClick={() => changePosition1(index, record)}>置顶</span>&nbsp;&nbsp;
            <span onClick={() => changePosition2(index, record)}>置底</span>&nbsp;&nbsp;
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [data]
  );
  useEffect(() => {
    console.log(data);
  }, [data])
  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        columns={columns}
        dataSource={data}
        components={components}
        pagination={{
          defaultPageSize: 200,
        }}
        scroll={{ y: 400, x: "100vw" }}
        onRow={(record, index): any => ({
          index,
          moveRow,
        })}
      />
    </DndProvider>
  );
};

export default DragSortingTable;
