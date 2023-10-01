export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="mb-4">
          <svg
            className="animate-spin h-8 w-8 mx-auto text-blue-500"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm7-1.414A7.963 7.963 0 0112 20c3.042 0 5.824-1.135 7.938-3l-1.647-3zM16.709 5.709A7.962 7.962 0 0120 12h4c0-6.627-5.373-12-12-12v4z"
            />
          </svg>
        </div>
        <div>Loading...</div>
      </div>
    </div>
  );
}
