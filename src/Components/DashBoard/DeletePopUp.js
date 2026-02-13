const DeletePopUp = ({ setIsDeletePopUp, deletehandle }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {/* Content */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800">Delete Item?</h2>
          <p className="mt-2 text-sm text-gray-600">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => setIsDeletePopUp(false)}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={deletehandle}
              className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
