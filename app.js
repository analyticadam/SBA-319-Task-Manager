const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override"); // Import method-override
const db = require("./db/conn");
const app = express();
const PORT = 4242;
const Task = require("./models/tasks");
const User = require("./models/users");
const CompletedTask = require("./models/completedTasks");

// Helper function to save data to a file
const fs = require("fs");

/**
 * Function to save data to a specified file in the `data` directory.
 *
 * @param {string} filePath - The name of the file to save the data (e.g., "tasks.js").
 * @param {Array|Object} data - The data to be saved (must be serializable to JSON).
 */
function saveData(filePath, data) {
	const fs = require("fs"); // File system module for file operations
	const path = require("path"); // Path module to handle file paths

	try {
		// Construct the full path to the file in the "data" directory
		const fullPath = path.join(__dirname, "data", filePath);

		// Convert the data to a JSON string with indentation for readability
		// Wrap the data in a `module.exports` statement for compatibility with Node.js
		const fileContent = `module.exports = ${JSON.stringify(data, null, 4)};`;

		// Write the JSON string to the file, overwriting its contents
		fs.writeFileSync(fullPath, fileContent);

		// Log a success message for debugging
		console.log(`Data saved successfully to ${filePath}`);
	} catch (error) {
		// Log any errors that occur during the file writing process
		console.error(`Error saving data to ${filePath}:`, error.message);
	}
}

// Middleware: Parse request bodies and serve static files
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method")); // Enable method override for PUT and DELETE

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home route
// app.get("/", (req, res) => {
// 	console.log("GET / called"); // Log the route call

// 	// Ensure tasks array is up to date
// 	res.render("index", { Task }); // Render the main page with the tasks array
// });

// Call Users
app.get("/users", async (req, res) => {
	const foundUsers = await User.find({});
	console.log("GET /users called");
	res.json(foundUsers);
});

// Call Users
app.get("/users/seed", async (req, res) => {
	try {
		await User.create([
			{
				name: "Adam",
				age: 42,
			},
		]);
	} catch (error) {
		console.error("Error fetching users:", error.message);
		res.status(500).send("An error occurred while fetching users.");
	}
});

// CompletedTasks
app.get("/completedtasks", async (req, res) => {
	const foundCompletedTasks = await CompletedTask.find({});
	console.log("GET /completedtasks called");
	res.json(foundCompletedTasks);
});

// Call Users
app.get("/completedtasks/seed", async (req, res) => {
	try {
		await CompletedTask.create([
			{
				title: "Graduate Per Scholas Software Engineering Bootcamp-Cycle 61",
				description: "Celebrate Good Times-Come On!",
				status: "Completed",
				user: "Adam Farley",
				dueDate: "2025-01-24T00:00:00.000+00:00",
				category: "Per Scholas Bootcamp",
			},
		]);
	} catch (error) {
		console.error("Error fetching completed tasks:", error.message);
		res.status(500).send("An error occurred while fetching completed tasks.");
	}
});

// Get Categories
app.get("/categories", (req, res) => {
	console.log("GET /categories called");
	res.json(categories);
});

// Route to render the Add Task form
app.get("/tasks/add", (req, res) => {
	console.log("GET /tasks/add called");
	res.render("add-task"); // Pass categories to EJS
});

// GET: Render All Tasks Page
app.get("/", async (req, res) => {
	try {
		const foundTasks = await Task.find({}); // Fetch all tasks from the Mongo DB
		console.log(foundTasks);
		console.log(req.body);
		console.log(req.params);
		console.log("GET /tasks called"); // Log the route call
		res.render("index", { foundTasks }); // Render the tasks.ejs template and pass the tasks array
	} catch (error) {
		console.error("Error fetching tasks:", error.message);
		res.status(500).send("An error occurred while fetching tasks.");
	}
});

// Narrowing index search to find specific ID of task
// GET: Fetch details of a specific task by ID
app.get("/tasks/:id", (req, res) => {
	console.log("GET /tasks/:id called with ID:", req.params.id);
	const task = tasks.find((t) => t.id == req.params.id);
	if (task) {
		console.log("Task found:", task);
		res.json(task);
	} else {
		console.log(`Task with ID ${req.params.id} not found.`);
		res.status(404).json({ error: `Task with ID ${req.params.id} not found.` });
	}
});

