import Image from "next/image";
import { auth } from "../../lib/config/auth"
import { handleLogOut } from "../actions";

export default async function page() {
	const session = await auth();
	console.log(session, 'session')

	return (
		<>
			<h1>{ session?.user?.name }</h1>
			<h2>{ session?.user?.email }</h2>
			<Image height={ 70 } width={ 70 } src={ session?.user?.image || '' } className="rounded-full" alt={ session?.user?.name || '' } />
			<form action={ handleLogOut }>
				<button type='submit' className="bg-white">
					Logout
				</button>
			</form>
		</>
	)
}
