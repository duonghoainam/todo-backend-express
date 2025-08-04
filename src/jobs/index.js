// Jobs module - cho các tác vụ background
// Có thể sử dụng node-cron, bull, agenda, etc.

class JobManager {
  constructor() {
    this.jobs = [];
  }

  // Thêm job mới
  addJob(name, schedule, handler) {
    const job = {
      name,
      schedule,
      handler,
      isRunning: false,
    };

    this.jobs.push(job);
    console.log(`Job "${name}" đã được thêm`);
  }

  // Khởi động tất cả jobs
  startAll() {
    this.jobs.forEach((job) => {
      if (!job.isRunning) {
        this.startJob(job);
      }
    });
  }

  // Khởi động một job
  startJob(job) {
    job.isRunning = true;
    console.log(`Job "${job.name}" đã được khởi động`);

    // Placeholder cho việc thực thi job
    // Trong thực tế sẽ sử dụng node-cron hoặc bull
  }

  // Dừng tất cả jobs
  stopAll() {
    this.jobs.forEach((job) => {
      job.isRunning = false;
    });
    console.log("Tất cả jobs đã được dừng");
  }
}

// Export instance
const jobManager = new JobManager();

// Ví dụ job: Cleanup old todos
jobManager.addJob("cleanup-todos", "0 2 * * *", () => {
  console.log("Running cleanup job...");
  // Logic cleanup sẽ được implement sau
});

module.exports = jobManager;
