import ScoreItem from './ScoreItem';

export default function ScoreList({ scores, onDelete }) {
  return (
    <div>
      {scores.length === 0
        ? <p className="text-center text-gray-500">No scores yet.</p>
        : scores.map(s => (
            <ScoreItem key={s._id} s={s} onDelete={onDelete} />
          ))}
    </div>
  );
}
