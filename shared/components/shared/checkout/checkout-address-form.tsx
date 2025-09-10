import React from 'react'
import { WhiteBlock } from '../white-block'
import { Input } from '../../ui/input'
import { Textarea } from '../../ui/textarea'

type Props = {
	className?: string
}

const CheckoutAddressForm = (props: Props) => {
	return (
		<WhiteBlock title="3. Адресс доставки" className={props.className}>
			<div className="flex flex-col gap-5">
				<Input name="firstName" className="text-base" placeholder="Адресс доставки" />
				<Textarea rows={5} className="text-base" placeholder="Комментарий к заказу" />
			</div>
		</WhiteBlock>
	)
}

export default CheckoutAddressForm