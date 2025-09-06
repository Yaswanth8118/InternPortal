const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Student API functions
export const studentAPI = {
  getAll: () => apiRequest('/students'),
  
  getById: (id) => apiRequest(`/students/${id}`),
  
  getDashboard: (id) => apiRequest(`/students/${id}/dashboard`),
  
  getStats: () => apiRequest('/students/stats/overview'),
  
  create: (studentData) => apiRequest('/students', {
    method: 'POST',
    body: JSON.stringify(studentData),
  }),
  
  update: (id, studentData) => apiRequest(`/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify(studentData),
  }),
  
  delete: (id) => apiRequest(`/students/${id}`, {
    method: 'DELETE',
  }),
};

// Course API functions
export const courseAPI = {
  getAll: () => apiRequest('/courses'),
  
  getById: (id) => apiRequest(`/courses/${id}`),
  
  getAvailable: (studentId) => apiRequest(`/courses/available/${studentId}`),
  
  getEnrolled: (studentId) => apiRequest(`/courses/enrolled/${studentId}`),
  
  create: (courseData) => apiRequest('/courses', {
    method: 'POST',
    body: JSON.stringify(courseData),
  }),
  
  update: (id, courseData) => apiRequest(`/courses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(courseData),
  }),
  
  delete: (id) => apiRequest(`/courses/${id}`, {
    method: 'DELETE',
  }),
  
  enroll: (studentId, courseId) => apiRequest('/courses/enroll', {
    method: 'POST',
    body: JSON.stringify({ studentId, courseId }),
  }),
  
  updateProgress: (studentId, courseId, progress, status) => 
    apiRequest(`/courses/progress/${studentId}/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify({ progress, status }),
    }),
};

// Internship API functions
export const internshipAPI = {
  getAll: () => apiRequest('/internships'),
  
  getActive: () => apiRequest('/internships/active'),
  
  getById: (id) => apiRequest(`/internships/${id}`),
  
  getStats: () => apiRequest('/internships/stats/overview'),
  
  getApplications: (id) => apiRequest(`/internships/${id}/applications`),
  
  create: (internshipData) => apiRequest('/internships', {
    method: 'POST',
    body: JSON.stringify(internshipData),
  }),
  
  update: (id, internshipData) => apiRequest(`/internships/${id}`, {
    method: 'PUT',
    body: JSON.stringify(internshipData),
  }),
  
  delete: (id) => apiRequest(`/internships/${id}`, {
    method: 'DELETE',
  }),
  
  apply: (id, applicationData) => apiRequest(`/internships/${id}/apply`, {
    method: 'POST',
    body: JSON.stringify(applicationData),
  }),
  
  updateApplicationStatus: (applicationId, statusData) => 
    apiRequest(`/internships/applications/${applicationId}`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    }),
};

// Company API functions
export const companyAPI = {
  getAll: () => apiRequest('/companies'),
  
  getById: (id) => apiRequest(`/companies/${id}`),
  
  getStats: () => apiRequest('/companies/stats/overview'),
  
  getTopPerformers: (limit = 5) => apiRequest(`/companies/top-performers?limit=${limit}`),
  
  getByIndustry: () => apiRequest('/companies/by-industry'),
  
  getBySize: () => apiRequest('/companies/by-size'),
  
  create: (companyData) => apiRequest('/companies', {
    method: 'POST',
    body: JSON.stringify(companyData),
  }),
  
  update: (id, companyData) => apiRequest(`/companies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(companyData),
  }),
  
  delete: (id) => apiRequest(`/companies/${id}`, {
    method: 'DELETE',
  }),
};

// Project API functions
export const projectAPI = {
  getAll: () => apiRequest('/projects'),
  
  getById: (id) => apiRequest(`/projects/${id}`),
  
  getByStudent: (studentId) => apiRequest(`/projects/student/${studentId}`),
  
  create: (projectData) => apiRequest('/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  }),
  
  update: (id, projectData) => apiRequest(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(projectData),
  }),
  
  delete: (id) => apiRequest(`/projects/${id}`, {
    method: 'DELETE',
  }),
};

// Payment API functions
export const paymentAPI = {
  getAll: () => apiRequest('/payments'),
  
  getById: (id) => apiRequest(`/payments/${id}`),
  
  getByStudent: (studentId) => apiRequest(`/payments/student/${studentId}`),
  
  getStats: () => apiRequest('/payments/stats/overview'),
  
  create: (paymentData) => apiRequest('/payments', {
    method: 'POST',
    body: JSON.stringify(paymentData),
  }),
  
  update: (id, paymentData) => apiRequest(`/payments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(paymentData),
  }),
  
  delete: (id) => apiRequest(`/payments/${id}`, {
    method: 'DELETE',
  }),
  
  markPaid: (id, paymentDetails) => apiRequest(`/payments/${id}/mark-paid`, {
    method: 'PUT',
    body: JSON.stringify(paymentDetails),
  }),
};

// Announcement API functions
export const announcementAPI = {
  getAll: (targetAudience) => {
    const params = targetAudience ? `?targetAudience=${targetAudience}` : '';
    return apiRequest(`/announcements${params}`);
  },
  
  getRecent: (targetAudience, limit = 5) => {
    const params = new URLSearchParams();
    if (targetAudience) params.append('targetAudience', targetAudience);
    if (limit) params.append('limit', limit);
    return apiRequest(`/announcements/recent?${params}`);
  },
  
  getById: (id) => apiRequest(`/announcements/${id}`),
  
  create: (announcementData) => apiRequest('/announcements', {
    method: 'POST',
    body: JSON.stringify(announcementData),
  }),
  
  update: (id, announcementData) => apiRequest(`/announcements/${id}`, {
    method: 'PUT',
    body: JSON.stringify(announcementData),
  }),
  
  delete: (id) => apiRequest(`/announcements/${id}`, {
    method: 'DELETE',
  }),
  
  markRead: (id, userId) => apiRequest(`/announcements/${id}/mark-read`, {
    method: 'PUT',
    body: JSON.stringify({ userId }),
  }),
};

// Dashboard API functions
export const dashboardAPI = {
  getStudentDashboard: (studentId) => studentAPI.getDashboard(studentId),
  
  getAdminOverview: async () => {
    const [students, internships, companies, payments] = await Promise.all([
      studentAPI.getStats(),
      internshipAPI.getStats(),
      companyAPI.getStats(),
      paymentAPI.getStats(),
    ]);
    
    return {
      students: students.data,
      internships: internships.data,
      companies: companies.data,
      payments: payments.data,
    };
  },
  
  getAnalyticsData: async () => {
    const [
      studentStats,
      internshipStats,
      companyStats,
      industryData,
      sizeData,
      topCompanies
    ] = await Promise.all([
      studentAPI.getStats(),
      internshipAPI.getStats(),
      companyAPI.getStats(),
      companyAPI.getByIndustry(),
      companyAPI.getBySize(),
      companyAPI.getTopPerformers(5)
    ]);
    
    return {
      students: studentStats.data,
      internships: internshipStats.data,
      companies: companyStats.data,
      industryData: industryData.data,
      sizeData: sizeData.data,
      topCompanies: topCompanies.data,
    };
  },
};
