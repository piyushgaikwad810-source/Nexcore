// Student Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.classList.add('active');

    // Simulate loading
    setTimeout(() => {
        loadingOverlay.classList.remove('active');
    }, 1500);

    // DOM Elements
    const menuToggle = document.getElementById('menuToggle');
    const themeToggle = document.getElementById('themeToggle');
    const sidebar = document.querySelector('.sidebar');
    const body = document.body;

    // Sample Data
    const userData = {
        name: "John Doe",
        email: "john.doe@eduhub.com",
        studyTime: "12h 30m",
        rank: "#15",
        enrolledCourses: 5,
        averageScore: "87%",
        studyHours: 42,
        certificates: 3
    };

    const courses = [
        {
            id: 1,
            title: "Advanced Mathematics",
            category: "Mathematics",
            instructor: "Dr. Sarah Johnson",
            progress: 75,
            dueDate: "Tomorrow",
            image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 2,
            title: "Computer Science Fundamentals",
            category: "Computer Science",
            instructor: "Prof. Michael Chen",
            progress: 45,
            dueDate: "In 3 days",
            image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 3,
            title: "Business Management",
            category: "Business",
            instructor: "Dr. Emily Wilson",
            progress: 90,
            dueDate: "Completed",
            image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 4,
            title: "Data Science & Analytics",
            category: "Data Science",
            instructor: "Prof. David Lee",
            progress: 30,
            dueDate: "Next week",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        }
    ];

    const assignments = [
        {
            id: 1,
            title: "Calculus Assignment 3",
            course: "Advanced Mathematics",
            dueDate: "Today, 5:00 PM",
            status: "pending"
        },
        {
            id: 2,
            title: "Programming Project",
            course: "Computer Science Fundamentals",
            dueDate: "Tomorrow, 11:59 PM",
            status: "pending"
        },
        {
            id: 3,
            title: "Business Case Study",
            course: "Business Management",
            dueDate: "Yesterday",
            status: "submitted"
        },
        {
            id: 4,
            title: "Data Analysis Report",
            course: "Data Science & Analytics",
            dueDate: "In 2 days",
            status: "pending"
        }
    ];

    const schedule = [
        {
            time: "09:00 AM",
            duration: "1h 30m",
            title: "Advanced Mathematics",
            description: "Room 302 - Dr. Sarah Johnson",
            status: "completed"
        },
        {
            time: "11:00 AM",
            duration: "2h",
            title: "Computer Science Lab",
            description: "Lab 4 - Prof. Michael Chen",
            status: "live"
        },
        {
            time: "02:00 PM",
            duration: "1h",
            title: "Business Management",
            description: "Online - Dr. Emily Wilson",
            status: "upcoming"
        }
    ];

    const activities = [
        {
            icon: "fas fa-video",
            title: "Watched lecture video",
            description: "Advanced Mathematics - Chapter 5",
            time: "2 hours ago"
        },
        {
            icon: "fas fa-file-upload",
            title: "Submitted assignment",
            description: "Calculus Assignment 2",
            time: "Yesterday"
        },
        {
            icon: "fas fa-comment",
            title: "Posted in forum",
            description: "Data Science discussion",
            time: "2 days ago"
        },
        {
            icon: "fas fa-certificate",
            title: "Earned certificate",
            description: "Business Management Course",
            time: "3 days ago"
        }
    ];

    // Initialize User Data
    function initializeUserData() {
        document.getElementById('userName').textContent = userData.name;
        document.getElementById('userEmail').textContent = userData.email;
        document.getElementById('studyTime').textContent = userData.studyTime;
        document.getElementById('userRank').textContent = userData.rank;
        document.getElementById('welcomeName').textContent = userData.name.split(' ')[0];
        document.getElementById('enrolledCourses').textContent = userData.enrolledCourses;
        document.getElementById('averageScore').textContent = userData.averageScore;
        document.getElementById('studyHours').textContent = userData.studyHours;
        document.getElementById('certificates').textContent = userData.certificates;
    }

    // Initialize Courses
    function initializeCourses() {
        const coursesList = document.getElementById('coursesList');
        coursesList.innerHTML = '';

        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <div class="course-image">
                    <img src="${course.image}" alt="${course.title}">
                </div>
                <div class="course-content">
                    <div class="course-header">
                        <h4>${course.title}</h4>
                        <span class="course-category">${course.category}</span>
                    </div>
                    <div class="course-instructor">
                        <img src="https://ui-avatars.com/api/?name=${course.instructor.split(' ').join('+')}&background=random&color=fff" alt="${course.instructor}">
                        <span>${course.instructor}</span>
                    </div>
                    <div class="course-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${course.progress}%"></div>
                        </div>
                        <div class="progress-text">
                            <span>Progress</span>
                            <span>${course.progress}%</span>
                        </div>
                    </div>
                    <div class="course-actions">
                        <button class="course-btn">Continue</button>
                        <span class="course-due">Due: ${course.dueDate}</span>
                    </div>
                </div>
            `;
            coursesList.appendChild(courseCard);
        });
    }

    // Initialize Assignments
    function initializeAssignments() {
        const assignmentsList = document.getElementById('assignmentsList');
        assignmentsList.innerHTML = '';

        assignments.forEach(assignment => {
            const assignmentItem = document.createElement('div');
            assignmentItem.className = 'assignment-item';
            assignmentItem.innerHTML = `
                <div class="assignment-header">
                    <h4>${assignment.title}</h4>
                    <span class="assignment-due">${assignment.dueDate}</span>
                </div>
                <p class="assignment-course">${assignment.course}</p>
                <div class="assignment-actions">
                    <button class="assignment-btn">${assignment.status === 'pending' ? 'Start' : 'View'}</button>
                    <span class="assignment-status ${assignment.status}">
                        ${assignment.status === 'pending' ? 'Pending' : 'Submitted'}
                    </span>
                </div>
            `;
            assignmentsList.appendChild(assignmentItem);
        });
    }

    // Initialize Schedule
    function initializeSchedule() {
        const scheduleList = document.getElementById('scheduleList');
        scheduleList.innerHTML = '';

        schedule.forEach(item => {
            const scheduleItem = document.createElement('div');
            scheduleItem.className = 'schedule-item';
            scheduleItem.innerHTML = `
                <div class="schedule-time">
                    <div class="time">${item.time}</div>
                    <div class="duration">${item.duration}</div>
                </div>
                <div class="schedule-content">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
                <div class="schedule-status ${item.status}"></div>
            `;
            scheduleList.appendChild(scheduleItem);
        });
    }

    // Initialize Activities
    function initializeActivities() {
        const activityList = document.getElementById('activityList');
        activityList.innerHTML = '';

        activities.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                    <div class="activity-time">${activity.time}</div>
                </div>
            `;
            activityList.appendChild(activityItem);
        });
    }

    // Initialize Progress Chart
    function initializeProgressChart() {
        const ctx = document.getElementById('progressChart').getContext('2d');
        
        // Get theme colors
        const gridColor = body.classList.contains('dark-mode') ? '#334155' : '#e5e7eb';
        const textColor = body.classList.contains('dark-mode') ? '#94a3b8' : '#64748b';
        
        const progressChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Study Hours',
                    data: [3, 5, 4, 6, 7, 5, 4],
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Assignment Score',
                    data: [75, 80, 85, 82, 88, 90, 87],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor,
                            font: {
                                family: "'Poppins', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: body.classList.contains('dark-mode') ? '#1e293b' : 'white',
                        titleColor: textColor,
                        bodyColor: textColor,
                        borderColor: gridColor,
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: gridColor
                        },
                        ticks: {
                            color: textColor,
                            font: {
                                family: "'Poppins', sans-serif"
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: gridColor
                        },
                        ticks: {
                            color: textColor,
                            font: {
                                family: "'Poppins', sans-serif"
                            }
                        }
                    }
                }
            }
        });

        // Update chart on theme change
        themeToggle.addEventListener('click', function() {
            setTimeout(() => {
                progressChart.options.scales.x.grid.color = body.classList.contains('dark-mode') ? '#334155' : '#e5e7eb';
                progressChart.options.scales.y.grid.color = body.classList.contains('dark-mode') ? '#334155' : '#e5e7eb';
                progressChart.options.scales.x.ticks.color = body.classList.contains('dark-mode') ? '#94a3b8' : '#64748b';
                progressChart.options.scales.y.ticks.color = body.classList.contains('dark-mode') ? '#94a3b8' : '#64748b';
                progressChart.update();
            }, 100);
        });
    }

    // Toggle Sidebar
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        menuToggle.innerHTML = sidebar.classList.contains('collapsed') 
            ? '<i class="fas fa-bars"></i>' 
            : '<i class="fas fa-times"></i>';
    });

    // Toggle Theme
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDarkMode 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        themeToggle.classList.toggle('active');
        
        // Save theme preference to localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.classList.add('active');
    }

    // Filter buttons for progress chart
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart based on filter
            // This is a simplified example - you would update the chart data based on the filter
        });
    });

    // Course card click handlers
    document.addEventListener('click', function(e) {
        if (e.target.closest('.course-btn')) {
            const courseCard = e.target.closest('.course-card');
            const courseTitle = courseCard.querySelector('h4').textContent;
            alert(`Starting "${courseTitle}" course...`);
        }
        
        if (e.target.closest('.assignment-btn')) {
            const assignmentItem = e.target.closest('.assignment-item');
            const assignmentTitle = assignmentItem.querySelector('h4').textContent;
            alert(`Opening "${assignmentTitle}" assignment...`);
        }
        
        if (e.target.closest('.btn-primary')) {
            // Continue Learning button
            alert('Redirecting to continue learning...');
        }
        
        if (e.target.closest('.btn-secondary')) {
            // View Schedule button
            alert('Opening full schedule...');
        }
        
        if (e.target.closest('.view-all')) {
            e.preventDefault();
            alert('Showing all items...');
        }
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            alert(`Searching for: ${this.value}`);
            this.value = '';
        }
    });

    // Notification button
    const notificationBtn = document.querySelector('.notification-btn');
    notificationBtn.addEventListener('click', function() {
        alert('You have 4 new notifications');
    });

    // User dropdown toggle on mobile
    const userMenu = document.querySelector('.user-menu');
    userMenu.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = this.closest('.user-dropdown').querySelector('.dropdown-menu');
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-dropdown')) {
            const dropdowns = document.querySelectorAll('.dropdown-menu');
            dropdowns.forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });

    // Initialize all components
    initializeUserData();
    initializeCourses();
    initializeAssignments();
    initializeSchedule();
    initializeActivities();
    initializeProgressChart();

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.menu-toggle');
    mobileMenuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024 && 
            !e.target.closest('.sidebar') && 
            !e.target.closest('.menu-toggle')) {
            sidebar.classList.remove('active');
        }
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Toggle sidebar with Ctrl+B
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            sidebar.classList.toggle('collapsed');
        }
        
        // Toggle theme with Ctrl+T
        if (e.ctrlKey && e.key === 't') {
            e.preventDefault();
            themeToggle.click();
        }
        
        // Focus search with Ctrl+K
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });

    // Add tooltips
    const tooltips = document.querySelectorAll('[title]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('title');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            tooltip.style.background = body.classList.contains('dark-mode') ? '#1e293b' : 'white';
            tooltip.style.color = body.classList.contains('dark-mode') ? '#f8fafc' : '#0f172a';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '5px';
            tooltip.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            tooltip.style.fontSize = '12px';
            tooltip.style.zIndex = '10000';
            tooltip.style.border = '1px solid ' + (body.classList.contains('dark-mode') ? '#334155' : '#e5e7eb');
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });

    // Add welcome notification
    setTimeout(() => {
        if (Notification.permission === 'granted') {
            new Notification('Welcome to EduHub!', {
                body: 'You have 3 pending assignments to complete.',
                icon: 'https://cdn.pixabay.com/photo/2016/11/07/13/04/graduation-1805706_1280.png'
            });
        }
    }, 2000);

    // Request notification permission
    if (Notification.permission === 'default') {
        setTimeout(() => {
            if (confirm('Would you like to receive notifications from EduHub?')) {
                Notification.requestPermission();
            }
        }, 3000);
    }
});

// Add logout functionality
function logout() {
    localStorage.removeItem('userSession');
    window.location.href = 'login.html';
}

// Check if user is logged in (simplified version)
function checkAuth() {
    const userSession = localStorage.getItem('userSession');
    if (!userSession && window.location.pathname.includes('dashboard')) {
        window.location.href = 'login.html';
    }
}

// Initialize auth check
checkAuth();