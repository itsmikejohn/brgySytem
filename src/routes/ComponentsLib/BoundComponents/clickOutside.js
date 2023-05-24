import { writable } from "svelte/store";

export const showSlider = writable(false);
export const showNav = writable(false);
export const navSelections = writable("Dashboard");

//list of registered voters
export const showAdd = writable(false);
export const onSnaps = writable([]);
export const showEditModalLogic = writable(false);
export const compareValue = writable("");