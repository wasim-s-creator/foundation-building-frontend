import React, { useState } from 'react';
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
  IconButton,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Commit as CommitIcon,
  CallSplit as BranchIcon,
  MergeType as PullRequestIcon,
  Refresh as RefreshIcon,
  Link as LinkIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

// TypeScript interfaces
interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
  stats?: {
    additions: number;
    deletions: number;
  };
}

interface Branch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
}

interface PullRequest {
  id: number;
  number: number;
  title: string;
  state: string;
  user: {
    login: string;
  };
  created_at: string;
  html_url: string;
  draft: boolean;
}

const VCSIntegration: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [apiToken, setApiToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
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
        fetchCommits();
        fetchBranches();
        fetchPullRequests();
      } else {
        setError('Authentication failed. Please check your token.');
      }
    } catch (err) {
      setError('Failed to authenticate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCommits = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.github.com/repos/wasim-s-creator/foundation-building-frontend/commits', {
        headers: {
          'Authorization': `token ${apiToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCommits(data.slice(0, 20)); // Get last 20 commits
      }
    } catch (err) {
      setError('Failed to fetch commits');
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/wasim-s-creator/foundation-building-frontend/branches', {
        headers: {
          'Authorization': `token ${apiToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBranches(data);
      }
    } catch (err) {
      setError('Failed to fetch branches');
    }
  };

  const fetchPullRequests = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/wasim-s-creator/foundation-building-frontend/pulls?state=all', {
        headers: {
          'Authorization': `token ${apiToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPullRequests(data);
      }
    } catch (err) {
      setError('Failed to fetch pull requests');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case 'open': return 'success';
      case 'closed': return 'error';
      case 'merged': return 'info';
      default: return 'default';
    }
  };

  // Authentication Section
  if (!isAuthenticated) {
    return (
      <Box sx={{ p: 3 }}>
        <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <GitHubIcon sx={{ fontSize: 40, mr: 2 }} />
              <Typography variant="h5">VCS Integration</Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Connect to your GitHub repository to view commit history, manage branches, and track pull requests.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="GitHub Personal Access Token"
              type="password"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              sx={{ mb: 2 }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleAuthenticate}
              disabled={loading}
              startIcon={<GitHubIcon />}
            >
              {loading ? 'Authenticating...' : 'Connect to GitHub'}
            </Button>

            <Alert severity="info" sx={{ mt: 2 }}>
              <AlertTitle>How to get your token?</AlertTitle>
              Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token
            </Alert>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // Main Tabs
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ borderRadius: 2 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<CommitIcon />} label="Commits" />
          <Tab icon={<BranchIcon />} label="Branches" />
          <Tab icon={<PullRequestIcon />} label="Pull Requests" />
        </Tabs>

        <Box p={3}>
          {/* Commits Tab */}
          {currentTab === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Recent Commits</Typography>
                <IconButton onClick={fetchCommits} color="primary">
                  <RefreshIcon />
                </IconButton>
              </Box>

              {loading ? (
                <Alert severity="info">Loading commits...</Alert>
              ) : (
                <List>
                  {commits.map((commit) => (
                    <Card key={commit.sha} sx={{ mb: 2 }}>
                      <ListItem>
                        <ListItemIcon>
                          <CommitIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box>
                              <Typography variant="subtitle1">
                                {commit.commit.message}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 2, mt: 1, alignItems: 'center' }}>
                                <Chip
                                  icon={<PersonIcon />}
                                  label={commit.commit.author.name}
                                  size="small"
                                  variant="outlined"
                                />
                                <Chip
                                  icon={<CalendarIcon />}
                                  label={formatDate(commit.commit.author.date)}
                                  size="small"
                                  variant="outlined"
                                />
                                <Chip
                                  label={commit.sha.substring(0, 7)}
                                  size="small"
                                  color="info"
                                />
                              </Box>
                            </Box>
                          }
                        />
                        <IconButton
                          href={commit.html_url}
                          target="_blank"
                          color="primary"
                        >
                          <LinkIcon />
                        </IconButton>
                      </ListItem>
                    </Card>
                  ))}
                </List>
              )}
            </Box>
          )}

          {/* Branches Tab */}
          {currentTab === 1 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Repository Branches</Typography>
                <IconButton onClick={fetchBranches} color="primary">
                  <RefreshIcon />
                </IconButton>
              </Box>

              <Grid container spacing={2}>
                {branches.map((branch) => (
                  <Grid item xs={12} md={6} key={branch.name}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <BranchIcon sx={{ mr: 1 }} color="primary" />
                            <Typography variant="h6">{branch.name}</Typography>
                          </Box>
                          {branch.protected && (
                            <Chip label="Protected" color="warning" size="small" />
                          )}
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          SHA: {branch.commit.sha.substring(0, 7)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Pull Requests Tab */}
          {currentTab === 2 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Pull Requests</Typography>
                <IconButton onClick={fetchPullRequests} color="primary">
                  <RefreshIcon />
                </IconButton>
              </Box>

              {pullRequests.length === 0 ? (
                <Alert severity="info">No pull requests found</Alert>
              ) : (
                <List>
                  {pullRequests.map((pr) => (
                    <Card key={pr.id} sx={{ mb: 2 }}>
                      <ListItem>
                        <ListItemIcon>
                          <PullRequestIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box>
                              <Typography variant="subtitle1">
                                #{pr.number} - {pr.title}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                <Chip
                                  label={pr.state}
                                  color={getStateColor(pr.state)}
                                  size="small"
                                />
                                {pr.draft && (
                                  <Chip label="Draft" size="small" variant="outlined" />
                                )}
                                <Chip
                                  icon={<PersonIcon />}
                                  label={pr.user.login}
                                  size="small"
                                  variant="outlined"
                                />
                                <Chip
                                  icon={<CalendarIcon />}
                                  label={formatDate(pr.created_at)}
                                  size="small"
                                  variant="outlined"
                                />
                              </Box>
                            </Box>
                          }
                        />
                        <IconButton
                          href={pr.html_url}
                          target="_blank"
                          color="primary"
                        >
                          <LinkIcon />
                        </IconButton>
                      </ListItem>
                    </Card>
                  ))}
                </List>
              )}
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default VCSIntegration;
