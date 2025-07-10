import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addScore } from '../store/slices/scoreSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function UploadScorePage() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handle = (e) => {
    const v = e.target.name === 'score' ? +e.target.value : e.target.value;
    setForm({ ...form, [e.target.name]: v });
  };

  const submit = async () => {
    const result = await dispatch(addScore(form));
    console.log(result);
    nav('/scores');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Upload New Score</h2>
                <p className="text-gray-600">Enter student performance data and feedback</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Name
                  </label>
                  <input
                    name="studentName"
                    onChange={handle}
                    placeholder="Enter student's full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    name="subject"
                    onChange={handle}
                    placeholder="Enter subject name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Score
                  </label>
                  <input
                    name="score"
                    type="number"
                    onChange={handle}
                    placeholder="Enter score (0-100)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    name="date"
                    type="date"
                    onChange={handle}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback
                  </label>
                  <textarea
                    name="feedback"
                    onChange={handle}
                    placeholder="Enter feedback or comments about the performance"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                  />
                </div>

                <button
                  onClick={submit}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition duration-200 shadow-md hover:shadow-lg"
                >
                  Upload Score
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}