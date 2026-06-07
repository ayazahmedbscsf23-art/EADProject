require("dotenv").config();

const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
const bcrypt   = require("bcryptjs");

const {
  User,
  Course,
  Video,
  Assignment,
  Quiz,
  Progress,
  Review,
  Enrollment
} = require("./database");

const app = express();

app.use(cors({
  origin: [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "http://127.0.0.1:3000",
    "http://localhost:3000"
  ],
  credentials: true
}));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/edulearn")
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err.message));


app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail });

    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: hashed,
      role: role || "student"
    });

    await user.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      role:  user.role
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/courses", async (req, res) => {
  try {
    const { title, category, teacher, teacherId, description, price } = req.body;

    if (!title || !category || !teacher) {
      return res.status(400).json({ message: "Title, category, and teacher are required" });
    }

    const course = new Course({
      title: title.trim(),
      category: category.trim(),
      teacher,
      teacherId,
      description: description || "",
      price: price || "Free"
    });

    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/courses/:id", async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Course not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/courses/:id", async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Course not found" });

    await Video.deleteMany({ courseId: req.params.id });
    await Assignment.deleteMany({ courseId: req.params.id });
    await Quiz.deleteMany({ courseId: req.params.id });

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/videos/:courseId", async (req, res) => {
  try {
    const videos = await Video.find({ courseId: req.params.courseId }).sort({ order: 1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/videos", async (req, res) => {
  try {
    const { courseId, title, videoUrl, duration, order } = req.body;

    if (!courseId || !title || !videoUrl) {
      return res.status(400).json({ message: "courseId, title, and videoUrl are required" });
    }

    const video = new Video({ courseId, title, videoUrl, duration, order });
    await video.save();
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/videos/:id", async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/assignments/:courseId", async (req, res) => {
  try {
    const assignments = await Assignment.find({ courseId: req.params.courseId });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/assignments", async (req, res) => {
  try {
    const { courseId, title, description, dueDate, points } = req.body;

    if (!courseId || !title) {
      return res.status(400).json({ message: "courseId and title are required" });
    }

    const assignment = new Assignment({ courseId, title, description, dueDate, points });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/assignments/:id", async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Assignment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/quizzes/:courseId", async (req, res) => {
  try {
    const quizzes = await Quiz.find({ courseId: req.params.courseId });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/quizzes", async (req, res) => {
  try {
    const { courseId, title, questions } = req.body;

    if (!courseId || !title) {
      return res.status(400).json({ message: "courseId and title are required" });
    }

    const quiz = new Quiz({ courseId, title, questions: questions || [] });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/quizzes/:id", async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ message: "Quiz deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/enrollments/:userId", async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.params.userId })
      .populate("courseId");
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/enroll", async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    if (!studentId || !courseId) {
      return res.status(400).json({ message: "studentId and courseId are required" });
    }

    const already = await Enrollment.findOne({ studentId, courseId });
    if (already) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const enrollment = new Enrollment({ studentId, courseId });
    await enrollment.save();

    await Course.findByIdAndUpdate(courseId, { $inc: { studentsCount: 1 } });

    res.status(201).json({ message: "Enrolled successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/progress/:userId/:courseId", async (req, res) => {
  try {
    const progress = await Progress.findOne({
      userId: req.params.userId,
      courseId: req.params.courseId
    });
    res.json(progress || { percentage: 0, watchedVideos: [], completedQuizzes: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/progress", async (req, res) => {
  try {
    const { userId, courseId, videoId } = req.body;

    let progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
      progress = new Progress({ userId, courseId, watchedVideos: [] });
    }

    if (videoId && !progress.watchedVideos.includes(videoId)) {
      progress.watchedVideos.push(videoId);
    }

    const totalVideos = await Video.countDocuments({ courseId });
    progress.percentage = totalVideos > 0
      ? Math.round((progress.watchedVideos.length / totalVideos) * 100)
      : 0;

    await progress.save();
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/reviews/:courseId", async (req, res) => {
  try {
    const reviews = await Review.find({ courseId: req.params.courseId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/reviews", async (req, res) => {
  try {
    const { courseId, userId, name, rating, comment } = req.body;

    const existing = await Review.findOne({ courseId, userId });
    if (existing) {
      return res.status(400).json({ message: "You already reviewed this course" });
    }

    const review = new Review({ courseId, userId, name, rating, comment });
    await review.save();

    const allReviews = await Review.find({ courseId });
    const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await Course.findByIdAndUpdate(courseId, {
      rating: Math.round(avg * 10) / 10,
      totalReviews: allReviews.length
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/stats", async (req, res) => {
  try {
    const [users, courses, videos, quizzes] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Video.countDocuments(),
      Quiz.countDocuments()
    ]);
    res.json({ users, courses, videos, quizzes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("EduLearn LMS API is running ");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
