import DraggableBlock from "../draggable-block";

const ComposerWrapper = ({ type, block, children, onClick }) => {
  return (
    <DraggableBlock type={type} block={block} onClick={onClick}>
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
        {children}
      </div>
    </DraggableBlock>
  );
};

export default ComposerWrapper;
