import { useEffect } from 'react';

type UseCloseForm = {
	isOpen: boolean;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useCloseForm = ({ isOpen, onClose, rootRef }: UseCloseForm) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				isOpen && onClose?.();
			}
		};

		const handleClickOutside = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose, rootRef]);
};
