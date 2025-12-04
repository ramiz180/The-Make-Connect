import Review from "../models/Review.js";
import Worker from "../models/Worker.js";

export const addReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    // update rating
    const workerReviews = await Review.find({ workerId: req.body.workerId });
    const avg =
      workerReviews.reduce((sum, r) => sum + r.rating, 0) /
      workerReviews.length;

    await Worker.findByIdAndUpdate(req.body.workerId, {
      rating: avg,
      totalReviews: workerReviews.length,
    });

    res.json({ success: true, review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getWorkerReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ workerId: req.params.id });
    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
