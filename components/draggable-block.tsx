import React from "react";
import { useDrag } from "react-dnd";

type DraggableBlockProps = {
  type: string;
  block: any;
  children: React.ReactNode;
  onClick: () => void;
};

const DraggableBlock = ({
  type,
  block,
  children,
  onClick,
}: DraggableBlockProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { block: { ...block } },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <span
      ref={drag as any}
      className={`${isDragging ? "opacity-50" : ""}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default DraggableBlock;

export const DraggableTypes = {
  EMAIL_RENDERED: "email-block",
  EMAIL_COMPOSER: "email-composer",
};
