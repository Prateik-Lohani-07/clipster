import { createContext, useReducer, type ActionDispatch } from "react";
import { clipReducer, type Action } from "../reducers/clipReducer";
import type { ClipsterData } from "./ClipsterData";
import { initialState } from "./initialState";

export const ClipsContext = createContext<ClipsterData>(initialState);
export const ClipDispatchContext = createContext<ActionDispatch<[action: Action]>>(() => {});

interface ClipsContextProviderProps {
	children: React.ReactNode;
}

export function ClipsContextProvider({ children }: ClipsContextProviderProps) {
	const [clipsterData, dispatch] = useReducer(clipReducer, initialState);

	return (
		<ClipsContext.Provider value={clipsterData}>
			<ClipDispatchContext.Provider value={dispatch}>
				{children}
			</ClipDispatchContext.Provider>
		</ClipsContext.Provider>
	)
}