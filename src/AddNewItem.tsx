import { useState } from 'react';
import { AddItemButton } from './styles';
import { NewItemForm } from './NewItemForm';

type AddNewItemProps = {
	onAdd(text: string): void;
	toggleButtonText: string;
	dark?: boolean;
};

export const AddNewItem = (props: AddNewItemProps) => {
	const [ showForm, setShowForm ] = useState<boolean>(false);
	const { onAdd, toggleButtonText, dark } = props;

	if (showForm) {
		// we show item creation form here
		return (
			<NewItemForm
				onAdd={(text) => {
					onAdd(text);
					setShowForm(!showForm);
				}}
			/>
		);
	}

	return (
		<AddItemButton dark={dark} onClick={() => setShowForm(!showForm)}>
			{toggleButtonText}
		</AddItemButton>
	);
};
