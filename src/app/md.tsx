import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ResponseComponent = ({ response }: { response: string }) => {
  console.log(response);
  return (
    <div className="p-4 bg-white text-black rounded-lg shadow-md">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
    </div>
  );
};

export default ResponseComponent;
