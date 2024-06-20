import { RootState } from '@/app/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AnimateTextFadedDurationState {
	value: number;
}

const initialState: AnimateTextFadedDurationState = {
	value: 0,
};

export const animateTextFadedDurationSlice = createSlice({
	name: 'duration',
	initialState,
	reducers: {
		setDuration: (state, action: PayloadAction<number>) => {
			state.value = action.payload;
		},
	},
});

export const { setDuration } = animateTextFadedDurationSlice.actions;

export const selectDuration = (state: RootState) =>
	state.animateTextFadedDuration.value;

export default animateTextFadedDurationSlice.reducer;
