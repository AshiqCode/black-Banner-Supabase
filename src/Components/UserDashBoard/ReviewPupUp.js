import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ReviewPupUp = ({ setReviewPupUp, currentProductId, currenorderId }) => {
  const stars = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState("");
  const [reviewMessage, setRreviewMessage] = useState("");
  const user = localStorage.getItem("user");
  const [curretData, setCurretData] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/products/${currentProductId}`)
      .then((res) => res.json())
      .then((json) => {
        setCurretData(json);
      });
  }, []);

  const addReview = () => {
    const review = {
      userId: user,
      rating: rating,
      reviewMessage: reviewMessage,
      orderId: currenorderId,
    };

    setCurretData((prev) => {});

    var newProduct = {
      ...curretData,
      reviews: [review, ...(curretData?.reviews || [])],
    };
    console.log(newProduct);

    fetch(`http://localhost:3000/products/${currentProductId}`, {
      method: "PUT",
      body: JSON.stringify(newProduct),
    });
    toast.success("Review Added successfully");
    // console.log(review);
    // console.log(curretData);
    setReviewPupUp(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Add Your Review
        </h2>

        {/* Stars */}

        <div className="mb-4 flex items-center gap-2">
          {stars.map((index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setRating(index);
              }}
              className={`text-gray-300 hover:text-yellow-400 ${
                index <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.955a1 1 0 00-.364-1.118L2.044 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.955z" />
              </svg>
            </button>
          ))}
        </div>

        {/* Review input */}
        <textarea
          placeholder="Write your review..."
          rows={4}
          onChange={(e) => {
            setRreviewMessage(e.target.value);
          }}
          className="mb-4 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm focus:border-gray-900 focus:outline-none"
        />

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setReviewPupUp(false);
            }}
            className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={addReview}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPupUp;
