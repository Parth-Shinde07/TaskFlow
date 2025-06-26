$(document).ready(function() {
    let teamMembers = [
        {
            id: 1,
            firstName: "John",
            lastName: "Smith",
            email: "john.smith@example.com",
            role: "Developer",
            avatar: "",
            tasksAssigned: 5,
            tasksCompleted: 3
        },
        {
            id: 2,
            firstName: "Sarah",
            lastName: "Johnson",
            email: "sarah.j@example.com",
            role: "Designer",
            avatar: "",
            tasksAssigned: 3,
            tasksCompleted: 2
        },
        {
            id: 3,
            firstName: "Michael",
            lastName: "Brown",
            email: "michael.b@example.com",
            role: "Manager",
            avatar: "",
            tasksAssigned: 8,
            tasksCompleted: 6
        },
        {
            id: 4,
            firstName: "Emily",
            lastName: "Davis",
            email: "emily.d@example.com",
            role: "QA",
            avatar: "",
            tasksAssigned: 4,
            tasksCompleted: 4
        },
        {
            id: 5,
            firstName: "David",
            lastName: "Wilson",
            email: "david.w@example.com",
            role: "Developer",
            avatar: "",
            tasksAssigned: 6,
            tasksCompleted: 2
        }
    ];

    const $teamMembersGrid = $('.team-members-grid');
    const $searchInput = $('.search-box input');
    const $roleFilter = $('#role-filter');
    const $addMemberBtn = $('#add-member');
    const $memberModal = $('#member-modal');
    const $memberForm = $('#member-form');

    let currentMemberId = null;

    renderTeamMembers(teamMembers);

    $addMemberBtn.on('click', function() {
        $('#modal-title').text('Add Team Member');
        $('#member-id').val('');
        $memberForm.trigger('reset');
        $memberModal.addClass('show');
    });

    $('.close, #cancel-member').on('click', function() {
        $memberModal.removeClass('show');
    });

    $memberForm.on('submit', function(e) {
        e.preventDefault();
        saveMember();
    });

    $searchInput.on('input', function() {
        filterMembers();
    });

    $roleFilter.on('change', function() {
        filterMembers();
    });

    function renderTeamMembers(members) {
        $teamMembersGrid.empty();
        
        if (members.length === 0) {
            $teamMembersGrid.html('<p class="no-members">No team members found.</p>');
            return;
        }

        members.forEach(member => {
            const memberCard = createMemberCard(member);
            $teamMembersGrid.append(memberCard);
        });

        $('.edit-member').on('click', function() {
            const memberId = $(this).data('id');
            editMember(memberId);
        });

        $('.delete-member').on('click', function() {
            const memberId = $(this).data('id');
            deleteMember(memberId);
        });
    }

    function createMemberCard(member) {
        const initials = `${member.firstName.charAt(0)}${member.lastName.charAt(0)}`;
        const avatarStyle = member.avatar ? `background-image: url('${member.avatar}')` : '';
        
        return `
            <div class="member-card" data-id="${member.id}">
                <div class="member-header">
                    <div class="member-avatar" style="${avatarStyle}">${initials}</div>
                    <div class="member-info">
                        <h3>${member.firstName} ${member.lastName}</h3>
                        <div class="role">${member.role}</div>
                    </div>
                </div>
                <div class="member-details">
                    <div class="detail-item">
                        <i class="fas fa-envelope"></i>
                        <span>${member.email}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-briefcase"></i>
                        <span>${member.role}</span>
                    </div>
                </div>
                <div class="member-stats">
                    <div class="stat-item">
                        <div class="stat-value">${member.tasksAssigned}</div>
                        <div class="stat-label">Tasks Assigned</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${member.tasksCompleted}</div>
                        <div class="stat-label">Tasks Completed</div>
                    </div>
                </div>
                <div class="member-actions">
                    <button class="edit-member" data-id="${member.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-member" data-id="${member.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    function editMember(memberId) {
        const member = teamMembers.find(m => m.id == memberId);
        if (!member) return;

        currentMemberId = memberId;
        $('#modal-title').text('Edit Team Member');
        $('#member-id').val(member.id);
        $('#member-firstname').val(member.firstName);
        $('#member-lastname').val(member.lastName);
        $('#member-email').val(member.email);
        $('#member-role').val(member.role);
        $('#member-avatar').val(member.avatar);
        $memberModal.addClass('show');
    }

    function deleteMember(memberId) {
        if (confirm('Are you sure you want to delete this team member?')) {
            teamMembers = teamMembers.filter(member => member.id != memberId);
            renderTeamMembers(teamMembers);
        }
    }



    function filterMembers() {
        const searchTerm = $searchInput.val().toLowerCase();
        const roleFilter = $roleFilter.val();

        const filteredMembers = teamMembers.filter(member => {
            const matchesSearch = 
                member.firstName.toLowerCase().includes(searchTerm) ||
                member.lastName.toLowerCase().includes(searchTerm) ||
                member.email.toLowerCase().includes(searchTerm) ||
                member.role.toLowerCase().includes(searchTerm);
            
            const matchesRole = roleFilter ? member.role === roleFilter : true;
            
            return matchesSearch && matchesRole;
        });

        renderTeamMembers(filteredMembers);
    }

    function generateId() {
        return teamMembers.length > 0 ? Math.max(...teamMembers.map(m => m.id)) + 1 : 1;
    }
});