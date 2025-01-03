import { ReviewCard } from "./ReviewCard";

const reviews = [
  {
    name: "Sarah Johnson",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    rating: 5,
    text: "Amazing experience! The trip was perfectly organized and exceeded all our expectations.",
  },
  {
    name: "Michael Chen",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    rating: 5,
    text: "Professional service from start to finish. Will definitely book with TravelPro again!",
  },
  {
    name: "Emma Davis",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    rating: 5,
    text: "The attention to detail and personalized service made our vacation truly special.",
  },
];

const CustomerReviews = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;