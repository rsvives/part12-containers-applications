export const Todo = ({ todo, onComplete, onDelete }) => {

    const statusText = todo.done ? '✅' : ''
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
            <span>{statusText} {todo.text}</span>
            {/* <span>this todo is </span> */}
            <span>
                {!todo.done && <button onClick={onComplete(todo)}> Set as done </button>}
                <button onClick={onDelete(todo)}> Delete </button>
            </span>
        </div>
    )
}