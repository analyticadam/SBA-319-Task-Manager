const mongoose = require("mongoose");
const completedTaskSchema = new mongoose.Schema({
	title: { type: String, required: true }, // Task title
	description: { type: String, required: true }, // Task description (optional)
	status: {
		type: String,
		default: "Completed", // Allowed values
	},
	user: { type: String, required: true }, // Save the user ID or null if not provided
	dueDate: { type: Date, required: true }, // Due date for the task
	category: {
		type: String,
		enum: ["Personal", "Work", "Per Scholas Bootcamp"],
		message: "{VALUE} is not a valid category.",
		default: "Personal",
		required: true,
	}, // Category for the task (optional, default to null)
});

const CompletedTask = mongoose.model("CompletedTask", completedTaskSchema);
module.exports = CompletedTask;
