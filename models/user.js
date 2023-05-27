import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
	email: {
		type: String,
		unique: [true, 'Email already exists!'],
		required: [true, 'Email is requred!'],
	},
	username: {
		type: String,
		required: [true, 'Username is required!'],
		match: [
			/^(?=.{8,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
			'Username invalid, it should contain 8-15 alphanumeric letters and be unique!',
		],
	},
	image: {
		type: String,
	},
});

const User = models.User || model('User', userSchema);

export default User;
