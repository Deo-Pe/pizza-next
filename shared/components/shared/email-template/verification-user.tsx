import * as React from 'react';

interface Props {
	code: string
}

export function VerificationUserTemplate({ code }: Partial<Props>) {
	return (
		<div>
			<p className='font-bold'>{code}</p>
			<p> <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Подтвердите регистрацию </a> </p>
		</div>
	);
}