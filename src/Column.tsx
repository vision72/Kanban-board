import { ColumnContainer, ColumnTitle } from './styles';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './state/AppStateContext';
import { Card } from './Card';
import { useRef } from 'react';
import { useItemDrag } from './utils/useItemDrag';
import { useDrop } from 'react-dnd';
import { isHidden } from './utils/isHidden';
import { moveList, addTask } from './state/actions';

type ColumnProps = {
	id: string;
	title: string;
};

export const Column = ({ title, id }: ColumnProps) => {
	const { draggedItem, getTasksByListId, dispatch } = useAppState();
	const tasks = getTasksByListId(id);
	const ref = useRef<HTMLDivElement>(null);

	const [ , drop ] = useDrop({
		accept: 'COLUMN',
		hover() {
			if (!draggedItem) {
				return;
			}
			if (draggedItem.type === 'COLUMN') {
				if (draggedItem.id === id) {
					return;
				}
				dispatch(moveList(draggedItem.id, id));
			}
		}
	});

	const { drag } = useItemDrag({ type: 'COLUMN', id, title });
	drag(drop(ref));

	return (
		<ColumnContainer ref={ref} isHidden={isHidden(draggedItem, 'COLUMN', id)}>
			<ColumnTitle>{title}</ColumnTitle>
			{tasks.map((task) => <Card text={task.text} key={task.id} id={task.id} />)}
			<AddNewItem toggleButtonText="+ Add another task" onAdd={(text) => dispatch(addTask(text, id))} dark />
		</ColumnContainer>
	);
};
