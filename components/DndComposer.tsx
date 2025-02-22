"use client";
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
  BLOCK: "block",
};

const DndComposer = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Composer />
      </div>
    </DndProvider>
  );
};

const Sidebar = () => {
  const blocks = [
    { id: "1", value: "First block" },
    { id: "2", value: "Second block" },
    { id: "3", value: "Third block" },
  ];

  return (
    <div
      style={{
        width: "200px",
        padding: "16px",
        borderRight: "2px solid #ccc",
      }}
    >
      <h3>Available Blocks</h3>
      {blocks.map((block) => (
        <DraggableSidebarBlock key={block.id} block={block} />
      ))}
    </div>
  );
};

const DraggableSidebarBlock = ({ block }) => {
  const [, ref] = useDrag({
    type: ItemTypes.BLOCK,
    item: { block },
  });

  return (
    <div
      ref={ref}
      style={{
        padding: "8px",
        margin: "4px 0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "move",
      }}
    >
      {block.value}
    </div>
  );
};

const Composer = () => {
  const [blocks, setBlocks] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);

  const moveBlock = (fromIndex, toIndex) => {
    const updatedBlocks = [...blocks];
    const [movedBlock] = updatedBlocks.splice(fromIndex, 1);
    updatedBlocks.splice(toIndex, 0, movedBlock);
    setBlocks(updatedBlocks);
  };

  const [, drop] = useDrop({
    accept: ItemTypes.BLOCK,
    hover: (item) => {
      const draggedIndex = item.index;
      if (draggedIndex !== hoverIndex) {
        setHoverIndex(draggedIndex);
      }
    },
    drop: (item) => {
      setBlocks((prevBlocks) => {
        const updatedBlocks = [...prevBlocks];
        updatedBlocks.splice(hoverIndex, 0, item.block);
        return updatedBlocks;
      });
    },
  });

  return (
    <div
      ref={drop}
      style={{
        padding: "16px",
        flex: 1,
        borderRadius: "4px",
        minHeight: "300px",
      }}
    >
      <h3>Composer Area</h3>
      {blocks.map((block, index) => (
        <DraggableBlock
          key={block.id}
          block={block}
          index={index}
          moveBlock={moveBlock}
        />
      ))}
      {JSON.stringify(blocks)}
    </div>
  );
};

const DraggableBlock = ({ block, index, moveBlock }) => {
  const [, ref] = useDrag({
    type: ItemTypes.BLOCK,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.BLOCK,
    hover: (item) => {
      if (item.index !== index) {
        moveBlock(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      style={{
        padding: "8px",
        margin: "4px 0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "move",
      }}
    >
      {block.value}
    </div>
  );
};

export default DndComposer;
