"use client";
import React, { useState } from "react";

const Page = () => {
  const [isEdit, setIsEdit] = useState(false);

  const blocks = [
    { type: "text", props: { value: "Test 1" } },
    { type: "text", props: { value: "Test 2" } },
    { type: "text", props: { value: "Test 3" } },
    {
      type: "row",
      props: {
        children: [
          { type: "text", props: { value: "Test 4" } },
          { type: "text", props: { value: "Test 5" } },
          {
            type: "row",
            props: {
              children: [
                { type: "text", props: { value: "Test 6" } },
                { type: "text", props: { value: "Test 7" } },
              ],
            },
          },
        ],
      },
    },
  ];

  const componentRenders = {
    text: ({ props }) => <p className="flex-1">{props.value}</p>,
    row: ({ props }) => (
      <div className="flex border-2 border-red-500 flex-1">
        {renderBlocks(props.children, componentRenders)}
      </div>
    ),
  };

  const componentRendersEdit = {
    text: ({ props }) => (
      <input type="text" defaultValue={props.value} className="flex-1" />
    ),
    row: ({ props }) => (
      <div className="flex border-2 border-red-500 flex-1">
        {renderBlocks(props.children, componentRendersEdit)}
      </div>
    ),
  };

  const renderBlocks = (blocks, renders) => {
    return blocks.map((block, index) => {
      const RenderComponent = renders[block.type];
      if (!RenderComponent) {
        console.warn(`No render found for block type: ${block.type}`);
        return null;
      }
      return <RenderComponent key={index} {...block} />;
    });
  };

  return (
    <div>
      <h2>Page</h2>
      <div className="flex flex-col">
        {renderBlocks(blocks, isEdit ? componentRendersEdit : componentRenders)}
      </div>
      <button onClick={() => setIsEdit((prev) => !prev)}>Toggle edit</button>
    </div>
  );
};

export default Page;
