export interface ClipColor {
	backgroundColor: string;
	textColor: string;
	hoverBackgroundColor: string;
	hoverTextColor: string;
}

export const preDefinedColors = { 
	red: "#ff0000", 
	blue: "#0000ff", 
	yellow: "#ffff00", 
	orange: "#ffa500", 
	green: "#00ff00", 
	black: "#000000",
};

export const COLORS = {
	DEFAULT: 'default',
	RED: 'red',
	BLUE: 'blue',
	YELLOW: 'yellow',
	GREEN: 'green',
	BLACK: 'black',
	ORANGE: 'orange',
} as const;

export type COLORS = typeof COLORS[keyof typeof COLORS];

export const predefinedClipColors: Record<COLORS, ClipColor> = {
	[COLORS.DEFAULT]: {
		backgroundColor: '#ffffe0',
		textColor: '#000000',
		hoverBackgroundColor: '#9acd32',
		hoverTextColor: '#ffffff',
	},
	[COLORS.RED]: {
		backgroundColor: '#ff0000',
		textColor: '#ffffff',
		hoverBackgroundColor: '#cc0000',
		hoverTextColor: '#ffffff',
	},

	[COLORS.BLUE]: {
		backgroundColor: '#0C66C2',
		textColor: '#ffffff',
		hoverBackgroundColor: '#0000cc',
		hoverTextColor: '#ffffff',
	},

	[COLORS.YELLOW]: {
		backgroundColor: '#ffff00',
		textColor: '#000000',
		hoverBackgroundColor: '#e6e600',
		hoverTextColor: '#000000',
	},

	[COLORS.ORANGE]: {
		backgroundColor: '#ffa500',
		textColor: '#000000',
		hoverBackgroundColor: '#e59400',
		hoverTextColor: '#000000',
	},

	[COLORS.GREEN]: {
		backgroundColor: '#00ff00',
		textColor: '#000000',
		hoverBackgroundColor: '#00cc00',
		hoverTextColor: '#000000',
	},

	[COLORS.BLACK]: {
		backgroundColor: '#010408',
		textColor: '#FFFFFF',
		hoverBackgroundColor: '#1a1a1a',
		hoverTextColor: '#FFFFFF',
	},
}

export function getClipColors(colorKey: string | undefined): ClipColor {
	const clipColors = (colorKey && Object.values(COLORS).includes(colorKey as COLORS)) 
				? predefinedClipColors[colorKey as COLORS] 
				: predefinedClipColors[COLORS.DEFAULT];

	return clipColors;
}