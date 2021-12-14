import BaseURL from "./axiosBase";

export const getTodos = ()=>{
    return BaseURL.get('/todos').then((res)=>{
        return res.data
    }).catch((err)=>{
        console.error(err);
    })
}

export const getTodo = (id)=>{
    return BaseURL.get(`/todos/${id}`).then((res)=>{
        return res.data
    })
}

export const createTodo = ()=>{
    return BaseURL.post('/todos',{name:'',tasks:[]})
}

export const removeTodo = (id)=>{
    return BaseURL.delete(`/todos/${id}`)
}

export const updateTodo = (todo)=>{
    return BaseURL.put(`/todos/${todo.id}`,{name:todo.name,tasks:todo.tasks})
}