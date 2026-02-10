# SkillScanner UI

SkillScanner UI is the **frontend application** for the SkillScanner platform. It provides a user-friendly interface for users to register, log in, explore available service partners, manage profiles, and interact with the SkillScanner backend APIs.

The frontend is built using **React** and deployed on **Vercel**.

---

## 🌐 Live Demo

* 👉 **Live Application:** [https://skillscanner-jayasaiadabala.vercel.app/](https://skillscanner-jayasaiadabala.vercel.app/)

* 🔗 **Backend Repository:** [https://github.com/jayasaiadabala/skillscanner-API](https://github.com/jayasaiadabala/skillscanner-API)

---

## 🚀 Features

* User registration and login
* OTP-based password reset
* Browse available service partners
* Partner interaction workflow
* Global state management using Context API
* Responsive UI with Bootstrap
* Client-side routing with React Router

---

## 🛠 Tech Stack

* **Framework:** React
* **Routing:** React Router DOM
* **State Management:** React Context API
* **Styling:** CSS, Bootstrap, Bootstrap Icons
* **Deployment:** Vercel
* **Backend Integration:** SkillScanner API (Spring Boot)

---

## 📂 Project Structure

```
skillscanner-UI
├── src
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── Register.jsx
│   │   ├── Login.jsx
│   │   ├── AvailablePartners.jsx
│   │   ├── WorkPartner.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── Profile.jsx
│   │   └── PageNotFound.jsx
│   ├── context
│   │   └── UserContext.js
│   ├── constants
│   │   └── emptyUser.js
│   ├── App.jsx
│   └── App.css
├── package.json
└── README.md
```

---

## 📌 Frontend Routes

| Route                | Description                         |
| -------------------- | ----------------------------------- |
| `/`                  | Home / Landing page                 |
| `/registration`      | User registration page              |
| `/login`             | User login page                     |
| `/availablePartners` | View available service partners     |
| `/workPartner`       | Partner work / service details page |
| `/resetPassword`     | Reset password page                 |
| `/profile`           | User profile page                   |
| `*`                  | Page not found (404)                |

---

## 🔄 Backend Integration

The frontend communicates with the **SkillScanner API** for:

* User registration and login
* OTP verification and password reset
* Fetching available partners
* Profile management

All data exchange happens via **REST APIs (JSON)**.

---

## ⚙️ Setup & Installation

### Prerequisites

* Node.js 18+
* npm or yarn

### Clone the Repository

```bash
git clone https://github.com/jayasaiadabala/skillscanner-UI.git
cd skillscanner-UI
```

### Install Dependencies

```bash
npm install
```

### Run the Application

```bash
npm run dev
```

The app will start at:

```
http://localhost:5173
```

---

## 📄 License

**MIT License** © 2025 SkillScanner Project.

---

## 👨‍💻 Author

**Jaya Sai Adabala**
GitHub: [https://github.com/jayasaiadabala](https://github.com/jayasaiadabala)

---

> *SkillScanner UI delivers a simple and intuitive interface to connect users with skilled professionals.*
