import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  AlertTitle,
  Stepper,
  Step,
  StepLabel,
  List,
  ListItem,
  Chip,
  CircularProgress,
  Paper,
} from '@mui/material';
import {
  AutoAwesome as AIIcon,
  List as ListIcon,
  GitHub as GitHubIcon,
  Check as CheckIcon,
} from '@mui/icons-material';

// TypeScript interfaces
interface GeneratedIssue {
  title: string;
  body: string;
  labels: string[];
  priority: 'high' | 'medium' | 'low';
}

interface BacklogResult {
  projectName: string;
  issues: GeneratedIssue[];
  estimatedTime: string;
}

const BacklogGenerator: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [projectDescription, setProjectDescription] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backlogResult, setBacklogResult] = useState<BacklogResult | null>(null);
  const [createdIssues, setCreatedIssues] = useState<number[]>([]);

  const steps = ['Describe Project', 'Generate Backlog', 'Create Issues'];

  // Simulate AI-powered backlog generation
  const generateBacklog = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Parse project description and generate issues
      const words = projectDescription.split(' ');
      const isWebApp = projectDescription.toLowerCase().includes('app') || 
                       projectDescription.toLowerCase().includes('web');
      
      const issues: GeneratedIssue[] = [];

      // Core setup issues
      issues.push({
        title: 'Project Setup and Configuration',
        body: `Initialize project structure based on: ${projectDescription}\n\nTasks:\n- Setup development environment\n- Configure build tools\n- Initialize version control\n- Setup CI/CD pipeline`,
        labels: ['setup', 'high-priority'],
        priority: 'high'
      });

      if (isWebApp) {
        issues.push({
          title: 'Design User Interface Components',
          body: `Create UI components for the application\n\nComponents needed:\n- Layout structure\n- Navigation\n- Forms and inputs\n- Responsive design`,
          labels: ['feature', 'frontend', 'UI'],
          priority: 'high'
        });

        issues.push({
          title: 'Implement State Management',
          body: `Setup state management solution\n\nRequirements:\n- Choose state management library\n- Create global state structure\n- Implement state actions/reducers\n- Add dev tools integration`,
          labels: ['feature', 'architecture'],
          priority: 'high'
        });
      }

      // API/Backend issues
      issues.push({
        title: 'Build API Endpoints',
        body: `Create backend API endpoints\n\nEndpoints:\n- Authentication\n- CRUD operations\n- Data validation\n- Error handling`,
        labels: ['feature', 'backend', 'API'],
        priority: 'medium'
      });

      // Database
      issues.push({
        title: 'Setup Database Schema',
        body: `Design and implement database\n\nTasks:\n- Define data models\n- Create migrations\n- Setup relationships\n- Add indexes for performance`,
        labels: ['feature', 'database'],
        priority: 'medium'
      });

      // Testing
      issues.push({
        title: 'Add Unit and Integration Tests',
        body: `Implement comprehensive testing\n\nTest coverage:\n- Unit tests for core logic\n- Integration tests for API\n- End-to-end tests\n- Setup CI test automation`,
        labels: ['testing', 'quality'],
        priority: 'medium'
      });

      // Documentation
      issues.push({
        title: 'Create Documentation',
        body: `Write comprehensive documentation\n\nDocumentation includes:\n- API documentation\n- Setup instructions\n- Architecture overview\n- Contributing guidelines`,
        labels: ['documentation'],
        priority: 'low'
      });

      // Security
      issues.push({
        title: 'Implement Security Measures',
        body: `Add security features\n\nSecurity items:\n- Authentication & Authorization\n- Input validation\n- SQL injection prevention\n- XSS protection\n- Rate limiting`,
        labels: ['security', 'important'],
        priority: 'high'
      });

      const result: BacklogResult = {
        projectName: words.slice(0, 3).join(' ') || 'New Project',
        issues: issues,
        estimatedTime: `${issues.length * 2}-${issues.length * 3} weeks`
      };

      setBacklogResult(result);
      setActiveStep(1);
    } catch (err) {
      setError('Failed to generate backlog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Create GitHub issues
  const createGitHubIssues = async () => {
    if (!githubToken) {
      setError('Please provide your GitHub Personal Access Token');
      return;
    }

    setLoading(true);
    setError(null);
    const issueNumbers: number[] = [];

    try {
      for (const issue of backlogResult!.issues) {
        const response = await fetch(
          'https://api.github.com/repos/wasim-s-creator/foundation-building-frontend/issues',
          {
            method: 'POST',
            headers: {
              'Authorization': `token ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: issue.title,
              body: issue.body,
              labels: issue.labels
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          issueNumbers.push(data.number);
          // Small delay between requests
          await new Promise(resolve => setTimeout(resolve, 500));
        } else {
          throw new Error(`Failed to create issue: ${issue.title}`);
        }
      }

      setCreatedIssues(issueNumbers);
      setActiveStep(2);
    } catch (err) {
      setError('Failed to create GitHub issues. Please check your token and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ maxWidth: 1200, mx: 'auto' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <AIIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Typography variant="h4">AI Backlog Generator</Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Describe your project and let AI generate a comprehensive backlog with issues, priorities, and estimates.
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Step 0: Project Description */}
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Describe Your Project
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Example: Build a todo list web app with React that allows users to create, edit, and delete tasks. Include user authentication and cloud sync."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                type="password"
                label="GitHub Personal Access Token"
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                helperText="Required to create issues in your repository"
                sx={{ mb: 3 }}
              />

              <Button
                variant="contained"
                size="large"
                onClick={generateBacklog}
                disabled={!projectDescription || loading}
                startIcon={loading ? <CircularProgress size={20} /> : <AIIcon />}
                fullWidth
              >
                {loading ? 'Generating Backlog...' : 'Generate Backlog with AI'}
              </Button>
            </Box>
          )}

          {/* Step 1: Review Generated Backlog */}
          {activeStep === 1 && backlogResult && (
            <Box>
              <Alert severity="success" sx={{ mb: 3 }}>
                <AlertTitle>Backlog Generated Successfully!</AlertTitle>
                Created {backlogResult.issues.length} issues for "{backlogResult.projectName}" 
                (Estimated: {backlogResult.estimatedTime})
              </Alert>

              <Typography variant="h6" gutterBottom>
                Generated Issues
              </Typography>

              <List>
                {backlogResult.issues.map((issue, index) => (
                  <Paper key={index} sx={{ mb: 2, p: 2 }}>
                    <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', p: 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1 }}>
                        <ListIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="subtitle1" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                          {issue.title}
                        </Typography>
                        <Chip
                          label={issue.priority}
                          color={getPriorityColor(issue.priority)}
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, whiteSpace: 'pre-line' }}>
                        {issue.body.split('\n').slice(0, 2).join('\n')}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {issue.labels.map((label, labelIndex) => (
                          <Chip
                            key={labelIndex}
                            label={label}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </ListItem>
                  </Paper>
                ))}
              </List>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => setActiveStep(0)}
                  fullWidth
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={createGitHubIssues}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <GitHubIcon />}
                  fullWidth
                >
                  {loading ? 'Creating Issues...' : 'Create Issues on GitHub'}
                </Button>
              </Box>
            </Box>
          )}

          {/* Step 2: Success */}
          {activeStep === 2 && (
            <Box sx={{ textAlign: 'center' }}>
              <CheckIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Issues Created Successfully!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Created {createdIssues.length} issues in your repository.
              </Typography>

              <Alert severity="info" sx={{ mb: 3 }}>
                <AlertTitle>What's Next?</AlertTitle>
                Visit your GitHub repository to see the created issues and start working on your project!
              </Alert>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setActiveStep(0);
                    setBacklogResult(null);
                    setCreatedIssues([]);
                    setProjectDescription('');
                  }}
                  fullWidth
                >
                  Generate Another Backlog
                </Button>
                <Button
                  variant="contained"
                  href="https://github.com/wasim-s-creator/foundation-building-frontend/issues"
                  target="_blank"
                  startIcon={<GitHubIcon />}
                  fullWidth
                >
                  View Issues on GitHub
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BacklogGenerator;
