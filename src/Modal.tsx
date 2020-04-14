import * as React from 'react';
import { createPortal } from 'react-dom';
import { ModalStyled } from './styles';

const Modal: React.FC<{ children: any }> = ({ children }) => {
	const elRef = React.useRef<any>(null);
	if (!elRef.current) {
		const div = document.createElement('div');
		elRef.current = div;
	}
	React.useEffect(() => {
		document.body.style.overflow = 'hidden';
		const modalRoot = document.getElementById('modal');
		modalRoot?.appendChild(elRef.current);
		return () => {
			document.body.style.overflow = '';
			modalRoot?.removeChild(elRef.current);
		};
	}, []);
	return createPortal(<ModalStyled>{children}</ModalStyled>, elRef.current);
};

export default Modal;
