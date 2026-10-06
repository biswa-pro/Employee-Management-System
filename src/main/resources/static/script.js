const API_URL = '/api/employees';
let employees = [];

async function loadEmployees() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('API request failed');
        employees = await response.json();
       
        renderEmployees();
    } catch (error) {
        document.getElementById('apiStatus').textContent = 'Offline';
        showMessage('Could not connect to the Employee API.', 'error');
        document.getElementById('employeeTableBody').innerHTML =
            '<tr><td colspan="5" class="empty">Unable to load employees.</td></tr>';
    }
}

function renderEmployees() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const filtered = employees.filter(e =>
        String(e.id).includes(query) ||
        e.name.toLowerCase().includes(query) ||
        e.email.toLowerCase().includes(query) ||
        e.department.toLowerCase().includes(query)
    );

    document.getElementById('employeeCount').textContent = employees.length;
    const body = document.getElementById('employeeTableBody');

    if (filtered.length === 0) {
        body.innerHTML = '<tr><td colspan="5" class="empty">No employees found.</td></tr>';
        return;
    }

    body.innerHTML = filtered.map(e => `
        <tr>
            <td>${e.id}</td>
            <td><strong>${escapeHtml(e.name)}</strong></td>
            <td>${escapeHtml(e.email)}</td>
            <td>${escapeHtml(e.department)}</td>
            <td class="actions">
                <button class="edit" onclick="openEditForm(${e.id})">Edit</button>
                <button class="delete" onclick="deleteEmployee(${e.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function openAddForm() {
    document.getElementById('modalTitle').textContent = 'Add Employee';
    document.getElementById('saveButton').textContent = 'Save Employee';
    document.getElementById('employeeForm').reset();
    document.getElementById('employeeId').value = '';
    document.getElementById('employeeModal').classList.remove('hidden');
}

function openEditForm(id) {
    const employee = employees.find(e => e.id === id);
    if (!employee) return;
    document.getElementById('modalTitle').textContent = 'Edit Employee';
    document.getElementById('saveButton').textContent = 'Update Employee';
    document.getElementById('employeeId').value = employee.id;
    document.getElementById('name').value = employee.name;
    document.getElementById('email').value = employee.email;
    document.getElementById('department').value = employee.department;
    document.getElementById('employeeModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('employeeModal').classList.add('hidden');
}

async function saveEmployee(event) {
    event.preventDefault();
    const id = document.getElementById('employeeId').value;
    const employee = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        department: document.getElementById('department').value.trim()
    };

    try {
        const response = await fetch(id ? `${API_URL}/${id}` : API_URL, {
            method: id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee)
        });

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.message || 'Request failed');
        }

        closeModal();
        showMessage(id ? 'Employee updated successfully.' : 'Employee added successfully.', 'success');
        await loadEmployees();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

async function deleteEmployee(id) {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Delete failed');
        showMessage('Employee deleted successfully.', 'success');
        await loadEmployees();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

function showMessage(message, type) {
    const box = document.getElementById('message');
    box.textContent = message;
    box.className = `message ${type}`;
    setTimeout(() => box.classList.add('hidden'), 3000);
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

loadEmployees();
