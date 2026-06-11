# 💰 Mini Expense Tracker

A modern full-stack expense tracking application built using React, Vite, Node.js, and Express. The application helps users manage daily expenses, track spending patterns, monitor budgets, and visualize financial data through interactive charts.

---

## 🚀 Live Demo

### Frontend

https://expense-tracker-tawny-two-64.vercel.app/

### Backend API

https://mini-expense-tracker-api-rzh7.onrender.com

---

## ✨ Features

### 📌 Expense Management

* Add new expenses
* Edit existing expenses
* Delete expenses
* Category-wise expense tracking
* Notes support for transactions
* Date validation
* Future date restriction
* CSV export functionality
* Search and filter expenses

### 📊 Dashboard

* Monthly spending overview
* Highest expense tracking
* Total transaction count
* Average expense calculation
* Financial summary cards
* Quick spending insights

### 📈 Analytics

* Expense trend visualization
* Category-wise spending analysis
* Interactive charts
* Year-wise expense tracking
* Spending pattern analysis

### 🎯 Budget Tracker

* Monthly budget setting
* Remaining budget calculation
* Budget utilization percentage
* Budget status indicator
* Overspending awareness

### 📱 User Experience

* Fully responsive design
* Mobile-friendly interface
* Modern dashboard UI
* Interactive charts and graphs
* Smooth user experience

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Axios
* Bootstrap 5
* Recharts
* Framer Motion
* React Icons

### Backend

* Node.js
* Express.js
* CORS
* fs-extra

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## 📂 Project Structure

ExpenseTracker/

├── client/

│ ├── src/

│ │ ├── components/

│ │ ├── services/

│ │ ├── App.jsx

│ │ └── index.css

│ │

│ ├── package.json

│ └── vite.config.js

│

├── server/

│ ├── data/

│ │ └── expenses.json

│ │

│ ├── server.js

│ └── package.json

│

└── README.md

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/KumkumPandey/ExpenseTracker.git
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
npm start
```

---

## 🌐 Environment Variables

Create a `.env` file inside the client folder:

```env
VITE_API_URL=http://localhost:8000
```

For production:

```env
VITE_API_URL=https://mini-expense-tracker-api-rzh7.onrender.com
```

---

## 🔗 API Endpoints

### Get All Expenses

```http
GET /expenses
```

### Add Expense

```http
POST /expenses
```

### Update Expense

```http
PUT /expenses/:id
```

### Delete Expense

```http
DELETE /expenses/:id
```

### Health Check

```http
GET /health
```

---

## 🤖 Use of AI Assistance

During the development of this project, AI tools were used as a learning and productivity aid for selected tasks such as:

* Understanding implementation approaches for specific features.
* Resolving development issues and debugging errors.
* Improving UI design ideas and component structure.
* Learning best practices for React, Express, API integration, and deployment.
* Generating initial code suggestions that were reviewed, modified, tested, and integrated into the final application.

All major project decisions, customization, feature integration, debugging, deployment, testing, and final implementation were completed manually by the developer.

This project reflects my understanding of full-stack development concepts and my ability to build, customize, troubleshoot, and deploy a complete web application while effectively utilizing modern development tools.

---

## 💡 Potential Advanced Features

The current version focuses on core expense tracking functionality. The following enhancements can be added in future versions:

### 🤖 AI-Powered Features

* Smart expense categorization using AI
* Personalized spending insights
* Monthly financial health score
* AI-generated budget recommendations
* Unusual spending pattern detection

### 📄 Smart Receipt Management

* Receipt image upload
* OCR-based expense extraction
* Automatic expense entry from receipts
* Digital receipt storage

### 🔔 Notifications & Reminders

* Budget limit alerts
* Overspending notifications
* Bill payment reminders
* Weekly and monthly reports

### 📊 Advanced Analytics

* Monthly and yearly comparisons
* Spending forecasts
* Predictive budgeting
* Detailed financial reports

### ☁️ Cloud & Security

* User authentication
* Cloud database integration
* Multi-device synchronization
* Data backup and recovery

### 👨‍👩‍👧‍👦 Collaborative Features

* Family expense tracking
* Shared budgets
* Group expense management
* Expense splitting

### 💳 Financial Integrations

* Bank account integration
* UPI transaction tracking
* Card spending analysis
* Savings and investment tracking

---

## 🎓 Learning Outcomes

Through this project I gained hands-on experience in:

* Full Stack Development
* REST API Development
* React State Management
* Data Visualization
* Backend Validation
* Responsive UI Design
* Deployment using Vercel and Render
* Git & GitHub Workflow
* Problem Solving and Debugging
* API Integration

---

## 🚀 Future Improvements

* MongoDB Integration
* Authentication System
* PDF Report Generation
* Excel Export
* Dark/Light Theme Toggle
* Multi-user Support
* AI Expense Assistant
* Advanced Financial Insights

---

## 👩‍💻 Author

**Kumkum Pandey**

B.Tech Computer Science Engineering

GitHub: https://github.com/KumkumPandey

---

## 📄 License

This project is developed for educational, learning, and portfolio purposes.

⭐ If you found this project useful, please consider giving it a star on GitHub.
