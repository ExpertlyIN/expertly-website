/* ================================================
   DCVV DEMO LANDING PAGE - INTERACTIVE FUNCTIONALITY
   ================================================ */

   class DCVVDemo {
    constructor() {
        this.sessionActive = false;
        this.sessionTimer = null;
        this.sessionTimeRemaining = 15 * 60; // 15 minutes in seconds
        this.demoEndpoint = null;
        this.lambdaUrl = null;
        
        this.initializeElements();
        this.bindEvents();
        this.updateStatus('ready');
    }

    initializeElements() {
        // Main controls
        this.beginBtn = document.getElementById('begin-demo-btn');
        this.endBtn = document.getElementById('end-demo-btn');
        this.demoSession = document.getElementById('demo-session');
        this.demoStatus = document.getElementById('demo-status');
        
        // Session elements
        this.sessionTimeDisplay = document.getElementById('session-time');
        this.endpointDisplay = document.getElementById('demo-endpoint');
        this.copyBtn = document.getElementById('copy-endpoint');
        
        // API testing
        this.testApiBtn = document.getElementById('test-api-btn');
        this.viewDocsBtn = document.getElementById('view-docs-btn');
        this.demoResponse = document.getElementById('demo-response');
        this.responseOutput = document.getElementById('response-output');
    }

    bindEvents() {
        this.beginBtn.addEventListener('click', () => this.beginDemo());
        this.endBtn.addEventListener('click', () => this.endDemo());
        this.copyBtn.addEventListener('click', () => this.copyEndpoint());
        this.testApiBtn.addEventListener('click', () => this.testAPI());
        this.viewDocsBtn.addEventListener('click', () => this.viewDocs());
        
        // Handle page visibility change for cleanup
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.sessionActive) {
                // Start cleanup timer when tab becomes hidden
                setTimeout(() => {
                    if (document.hidden && this.sessionActive) {
                        this.endDemo();
                    }
                }, 10 * 60 * 1000); // 10 minutes
            }
        });
    }

    async beginDemo() {
        try {
            this.updateStatus('starting');
            this.setLoading(this.beginBtn, true);
            
            // Simulate Lambda container initialization
            await this.initializeLambdaContainer();
            
            // Show session interface
            this.showDemoSession();
            
            // Start session timer
            this.startSessionTimer();
            
            this.sessionActive = true;
            this.updateStatus('active');
            
        } catch (error) {
            console.error('Demo initialization failed:', error);
            this.updateStatus('ready');
            this.showError('Failed to initialize demo. Please try again.');
        } finally {
            this.setLoading(this.beginBtn, false);
        }
    }

    async initializeLambdaContainer() {
        // Simulate API Gateway + Lambda container creation
        const steps = [
            'Creating Lambda container environment...',
            'Configuring API Gateway endpoint...',
            'Initializing DCVV demo service...',
            'Validating security configurations...',
            'Demo environment ready!'
        ];

        for (let i = 0; i < steps.length; i++) {
            this.endpointDisplay.textContent = steps[i];
            await this.delay(800 + Math.random() * 400); // Realistic timing
        }

        // Generate session-specific endpoint
        const sessionId = this.generateSessionId();
        this.lambdaUrl = `https://api.expertly.co.in/dcvv/demo/${sessionId}`;
        this.demoEndpoint = this.lambdaUrl;
        this.endpointDisplay.textContent = this.lambdaUrl;
    }

    showDemoSession() {
        this.demoSession.style.display = 'block';
        this.beginBtn.style.display = 'none';
        this.demoSession.scrollIntoView({ behavior: 'smooth' });
    }

    startSessionTimer() {
        this.sessionTimer = setInterval(() => {
            this.sessionTimeRemaining--;
            this.updateSessionTimer();
            
            if (this.sessionTimeRemaining <= 0) {
                this.endDemo();
            }
        }, 1000);
    }

    updateSessionTimer() {
        const minutes = Math.floor(this.sessionTimeRemaining / 60);
        const seconds = this.sessionTimeRemaining % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        this.sessionTimeDisplay.textContent = timeString;
        
        // Change color based on time remaining
        if (this.sessionTimeRemaining < 300) { // < 5 minutes
            this.sessionTimeDisplay.parentElement.style.background = 
                'linear-gradient(135deg, #ef4444, #dc2626)';
        } else if (this.sessionTimeRemaining < 600) { // < 10 minutes
            this.sessionTimeDisplay.parentElement.style.background = 
                'linear-gradient(135deg, #f59e0b, #d97706)';
        }
    }

    async endDemo() {
        if (!this.sessionActive) return;
        
        try {
            this.updateStatus('ending');
            this.setLoading(this.endBtn, true);
            
            // Simulate cleanup
            await this.cleanupLambdaContainer();
            
            // Reset interface
            this.resetDemoInterface();
            
            this.sessionActive = false;
            this.updateStatus('ready');
            
        } catch (error) {
            console.error('Demo cleanup failed:', error);
        } finally {
            this.setLoading(this.endBtn, false);
        }
    }

    async cleanupLambdaContainer() {
        const steps = [
            'Terminating demo session...',
            'Cleaning up Lambda container...',
            'Releasing resources...',
            'Demo ended successfully'
        ];

        for (let i = 0; i < steps.length; i++) {
            this.endpointDisplay.textContent = steps[i];
            await this.delay(600);
        }
    }

    resetDemoInterface() {
        // Clear timer
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
            this.sessionTimer = null;
        }
        
        // Reset session time
        this.sessionTimeRemaining = 15 * 60;
        this.updateSessionTimer();
        
        // Hide session interface
        this.demoSession.style.display = 'none';
        this.beginBtn.style.display = 'inline-flex';
        
        // Clear response
        this.demoResponse.style.display = 'none';
        
        // Reset timer color
        this.sessionTimeDisplay.parentElement.style.background = 
            'linear-gradient(135deg, #10b981, #059669)';
    }

    async testAPI() {
        if (!this.sessionActive || !this.demoEndpoint) {
            this.showError('No active demo session');
            return;
        }

        try {
            this.setLoading(this.testApiBtn, true);
            
            // Simulate API call to demo endpoint
            const response = await this.simulateAPICall();
            
            // Display response
            this.displayAPIResponse(response);
            
        } catch (error) {
            this.showError('API test failed: ' + error.message);
        } finally {
            this.setLoading(this.testApiBtn, false);
        }
    }

    async simulateAPICall() {
        // Simulate network delay
        await this.delay(800 + Math.random() * 1200);
        
        // Generate realistic demo response
        const response = {
            status: "success",
            message: "🎉 DCVV Demo API Running",
            session_id: this.demoEndpoint.split('/').pop(),
            cvv_data: {
                dynamic_cvv: "***",
                expires_in: 300,
                algorithm: "AES-256-GCM",
                timestamp: new Date().toISOString()
            },
            performance: {
                response_time_ms: Math.floor(Math.random() * 50) + 10,
                cpu_usage: Math.floor(Math.random() * 30) + 5,
                memory_usage: Math.floor(Math.random() * 40) + 20
            },
            security: {
                encryption: "enabled",
                pci_compliant: true,
                audit_logged: true
            }
        };
        
        return response;
    }

    displayAPIResponse(response) {
        this.responseOutput.textContent = JSON.stringify(response, null, 2);
        this.demoResponse.style.display = 'block';
        this.demoResponse.scrollIntoView({ behavior: 'smooth' });
    }

    viewDocs() {
        if (!this.sessionActive) {
            this.showError('Start a demo session to view API documentation');
            return;
        }
        
        // Create and show API documentation
        const docs = {
            endpoint: this.demoEndpoint,
            methods: ["GET", "POST"],
            authentication: "JWT Bearer Token",
            rate_limits: "100 requests/minute",
            examples: {
                generate_cvv: {
                    method: "POST",
                    url: `${this.demoEndpoint}/generate`,
                    headers: {
                        "Authorization": "Bearer demo-jwt-token",
                        "Content-Type": "application/json"
                    },
                    body: {
                        card_id: "demo-card-123",
                        expiry_time: 300
                    }
                },
                health_check: {
                    method: "GET", 
                    url: `${this.demoEndpoint}/health`,
                    headers: {
                        "Authorization": "Bearer demo-jwt-token"
                    }
                }
            }
        };
        
        this.displayAPIResponse(docs);
    }

    copyEndpoint() {
        if (!this.demoEndpoint) {
            this.showError('No active endpoint to copy');
            return;
        }
        
        navigator.clipboard.writeText(this.demoEndpoint).then(() => {
            this.copyBtn.classList.add('copied');
            this.copyBtn.textContent = '✓ Copied';
            
            setTimeout(() => {
                this.copyBtn.classList.remove('copied');
                this.copyBtn.textContent = '📋';
            }, 2000);
        }).catch(err => {
            this.showError('Failed to copy to clipboard');
        });
    }

    updateStatus(status) {
        const statusIndicator = this.demoStatus.querySelector('.status-indicator');
        const statusText = this.demoStatus.querySelector('.status-text');
        
        statusIndicator.className = `status-indicator ${status}`;
        
        switch (status) {
            case 'ready':
                statusText.textContent = 'Demo Environment Ready';
                break;
            case 'starting':
                statusText.textContent = 'Initializing Demo Session...';
                break;
            case 'active':
                statusText.textContent = 'Demo Session Active';
                break;
            case 'ending':
                statusText.textContent = 'Ending Demo Session...';
                break;
        }
    }

    setLoading(button, loading) {
        if (loading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    showError(message) {
        // Create or update error display
        let errorDiv = document.querySelector('.demo-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'demo-error';
            errorDiv.style.cssText = `
                background: rgba(239, 68, 68, 0.1);
                border: 1px solid #ef4444;
                border-radius: 8px;
                padding: 1rem;
                margin: 1rem 0;
                color: #ef4444;
                text-align: center;
            `;
            this.beginBtn.parentElement.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (errorDiv) {
                errorDiv.style.display = 'none';
            }
        }, 5000);
    }

    generateSessionId() {
        return 'demo-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize demo when page loads
document.addEventListener('DOMContentLoaded', () => {
    new DCVVDemo();
});

// Add some visual enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe demo features and architecture items
    document.querySelectorAll('.demo-feature, .arch-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Performance optimization: Preload any heavy resources
window.addEventListener('load', () => {
    // Preload any images or resources that might be needed during demo
    console.log('🚀 DCVV Demo Ready - Expertly Fintech Cybersecurity');
});