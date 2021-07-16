// 导入react文件
import React from 'react';


const Form = ({todos,setTodos,inputText,setInputText,setStatus,currentText,setCurrentText}) =>{
    // 当input每次输入时，控制台打印event.target.value
    const inputTextHandler = (e) =>{ 
        console.log(e.target.value);
        setInputText(e.target.value);
    };
    const submitTodoHandler = (e) =>{ 
        //禁止执行与event关联的默认动作,阻止submit表单产生的网页刷新
        e.preventDefault();
        //空的todo不加入
        if(inputText==="") return;
        setTodos([...todos,{text:inputText, completed:false, id:Math.random()*1000}]);
        setInputText(e.target.value);
        setInputText("");
    };
    const statusHandler = (e)=>{
      // 储存status并传递给下一级TodoLists
      setStatus(e.target.value);
    }
    return (
        <form>
        {/*onChange:每次更改时执行inputHandler */}
        <input value={inputText} onChange={inputTextHandler} type="text" className="todo-input" />
        {/*onClick:每次点击时执行submitHandler */}
        <button onClick={submitTodoHandler} className="todo-button" type="submit">
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select onChange={statusHandler} name="todos" className="filter-todo">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>
    )
}
// 导出文件
export default Form;
