'use client'
import React from 'react'
import { Toaster } from "react-hot-toast";
import { SessionProvider } from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'


const Providers: React.FC<React.PropsWithChildren> = (props) => {
	return (
		<>
			<SessionProvider >
				{props.children}
			</SessionProvider>
			<Toaster />
			<NextTopLoader />
		</>
	)
}

export default Providers