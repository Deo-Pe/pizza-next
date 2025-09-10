import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormInput } from '../form-components/form-input'
import { Input } from '../../ui/input'

type Props = {
	className?: string
}

const CheckoutPersonalForm = (props: Props) => {
	return (
		<WhiteBlock title="2. Персональные данные" className={props.className}>
			<div className="grid grid-cols-2 gap-5">
				<Input name="firstName" className="text-base" placeholder="Имя" />
				<Input name="lastName" className="text-base" placeholder="Фамилия" />
				<Input name="email" className="text-base" placeholder="E-Mail" />
				<FormInput name="phone" className="text-base" placeholder="Телефон" />
			</div>
		</WhiteBlock>
	)
}

export default CheckoutPersonalForm