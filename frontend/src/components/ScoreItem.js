export default function ScoreItem({ s, onDelete }) {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded shadow mb-2">
      <div>
        <div className="text-lg font-semibold">{s.studentName}</div>
        <div className="text-gray-600">{s.subject} – <span className="font-bold">{s.score}</span></div>
      </div>
      <button
        onClick={() => onDelete(s._id)}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}
