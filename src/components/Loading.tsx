// components/Loading.tsx
const Loading: React.FC = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-[777]">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
      </div>
    );
  };
  
  export default Loading;
  