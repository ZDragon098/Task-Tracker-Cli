//console.log(process.argv);
const fs = require('fs').promises;
const path = './tasks.json';


const command = process.argv[2];
const taskName = process.argv[3];

async function readTasks(){
    try {
        const data = await fs.readFile(path, 'utf-8');
        return JSON.parse(data);
    } catch (error){
        return [];
    }
}

async function saveTasks(tasks){
    await fs.writeFile(path, JSON.stringify(tasks, null, 2), 'utf-8');
}

/* 
    - Basic func:
        + case 'add': ok
        + case 'delete': ok
        + case 'update': ok
    - Mark
        + case 'mark-done': ok
        + case 'mark-in-progress': ok
    - List 
        + all ok
        + done ok
        + in progress ok
    - clear: ok
    */

async function main(){
    const tasks = await readTasks();
    switch (command){



    // basic func
    case 'add':
        if(!taskName){
            console.log("❌ Error: You haven't entered a task name!");
            break;
        }

        const newTask = {
            id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
            title: taskName,
            status: 'todo',
            createAt: new Date().toISOString(),
            updateAt: new Date().toISOString()
        };
        tasks.push(newTask);
        await saveTasks(tasks);
        console.log(`Task added successfully (ID: ${newTask.id})`);
        break;
    case 'delete':
        if(!taskName){
            console.log("❌ Error: You haven't entered the ID of the task to delete!");
            break;
        }
        const index = tasks.findIndex(task => task.id === parseInt(taskName));
        if(index === -1){
            console.log(`❌ Error: Task with ID "${taskName}" not found!`);
            break;  
        }
        console.log(`- Deleted task: ${tasks[index].title}`);
        tasks.splice(index, 1);
        await saveTasks(tasks);
        break;
    
    case 'update':
        if(!taskName){
            console.log("❌ Error: You haven't entered the ID of the task to update!");
            break;
        }
        const indexUpdate = tasks.findIndex(task => task.id === parseInt(taskName));
        if(indexUpdate === -1){
            console.log(`❌ Error: Task with ID "${taskName}" not found!`);
            break;  
        }
        const newTitle = process.argv[4];
        console.log(`- Updated task ID ${taskName}: "${tasks[indexUpdate].title}" with new title: "${newTitle}"`);
        tasks[indexUpdate].title = newTitle;
        tasks[indexUpdate].updateAt = new Date().toISOString();
        await saveTasks(tasks);
        break;



    // mark
    case 'mark-done':
        if(!taskName){
            console.log("❌ Error: You haven't entered the ID of the task to mark as done!");
            break;
        }
        const indexDone = tasks.findIndex(task => task.id === parseInt(taskName));
        if(indexDone === -1){
            console.log(`❌ Error: Task with ID "${taskName}" not found!`);
            break;
        }
        tasks[indexDone].status = 'done';
        await saveTasks(tasks);
        console.log(`Marked ID ${taskName}: "${tasks[indexDone].title}" as done!`);
        break;

    case 'mark-in-progress':
        if(!taskName){
            console.log("❌ Error: You haven't entered the ID of the task to mark as in-progress!");
            break;
        }
        const indexInProgress = tasks.findIndex(task => task.id === parseInt(taskName));
        if(indexInProgress === -1){
            console.log(`❌ Error: Task with ID "${taskName}" not found!`);
            break;
        }
        tasks[indexInProgress].status = 'in-progress';
        await saveTasks(tasks);
        console.log(`Marked ID ${taskName}: "${tasks[indexInProgress].title}" as in-progress!`);
        break;




    // list
    case 'list':
        if(tasks.length === 0){
            console.log("📋 Task list is empty!. You haven't added any tasks yet!");
            break;
        }
        const filter = process.argv[3];

        if(filter === 'all'){
            console.log("📋 Your Tasks:");
            tasks.forEach(task => {
                //const icon = task.status === 'done' ? '✅' : '⏳';
                console.log(`${task.id}. ${task.title}, status: ${task.status}`);
            }); 
        }

        else if(filter === 'done'){
            const doneTasks = tasks.filter(task => task.status === 'done');
            if(doneTasks.length === 0){
                console.log("📋 You haven't completed any tasks yet!");
                break;
            }
            console.log("📋 Completed Tasks:");
            doneTasks.forEach(task => {
                console.log(`${task.id}. ${task.title}`);
            });
        }

        else if(filter === 'in-progress'){
            const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
            if(inProgressTasks.length === 0){
                console.log("📋 You haven't any tasks in progress!");
                break;
            }
            console.log("📋 In Progress Tasks:");
            inProgressTasks.forEach(task => {
                console.log(`${task.id}. ${task.title}`);
            });
        }

        else if(filter === 'todo'){
            const todoTasks = tasks.filter(task => task.status === 'todo');
            if(todoTasks.length === 0){
                console.log("📋 You haven't any tasks to do!");
                break;
            }
            console.log("📋 Todo Tasks:");
            todoTasks.forEach(task => {
                console.log(`${task.id}. ${task.title}`);
            });
        }
        else{
            console.log("❌ Error: Invalid filter! Please use 'all', 'done', 'in-progress' or 'todo'.");
        }
        break;





    // clear
    case 'clear':
        console.log("📋 All tasks cleared!");
        await saveTasks([]);
        break;
    default:
        console.log('Unknown command. Please use basic commands (add, update, delete, mark, list, clear).');
    }
}
main();

