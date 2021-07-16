// 导入react核心库 并且引入useState功能()
import React,{useEffect, useState} from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  // 声明名为inputText的state变量并且作为字符串类型 默认为空
  const [inputText,setInputText] = useState("");
  // 声明名为todos的state变量并且作为数组类型
  const [todos,setTodos] = useState([]);
  // 声明名为status的state 用于记录formselect栏的三种状态 默认为all
  const [status,setStatus] = useState("all");
  // 符合筛选条件的 todos数组
  const [filteredTodos,setFilteredTodos] = useState([]);

  // 判断当前select选定的状态
  const filterHandler= ()=>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  //io存储和读取
  const saveToLocal=()=>{
    localStorage.setItem("todos",JSON.stringify([todos]));
  }
  const getLocalTodos=()=>{
    if(localStorage.getItem("todos"!==null)){
      let localItems=JSON.parse(localStorage.getItem("todos")) ;
      setTodos(localItems);
    }
  }

    //useEffect函数 函数体内是render开始前执行，return是render开始后
    //每次添加todos，更改select的status都会执行useEffect
    useEffect(()=>{
      filterHandler();
    },[todos,status]);
    //每次开启服务运行一次 空数组
    useEffect(()=>{
      getLocalTodos();
    },[])

  return (
    <div className="App">
      <header>
        {/* 设置输入文本的节点 */}
        <h1>My Memo</h1>
      </header>
      {/* Form标签是我们导出的模块，setInputText是可以把函数传递至From.js以把event传入*/}
      {/* 这里面的todos setinput的作用？？？ */}
      <Form 
        todos={todos} setTodos={setTodos} 
        inputText={inputText} setInputText={setInputText} 
        setStatus={setStatus} />
      {/* 向Todolist.js传递todos */}
      <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
