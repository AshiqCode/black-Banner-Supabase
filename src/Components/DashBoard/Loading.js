const Loading = () => {
  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-gray-200 rounded-full animate-spin"></div>

        {/* Text */}
        <h2 className="text-xl font-semibold text-gray-800">
          Loading, please wait...
        </h2>

        <p className="text-gray-600 text-center max-w-xs">
          Your data is being loaded. This may take a few seconds. Thank you for
          your patience.
        </p>

        {/* Optional Footer Logo */}
        <h1 className="text-4xl font-bold tracking-tight select-none text-yellow-500 mt-4">
          Black<span className="text-gray-900">Banner</span>
        </h1>
      </div>
    </div>
  );
};

export default Loading;
