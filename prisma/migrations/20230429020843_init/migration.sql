-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "parentPhone" TEXT,
    "Gov" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'student',
    "password" TEXT NOT NULL,
    "jwt" TEXT,
    "resetPasswordToken" TEXT,
    "resetExpiresTime" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" TEXT NOT NULL,
    "levelName" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "levelId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "lessonName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL,
    "quizName" TEXT NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answers" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCourses" (
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "UserCourses_pkey" PRIMARY KEY ("userId","courseId")
);

-- CreateTable
CREATE TABLE "UserQuizes" (
    "userId" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "UserQuizes_pkey" PRIMARY KEY ("userId","quizId","subjectId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_parentPhone_key" ON "User"("parentPhone");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourses" ADD CONSTRAINT "UserCourses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourses" ADD CONSTRAINT "UserCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuizes" ADD CONSTRAINT "UserQuizes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuizes" ADD CONSTRAINT "UserQuizes_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuizes" ADD CONSTRAINT "UserQuizes_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
