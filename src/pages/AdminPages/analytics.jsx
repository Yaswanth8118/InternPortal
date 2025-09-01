import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    Grid,
    Card,
    CardContent,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { 
    PieChart, 
    Pie, 
    Cell, 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    Line, 
    Legend,
    AreaChart,
    Area,
    ComposedChart,
    ScatterChart,
    Scatter
} from 'recharts';
import InfoCard from '../../components/InfoCard';

// Mock analytics data
const performanceMetricsData = [
    { month: 'Jan', applications: 45, placements: 12, successRate: 26.7, avgSalary: 25000 },
    { month: 'Feb', applications: 52, placements: 15, successRate: 28.8, avgSalary: 26500 },
    { month: 'Mar', applications: 61, placements: 18, successRate: 29.5, avgSalary: 27000 },
    { month: 'Apr', applications: 58, placements: 16, successRate: 27.6, avgSalary: 28000 },
    { month: 'May', applications: 67, placements: 20, successRate: 29.9, avgSalary: 29000 },
    { month: 'Jun', applications: 72, placements: 22, successRate: 30.6, avgSalary: 30000 }
];

const skillDemandTrendsData = [
    { skill: 'React', Q1: 85, Q2: 90, Q3: 95, Q4: 88 },
    { skill: 'Python', Q1: 78, Q2: 82, Q3: 85, Q4: 80 },
    { skill: 'Node.js', Q1: 72, Q2: 75, Q3: 78, Q4: 74 },
    { skill: 'UI/UX', Q1: 68, Q2: 72, Q3: 75, Q4: 70 },
    { skill: 'Data Science', Q1: 60, Q2: 65, Q3: 70, Q4: 68 }
];

const industryGrowthData = [
    { industry: 'Technology', applications: 150, placements: 45, growth: 15 },
    { industry: 'Marketing', applications: 120, placements: 35, growth: 8 },
    { industry: 'Finance', applications: 90, placements: 28, growth: 12 },
    { industry: 'Healthcare', applications: 80, placements: 22, growth: 18 },
    { industry: 'E-commerce', applications: 70, placements: 20, growth: 22 }
];

const studentProgressData = [
    { week: 'Week 1', beginners: 45, intermediate: 25, advanced: 10 },
    { week: 'Week 2', beginners: 42, intermediate: 28, advanced: 12 },
    { week: 'Week 3', beginners: 38, intermediate: 32, advanced: 15 },
    { week: 'Week 4', beginners: 35, intermediate: 35, advanced: 18 },
    { week: 'Week 5', beginners: 32, intermediate: 38, advanced: 22 },
    { week: 'Week 6', beginners: 28, intermediate: 42, advanced: 25 }
];

const regionalDistributionData = [
    { region: 'North India', students: 125, companies: 35, color: '#38BDF8' },
    { region: 'South India', students: 180, companies: 45, color: '#10B981' },
    { region: 'West India', students: 95, companies: 28, color: '#A78BFA' },
    { region: 'East India', students: 65, companies: 18, color: '#F59E0B' },
    { region: 'Central India', students: 45, companies: 12, color: '#EF4444' }
];

const companyRatingsData = [
    { rating: '5 Stars', count: 8, percentage: 32 },
    { rating: '4 Stars', count: 12, percentage: 48 },
    { rating: '3 Stars', count: 4, percentage: 16 },
    { rating: '2 Stars', count: 1, percentage: 4 },
    { rating: '1 Star', count: 0, percentage: 0 }
];

const salaryDistributionData = [
    { range: '10k-20k', count: 15 },
    { range: '20k-30k', count: 45 },
    { range: '30k-40k', count: 35 },
    { range: '40k-50k', count: 18 },
    { range: '50k+', count: 8 }
];

