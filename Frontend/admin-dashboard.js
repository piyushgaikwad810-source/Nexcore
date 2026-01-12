// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.querySelector('.progress-bar');
    
    // Simulate loading
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += 20;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 300);
            }, 500);
        }
    }, 200);
    
    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        mainContent.classList.toggle('sidebar-collapsed');
    });
    
    // Navigation Menu
    const navItems = document.querySelectorAll('.nav-item');
    const pageTitle = document.getElementById('pageTitle');
    const currentPage = document.getElementById('currentPage');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Update page title
            const pageName = this.getAttribute('data-page');
            const itemText = this.querySelector('span').textContent;
            
            pageTitle.textContent = itemText;
            currentPage.textContent = itemText;
            
            // Close sidebar on mobile
            if (window.innerWidth < 992) {
                sidebar.classList.remove('active');
            }
            
            // Simulate page load
            showLoadingMessage(`Loading ${itemText}...`);
        });
    });
    
    // Notifications
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationPanel = document.getElementById('notificationPanel');
    const closeNotifications = document.getElementById('closeNotifications');
    
    notificationBtn.addEventListener('click', function() {
        notificationPanel.classList.toggle('active');
        loadNotifications();
    });
    
    closeNotifications.addEventListener('click', function() {
        notificationPanel.classList.remove('active');
    });
    
    // Close notifications when clicking outside
    document.addEventListener('click', function(e) {
        if (!notificationBtn.contains(e.target) && 
            !notificationPanel.contains(e.target) && 
            notificationPanel.classList.contains('active')) {
            notificationPanel.classList.remove('active');
        }
    });
    
    // Quick Add Modal
    const quickAddBtn = document.getElementById('quickAddBtn');
    const quickAddModal = document.getElementById('quickAddModal');
    const closeModal = document.getElementById('closeModal');
    
    quickAddBtn.addEventListener('click', function() {
        quickAddModal.classList.add('active');
    });
    
    closeModal.addEventListener('click', function() {
        quickAddModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    quickAddModal.addEventListener('click', function(e) {
        if (e.target === quickAddModal) {
            quickAddModal.classList.remove('active');
        }
    });
    
    // Add option buttons
    const addOptions = document.querySelectorAll('.add-option');
    addOptions.forEach(option => {
        option.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            showToast(`Opening ${action} form...`);
            quickAddModal.classList.remove('active');
        });
    });
    
    // Request buttons
    const approveBtns = document.querySelectorAll('.btn-approve');
    const rejectBtns = document.querySelectorAll('.btn-reject');
    
    approveBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const requestItem = this.closest('.request-item');
            requestItem.style.opacity = '0.5';
            setTimeout(() => {
                requestItem.remove();
                updateRequestCount();
            }, 300);
            showToast('Request approved successfully!', 'success');
        });
    });
    
    rejectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const requestItem = this.closest('.request-item');
            requestItem.style.opacity = '0.5';
            setTimeout(() => {
                requestItem.remove();
                updateRequestCount();
            }, 300);
            showToast('Request rejected.', 'error');
        });
    });
    
    // Quick action buttons
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            showToast(`Opening ${action}...`, 'info');
        });
    });
    
    // Fullscreen toggle
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                showToast(`Searching for "${query}"...`);
                this.value = '';
            }
        }
    });
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            showLoadingMessage('Logging out...');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
    });
    
    // Helper Functions
    function loadNotifications() {
        const notificationList = document.querySelector('.notification-list');
        notificationList.innerHTML = '';
        
        const notifications = [
            { icon: 'fa-user-plus', title: 'New Student', text: 'John Doe registered', time: 'Just now', type: 'success' },
            { icon: 'fa-money-bill-wave', title: 'Payment Received', text: '₹25,000 from Sarah', time: '10 min ago', type: 'success' },
            { icon: 'fa-exclamation-triangle', title: 'System Alert', text: 'Database backup required', time: '1 hour ago', type: 'warning' },
            { icon: 'fa-calendar-check', title: 'Meeting Reminder', text: 'Faculty meeting at 3 PM', time: '2 hours ago', type: 'info' },
            { icon: 'fa-user-shield', title: 'Security Alert', text: 'Multiple failed login attempts', time: '5 hours ago', type: 'danger' }
        ];
        
        notifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.className = `activity-item notification-item ${notification.type}`;
            notificationItem.innerHTML = `
                <div class="activity-icon ${notification.type}">
                    <i class="fas ${notification.icon}"></i>
                </div>
                <div class="activity-content">
                    <h4>${notification.title}</h4>
                    <p>${notification.text}</p>
                    <span class="activity-time">${notification.time}</span>
                </div>
            `;
            notificationList.appendChild(notificationItem);
        });
    }
    
    function updateRequestCount() {
        const requestCount = document.querySelectorAll('.request-item').length;
        const badge = document.querySelector('.nav-item[data-page="fees"] .nav-badge');
        if (badge) {
            badge.textContent = requestCount;
            if (requestCount === 0) {
                badge.style.display = 'none';
            }
        }
    }
    
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
        
        // Add toast styles if not already added
        if (!document.querySelector('#toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
                .toast {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    transform: translateX(120%);
                    transition: transform 0.3s ease;
                    z-index: 1000;
                    max-width: 350px;
                }
                
                .toast.show {
                    transform: translateX(0);
                }
                
                .toast-success {
                    border-left: 4px solid #10b981;
                }
                
                .toast-error {
                    border-left: 4px solid #ef4444;
                }
                
                .toast-info {
                    border-left: 4px solid #2563eb;
                }
                
                .toast i {
                    font-size: 18px;
                }
                
                .toast-success i {
                    color: #10b981;
                }
                
                .toast-error i {
                    color: #ef4444;
                }
                
                .toast-info i {
                    color: #2563eb;
                }
                
                .toast span {
                    font-size: 14px;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function showLoadingMessage(message) {
        const loadingMsg = document.createElement('div');
        loadingMsg.className = 'loading-message';
        loadingMsg.innerHTML = `
            <div class="loading-spinner"></div>
            <span>${message}</span>
        `;
        
        document.body.appendChild(loadingMsg);
        
        setTimeout(() => {
            loadingMsg.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            loadingMsg.classList.remove('show');
            setTimeout(() => {
                loadingMsg.remove();
            }, 300);
        }, 1500);
    }
    
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            }
        }
    }
    
    // Initialize
    loadNotifications();
    updateRequestCount();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + / for search
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            notificationPanel.classList.remove('active');
            quickAddModal.classList.remove('active');
        }
        
        // Ctrl + M for mobile menu
        if (e.ctrlKey && e.key === 'm') {
            e.preventDefault();
            sidebar.classList.toggle('active');
        }
    });
});