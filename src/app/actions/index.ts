'use server';

import { signIn, signOut } from "../../lib/config/auth";

export async function handleSocialLogin(formData: FormData) {
	const action = formData.get('action');

	await signIn(action as string, { redirectTo: "/dashboard" });
}

export async function handleLogOut() {
	await signOut({ redirectTo: "/login" });
}