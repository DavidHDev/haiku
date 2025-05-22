import { useEffect, useRef } from 'react';

export function useSingleEffect(effect: () => void | (() => void)) {
	const destroy = useRef<void | (() => void)>(undefined);
	const calledOnce = useRef(false);
	const renderAfterCalled = useRef(false);

	if (calledOnce.current) renderAfterCalled.current = true;

	useEffect(() => {
		if (calledOnce.current) {
			return;
		}

		calledOnce.current = true;
		destroy.current = effect();

		return () => {
			if (!renderAfterCalled.current) {
				return;
			}
			if (destroy.current) destroy.current();
		};
	}, [effect]);
}
