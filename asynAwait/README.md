# async and await
In JavaScript, async and await are modern keywords used to handle asynchronous operations more cleanly than traditional Promise chains. They allow you to write asynchronous code that looks and behaves like synchronous code, making it easier to read and maintain

1. The async Keyword
Prepending async to a function does two things:
Returns a Promise: The function automatically returns a Promise, even if you return a non-promise value (it will be wrapped in Promise.resolve()).
Enables await: It allows the use of the await keyword inside that function. 
GeeksforGeeks
GeeksforGeeks
 +2

``` javascript
async function greet() {
  return "Hello!"; // Automatically returns Promise.resolve("Hello!")
} 
```


1. To-Do List with Database
   👉 Goal: Manage daily tasks
   What to do:
   Create input box to add tasks
   Show all tasks in a list
   Add button to mark task as complete
   Add delete option
   Store tasks in SQL database (so they remain after refresh)
   Extra (optional):
   Add due date
   Filter (completed / pending)
   🟡 2. Expense Tracker
   👉 Goal: Track money (income & expenses)
   What to do:
   Create form (amount, type: income/expense, category)
   Show all transactions in a table
   Calculate total income, total expense, and balance
   Store all data in SQL database
   Extra (optional):
   Filter by date/category
   Show simple chart (monthly expenses)
   🔴 3. Online Quiz System
   👉 Goal: Create and attempt quiz
   What to do:
   Create questions with options (MCQ)
   Show questions one by one or all together
   User selects answers
   Submit quiz and calculate score
   Store result in database
   Extra (optional):
   Add timer
   Random questions
   Leaderboard