app.post("/tasks", async (req, res) => {
	try {
		const createdTask = await Task.create(req.body);
		res.status(200).redirect("/");
	} catch (err) {
		res.status(400).send(err);
	}
});

// // POST: Create a new task
// app.post("/tasks", async (req, res) => {
// 	// Destructure the task fields from the request body
// 	const { title, description, status, dueDate, category, user, testName } =
// 		req.body;
// 	console.log(req.body);
// 	// Validation: Ensure required fields (title and dueDate) are provided
// 	if (!title || !dueDate) {
// 		// If validation fails, respond with a 400 status and error message
// 		return res.status(400).send("Title and Due Date are required.");
// 	}

// 	// Create a new task object with the provided data
// 	// Convert status to a boolean value
// 	const taskStatus = status === "on";

// 	try {
// 		// Create the task with the submitted form data
// 		await Task.create({
// 			title, // Task title
// 			description, // Task description (optional)
// 			status: status || "Pending", //Default to "Pending" if no status is provided
// 			user, // Save the user ID or null if not provided
// 			testName, // user name
// 			dueDate, // Due date for the task
// 			category, // Category for the task (optional, default to null)
// 		});
// 		res.status(200).redirect("/"); //  Redirect to the home page where tasks are displayed
// 	} catch (error) {
// 		console.error("Error creating task:", error.message);
// 		res.status(500).send("An error occured while creating this task.");
// 	}
// });

// PUT: Update an existing task by ID
app.put("/task/:id", async (req, res) => {
	try {
		const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).redirect("/");
	} catch (err) {
		res.status(400).send(err);
	}
});

// app.put("/tasks/:id", (req, res) => {
// 	const task = tasks.find((t) => t.id === req.params.id);

// 	if (task) {
// 		// Update fields
// 		task.title = req.body.title || task.title;
// 		task.description = req.body.description || task.description;
// 		task.status = req.body.status || task.status;
// 		task.dueDate = req.body.dueDate || task.dueDate;
// 		task.category = req.body.category || null;
// 		task.user = req.body.user || task.user;

// 		// Persist changes
// 		saveData("tasks.js", tasks);

// 		res.redirect("/");
// 	} else {
// 		res.status(404).send("Task not found.");
// 	}
// });

app.get("/tasks/:id/edit", async (req, res) => {
	try {
		const foundTask = await Task.findById(req.params.id);
		res.status(200).render("edit-task", { task: foundTask });
	} catch (err) {
		res.status(400).send(err);
	}
});

// Route to render the Edit Task page
// app.get("/tasks/:id/edit", (req, res) => {
// 	console.log("GET /tasks/:id/edit called with ID:", req.params.id); // Log the route call

// 	// Find the task with the matching ID
// 	const task = tasks.find((t) => t.id === req.params.id);

// 	if (task) {
// 		// Pass the task, categories, and users arrays to the EJS template
// 		res.render("edit-task", { task, categories, users, error: null });
// 	} else {
// 		console.log(`Task with ID ${req.params.id} not found.`); // Log if no task is found
// 		res.status(404).send("Task not found");
// 	}
// });

// DELETE: Delete a task by ID
app.delete("/tasks/:id", async (req, res) => {
	console.log("DELETE /tasks/:id called with ID:", req.params.id); // Log route call

	const { id } = req.params; // Extract task ID from request parameters
	try {
		// Filter out the task with the given ID in Mongoose DB
		const deletedTask = await Task.findByIdAndDelete(id);

		if (deletedTask) {
			console.log(`Task with ID ${id} deleted.`); // Log success
			res.redirect("/"); // Redirect to the homepage after deletion
		} else {
			console.log(`Task with ID ${id} not found.`); // Log failure
			res.status(404).send("Task not found");
		}
	} catch (error) {
		console.error(`Error deleting task: ${error.message}`);
		res.status(500).send("An error occurred while deleting the task.");
	}
});

// Handle undefined routes with a 404 error
app.use((req, res) => {
	res.status(404).send("Page Not Found");
});

// Start Server
app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`)
);
