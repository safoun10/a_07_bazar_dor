import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_CONNECTION_STRING) {
	throw new Error("MONGODB_CONNECTION_STRING is missing in .env.local");
}

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
const db = client.db(); // Uses the default database name specified in your connection string

const getOrigin = (value: string | undefined): string[] => {
	if (!value) return [];
	const url = new URL(value.includes("://") ? value : `https://${value}`);
	return [url.origin];
};

const trustedOrigins = [
	...new Set([
		...getOrigin(process.env.BETTER_AUTH_URL),
		...getOrigin(process.env.NEXT_PUBLIC_APP_URL),
		...getOrigin(process.env.VERCEL_URL),
		...getOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL),
		...(process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : []),
	]),
];

export const auth = betterAuth({
	baseURL: process.env.BETTER_AUTH_URL,
	secret: process.env.BETTER_AUTH_SECRET,
	trustedOrigins,
	database: mongodbAdapter(db, {
		client,
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
	},
	account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ["google", "github"],
		},
	},
});
