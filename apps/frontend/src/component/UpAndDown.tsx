export function UpDownAnimation({ content } : { content: React.ReactNode}){
  return (
    <div className="flex justify-center items-center flex-col animate-[upAndDown_2s_ease-in-out_infinite]">
      {content}
    </div>
  );
};