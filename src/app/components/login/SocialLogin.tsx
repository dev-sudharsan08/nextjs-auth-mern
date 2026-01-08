import { handleSocialLogin } from "@/app/actions";

export default function SocialLogin() {

	return (
		<>
			<form action={ handleSocialLogin }>
				<button type='submit' name='action' value='google' className="bg-white">
					Sign in With Google
				</button>
				<button type='submit' name='action' value='github' className="bg-white">
					Sign in With Github
				</button>
			</form>
		</>
	)
}
