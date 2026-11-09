/* REVIEWS AND FEEDBACK PAGES */

let reviews = [
  {
    name: "JANE DOE",
    rating: 5,
    comment: "Great coffee and cozy atmosphere!"
  },
  {
    name: "KIMCHIENADAL",
    rating: 4,
    comment: "Love the pastries. Will come again!"
  },
  {
    name: "LESTER",
    rating: 4,
    comment: "The coffee has a nice balanced flavor."
  }
];

let selectedRating = 0;

const loginDialog = document.getElementById("loginDialog");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const loginDialogTitle = document.getElementById("loginDialogTitle");
const loginDialogIntro = document.getElementById("loginDialogIntro");
const loginSignupNote = document.getElementById("loginSignupNote");
const signupLoginNote = document.getElementById("signupLoginNote");
const ratingButtons = document.querySelectorAll("[data-rating]");

function showLoginForm() {
  loginForm.hidden = false;
  signupForm.hidden = true;
  loginSignupNote.hidden = false;
  signupLoginNote.hidden = true;
  loginDialogTitle.textContent = "Sign in to add a comment.";
  loginDialogIntro.textContent =
    "Log in to leave a note for our little café community.";
}

function showSignupForm() {
  loginForm.hidden = true;
  signupForm.hidden = false;
  loginSignupNote.hidden = true;
  signupLoginNote.hidden = false;
  loginDialogTitle.textContent = "Create your café account.";
  loginDialogIntro.textContent =
    "Join the community and share a little love for your visit.";
}

function continueToReview(name, message) {
  document.getElementById("reviewName").value = name;
  loginDialog.close();
  window.CafeSite.showPage("feedback");
  window.CafeSite.showToast(message);
}

function displayReviews() {
  const reviewLists = [
    document.getElementById("reviewList"),
    document.getElementById("feedbackReviewList")
  ];
  const reviewCounts = [
    document.getElementById("reviewCount"),
    document.getElementById("feedbackReviewCount")
  ];
  const countText =
    reviews.length + (reviews.length === 1 ? " review" : " reviews");

  reviewCounts.forEach(function (count) {
    count.textContent = countText;
  });

  reviewLists.forEach(function (reviewList) {
    reviewList.replaceChildren();

    if (reviews.length === 0) {
      const emptyState = document.createElement("p");
      emptyState.classList.add("review-empty");
      emptyState.textContent =
        "No reviews yet. Be the first to share a little love.";
      reviewList.appendChild(emptyState);
      return;
    }

    reviews.forEach(function (review) {
      const reviewElement = document.createElement("article");
      const reviewHeader = document.createElement("div");
      const author = document.createElement("div");
      const reviewName = document.createElement("strong");
      const avatar = document.createElement("span");
      const starsElement = document.createElement("span");
      const comment = document.createElement("p");
      let stars = "";

      reviewElement.classList.add("review");
      reviewHeader.classList.add("review-header");
      author.classList.add("review-author");
      avatar.classList.add("review-avatar");
      reviewName.classList.add("review-name");
      starsElement.classList.add("stars");
      starsElement.setAttribute(
        "aria-label",
        review.rating + " out of 5 stars"
      );

      for (let i = 1; i <= 5; i++) {
        stars += i <= review.rating ? "★" : "☆";
      }

      reviewName.textContent = review.name;
      avatar.textContent = review.name.trim().charAt(0).toUpperCase();
      avatar.setAttribute("aria-hidden", "true");
      starsElement.textContent = stars;
      comment.textContent = "“" + review.comment + "”";
      author.appendChild(avatar);
      author.appendChild(reviewName);
      reviewHeader.appendChild(author);
      reviewHeader.appendChild(starsElement);
      reviewElement.appendChild(reviewHeader);
      reviewElement.appendChild(comment);
      reviewList.appendChild(reviewElement);
    });
  });
}

document.getElementById("addCommentButton").addEventListener(
  "click",
  function () {
    showLoginForm();
    loginDialog.showModal();
  }
);

document.getElementById("closeLoginDialog").addEventListener(
  "click",
  function () {
    loginDialog.close();
  }
);

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = new FormData(loginForm).get("username");
  continueToReview(username, "Demo login successful.");
});

document.getElementById("signupButton").addEventListener(
  "click",
  showSignupForm
);

document.getElementById("backToLoginButton").addEventListener(
  "click",
  showLoginForm
);

signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(signupForm);
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    signupForm.elements.confirmPassword.setCustomValidity(
      "Passwords do not match."
    );
    signupForm.reportValidity();
    return;
  }

  signupForm.elements.confirmPassword.setCustomValidity("");
  const name = formData.get("name");
  signupForm.reset();
  continueToReview(name, "Demo account created. Continue with your review.");
});

signupForm.elements.confirmPassword.addEventListener("input", function () {
  this.setCustomValidity("");
});

ratingButtons.forEach(function (button) {
  button.setAttribute("aria-pressed", "false");

  button.addEventListener("click", function () {
    selectedRating = Number(button.getAttribute("data-rating"));
    document.getElementById("rating").value = selectedRating;

    ratingButtons.forEach(function (star) {
      const isSelected =
        Number(star.getAttribute("data-rating")) <= selectedRating;

      star.textContent = isSelected ? "★" : "☆";
      star.classList.toggle("selected", isSelected);
      star.setAttribute("aria-pressed", isSelected);
    });
  });
});

document.getElementById("satisfaction").addEventListener(
  "input",
  function () {
    document.getElementById("satisfactionValue").textContent = this.value;
  }
);

document.getElementById("reviewForm").addEventListener(
  "submit",
  function (event) {
    event.preventDefault();

    if (selectedRating === 0) {
      window.CafeSite.showToast("Please select a rating.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    reviews.unshift({
      name: formData.get("name"),
      rating: selectedRating,
      comment: formData.get("comment")
    });

    displayReviews();
    event.currentTarget.reset();
    window.CafeSite.showToast("Your review was posted!");
  }
);

document.getElementById("reviewForm").addEventListener(
  "reset",
  function () {
    selectedRating = 0;
    document.getElementById("rating").value = "0";

    ratingButtons.forEach(function (star) {
      star.textContent = "☆";
      star.classList.remove("selected");
      star.setAttribute("aria-pressed", "false");
    });

    document.getElementById("satisfactionValue").textContent = "5";
  }
);

document.addEventListener("cafe:pagechange", function (event) {
  if (event.detail.pageId === "reviews" || event.detail.pageId === "feedback") {
    displayReviews();
  }
});

displayReviews();
