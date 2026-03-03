import { useEffect, useState } from "react";
import supabase from "../../config/SupaBaseClient";

const ProductReview = ({ ProductId }) => {
  const [data, setData] = useState({});
  const [Ispending, setIspending] = useState(false);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState(null);

  const [usersIds, setUsersIds] = useState([]);
  const [userData, setUserData] = useState([]);
  // useEffect(() => {
  //   fetch(`http://localhost:3000/products/${ProductId}`)
  //     .then((res) => res.json())
  //     .then((order) => {
  //       setData(order);
  //       order.reviews.map((review, index) => {
  //         fetch(`http://localhost:3000/users/${review.userId}`)
  //           .then((res) => res.json())
  //           .then((user) => {
  //             //spread data
  //             //find review
  //             //append user info
  //             setData((prev) => ({
  //               ...prev,
  //               reviews: prev.reviews.map((r) => {
  //                 if (r.userId === review.userId) {
  //                   return { ...r, user };
  //                 } else {
  //                   return r;
  //                 }
  //               }),
  //             }));
  //           });
  //       });
  //     })

  //     .catch((err) => {
  //       console.log("TEST", err);
  //       setError(true);
  //       setIspending(false);
  //     });
  // }, []);

  useEffect(() => {
    const fetchdata = async () => {
      console.log("data");

      const { data: review, error } = await supabase
        .from("reviews")
        .select(`
          id,
          rating,
          reviewMessage,
          users(
          name
          )
        `)
        .eq("productid", ProductId);

      console.log(review);
      setReviews(review);
    };
    fetchdata();
  }, []);

  // const reviews = data.reviews;
  // console.log(data);

  // console.log(reviews);
  // console.log(ProductId);

  // console.log(data.reviews);
  // useEffect(() => {
  //   data.reviews?.map((review) => {
  //     setUsersIds((prev) => [...prev, review.userId]);
  //   });
  // }, [data]);
  // console.log(usersIds);

  // usersIds.map((id) => {
  //   fetch(`http://localhost:3000/users/${id}`)
  //     .then((res) => res.json())
  //     .then((json) => console.log(json));
  // });

  return (
    <>
      <div className="mb-6 sm:mb-8 text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-4 sm:mt-6 text-gray-900">
          Product Reviews
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-500">
          Verified feedback from real customers
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4 px-4 mb-8">
        {reviews?.map((review, index) => {
          return (
            <div
              key={index}
              className="rounded-lg border border-gray-200 w-full sm:w-5/6 lg:w-4/6 mx-auto bg-white p-4 sm:p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <p className="font-medium text-gray-900 text-sm sm:text-base break-words">
                  {review?.users?.name}
                </p>
                <p className="text-sm font-semibold text-yellow-500">
                  ⭐ {review.rating}
                </p>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed break-words">
                {review.reviewMessage}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductReview;