import React, { useState } from 'react';
import { DragDropContext } from "@hello-pangea/dnd";

function TaskList({ spec, setSpec }) {
  const [tasks, setTasks] = useState(spec.tasks);
  const [groups, setGroups] = useState(['General']);

  const handleEdit = (id, newText) => {
    const updated = tasks.map(t => t.id === id ? { ...t, text: newText } : t);
    setTasks(updated);
    setSpec({ ...spec, tasks: updated });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(tasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setTasks(reordered);
    setSpec({ ...spec, tasks: reordered });
  };

  const addGroup = () => {
    const newGroup = prompt('New group name:');
    if (newGroup) setGroups([...groups, newGroup]);
  };

  const assignGroup = (id, group) => {
    const updated = tasks.map(t => t.id === id ? { ...t, group } : t);
    setTasks(updated);
    setSpec({ ...spec, tasks: updated });
  };

  return (
    <div>
      <h2>User Stories</h2>
      <ul>{spec.stories.map((story, i) => <li key={i}>{story}</li>)}</ul>
      <h2>Engineering Tasks</h2>
      <button onClick={addGroup}>Add Group</button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <input value={task.text} onChange={(e) => handleEdit(task.id, e.target.value)} />
                      <select value={task.group} onChange={(e) => assignGroup(task.id, e.target.value)}>
                        {groups.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TaskList;