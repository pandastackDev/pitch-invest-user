import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
//Include Both Helper File with needed methods
import {
	addNewProject as addNewProjectApi,
	addNewTodo as addNewTodoApi,
	deleteTodo as deleteTodoApi,
	getProjects as getProjectsApi,
	getTodos as getTodosApi,
	updateTodo as updateTodoApi,
} from "../../helpers/fakebackend_helper";
// Import types
import type { Project, Todo } from "./types";

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
	try {
		const response = await getTodosApi();
		return response;
	} catch (error) {
		return error;
	}
});

export const addNewTodo = createAsyncThunk(
	"todos/addNewTodo",
	async (todo: Todo) => {
		try {
			const data = await addNewTodoApi(todo);
			toast.success("Todo Added Successfully", { autoClose: 3000 });
			return data;
		} catch (error) {
			toast.error("Todo Added Failed", { autoClose: 3000 });
			throw error;
		}
	},
);

export const updateTodo = createAsyncThunk(
	"todos/updateTodo",
	async (todo: Todo) => {
		try {
			const data = await updateTodoApi(todo);
			toast.success("Todo Updated Successfully", { autoClose: 3000 });
			return data;
		} catch (error) {
			toast.error("Todo Updated Failed", { autoClose: 3000 });
			throw error;
		}
	},
);

export const deleteTodo = createAsyncThunk(
	"todos/deleteTodo",
	async (todo: Todo) => {
		try {
			const data = await deleteTodoApi(todo);
			toast.success("Todo Delete Successfully", { autoClose: 3000 });
			return data;
		} catch (error) {
			toast.error("Todo Delete Failed", { autoClose: 3000 });
			throw error;
		}
	},
);

export const getProjects = createAsyncThunk("todos/getProjects", async () => {
	try {
		const response = await getProjectsApi();
		return response;
	} catch (error) {
		return error;
	}
});

export const addNewProject = createAsyncThunk(
	"todos/addNewProject",
	async (project: Project) => {
		try {
			const data = await addNewProjectApi(project);
			toast.success("Project Added Successfully", { autoClose: 3000 });
			return data;
		} catch (error) {
			toast.error("Project Added Failed", { autoClose: 3000 });
			throw error;
		}
	},
);
