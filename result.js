// =====================
// DARK MODE
// =====================

const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    if (themeToggle) themeToggle.textContent = "☀️";
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        if (document.body.classList.contains("dark")) {
            themeToggle.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            themeToggle.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
    });
}


// =====================
// LOAD RESULTS
// =====================

const score     = parseInt(localStorage.getItem("score"))    || 0;
const total     = parseInt(localStorage.getItem("total"))    || 10;
const category  = localStorage.getItem("category")           || "kids";
const questions = JSON.parse(localStorage.getItem("questions")) || [];

// --- Score display ---
document.getElementById("resultScore").textContent = "You scored " + score + " / " + total;

// --- Badge + Title + Advice based on score ---
const resultBadge  = document.getElementById("resultBadge");
const resultTitle  = document.getElementById("resultTitle");
const resultAdvice = document.getElementById("resultAdvice");

if (score === 10) {
    resultBadge.textContent  = "🏆";
    resultTitle.textContent  = "Perfect Score!";
    resultAdvice.textContent = "Absolutely brilliant! You got every single question right. You're a true BrainBuzz champion!";
} else if (score >= 8) {
    resultBadge.textContent  = "🥇";
    resultTitle.textContent  = "Excellent Work!";
    resultAdvice.textContent = "Outstanding performance! You really know your stuff. Just a tiny bit more and you'll hit perfection!";
} else if (score >= 6) {
    resultBadge.textContent  = "🥈";
    resultTitle.textContent  = "Good Job!";
    resultAdvice.textContent = "Solid effort! You have a good understanding. Review the ones you missed and you'll ace it next time!";
} else if (score >= 4) {
    resultBadge.textContent  = "🥉";
    resultTitle.textContent  = "Keep Practicing!";
    resultAdvice.textContent = "Not bad! You're on the right track. A little more study and practice will boost your score significantly!";
} else {
    resultBadge.textContent  = "💪";
    resultTitle.textContent  = "Don't Give Up!";
    resultAdvice.textContent = "Everyone starts somewhere! Review the correct answers below, keep learning, and try again. You've got this!";
}


// =====================
// PLAY AGAIN BUTTON
// =====================

document.getElementById("playAgainBtn").addEventListener("click", () => {
    window.location.href = "category.html";
});


// =====================
// REVIEW ANSWERS BUTTON
// =====================

const reviewBtn     = document.getElementById("reviewBtn");
const reviewSection = document.getElementById("reviewSection");
const reviewList    = document.getElementById("reviewList");

let reviewVisible = false;

reviewBtn.addEventListener("click", () => {
    reviewVisible = !reviewVisible;

    if (reviewVisible) {
        reviewSection.style.display = "block";
        reviewBtn.textContent = "❌ Hide Review";
        buildReview();
    } else {
        reviewSection.style.display = "none";
        reviewBtn.textContent = "📋 Review Answers";
    }
});

function buildReview() {
    reviewList.innerHTML = "";

    // We don't store user's per-question answers in this version
    // so we show each question with the correct answer highlighted
    questions.forEach((q, index) => {
        const item = document.createElement("div");
        item.classList.add("review-item");

        item.innerHTML =
            "<p><strong>Q" + (index + 1) + ": " + q.question + "</strong></p>" +
            "<p class='correct-answer'>✅ Correct Answer: " + q.answer + "</p>";

        reviewList.appendChild(item);
    });
}