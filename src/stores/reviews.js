import { defineStore } from "pinia";
import { reactive } from "vue";
import dummyjsonAPI from "../services/dummyjsonAPI";

export const useReviewsStore = defineStore("reviews", () => {
  const reviews = reactive([]);

  const getReviews = async (postId) => {
    reviews.splice(0);
    const response = await dummyjsonAPI.getReviewsByPostId(postId);
    response.data.comments.map((x) => reviews.push(x));
  };

  const addNewReview = (data) => {
    let review = {
      id: new Date(),
      ...data,
    };
    reviews.unshift(review);
  };

  return { reviews, getReviews, addNewReview };
});
