import { browser } from "$app/environment";
import { writable } from "svelte/store";

//////////// listsData ///////////////////////////////////////////////////////////

const LOCALSTORAGE_NAME = "disembleergon-svelte-todo-app";
const listsData = writable(
	JSON.parse(browser ? localStorage.getItem(LOCALSTORAGE_NAME) || "{}" : "{}")
);

listsData.subscribe((value) => {
	if (!browser) return;
	localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(value));
});

/////////// exportTodos /////////////////////////////////////////////////////////

const exportTodos = writable({});
export { listsData, exportTodos };
