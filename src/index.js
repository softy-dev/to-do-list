import "./reset.css";
import "./styles.css";

const manageProject = () => {
    const projectList = [{ "Default": [] }];
    let selectedProject = 0;

    function create(title) {
        const project = { [title]: [] };
        projectList.push(project);
    }

    function remove(projectIndex) {
        if (projectIndex > projectList.length-1 || 
            projectIndex < 0 ||
            !Number.isInteger(projectIndex)) {
                console.log("Invalid value!");
                return;
        }

        projectList.splice(projectIndex, 1);

        if (selectedProject > projectIndex ||
            selectedProject === projectIndex && 
            selectedProject > projectList.length-1) {
            selectedProject -= 1;
        }
    }

    function select(projectIndex) {
        if (projectIndex > projectList.length-1 || 
            projectIndex < 0 ||
            !Number.isInteger(projectIndex)) {
                console.log("Invalid value!");
                return;
        }

        selectedProject = projectIndex;
    }

    const getProjectList = () => projectList;
    const getSelectedProject = () => selectedProject;

    return { create, remove, select, 
        getSelectedProject, getProjectList };
}

const project = manageProject();

const manageToDo = () => {
    const getToDosArray = () => {
        const currentProject = project.getProjectList()[project.getSelectedProject()];
        return Object.values(currentProject)[0];
    };
    
    function create(title, description, dueDate, priority, notes, ...checklist) {
        const toDosArray = getToDosArray();

        const formattedChecklist = checklist.map(item => {
            return {[item]: "not completed"};
        });

        const list = { 
            title, 
            description, 
            dueDate, 
            priority, 
            notes, 
            checklist: formattedChecklist,
            completed: false
        }
        
        toDosArray.push(list);
    }

    function edit(toDoIndex, property, newValue) {
        const toDosArray = getToDosArray();

        if (toDoIndex > toDosArray.length-1 || 
            toDoIndex < 0 ||
            !Number.isInteger(toDoIndex)) {
                console.log("Invalid value!");
                return;
        }

        let validProperties = [
            "title", "description", "dueDate",
            "priority", "notes"
        ] 

        if (validProperties.includes(property)) {
            toDosArray[toDoIndex][property] = newValue;
        }
    }

    function remove(toDoIndex) {
        const toDosArray = getToDosArray();

        if (toDoIndex > toDosArray.length-1 || 
            toDoIndex < 0 ||
            !Number.isInteger(toDoIndex)) {
                console.log("Invalid value!");
                return;
        }

        toDosArray.splice(toDoIndex, 1);
    }

    function editChecklist(toDoIndex, checklistItemIndex, newItem) {
        const toDosArray = getToDosArray();
        
        if (toDoIndex > toDosArray.length-1 || 
            toDoIndex < 0 ||
            !Number.isInteger(toDoIndex)) {
                console.log("Invalid value!");
                return;
        }

        const currentCompletion = Object.values(toDosArray[toDoIndex]["checklist"][checklistItemIndex])[0];
        const editedChecklistItem = {[newItem] : currentCompletion};
        toDosArray[toDoIndex]["checklist"][checklistItemIndex] = editedChecklistItem;
    }

    function markCompletion(toDoIndex) {
        const toDosArray = getToDosArray();

        if (toDoIndex > toDosArray.length-1 || 
            toDoIndex < 0 ||
            !Number.isInteger(toDoIndex)) {
                console.log("Invalid value!");
                return;
        }

        toDosArray[toDoIndex]["completed"] = !toDosArray[toDoIndex]["completed"];
    }

    return { remove, create, edit, editChecklist, markCompletion };
}

const task = manageToDo();