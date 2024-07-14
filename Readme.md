# THEME: "Social Innovation" ![Innovation Icon](https://img.icons8.com/ios-filled/50/000000/innovation.png)

## TEAM NAME: "Social Pioneers" ✨

## Problem Statement 📌

The current job interview scheduling process at universities is inefficient which leads to confusion, missed opportunities and administrative burdens. There is a lack of a centralized system for students to access available interview slots, booking appointments and receive confirmations. Employers face challenges in managing their schedules and ensuring that all interview slots are filled, while placement coordinators struggle with coordinating between students and employers, resulting in an overall inefficient and stressful process.

## Current Challenge 📑

### Scenario

Consider a university with multiple departments and programs, students often rely on email or manual methods to learn about available interview slots, leading to confusion about the scheduling process. Placement coordinators must handle scheduling for numerous companies, but without a centralized system they encounter:

- **Manual Processes:** Heavy reliance on spreadsheets or paper-based systems, which can be prone to errors.
- **Limited Visibility:** Students cannot see available slots in real-time, leading to missed opportunities.
- **Coordination Bottlenecks:** Miscommunications between students, employers, and departments can complicate the scheduling process.
- **Lack of Standardization:** Different programs have varied scheduling procedures, creating inconsistencies and delays.

## Proposed Solution ⚡

1. **Role-Based Authentication:**
   - Implemented role-based authentication systems and user profile updates to enhance security and user experience.
   ***Admin will verify recruiter, so that no fake recruiter given permission for recruiting process***

2. **Dashboard:**
   - **Students:** View available interview slots, book slots, and receive confirmations.
     - **Job Filtering:** Implemented feature to filter jobs based on duration, package, type of job, and CGPA, easing out the search for preferred companies.
   - **Recruiters:** View and manage available interview slots, confirm bookings and receive notifications.
   - **Placement Coordinator:** Oversees the entire scheduling process, manage slots and handle conflicts.

3. **AI Mock Interviews:**
   - Implemented an AI-driven mock interview feature to help students prepare effectively for interviews.

4. **Notifications and Confirmations:**
   - Automated Email and SMS notifications for bookings, cancellations and reminders.
   - Real-time updates to ensure all parties are informed of any changes.


5. **Alumni Connections:**
   - Added alumni to job detail cards, enabling students to connect with respective hired individuals and understand company needs better.

6. **Reporting:**
   - Generating reports for placement officers to track metrics and improve processes.

7. **Notifications for all Users:**
    - Ensure that all users receive timely notifications regarding bookings, cancellations and updates.

### Tech Stacks 👨‍💻

- **Frontend**:
  - NextJS
  -ShadCn
  - Tailwind CSS

- **Backend**:
  - Nodejs

- **Database**:
  -postgresSql

  Others: Prisma, Zod validation, axios, python, Gemini AI


<!-- **Live Demo**: [Demo]() -->


## Getting Started 🚀

1. Clone the frontend repository:
```git clone https://github.com/01Sriharsha/vvce-infothon-24.git```

### For frontend:
1.```cd job-frontend```

2. Install dependencies:
```npm install```

3. Start the development server:
```npm run dev```

### For Backend:
1.```cd job-backend```

2. Install dependencies:
```npm install```

3. Start the development server:
```npm run start```


###Design Link: ![Figma](https://www.figma.com/design/RwcphvmZlRh9KC5m8JJI9u/Job-Scheduling?node-id=0-1&t=O0Qs04QAZkt67pXv-1)


## Impact 💥
- Increases placement chances for the students.
- Easy application process for students with filtering options based on package, job type, CGPA, and job duration.
- Prepares students for interviews by providing an AI-driven virtual mock interview feature.
- Simplifies the placement officers' process by providing performance details of students.
- Reduces missed opportunities for students by implementing real-time updates and notifications.
- Allows recruiters to add their job posts to the platform, making it easier for students to be notified.


## Future Scope ⭐
- **AI-based Recommendations:**
  Use AI to suggest optimal interview slots based on past booking data and user preferences.
- **Mobile Application:**
  Develop a mobile app version for more accessible, on-the-go management.
- **University System Integration:**
  Integrate with existing university systems for seamless data flow and management.
- **Enhanced Communication Tools:**
  Incorporate chat features and virtual meeting integrations (e.g., Zoom, Microsoft Teams) for remote interviews.
- **Expanded Analytics:**
  Implement more comprehensive analytics features for deeper insights into user behavior and scheduling efficiency.

