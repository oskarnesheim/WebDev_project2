import React, { useState, useEffect } from "react";
import "./PokemonReviewForm.css";
import StarIcon from '@mui/icons-material/Star';


type PokemonReviewProps = {
    pokemonId: string; // Change the type to match your actual data type for Pokémon IDs
}

type Review = {
    rating: number;
    review: string;
}

export default function PokemonRatingReview({ pokemonId }: PokemonReviewProps) {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        // Load existing reviews from localStorage when the component mounts
        const storedReviews = localStorage.getItem(`pokemon_reviews_${pokemonId}`);
        if (storedReviews) {
            setReviews(JSON.parse(storedReviews));
        }
    }, [pokemonId]);

    const handleRatingClick = (newRating: number) => {
        setRating(newRating);
    };

    const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview(event.target.value);
    };

    const handleAddReview = () => {
        if (rating > 0 && review.trim() !== "") {
            const newReview = {
                rating,
                review,
            };

            // Add the new review to the existing reviews
            setReviews([...reviews, newReview]);

            // Save reviews to localStorage
            localStorage.setItem(
                `pokemon_reviews_${pokemonId}`,
                JSON.stringify([...reviews, newReview])
            );

            // Reset the rating and review input
            setRating(0);
            setReview("");
        }
    };

    return (
        <div className="pokemon-review">
            <h2>Rate and Review {pokemonId}</h2>
            <div className="rating">
                <label>Rating:</label>
                {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                        key={star}
                        onClick={() => handleRatingClick(star)}
                        className={`custom ${star <= rating ? 'primary' : 'secondary'}`}
                    />
                ))}
            </div>
            <div>
                <label>Review:</label>
                <textarea
                    value={review}
                    onChange={handleReviewChange}
                    rows={4}
                    cols={50}
                    placeholder="Write your review..."
                ></textarea>
            </div>
            <button onClick={handleAddReview}>Submit Review</button>
            <div>
                <h3>Reviews:</h3>
                {reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    <ul className="reviews">
                        {reviews.map((item, index) => (
                            <li key={index} className="review">
                                <strong className="review-rating">Rating:</strong> {item.rating} Star{item.rating !== 1 ? 's' : ''}<br />
                                <strong>Review:</strong> {item.review}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
