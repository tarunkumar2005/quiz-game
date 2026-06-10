# 🏎️ F1 Quiz Game

A small quiz game built with plain HTML, CSS, and JavaScript. Ten questions about Formula 1, shuffled every round, with a 15-second timer per question. No frameworks, no build step, no dependencies.

Built as the first project in a 15-project revision series — refreshing HTML/CSS/JS fundamentals by actually writing code, not just watching.

---

## What it does

- Shows a start screen → quiz screen → result screen flow
- 10 F1 trivia questions, randomly shuffled each game
- Each question's answer options are also shuffled (so the correct answer isn't always in the same position)
- 15-second countdown per question. The timer turns red in the last 5 seconds
- If time runs out, the correct answer is highlighted and the quiz auto-advances
- At the end, you get a score and a result message based on your percentage
- Restart button gives you a fresh shuffle

---

## How to run it

No installation. No `npm install`. Just:

1. Clone or download the repo
2. Open `index.html` in any modern browser
3. Click **Start Quiz**

That's it.

---

## Project structure

```
quiz-game/
├── index.html      # Markup, three "screens" (start, quiz, result)
├── style.css       # Styling, responsive down to 500px
└── script.js       # All the game logic
```

The whole thing is roughly 280 lines across three files. Easy to read top-to-bottom.

---

## What I practised building this

- **DOM selection and manipulation** — `getElementById`, `classList`, `innerHTML`, `style`, `textContent`
- **Event listeners** — `click` on buttons, including dynamically created ones
- **Arrays of objects** — questions stored as `{ question, answers: [{text, correct}] }`
- **Array methods** — `.forEach()`, `.sort()`, spread operator `[...arr]`
- **Timers** — `setInterval` for the countdown, `setTimeout` for the 1-second pause between questions, `clearInterval` to stop them
- **State management** — `currentQuestionIndex`, `score`, `answersDisabled`, `isAnswered` tracked across screen changes
- **Shallow vs deep copy** — copying the questions array with spread, then copying each inner `answers` array before sorting
- **Conditional logic** — branching for correct/incorrect, time's up, percentage-based result messages
- **Responsive CSS** — media query at 500px to scale down font sizes and padding

---

## Things I learned the hard way

- **Shallow copy is sneaky.** `[...quizQuestions]` makes a new array, but the question *objects* inside are still shared. If I sort the inner `answers` array, I'm sorting it on the original object too. Solution: `[...question.answers].sort()` for the inner level as well.
- **Timers don't auto-stop.** `setInterval` keeps firing forever unless you `clearInterval` it. If you forget, after answering one question you'll have multiple intervals all running on the next one, and the counter will tick down 3x faster.
- **`while` loops are not the wait tool in JS.** My first instinct was `while (isAnswered) { stopTimer() }`. That spins the CPU millions of times per second and freezes the browser. JS doesn't "wait" — events fire when they're ready, and they share state.
- **DOM elements aren't numbers.** I once wrote `if (timer <= 0)` comparing a DOM element to a number. JavaScript didn't error, it just did the wrong thing silently. Variables need to be checked against variables of the same kind.
- **Two paths to the same end-state is a race condition.** I had the click handler set `isAnswered = true`, and the setInterval checked `isAnswered || counter <= 0` to decide when to stop. Both the click and the interval's own logic would then try to advance the question. If the user clicked right when the timer hit zero, both paths fired, the user skipped a question, and the screen glitched. The fix: each path owns its own cleanup. The click handler calls `stopTimer()` directly. The interval only checks `counter <= 0`. No overlap, no race.

---

## License

MIT — do whatever you want with it.
