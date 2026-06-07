const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student"
    },
    avatar: {
      type: String,
      default: "👤"
    },
    bio: {
      type: String,
      default: ""
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      }
    ]
  },
  { timestamps: true }
);

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    teacher: {
      type: String,
      required: true
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    thumbnail: {
      type: String,
      default: ""
    },
    price: {
      type: String,
      default: "Free"
    },
    studentsCount: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const VideoSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      default: "0 min"
    },
    videoUrl: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      default: 1
    },
    views: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const AssignmentSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    dueDate: {
      type: Date
    },
    points: {
      type: Number,
      default: 100
    }
  },
  { timestamps: true }
);

const QuizSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    questions: [
      {
        question: {
          type: String,
          required: true
        },
        options: [{ type: String }],
        answer: {
          type: Number,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

const ProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    watchedVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
      }
    ],
    completedAssignments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment"
      }
    ],
    completedQuizzes: [
      {
        quizId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Quiz"
        },
        score: {
          type: Number,
          default: 0
        }
      }
    ],
    percentage: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const ReviewSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String }
  },
  { timestamps: true }
);

const EnrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = {
  User: mongoose.model("User", UserSchema),
  Course: mongoose.model("Course", CourseSchema),
  Video: mongoose.model("Video", VideoSchema),
  Assignment: mongoose.model("Assignment", AssignmentSchema),
  Quiz: mongoose.model("Quiz", QuizSchema),
  Progress: mongoose.model("Progress", ProgressSchema),
  Review: mongoose.model("Review", ReviewSchema),
  Enrollment: mongoose.model("Enrollment", EnrollmentSchema)
};
