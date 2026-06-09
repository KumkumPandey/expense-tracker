# Expense Tracker

A full-stack Expense Tracker application built with React, Node.js, and Express.js. The application allows users to record daily expenses, track spending patterns, filter transactions, and visualize expenses through analytics and charts.

## Features

### Expense Management

* Add new expenses
* View all expenses in a table
* Delete existing expenses
* Sort expenses by date (newest first)

### Filtering

* Filter expenses by category
* Filter expenses by date range

### Analytics Dashboard

* Total expenses summary
* Highest expense tracking
* Total transactions count
* Expense distribution pie chart

### Additional Features

* Currency formatting (INR)
* JSON-based data persistence
* Responsive frontend using React

## Tech Stack

### Frontend

* React
* Vite
* Axios
* Recharts

### Backend

* Node.js
* Express.js

### Storage

* JSON File Storage

## Project Structure

```text
expense-tracker/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseTable.jsx
│   │   │   ├── SummaryCards.jsx
│   │   │   └── ExpenseChart.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│
├── server/
│   ├── data/
│   │   └── expenses.json
│   └── server.js
```

## Installation

### Clone Repository

```bash
git clone https://github.com/KumkumPandey/expense-tracker.git
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
node server.js
```

## API Endpoints

### Get All Expenses

```http
GET /expenses
```

### Add Expense

```http
POST /expenses
```

### Delete Expense

```http
DELETE /expenses/:id
```

## Current Status

Implemented:

* Add Expense
* View Expenses
* Delete Expense
* Category Filter
* Date Filter
* Summary Dashboard
* Pie Chart Analytics
* Currency Formatting

Planned:

* Edit Expense
* Form Validation
* CSV Export
* Budget Tracking

## Author

Kumkum Pandey
