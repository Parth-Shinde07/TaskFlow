$(document).ready(function() {
    // Sample data for projects
    let projects = [
        {
            id: 1,
            title: "Website Redesign",
            description: "Complete redesign of company website with modern UI/UX",
            startDate: "2023-06-01",
            endDate: "2023-07-15",
            status: "In Progress",
            members: ["John", "Sarah", "Mike"],
            progress: 65
        },
        {
            id: 2,
            title: "Mobile App Development",
            description: "Build a cross-platform mobile app for iOS and Android",
            startDate: "2023-05-15",
            endDate: "2023-08-30",
            status: "In Progress",
            members: ["Emma", "David", "Lisa"],
            progress: 30
        },
        {
            id: 3,
            title: "Marketing Campaign",
            description: "Launch new product marketing campaign across all channels",
            startDate: "2023-07-01",
            endDate: "2023-07-31",
            status: "Not Started",
            members: ["Sarah", "Alex", "Tom"],
            progress: 0
        },
        {
            id: 4,
            title: "Database Migration",
            description: "Migrate from legacy database to new cloud solution",
            startDate: "2023-04-10",
            endDate: "2023-05-20",
            status: "Completed",
            members: ["Mike", "David", "Anna"],
            progress: 100
        },
        {
            id: 5,
            title: "Employee Training Program",
            description: "Develop and implement new employee training materials",
            startDate: "2023-06-15",
            endDate: "2023-08-01",
            status: "In Progress",
            members: ["Lisa", "John", "Emma"],
            progress: 45
        }
    ];

    // DOM elements
    const $projectsContainer = $('.projects-container');
    const $listViewBtn = $('#list-view');
    const $gridViewBtn = $('#grid-view');
    const $addProjectBtn = $('#add-project');
    const $projectModal = $('#project-modal');
    const $deleteModal = $('#delete-modal');
    const $projectForm = $('#project-form');
    const $searchInput = $('.search-box input');

    // Current project being edited/deleted
    let currentProjectId = null;

    // Initialize the page
    renderProjects(projects);

    // Event Listeners
    $listViewBtn.on('click', function() {
        $projectsContainer.removeClass('grid-view').addClass('list-view');
        $listViewBtn.addClass('active');
        $gridViewBtn.removeClass('active');
    });

    $gridViewBtn.on('click', function() {
        $projectsContainer.removeClass('list-view').addClass('grid-view');
        $gridViewBtn.addClass('active');
        $listViewBtn.removeClass('active');
    });

    $addProjectBtn.on('click', function() {
        $('#modal-title').text('Add New Project');
        $('#project-id').val('');
        $projectForm.trigger('reset');
        $projectModal.addClass('show');
    });

    $('.close, #cancel-project').on('click', function() {
        $projectModal.removeClass('show');
    });

    $('#cancel-delete').on('click', function() {
        $deleteModal.removeClass('show');
    });

    $projectForm.on('submit', function(e) {
        e.preventDefault();
        saveProject();
    });

    $searchInput.on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        const filteredProjects = projects.filter(project => 
            project.title.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.members.some(member => member.toLowerCase().includes(searchTerm))
        );
        renderProjects(filteredProjects);
    });

    // Functions
    function renderProjects(projectsToRender) {
        $projectsContainer.empty();
        
        if (projectsToRender.length === 0) {
            $projectsContainer.html('<p class="no-projects">No projects found. Try a different search or add a new project.</p>');
            return;
        }

        projectsToRender.forEach(project => {
            const projectCard = createProjectCard(project);
            $projectsContainer.append(projectCard);
        });

        // Add event listeners to edit and delete buttons
        $('.edit-project').on('click', function() {
            const projectId = $(this).data('id');
            editProject(projectId);
        });

        $('.delete-project').on('click', function() {
            const projectId = $(this).data('id');
            confirmDelete(projectId);
        });
    }

    function createProjectCard(project) {
        const statusClass = getStatusClass(project.status);
        const membersHtml = project.members.map(member => 
            `<span class="member">${member}</span>`
        ).join('');

        return `
            <div class="project-card" data-id="${project.id}">
                <h3>${project.title}</h3>
                <div class="project-dates">
                    <span>${formatDate(project.startDate)}</span>
                    <span>${formatDate(project.endDate)}</span>
                </div>
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${project.progress}%"></div>
                    </div>
                    <div class="progress-text">${project.progress}% complete</div>
                </div>
                <div class="project-members">${membersHtml}</div>
                <div class="project-status ${statusClass}">${project.status}</div>
                <div class="project-actions">
                    <button class="edit-project" data-id="${project.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-project" data-id="${project.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    function getStatusClass(status) {
        switch(status) {
            case 'Not Started': return 'status-not-started';
            case 'In Progress': return 'status-in-progress';
            case 'Completed': return 'status-completed';
            default: return '';
        }
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function editProject(projectId) {
        const project = projects.find(p => p.id == projectId);
        if (!project) return;

        currentProjectId = projectId;
        $('#modal-title').text('Edit Project');
        $('#project-id').val(project.id);
        $('#project-title').val(project.title);
        $('#project-description').val(project.description);
        $('#project-start').val(project.startDate);
        $('#project-end').val(project.endDate);
        $('#project-status').val(project.status);
        $('#project-members').val(project.members.join(', '));
        $('#project-progress').val(project.progress);
        $projectModal.addClass('show');
    }

    function confirmDelete(projectId) {
        currentProjectId = projectId;
        $deleteModal.addClass('show');
    }

    $('#confirm-delete').on('click', function() {
        deleteProject(currentProjectId);
        $deleteModal.removeClass('show');
    });

    function deleteProject(projectId) {
        projects = projects.filter(project => project.id != projectId);
        renderProjects(projects);
    }

    function saveProject() {
        const id = $('#project-id').val();
        const title = $('#project-title').val();
        const description = $('#project-description').val();
        const startDate = $('#project-start').val();
        const endDate = $('#project-end').val();
        const status = $('#project-status').val();
        const members = $('#project-members').val().split(',').map(m => m.trim());
        const progress = parseInt($('#project-progress').val());

        const projectData = {
            id: id ? parseInt(id) : generateId(),
            title,
            description,
            startDate,
            endDate,
            status,
            members,
            progress
        };

        if (id) {
            // Update existing project
            const index = projects.findIndex(p => p.id == id);
            if (index !== -1) {
                projects[index] = projectData;
            }
        } else {
            // Add new project
            projects.push(projectData);
        }

        renderProjects(projects);
        $projectModal.removeClass('show');
    }

    function generateId() {
        return projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    }

    $('.project-card').click(function(){
        window.location.href="project_details.html";
    })
});