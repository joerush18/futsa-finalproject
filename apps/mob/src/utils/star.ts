export const createRatingStars = () => {
    var rating = Math.floor(Math.random() * 5) + 1;
    var stars = [];
    
    for (var i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push('★');
      } else {
        stars.push('☆');
      }
    }
    
    return stars.join(' ');
  }

