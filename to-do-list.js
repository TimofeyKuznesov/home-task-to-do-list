const Task = (() => {
    class Task {
        constructor(id, name) {
            this.id = id;
            this.name = `${name}`;
        }
    }
    Task.prototype.isComplete = false;
    Task.prototype.completeTask = function() {
        this.isComplete = true
        return this;
    }
    Task.prototype.toString = function() {
        return `[${this.isComplete ? 'completed' : 'new'}] ${this.name}`;
    }
    Task.prototype.print = function() {
        console.log(this.toString())
        return this;
    }
    return Task;
})();

const TaskList = (() => {
    class TaskList {
        constructor(name, list = []) {
            this.name = name;
            this.list = list
        }
    }
    TaskList.prototype.toString = function() {
        return `TaskList[${this.name}]:` +
            this.list.map(task => `\n\t${task.toString()}`).join(',')
    }
    TaskList.prototype.print = function(prefix = '') {
        console.log(`${prefix} ${this.toString()}`)
        return this;
    }
    TaskList.prototype.add = function(task) {
        if(task) {
            this.list.push(task);
        }
        return this;
    }
    TaskList.prototype.find = function(conditional) {
        return typeof conditional === 'number' 
            ? this.list.find(({id} = {}) => id === conditional) 
            : this.list.find(({name} = {}) => name === conditional) 
    }
    TaskList.prototype.removeTask = function(task) {
        this.list.splice(this.list.indexOf(task), 1)
        return this;
    }   
    const defaultSortFunction = 
        ({name: name1 = ''} = {},{name: name2 = ''} = {}) => name1.localeCompare(name2);
    TaskList.prototype.sort = function(sortFunction = defaultSortFunction) {
        this.list = this.list.sort(sortFunction);
        return this;
    }
    TaskList.prototype.clear = function() {
        this.list.length = 0;
        return this;
    }
    return TaskList;
})();

const taskList = new TaskList('TestTasks', [
    new Task(1,"Manual Test"),
    new Task(2,"Integration test"),
    new Task(3,"Auto test")
]);

const newTask = new Task(4, "Super Task");
taskList.print('1. before add new task').add(newTask).print('1. after add new task');
console.log('2. print tasks\n\t'+taskList.list.map(task => `"${task}"`).join(', '));
taskList.print('3. before new task complete')
newTask.completeTask();
taskList.print('3. after new task complete')
taskList.print('4. before remove').removeTask(newTask).print('4. after remove');
taskList.print('5. before sort').sort().print('5. after sort')
taskList.print('6. before clear').clear().print('6. after clear');

