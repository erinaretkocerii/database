import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Review } from "../models/review";

export default class ReviewStore {
  reviewRegistry = new Map<string, Review>();
  selectedReview: Review | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get reviewsById() {
    return Array.from(this.reviewRegistry.values()).sort(
      (a, b) => parseInt(a.reviewId) - parseInt(b.reviewId)
    );
  }

  loadReviews = async () => {
    this.loadingInitial = true;
    try {
      const reviews = await agent.Reviews.list();
      reviews.forEach((review) => {
        this.setReview(review);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };
  

  loadReview = async (reviewId: string) => {
    let review = this.getReview(reviewId);
    if (review) {
      this.selectedReview = review;
    } else {
      this.loadingInitial = true;
      try {
        review = await agent.Reviews.details(reviewId);
        this.setReview(review);
        runInAction(() => {
          this.selectedReview = review;
        })
        this.setLoadingInitial(false);
        return review;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setReview = (review: Review) => {
    this.reviewRegistry.set(review.reviewId, review);
  };

  private getReview = (reviewId: string) => {
    return this.reviewRegistry.get(reviewId);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createReview = async (review: Review) => {
    this.loading = true;
    try {
      await agent.Reviews.create(review);
      runInAction(() => {
        this.reviewRegistry.set(review.reviewId, review);
        this.selectedReview = review;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateReview = async (review: Review) => {
    this.loading = true;
    try {
      await agent.Reviews.update(review);
      runInAction(() => {
        this.reviewRegistry.set(review.reviewId, review);
        this.selectedReview = review;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteReview = async (reviewId: string) => {
    this.loading = true;
    try {
      await agent.Reviews.delete(reviewId);
      runInAction(() => {
        this.reviewRegistry.delete(reviewId);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
