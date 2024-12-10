const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
	{
		name: { type: string, required: true },
		age: { type: number, required: true },
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

model.exports = User;