const Analytics = () => {
    const [timeRange, setTimeRange] = useState('6months');
    const [reportType, setReportType] = useState('overview');

    const handleTimeRangeChange = (event) => {
        setTimeRange(event.target.value);
    };

    const handleReportTypeChange = (event) => {
        setReportType(event.target.value);
    };

    const generateReport = () => {
        alert('Report generation feature would be implemented with actual backend integration');
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Analytics & Reports
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Time Range</InputLabel>
                        <Select
                            value={timeRange}
                            onChange={handleTimeRangeChange}
                            label="Time Range"
                        >
                            <MenuItem value="1month">1 Month</MenuItem>
                            <MenuItem value="3months">3 Months</MenuItem>
                            <MenuItem value="6months">6 Months</MenuItem>
                            <MenuItem value="1year">1 Year</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Report Type</InputLabel>
                        <Select
                            value={reportType}
                            onChange={handleReportTypeChange}
                            label="Report Type"
                        >
                            <MenuItem value="overview">Overview</MenuItem>
                            <MenuItem value="students">Students</MenuItem>
                            <MenuItem value="companies">Companies</MenuItem>
                            <MenuItem value="placements">Placements</MenuItem>
                        </Select>
                    </FormControl>
                    <Button 
                        variant="contained" 
                        startIcon={<GetAppIcon />}
                        onClick={generateReport}
                        sx={{ bgcolor: '#10B981', '&:hover': { bgcolor: '#059669' } }}
                    >
                        Export Report
                    </Button>
                </Box>
            </Box>

            {/* Key Performance Indicators */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={3}>
                    <Card sx={{ bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: 3 }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" sx={{ color: '#10B981', fontWeight: 'bold' }}>
                                87%
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                                Success Rate
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#10B981', mt: 1 }}>
                                ↗ +5.2% from last month
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card sx={{ bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: 3 }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" sx={{ color: '#38BDF8', fontWeight: 'bold' }}>
                                4.2
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                                Avg Time to Hire (weeks)
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#10B981', mt: 1 }}>
                                ↗ -0.3 weeks improved
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card sx={{ bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: 3 }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" sx={{ color: '#A78BFA', fontWeight: 'bold' }}>
                                ₹28,500
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                                Avg Stipend
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#10B981', mt: 1 }}>
                                ↗ +8.5% increase
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card sx={{ bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: 3 }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" sx={{ color: '#F59E0B', fontWeight: 'bold' }}>
                                92%
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                                Student Satisfaction
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#10B981', mt: 1 }}>
                                ↗ +2.1% improvement
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Charts Grid */}
            <Grid container spacing={3}>
                {/* Performance Trends - Line Chart */}
                <Grid item xs={12} lg={8}>
                    <InfoCard sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            Performance Trends
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <ComposedChart data={performanceMetricsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="month" stroke="#94A3B8" />
                                <YAxis yAxisId="left" stroke="#94A3B8" />
                                <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1E293B', 
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#E2E8F0'
                                    }} 
                                />
                                <Legend />
                                <Bar yAxisId="left" dataKey="applications" fill="#38BDF8" name="Applications" />
                                <Bar yAxisId="left" dataKey="placements" fill="#10B981" name="Placements" />
                                <Line yAxisId="right" type="monotone" dataKey="successRate" stroke="#A78BFA" strokeWidth={3} name="Success Rate %" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </InfoCard>
                </Grid>

                {/* Regional Distribution - Pie Chart */}
                <Grid item xs={12} lg={4}>
                    <InfoCard sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            Regional Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <PieChart>
                                <Pie
                                    data={regionalDistributionData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ region, percentage }) => `${region.split(' ')[0]} ${percentage}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="students"
                                >
                                    {regionalDistributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1E293B', 
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#E2E8F0'
                                    }} 
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </InfoCard>
                </Grid>

                {/* Skill Demand Trends - Area Chart */}
                <Grid item xs={12} lg={6}>
                    <InfoCard sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            Skill Demand Trends (Quarterly)
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <AreaChart data={skillDemandTrendsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="skill" stroke="#94A3B8" />
                                <YAxis stroke="#94A3B8" />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1E293B', 
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#E2E8F0'
                                    }} 
                                />
                                <Legend />
                                <Area type="monotone" dataKey="Q1" stackId="1" stroke="#38BDF8" fill="#38BDF8" fillOpacity={0.8} />
                                <Area type="monotone" dataKey="Q2" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.8} />
                                <Area type="monotone" dataKey="Q3" stackId="1" stroke="#A78BFA" fill="#A78BFA" fillOpacity={0.8} />
                                <Area type="monotone" dataKey="Q4" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.8} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </InfoCard>
                </Grid>

                {/* Industry Growth - Scatter Plot */}
                <Grid item xs={12} lg={6}>
                    <InfoCard sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            Industry Growth vs Placements
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <ScatterChart data={industryGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="growth" stroke="#94A3B8" name="Growth %" />
                                <YAxis dataKey="placements" stroke="#94A3B8" name="Placements" />
                                <Tooltip 
                                    cursor={{ strokeDasharray: '3 3' }}
                                    contentStyle={{ 
                                        backgroundColor: '#1E293B', 
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#E2E8F0'
                                    }} 
                                />
                                <Scatter dataKey="placements" fill="#38BDF8" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </InfoCard>
                </Grid>

                {/* Student Progress Distribution */}
                <Grid item xs={12} lg={8}>
                    <InfoCard sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            Student Progress Over Time
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <AreaChart data={studentProgressData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="week" stroke="#94A3B8" />
                                <YAxis stroke="#94A3B8" />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1E293B', 
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#E2E8F0'
                                    }} 
                                />
                                <Legend />
                                <Area type="monotone" dataKey="beginners" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                                <Area type="monotone" dataKey="intermediate" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                                <Area type="monotone" dataKey="advanced" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </InfoCard>
                </Grid>

                {/* Company Ratings */}
                <Grid item xs={12} lg={4}>
                    <InfoCard sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            Company Ratings Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart data={companyRatingsData} layout="horizontal">
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis type="number" stroke="#94A3B8" />
                                <YAxis dataKey="rating" type="category" stroke="#94A3B8" width={80} />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1E293B', 
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#E2E8F0'
                                    }} 
                                />
                                <Bar dataKey="count" fill="#F59E0B" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </InfoCard>
                </Grid>

                {/* Salary Distribution */}
                <Grid item xs={12}>
                    <InfoCard sx={{ p: 3, height: 300 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            Salary Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart data={salaryDistributionData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="range" stroke="#94A3B8" />
                                <YAxis stroke="#94A3B8" />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1E293B', 
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#E2E8F0'
                                    }} 
                                />
                                <Bar dataKey="count" fill="#A78BFA" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </InfoCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Analytics;
