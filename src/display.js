import { task, project } from "./index.js";

// Helper functions
const select = (target) => document.querySelector(target);
const selectId = (target) => document.getElementById(target);
const selectAll = (target) => document.querySelectorAll(target);

function create(name, parent, id, htmlClass, text) {
    const element = document.createElement(name);

    if (id !== undefined &&
        id !== "") {
        element.id = id;
    }

    if (htmlClass !== undefined &&
        htmlClass !== "") {
        element.classList.add(htmlClass);
    }

    if (text !== undefined) {
        element.textContent = text;
    }

    parent.appendChild(element);
    
    return element;
}
//

const projectDisplay = () => {
    const newProjectBtn = selectId("new-project");
    const projectDialog = selectId("project-dialog");
    const projectForm = selectId("project-form");
    const cancelBtn = select(".cancel-btn");
    const projectTitle = selectId("project-title");
    const projectsContainer = selectId("projects-container");

    function updateProjects() {
        projectsContainer.replaceChildren();
        project.getProjectList().forEach((project, index) => {
            create("div", projectsContainer, "", "project-wrapper");
            const wrapper = select(".project-wrapper");
            wrapper.setAttribute("data-index", index);
            create("p", wrapper, "", "", `${Object.keys(project)[0]}`);
        })
    }

    function handleSubmit() {
        project.create(projectTitle.value);
        updateProjects();
    }

    newProjectBtn.addEventListener("click", () => projectDialog.showModal());
    cancelBtn.addEventListener("click", () => {
        projectDialog.close();
        projectForm.reset();
    });
    projectForm.addEventListener("submit", handleSubmit);

    updateProjects();
}

export { projectDisplay };