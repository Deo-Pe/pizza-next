import * as React from 'react';

interface Props {
	code: string
}

export function VerificationUserTemplate({ code }: Partial<Props>) {
	return (
		<div>
			<p className='font-bold'>{code}</p>
			<p> <a href={`http://pizza-next-fk4goe2iq-deopes-projects.vercel.app/api/auth/verify?code=${code}`}>Подтвердите регистрацию </a> </p>
		</div>
	);
}