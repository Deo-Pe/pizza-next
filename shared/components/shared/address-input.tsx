'use client'
import React from 'react'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

interface Props {
	onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
	return (
		<AddressSuggestions token='dba8ccffeb41917469a7db6adc50401e065d7db5' onChange={(data) => onChange?.(data?.value)} />
	)
}