import { useEffect, useState } from 'react';
import { fetchScores, deleteScore, updateScore } from '../store/slices/scoreSlice';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';

export default function ScoreHistoryPage() {
  const dispatch = useDispatch();
  const { list, totalPages, currentPage } = useSelector((s) => s.scores);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchScores(currentPage));
  }, [dispatch, currentPage]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this data?');
    if (confirmDelete) {
      dispatch(deleteScore(id)).then(() => dispatch(fetchScores(currentPage)));
    }
  };

  const goto = (page) => dispatch(fetchScores(page));

  const startEdit = (score) => {
    setEditing({ ...score, date: score.date?.slice(0, 10) }); // format date input
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditing((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    await dispatch(updateScore({ id: editing._id, data: editing }));
    setEditing(null);
    dispatch(fetchScores(currentPage));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <h1 className="text-3xl font-bold text-white">Score History</h1>
              <p className="text-blue-100 mt-2">Manage and view student scores</p>
            </div>

            <div className="p-8">
              {list.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg">No data available yet.</p>
                </div>
              ) : (
                <>
                  <div className="grid gap-6">
                    {list.map(score => (
                      <div key={score._id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{score.studentName}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500 mb-1">Subject</p>
                                <p className="text-gray-800 font-medium">{score.subject}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">Score</p>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                  score.score >= 80 ? 'bg-green-100 text-green-800' :
                                  score.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {score.score}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">Feedback</p>
                                <p className="text-gray-800">{score.feedback || '-'}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">Date</p>
                                <p className="text-gray-800">{new Date(score.date).toLocaleDateString('en-US')}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3 pt-4 border-t border-gray-100">
                          <button
                            onClick={() => startEdit(score)}
                            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200 text-sm font-medium"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(score._id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center mt-8">
                    <nav className="flex items-center space-x-2">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i}
                          onClick={() => goto(i + 1)}
                          disabled={i + 1 === currentPage}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                            i + 1 === currentPage
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </nav>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 rounded-t-2xl">
              <h2 className="text-xl font-bold text-white">Edit Score</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Score</label>
                <input
                  name="score"
                  type="number"
                  value={editing.score}
                  onChange={handleEditChange}
                  placeholder="Enter score"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
                <textarea
                  name="feedback"
                  value={editing.feedback || ''}
                  onChange={handleEditChange}
                  placeholder="Enter feedback"
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  name="date"
                  type="date"
                  value={editing.date}
                  onChange={handleEditChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 bg-gray-50 rounded-b-2xl">
              <button
                onClick={cancelEdit}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}