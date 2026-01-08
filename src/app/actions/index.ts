'use server';

import { signIn, signOut } from "../auth";

export async function handleSocialLogin(formData: FormData) {
	const action = formData.get('action');

	await signIn(action as string, { redirectTo: "/post-login" });
}

export async function handleLogOut() {
	await signOut({ redirectTo: "/login" });
}