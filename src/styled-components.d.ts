import 'styled-components';

interface ClientManagerTheme {
	colors: {
		primary: string;
		secondary: string;
		background: string;
		foreground: string;
		variants: {
			danger: string;
			success: string;
			warning: string;
		};
	};
}

declare module 'styled-components' {
	export interface DefaultTheme extends ClientManagerTheme {}
}
