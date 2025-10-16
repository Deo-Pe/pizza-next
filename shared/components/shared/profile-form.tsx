import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { formRegisterSchema } from './modals/auth-modal/forms/schema'

type Props = {
	data: User
}

const ProfileForm = ({ data }: Props) => {
	const form = useForm({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			fullName: data.fullName,
			email: data.email,
			password: '',
			confirmPassword: ''
		}
	})
	return (
		<div>ProfileForm</div>
	)
}

export default ProfileForm