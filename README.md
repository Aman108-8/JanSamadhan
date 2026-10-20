# JanSahyog – Community Problem-Solving Platform

JanSahyog is a full-stack web application designed to bridge the gap between citizens, government authorities, universities, and industries to address community problems efficiently.

The platform enables citizens to report local issues, authorities to review and prioritize them, and suitable organizations to contribute toward solving verified problems.

## 🚀 Features

- **Citizen Portal:** Report community problems with descriptions, locations, and supporting evidence.
- **Government Portal:** Review, verify, or reject reports and manage problem priorities.
- **Duplicate Problem Management:** Associate multiple citizen reports with the same real-world problem while preserving individual reports and evidence.
- **Problem Assignment:** Connect verified problems with suitable universities or industries.
- **Progress Tracking:** Monitor problem status from submission to resolution.
- **Organization Portal:** View assigned challenges, submit progress, and provide completion evidence.

## 🛠️ Technology Stack

| Component | Technologies |
|---|---|
| Frontend | React.js, JavaScript, Tailwind CSS |
| Backend | Java, Spring Boot |
| API | RESTful APIs |
| Database | MySQL |
| ORM | Spring Data JPA |
| Tools | Git, GitHub, Postman |

## 🏗️ System Architecture

```text
Citizens / Government / Organizations
                 |
                 v
          React Frontend
                 |
                 v
          RESTful APIs
                 |
                 v
           Spring Boot
                 |
                 v
              MySQL
```

## 🔄 Workflow

1. Citizens submit community problems with relevant details and evidence.
2. Government authorities review and verify submitted reports.
3. Duplicate reports are associated with the relevant underlying problem.
4. Verified problems are prioritized and assigned to suitable organizations.
5. Organizations work on assigned problems and submit progress updates.
6. Problem resolution is tracked through the platform workflow.

## 📂 Project Structure

```text
JanSahyog/
├── frontend/       # React application
├── backend/        # Spring Boot application
└── README.md
```

*The directory names above are illustrative; update them to match your actual repository structure.*

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm
- Java JDK
- Maven
- MySQL Server

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_REPOSITORY_FOLDER>
```

### 2. Run the Backend

Navigate to the Spring Boot project directory:

```bash
cd backend
```

Configure your MySQL database credentials in `application.properties`, then run:

```bash
./mvnw spring-boot:run
```

On Windows, use:

```bash
mvnw.cmd spring-boot:run
```

### 3. Run the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal.

*Adjust the commands and configuration according to your actual project setup.*

## 🎯 Project Objectives

- Simplify community problem reporting.
- Improve transparency and status tracking.
- Reduce duplicate complaint handling.
- Support structured verification and prioritization.
- Encourage collaboration between authorities, universities, and industries.

## 🔮 Future Enhancements

- AI-assisted problem summarization.
- Improved location-based duplicate detection.
- Automated organization recommendations based on skills.
- Real-time notifications.
- Analytics dashboards and multilingual support.

## 👨‍💻 Developer

**Aman Yadav**

Full-Stack Development | React.js | Java | Spring Boot | MySQL

## 📄 License

Add a license if you intend to distribute or open-source this project.
