const ASSIGNMENTS_KEY = "classHomeworkAssignments";

function getAssignments() {
  const storedAssignments = localStorage.getItem(ASSIGNMENTS_KEY);
  return storedAssignments ? JSON.parse(storedAssignments) : [];
}

function saveAssignments(assignments) {
  localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));
}

function renderAssignments() {
  const list = document.getElementById("assignmentList");
  if (!list) return;

  const assignments = getAssignments();
  list.innerHTML = "";

  if (assignments.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "No assignments yet.";
    list.appendChild(emptyItem);
    return;
  }

  assignments.forEach((assignment, index) => {
    const item = document.createElement("li");
    const descriptionText = assignment.description ? `<div>${assignment.description}</div>` : "";
    item.innerHTML = `<strong>${assignment.name}</strong> — Due ${assignment.dueDate}${descriptionText}<button class="delete-btn" data-index="${index}" type="button">Delete</button>`;
    list.appendChild(item);
  });
}

function deleteAssignment(index) {
  const assignments = getAssignments();
  assignments.splice(index, 1);
  saveAssignments(assignments);
  renderAssignments();
}

function handleAssignmentSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById("assignmentName");
  const descriptionInput = document.getElementById("assignmentDescription");
  const dueDateInput = document.getElementById("dueDate");

  if (!nameInput || !descriptionInput || !dueDateInput) return;

  const assignmentName = nameInput.value.trim();
  const description = descriptionInput.value.trim();
  const dueDate = dueDateInput.value;

  if (!assignmentName || !dueDate) return;

  const assignments = getAssignments();
  assignments.push({ name: assignmentName, description, dueDate });
  saveAssignments(assignments);

  event.target.reset();
  window.location.href = "classhomeworkboard.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const addbtn = document.getElementById("addbtn");
  if (addbtn) {
    addbtn.addEventListener("click", function () {
      window.location.href = "addassignment.html";
    });
  }

  const assignmentForm = document.getElementById("assignmentForm");
  if (assignmentForm) {
    assignmentForm.addEventListener("submit", handleAssignmentSubmit);
  }

  const assignmentList = document.getElementById("assignmentList");
  if (assignmentList) {
    assignmentList.addEventListener("click", (event) => {
      const deleteButton = event.target.closest(".delete-btn");
      if (!deleteButton) return;

      deleteAssignment(Number(deleteButton.dataset.index));
    });
  }

  renderAssignments();
});
