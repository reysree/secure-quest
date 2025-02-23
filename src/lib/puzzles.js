export const puzzles = {
  easy: [
    {
      id: "data-classification",
      title: "Data Classification Challenge",
      description:
        "Sort the following data elements into sensitive and non-sensitive categories.",
      type: "sorting",
      difficulty: "easy",
      points: 100,
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
          {
            id: "1",
            subject: "Urgent: Update Your Password",
            sender: "security@bank-secure-verify.com",
            content:
              "Dear valued customer, your account will be suspended unless you verify your credentials immediately.",
            isPhishing: true,
          },
          {
            id: "2",
            subject: "Quarterly Security Training",
            sender: "training@company.com",
            content:
              "Please complete your scheduled security awareness training by the end of this quarter.",
            isPhishing: false,
          },
          {
            id: "3",
            subject: "You've Won a Prize!",
            sender: "lottery@winners-intl.net",
            content:
              "Congratulations! Click here to claim your $1,000,000 prize immediately!",
            isPhishing: true,
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
