import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Alert,
  AlertTitle,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tab,
  Tabs,
  Paper,
  Divider,
  IconButton
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Settings as SettingsIcon,
  BugReport as BugIcon,
  Assignment as AssignmentIcon,
  Book as BookIcon,
  Refresh as RefreshIcon,
  Link as LinkIcon,
  Star as StarIcon,
  Fork as ForkIcon
} from '@mui/icons-material';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

interface Issue {
  id: number;
  number: number;
  title: string;
  state: string;
  labels: { name: string; color: string }[];
  created_at: string;
  html_url: string;
}

const GitHubIntegration: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [apiToken, setApiToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleAuthenticate = async () => {
    if (!apiToken) {
      setError('Please enter your GitHub Personal Access Token');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Test API token by fetching user info
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${apiToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (response.ok) {
        setIsAuthenticated(true);
        fetchRepositories();
      } else {
        setError('Invalid GitHub token. Please check your Personal Access Token.');
      }
    } catch (err) {
      setError('Failed to authenticate with GitHub. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRepositories = async () => {
    if (!apiToken) return;

    setLoading(true);
    try {
      const response = await fetch('https://api.github.com/user/repos?per_page=10&sort=updated', {
        headers: {
          'Authorization': `token ${apiToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRepositories(data);
      } else {
        setError('Failed to fetch repositories');
      }
    } catch (err) {
      setError('Error fetching repositories');
    } finally {
      setLoading(false);
    }
  };

  const fetchIssues = async (repoName: string) => {
    if (!apiToken || !repoName) return;

    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/repos/${repoName}/issues?per_page=10`, {
        headers: {
          'Authorization': `token ${apiToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setIssues(data);
      } else {
        setError('Failed to fetch issues');
      }
    } catch (err) {
      setError('Error fetching issues');
    } finally {
      setLoading(false);
    }
  };

  const AuthenticationSection = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <SettingsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          GitHub API Authentication
        </Typography>
        
        {!isAuthenticated ? (
          <Box>
            <Alert severity="info" sx={{ mb: 2 }}>
              <AlertTitle>Setup Required</AlertTitle>
              Enter your GitHub Personal Access Token to connect to the API.
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ ml: 1 }}
                onClick={() => window.open('https://github.com/settings/tokens', '_blank')}
              >
                Generate Token
              </Button>
            </Alert>
            
            <TextField
              fullWidth
              type="password"
              label="GitHub Personal Access Token"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              margin="normal"
              helperText="Token needs repo, issues, and wiki permissions"
            />
            
            <Button
              variant="contained"
              onClick={handleAuthenticate}
              disabled={loading || !apiToken}
              sx={{ mt: 2 }}
              startIcon={<GitHubIcon />}
            >
              {loading ? 'Connecting...' : 'Connect to GitHub'}
            </Button>
          </Box>
        ) : (
          <Alert severity="success">
            <AlertTitle>Connected to GitHub</AlertTitle>
            Successfully authenticated with GitHub API.
            <Button 
              variant="outlined" 
              size="small" 
              sx={{ ml: 1 }}
              onClick={() => setIsAuthenticated(false)}
            >
              Disconnect
            </Button>
          </Alert>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </CardContent>
    </Card>
  );

  const RepositoriesTab = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Your Repositories</Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={fetchRepositories}
          disabled={loading || !isAuthenticated}
        >
          Refresh
        </Button>
      </Box>
      
      <Grid container spacing={2}>
        {repositories.map((repo) => (
          <Grid item xs={12} md={6} key={repo.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {repo.name}
                </Typography>
                <Typography color="text.secondary" variant="body2" paragraph>
                  {repo.description || 'No description'}
                </Typography>
                
                <Box display="flex" gap={2} mb={2}>
                  <Chip 
                    icon={<StarIcon />} 
                    label={repo.stargazers_count} 
                    size="small" 
                  />
                  <Chip 
                    icon={<ForkIcon />} 
                    label={repo.forks_count} 
                    size="small" 
                  />
                  <Chip 
                    icon={<BugIcon />} 
                    label={`${repo.open_issues_count} issues`} 
                    size="small" 
                    color={repo.open_issues_count > 0 ? 'warning' : 'default'}
                  />
                </Box>
                
                <Box display="flex" gap={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<LinkIcon />}
                    onClick={() => window.open(repo.html_url, '_blank')}
                  >
                    GitHub
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<BugIcon />}
                    onClick={() => fetchIssues(repo.full_name)}
                  >
                    View Issues
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const IssuesTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom>Issues Dashboard</Typography>
      
      {issues.length === 0 ? (
        <Alert severity="info">
          <AlertTitle>No Issues Loaded</AlertTitle>
          Select a repository from the Repositories tab to view its issues.
        </Alert>
      ) : (
        <List>
          {issues.map((issue) => (
            <ListItem key={issue.id} divider>
              <ListItemIcon>
                <BugIcon color={issue.state === 'open' ? 'error' : 'success'} />
              </ListItemIcon>
              <ListItemText
                primary={`#${issue.number}: ${issue.title}`}
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      State: {issue.state} • Created: {new Date(issue.created_at).toLocaleDateString()}
                    </Typography>
                    <Box display="flex" gap={1} mt={1}>
                      {issue.labels.map((label) => (
                        <Chip
                          key={label.name}
                          label={label.name}
                          size="small"
                          sx={{ 
                            backgroundColor: `#${label.color}`, 
                            color: 'white',
                            fontSize: '0.7rem'
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                }
              />
              <IconButton
                onClick={() => window.open(issue.html_url, '_blank')}
                size="small"
              >
                <LinkIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  const WikiTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom>Wiki Knowledge Base</Typography>
      <Alert severity="info">
        <AlertTitle>Coming Soon</AlertTitle>
        Wiki integration with search and CRUD operations will be implemented next.
        This will include:
        <ul>
          <li>Browse Wiki articles</li>
          <li>Search Wiki content</li>
          <li>Create/Edit Wiki pages</li>
          <li>AI-powered Vector Search integration</li>
        </ul>
      </Alert>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <Paper 
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #24292e 0%, #586069 100%)',
          color: 'white',
          padding: 4,
          marginBottom: 3,
          borderRadius: 2
        }}
      >
        <Typography variant="h3" gutterBottom fontWeight="bold">
          <GitHubIcon sx={{ fontSize: 40, mr: 2, verticalAlign: 'middle' }} />
          GitHub Integration
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Connect to GitHub API • Manage Repositories • Track Issues • Browse Wiki
        </Typography>
      </Paper>

      {/* Authentication Section */}
      <Box mb={3}>
        <AuthenticationSection />
      </Box>

      {/* Main Tabs */}
      {isAuthenticated && (
        <Paper sx={{ borderRadius: 2 }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab icon={<GitHubIcon />} label="Repositories" />
            <Tab icon={<BugIcon />} label="Issues" />
            <Tab icon={<BookIcon />} label="Wiki" />
            <Tab icon={<AssignmentIcon />} label="Templates" />
          </Tabs>
          
          <Box p={3}>
            {currentTab === 0 && <RepositoriesTab />}
            {currentTab === 1 && <IssuesTab />}
            {currentTab === 2 && <WikiTab />}
            {currentTab === 3 && (
              <Alert severity="success">
                <AlertTitle>Templates Active</AlertTitle>
                Your standardized issue templates (Bug Report, Feature Request, Security) are already configured and working!
              </Alert>
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default GitHubIntegration;
