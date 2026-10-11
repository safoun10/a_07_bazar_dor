import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_CONNECTION_STRING) {
	throw new Error("MONGODB_CONNECTION_STRING is missing in .env.local");
}

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
const db = client.db(); // Uses the default database name specified in your connection string

export const auth = betterAuth({
	database: mongodbAdapter(db, {
		client,
	}),
	emailAndPassword: {
		enabled: true,
	},
	secret: process.env.BETTER_AUTH_SECRET,
	baseURL: process.env.BETTER_AUTH_URL,
});
