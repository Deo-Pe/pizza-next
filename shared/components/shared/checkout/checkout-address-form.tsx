'use client'
import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormTextarea } from '../form-components/form-textarea'
import { AdressInput } from '../address-input'
import { Controller, useFormContext } from 'react-hook-form'
import { ErrorText } from '../error-text'

type Props = {
	className?: string
}

const CheckoutAddressForm = (props: Props) => {
	const { control } = useFormContext()
	return (
		<WhiteBlock title="3. Адресс доставки" className={props.className}>
			<div className="flex flex-col gap-5">
				<Controller
					name="address"
					render={({ field, fieldState }) => <>
						<AdressInput onChange={field.onChange} />
						{fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
					</>}
					control={control}
				/>
				<FormTextarea name='comment' rows={5} className="text-base" placeholder="Комментарий к заказу" />
			</div>
		</WhiteBlock>
	)
}

export default CheckoutAddressForm