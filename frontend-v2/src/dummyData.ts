import { Collection } from "./types/collections";

const dummyCollections: Collection[] = [
  {
    title: "Project Alpha",
    notes: [
      {
        userid: "user1",
        id: "note1",
        title: "Set up project",
        description:
          "Initialize the project repository and install dependencies.",
        creationDate: "2025-01-01",
        deadlineDate: "2025-01-10",
        checked: true,
      },
      {
        userid: "user2",
        id: "note2",
        title: "Create database schema",
        description: "Design and implement the initial database schema.",
        creationDate: "2025-01-03",
        deadlineDate: "2025-01-15",
        checked: false,
      },
    ],
    users: [
      {
        id: "user1",
        username: "alice",
        passwordHash: "hashedpassword123",
        notes: [
          {
            userid: "user1",
            id: "note1",
            title: "Set up project",
            description:
              "Initialize the project repository and install dependencies.",
            creationDate: "2025-01-01",
            deadlineDate: "2025-01-10",
            checked: true,
          },
        ],
      },
      {
        id: "user2",
        username: "bob",
        passwordHash: "hashedpassword456",
        notes: [
          {
            userid: "user2",
            id: "note2",
            title: "Create database schema",
            description: "Design and implement the initial database schema.",
            creationDate: "2025-01-03",
            deadlineDate: "2025-01-15",
            checked: false,
          },
        ],
      },
    ],
    creationDate: new Date("2025-01-01"),
    deadlineDate: new Date("2025-01-20"),
  },
  {
    title: "Marketing Campaign",
    notes: [
      {
        userid: "user3",
        id: "note3",
        title: "Design ads",
        description: "Create eye-catching ad designs for the campaign.",
        creationDate: "2025-01-05",
        deadlineDate: "2025-01-12",
        checked: false,
      },
      {
        userid: "user4",
        id: "note4",
        title: "Plan social media posts",
        description: "Draft and schedule posts for the campaign launch.",
        creationDate: "2025-01-06",
        deadlineDate: "2025-01-14",
        checked: false,
      },
    ],
    users: [
      {
        id: "user3",
        username: "charlie",
        passwordHash: "hashedpassword789",
        notes: [
          {
            userid: "user3",
            id: "note3",
            title: "Design ads",
            description: "Create eye-catching ad designs for the campaign.",
            creationDate: "2025-01-05",
            deadlineDate: "2025-01-12",
            checked: false,
          },
        ],
      },
      {
        id: "user4",
        username: "dana",
        passwordHash: "hashedpassword012",
        notes: [
          {
            userid: "user4",
            id: "note4",
            title: "Plan social media posts",
            description: "Draft and schedule posts for the campaign launch.",
            creationDate: "2025-01-06",
            deadlineDate: "2025-01-14",
            checked: false,
          },
        ],
      },
    ],
    creationDate: new Date("2025-01-05"),
    deadlineDate: new Date("2025-01-25"),
  },
];

export default dummyCollections;
