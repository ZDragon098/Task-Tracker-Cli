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

async function main(){
    const tasks = await readTasks();
    switch (command){
    case 'add':
        if(!taskName){
            console.log("❌ Lỗi: Bạn chưa nhập tên công việc!");
            break;
        }

        const newTask = {
            id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
            title: taskName,
            status: 'pending'
        };
        tasks.push(newTask);
        await saveTasks(tasks);
        console.log(`+ Đã thêm công việc: ${taskName}`);
        break;

    case 'list':
        if(tasks.length === 0){
            console.log("📋 Danh sách công việc trống!. Bạn chưa thêm cv nào cần làm!");
            break;
        }
        console.log("📋 Danh sách công việc của bạn:");
        tasks.forEach(task => {
            const icon = task.status === 'done' ? '✅' : '⏳';
            console.log(`${task.id}. [${icon}] ${task.title}`);
        });
        break;

    case 'remove':
        if(!taskName){
            console.log("❌ Lỗi: Bạn chưa nhập tên công việc cần xóa!");
            break;
        }
        const index = tasks.findIndex(task => task.title === taskName);
        if(index === -1){
            console.log(`❌ Lỗi: Không tìm thấy công việc "${taskName}" để xóa!`);
            break;  
        }
        tasks.splice(index, 1);
        tasks.forEach((task, idx) => {
            task.id = idx + 1;
        });
        await saveTasks(tasks);
        console.log(`- Đã xóa công việc: ${taskName}`);
        break;
    case 'done':
        if(!taskName){
            console.log("❌ Lỗi: Bạn chưa nhập tên công việc cần đánh dấu hoàn thành!");
            break;
        }
        const indexDone = tasks.findIndex(task => task.title === taskName);
        if(indexDone === -1){
            console.log(`❌ Lỗi: Không tìm thấy công việc "${taskName}" để đánh dấu hoàn thành!`);
            break;
        }
        tasks[indexDone].status = 'done';
        await saveTasks(tasks);
        console.log(`✅ Đã đánh dấu công việc "${taskName}" là hoàn thành!`);
        break;
   
     /*
    case 'listDone':
    case 'listPending':
    case 'clear':
    */

    default:
        console.log('Unknown command. Please use "add" or "list".');
    }
}
main();

