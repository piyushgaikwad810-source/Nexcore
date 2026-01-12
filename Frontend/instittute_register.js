// Institute Registration JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Form Steps
    let currentStep = 1;
    const totalSteps = 4;
    const steps = document.querySelectorAll('.form-step');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const stepDots = document.querySelectorAll('.step-dot');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const successModal = document.getElementById('successModal');
    const form = document.getElementById('instituteForm');
    
    // Initialize form
    showStep(currentStep);
    
    // Next Button Click
    nextBtn.addEventListener('click', function() {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
                updateNavigation();
            }
        }
    });
    
    // Previous Button Click
    prevBtn.addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
            updateNavigation();
        }
    });
    
    // Step Dots Click
    stepDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const step = parseInt(this.getAttribute('data-step'));
            if (step <= currentStep) {
                currentStep = step;
                showStep(currentStep);
                updateNavigation();
            }
        });
    });
    
    // Password Toggle
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });
    
    // Form Submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateStep(currentStep)) {
            // Show loading
            loadingOverlay.classList.add('active');
            
            // Simulate API call
            setTimeout(() => {
                loadingOverlay.classList.remove('active');
                
                // Show success modal
                successModal.classList.add('active');
                
                // Store institute data in localStorage
                const formData = new FormData(form);
                const instituteData = {};
                formData.forEach((value, key) => {
                    instituteData[key] = value;
                });
                
                localStorage.setItem('instituteData', JSON.stringify(instituteData));
                localStorage.setItem('instituteRegistered', 'true');
                
            }, 2000);
        }
    });
    
    // Success Modal Buttons
    document.getElementById('goToDashboard').addEventListener('click', function() {
        window.location.href = 'institute-dashboard.html';
    });
    
    document.getElementById('closeModal').addEventListener('click', function() {
        successModal.classList.remove('active');
        window.location.href = 'index.html';
    });
    
    // Close modal on outside click
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
    
    // Helper Functions
    function showStep(step) {
        // Hide all steps
        steps.forEach(s => s.classList.remove('active'));
        
        // Show current step
        document.getElementById(`step${step}`).classList.add('active');
    }
    
    function updateNavigation() {
        // Update step dots
        stepDots.forEach((dot, index) => {
            if (index < currentStep) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Update buttons
        if (currentStep === 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'flex';
            submitBtn.style.display = 'none';
        } else if (currentStep === totalSteps) {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'flex';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
            submitBtn.style.display = 'none';
        }
        
        // Update next button text on last step
        if (currentStep === totalSteps - 1) {
            nextBtn.innerHTML = 'Review & Submit <i class="fas fa-check"></i>';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        }
    }
    
    function validateStep(step) {
        let isValid = true;
        const currentStepElement = document.getElementById(`step${step}`);
        const requiredInputs = currentStepElement.querySelectorAll('[required]');
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                showError(input, 'This field is required');
            } else {
                clearError(input);
                
                // Additional validations
                if (input.type === 'email') {
                    if (!validateEmail(input.value)) {
                        isValid = false;
                        showError(input, 'Please enter a valid email');
                    }
                }
                
                if (input.id === 'password' && input.value.length < 8) {
                    isValid = false;
                    showError(input, 'Password must be at least 8 characters');
                }
                
                if (input.id === 'confirmPassword') {
                    const password = document.getElementById('password').value;
                    if (input.value !== password) {
                        isValid = false;
                        showError(input, 'Passwords do not match');
                    }
                }
                
                if (input.type === 'tel') {
                    if (!validatePhone(input.value)) {
                        isValid = false;
                        showError(input, 'Please enter a valid phone number');
                    }
                }
            }
        });
        
        return isValid;
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorDiv = formGroup.querySelector('.error-message');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            formGroup.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        input.style.borderColor = '#ef4444';
        input.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
    }
    
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message');
        
        if (errorDiv) {
            errorDiv.remove();
        }
        
        input.style.borderColor = '#e5e7eb';
        input.style.boxShadow = 'none';
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^[+]?[0-9]{10,15}$/;
        return re.test(phone.replace(/\s/g, ''));
    }
    
    // Add error message styles
    const style = document.createElement('style');
    style.textContent = `
        .error-message {
            color: #ef4444;
            font-size: 12px;
            margin-top: 5px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .error-message::before {
            content: "⚠";
            font-size: 14px;
        }
    `;
    document.head.appendChild(style);
    
    // Auto-fill for testing
    if (window.location.hash === '#demo') {
        // Fill form with demo data for testing
        document.getElementById('instituteName').value = 'Demo Engineering College';
        document.getElementById('instituteType').value = 'college';
        document.getElementById('establishmentYear').value = '2005';
        document.getElementById('address').value = '123 Education Street, Knowledge City';
        document.getElementById('city').value = 'Mumbai';
        document.getElementById('state').value = 'Maharashtra';
        document.getElementById('pincode').value = '400001';
        document.getElementById('contactPerson').value = 'Dr. Ramesh Sharma';
        document.getElementById('designation').value = 'Principal';
        document.getElementById('department').value = 'Administration';
        document.getElementById('officialEmail').value = 'principal@demoengineering.edu';
        document.getElementById('phone').value = '+919876543210';
        document.getElementById('totalStudents').value = '1500';
        document.getElementById('totalFaculty').value = '85';
        document.getElementById('courses').value = 'B.Tech Computer Science, B.Tech Mechanical, MBA, BBA';
        document.getElementById('adminEmail').value = 'admin@demoengineering.edu';
        document.getElementById('password').value = 'Demo@123';
        document.getElementById('confirmPassword').value = 'Demo@123';
        document.getElementById('terms').checked = true;
    }
});