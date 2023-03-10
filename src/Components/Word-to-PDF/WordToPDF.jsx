import Button from "../utilities/Button";

const WordToPDF = () => {
  return (
    <div className="w-full h-full p-10 flex flex-col overflow-scroll overflow-x-hidden scrollbar-hide">
      <h1 className="text-[32px] font-semibold uppercase mb-10  ">
        Word-to-pdf
      </h1>
      <div className="bg-white flex items-center justify-between p-2 rounded-md">
        <input type="file" name="image" className="w-full bg-slate-200 mx-4" />
        <Button label="Convert" />
      </div>
    </div>
  );
};

export default WordToPDF;
