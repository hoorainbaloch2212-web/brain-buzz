// =====================
// DARK MODE
// =====================

const themeToggle = document.getElementById("themeToggle");

// Apply saved theme on every page load
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
// START BUTTON (index.html)
// =====================

const startBtn = document.getElementById("startBtn");

if (startBtn) {
    startBtn.addEventListener("click", () => {
        window.location.href = "category.html";
    });
}


// =====================
// CATEGORY CARDS (category.html)
// =====================

const cards = document.querySelectorAll(".card");

if (cards.length > 0) {
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const category = card.dataset.category;
            window.location.href = "quiz.html?category=" + category;
        });
    });
}


// =====================
// QUIZ PAGE (quiz.html)
// =====================

const questionElement   = document.getElementById("question");
const optionsElement    = document.getElementById("options");
const nextBtn           = document.getElementById("nextBtn");
const progressBar       = document.getElementById("progressBar");
const questionCount     = document.getElementById("questionCount");
const categoryTitle     = document.getElementById("categoryTitle");

if (questionElement && optionsElement) {

    // --- Read category from URL ---
    const params   = new URLSearchParams(window.location.search);
    const category = params.get("category");

    // --- Set page title ---
    if (categoryTitle && category) {
        const names = {
            kids:     "👶 Kids Quiz",
            students: "📚 Students Quiz",
            tech:     "💻 Tech Quiz",
            nontech:  "🌎 Non-Tech Quiz"
        };
        categoryTitle.textContent = names[category] || "BrainBuzz Quiz";
    }

    // --- Shuffle helper ---
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // --- Pick 10 random questions ---
    const allQuestions   = quizData[category] || [];
    const questions      = shuffle([...allQuestions]).slice(0, 10);
    const totalQuestions = questions.length;

    let currentIndex   = 0;
    let score          = 0;
    let selectedAnswer = null;
    let answered       = false;

    // --- Load a question ---
    function loadQuestion() {
        answered       = false;
        selectedAnswer = null;

        const q = questions[currentIndex];

        // Update counter
        questionCount.textContent = "Question " + (currentIndex + 1) + " / " + totalQuestions;

        // Update progress bar
        const progress = (currentIndex / totalQuestions) * 100;
        progressBar.style.width = progress + "%";

        // Set question text
        questionElement.textContent = q.question;

        // Render options
        optionsElement.innerHTML = "";
        q.options.forEach(option => {
            const btn = document.createElement("button");
            btn.classList.add("option-btn");
            btn.textContent = option;
            btn.addEventListener("click", () => selectAnswer(btn, option, q.answer));
            optionsElement.appendChild(btn);
        });

        // Hide Next button until answer selected
        nextBtn.style.display = "none";
    }

    // --- Handle answer selection ---
    function selectAnswer(btn, selected, correct) {
        if (answered) return;
        answered       = true;
        selectedAnswer = selected;

        // Highlight all buttons
        const allBtns = optionsElement.querySelectorAll(".option-btn");
        allBtns.forEach(b => {
            b.disabled = true;
            if (b.textContent === correct) {
                b.classList.add("correct");
            } else if (b.textContent === selected && selected !== correct) {
                b.classList.add("wrong");
            }
        });

        // Update score
        if (selected === correct) score++;

        // Show Next button
        nextBtn.style.display = "inline-block";
    }

    // --- Next button ---
    nextBtn.addEventListener("click", () => {
        currentIndex++;

        if (currentIndex < totalQuestions) {
            loadQuestion();
        } else {
            // Quiz finished — save results and go to result page
            progressBar.style.width = "100%";

            localStorage.setItem("score",     score);
            localStorage.setItem("total",     totalQuestions);
            localStorage.setItem("category",  category);
            localStorage.setItem("questions", JSON.stringify(questions));

            setTimeout(() => {
                window.location.href = "result.html";
            }, 400);
        }
    });

    // --- Start first question ---
    loadQuestion();
}