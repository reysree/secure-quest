export const puzzles = {
  easy: [
    {
      id: "data-classification",
      title: "Data Classification Challenge",
      description:
        "Sort the following data elements into sensitive and non-sensitive categories.",
      type: "sorting",
      difficulty: "easy",
      points: 200,
      data: {
        items: [
          { id: "1", text: "Social Security Number", category: "sensitive" },
          {
            id: "2",
            text: "Public Holiday Schedule",
            category: "non-sensitive",
          },
          { id: "3", text: "Credit Card Number", category: "sensitive" },
          { id: "4", text: "Company Address", category: "non-sensitive" },
          { id: "5", text: "Medical Records", category: "sensitive" },
          { id: "6", text: "Press Releases", category: "non-sensitive" },
        ],
      },
    },
    // {
    //   id: "basic-encryption",
    //   title: "Basic Encryption Exercise",
    //   description:
    //     "Use the cipher key to decrypt the message and reveal the security protocol.",
    //   type: "decryption",
    //   difficulty: "easy",
    //   points: 150,
    //   data: {
    //     encryptedMessage: "FRPHER CNFFJBEQ EBGNGVBA",
    //     hint: "ROT13 cipher: Replace each letter with the letter 13 positions after it in the alphabet.",
    //     solution: "SECURE PASSWORD ROTATION",
    //   },
    // },
    {
      id: "phishing-detection",
      title: "Phishing Alert Analysis",
      description:
        "Identify potential phishing attempts from the following email messages.",
      type: "security",
      difficulty: "easy",
      points: 200,
      data: {
        emails: [
          // 10 Easy Questions
          {
            id: "1",
            subject: "Urgent: Update Your Password",
            sender: "security@bank-secure-verify.com",
            content:
              "Dear valued customer, your account will be suspended unless you verify your credentials immediately.",
            isPhishing: true,
            difficulty: "easy",
          },
          {
            id: "2",
            subject: "Meeting Reminder",
            sender: "hr@company.com",
            content: "Don't forget about the meeting tomorrow at 10 AM.",
            isPhishing: false,
            difficulty: "easy",
          },
          {
            id: "3",
            subject: "Invoice Overdue",
            sender: "billing@company.com",
            content:
              "Your invoice is overdue. Please make a payment immediately.",
            isPhishing: true,
            difficulty: "easy",
          },
          {
            id: "4",
            subject: "Team Lunch Invitation",
            sender: "manager@company.com",
            content:
              "Let's meet for lunch at our usual spot. No urgent action needed.",
            isPhishing: false,
            difficulty: "easy",
          },
          {
            id: "5",
            subject: "Security Alert",
            sender: "security@bank-secure-verify.com",
            content:
              "We detected an unusual login attempt. Verify your identity now.",
            isPhishing: true,
            difficulty: "easy",
          },
          {
            id: "6",
            subject: "Weekly Newsletter",
            sender: "newsletter@company.com",
            content:
              "Check out the latest updates and news in our weekly newsletter.",
            isPhishing: false,
            difficulty: "easy",
          },
          {
            id: "7",
            subject: "Policy Update",
            sender: "compliance@company.com",
            content:
              "Our company policy has been updated. Please review the changes.",
            isPhishing: false,
            difficulty: "easy",
          },
          {
            id: "8",
            subject: "Appointment Confirmation",
            sender: "appointments@company.com",
            content:
              "Your appointment has been confirmed for tomorrow at 3 PM.",
            isPhishing: false,
            difficulty: "easy",
          },
          {
            id: "9",
            subject: "Subscription Renewal Reminder",
            sender: "billing@service.com",
            content:
              "Your subscription is up for renewal. Please update your payment details.",
            isPhishing: true,
            difficulty: "easy",
          },
          {
            id: "10",
            subject: "Event Invitation",
            sender: "events@company.com",
            content: "Join us for our upcoming event next week. RSVP now!",
            isPhishing: false,
            difficulty: "easy",
          },
          // 10 Tough Questions
          {
            id: "11",
            subject: "Confidential Update Required",
            sender: "ceo@company.com",
            content:
              "Please review the confidential update attached to this email.",
            isPhishing: true,
            difficulty: "tough",
          },
          {
            id: "12",
            subject: "Invoice Issue Notice",
            sender: "billing@company.com",
            content:
              "There is an issue with your recent invoice. Click here to resolve.",
            isPhishing: true,
            difficulty: "tough",
          },
          {
            id: "13",
            subject: "Reward Claim Notification",
            sender: "rewards@company.com",
            content:
              "Congratulations! You have been selected for a reward. Claim it now.",
            isPhishing: true,
            difficulty: "tough",
          },
          {
            id: "14",
            subject: "System Downtime Advisory",
            sender: "it-support@company.com",
            content:
              "Scheduled maintenance will occur this weekend. Plan accordingly.",
            isPhishing: false,
            difficulty: "tough",
          },
          {
            id: "15",
            subject: "Password Reset Required Immediately",
            sender: "it-support@company.com",
            content:
              "Due to a security breach, an immediate password reset is required.",
            isPhishing: true,
            difficulty: "tough",
          },
          {
            id: "16",
            subject: "Legal Notice Attached",
            sender: "legal@company.com",
            content: "Please review the attached legal notice immediately.",
            isPhishing: true,
            difficulty: "tough",
          },
          {
            id: "17",
            subject: "Software Update Available",
            sender: "noreply@updates.com",
            content:
              "A new software update is available. Please update to the latest version.",
            isPhishing: false,
            difficulty: "tough",
          },
          {
            id: "18",
            subject: "Bank Account Verification",
            sender: "verification@bank.com",
            content:
              "Verify your account details immediately to avoid suspension.",
            isPhishing: true,
            difficulty: "tough",
          },
          {
            id: "19",
            subject: "Conference Invitation",
            sender: "events@conference.com",
            content:
              "You are invited to speak at our upcoming conference. RSVP required.",
            isPhishing: false,
            difficulty: "tough",
          },
          {
            id: "20",
            subject: "Urgent: Account Notice",
            sender: "support@bank-secure-verify.com",
            content:
              "Important notice regarding your account. Immediate action is required.",
            isPhishing: true,
            difficulty: "tough",
          },
        ],
      },
    },
    // {
    //   id: "consent-management",
    //   title: "Consent Form Optimization",
    //   description:
    //     "For this registration, only your Full Name and Email Address are required. Please disable any additional data fields.",
    //   type: "consent",
    //   difficulty: "easy",
    //   points: 200,
    //   data: {
    //     fields: [
    //       { id: "1", label: "Full Name", required: true },
    //       { id: "2", label: "Email Address", required: true },
    //       { id: "3", label: "Phone Number", required: false },
    //       { id: "4", label: "Home Address", required: false },
    //       { id: "5", label: "Social Security Number", required: false },
    //       { id: "6", label: "Date of Birth", required: false },
    //     ],
    //   },
    // },
    {
      id: "risk-mitigation",
      title: "Risk Identification & Mitigation",
      description:
        "Drag the appropriate mitigation measure onto each risk scenario.",
      type: "risk-mitigation",
      difficulty: "easy",
      points: 250,
      data: {
        scenarios: [
          {
            id: "1",
            description:
              "An employee sends confidential emails containing customer credit card numbers.",
            correctMitigation: "encryption",
          },
          {
            id: "2",
            description:
              "A website collects extensive personal data beyond what's necessary for the service.",
            correctMitigation: "data-minimization",
          },
          {
            id: "3",
            description:
              "User access logs reveal multiple failed login attempts from unusual locations.",
            correctMitigation: "access-control",
          },
        ],
        mitigations: [
          {
            id: "encryption",
            text: "Encrypt sensitive data in transit and at rest",
          },
          {
            id: "data-minimization",
            text: "Collect only the minimum data required",
          },
          {
            id: "access-control",
            text: "Implement strong access controls and 2FA",
          },
          {
            id: "employee-training",
            text: "Conduct regular security training",
          },
          {
            id: "audit-monitoring",
            text: "Monitor logs for unusual activities",
          },
        ],
      },
    },
    // {
    //   id: "privacy-memory",
    //   title: "Privacy Memory Challenge",
    //   description: "Match each data privacy term with its correct definition.",
    //   type: "memory",
    //   difficulty: "easy",
    //   points: 200,
    //   data: {
    //     pairs: [
    //       {
    //         id: "1",
    //         term: "Data Minimization",
    //         definition: "Collect only the minimum necessary data.",
    //       },
    //       {
    //         id: "2",
    //         term: "Informed Consent",
    //         definition: "Obtain explicit permission for data processing.",
    //       },
    //       {
    //         id: "3",
    //         term: "Encryption",
    //         definition: "Protect data by converting it into a secure code.",
    //       },
    //       {
    //         id: "4",
    //         term: "Access Control",
    //         definition: "Restrict data access to authorized users.",
    //       },
    //     ],
    //   },
    // },
    {
      id: "privacy-memory",
      title: "Privacy Memory Challenge",
      description: "Match each data privacy term with its correct definition.",
      type: "memory",
      difficulty: "easy",
      points: 200,
      data: {
        pairs: [
          {
            id: "1",
            term: "Data Minimization",
            definition: "Collect only the minimum necessary data.",
          },
          {
            id: "2",
            term: "Informed Consent",
            definition: "Obtain explicit permission for data processing.",
          },
          {
            id: "3",
            term: "Encryption",
            definition: "Protect data by converting it into a secure code.",
          },
          {
            id: "4",
            term: "Access Control",
            definition: "Restrict data access to authorized users.",
          },
        ],
      },
    },
  ],
  medium: [
    {
      id: "audit-trail",
      title: "Audit Trail Analysis",
      description:
        "Review the system logs to identify suspicious activities and potential data breaches.",
      type: "audit",
      difficulty: "medium",
      points: 300,
      data: {
        logs: [
          {
            timestamp: "2025-03-15 02:14:23",
            ip: "192.168.1.100",
            action: "login",
            user: "admin",
            status: "success",
          },
          {
            timestamp: "2025-03-15 02:15:45",
            ip: "192.168.1.100",
            action: "download",
            user: "admin",
            file: "customer_data.csv",
          },
          {
            timestamp: "2025-03-15 02:16:12",
            ip: "45.67.89.123",
            action: "login",
            user: "admin",
            status: "success",
          },
          {
            timestamp: "2025-03-15 02:16:30",
            ip: "45.67.89.123",
            action: "download",
            user: "admin",
            file: "financial_records.xlsx",
          },
        ],
        anomalies: ["concurrent_login", "unusual_ip", "sensitive_data_access"],
      },
    },
    {
      id: "encryption-protocol",
      title: "Encryption Protocol Challenge",
      description:
        "Implement the correct encryption steps to secure sensitive customer data.",
      type: "security",
      difficulty: "medium",
      points: 400,
      data: {
        steps: [
          "Generate encryption key",
          "Hash customer identifiers",
          "Apply AES encryption",
          "Secure key storage",
        ],
        correctOrder: [0, 3, 1, 2],
      },
    },
  ],
  hard: [
    {
      id: "breach-response",
      title: "Data Breach Response",
      description:
        "Coordinate a comprehensive response to a critical data breach incident.",
      type: "security",
      difficulty: "hard",
      points: 500,
      data: {
        scenario: {
          incident:
            "Unauthorized access to customer financial records detected",
          systems: ["payment_processing", "customer_database", "audit_logs"],
          stakeholders: ["customers", "regulators", "board", "media"],
        },
        steps: [
          "Isolate affected systems",
          "Notify relevant authorities",
          "Begin forensic analysis",
          "Prepare customer communication",
          "Implement additional security measures",
        ],
        dependencies: {
          "Isolate affected systems": [],
          "Notify relevant authorities": ["Isolate affected systems"],
          "Begin forensic analysis": ["Isolate affected systems"],
          "Prepare customer communication": ["Begin forensic analysis"],
          "Implement additional security measures": ["Begin forensic analysis"],
        },
      },
    },
  ],
};
