import { AppBar, Toolbar, Button, Typography, IconButton } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';

export default function Navbar() {
    return (
        <AppBar position="fixed">
            <Toolbar
                sx={{
                    px: { xs: 1, sm: 2, md: 3 }, // Padding adjusts based on screen size
                    minHeight: { xs: 56, sm: 64, md: 72 }, // Navbar height changes responsively
                }}
            >
                <IconButton
                    aria-label="home"
                    color="inherit"
                    href="/"
                    sx={{
                        fontSize: { xs: 20, sm: 24, md: 28 }, // Icon size changes responsively
                    }}
                >
                    <HomeIcon fontSize="inherit" />
                </IconButton>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        flexGrow: 1, 
                        display: 'flex', 
                        justifyContent: 'center',
                        marginLeft: { xs: 0, md: '300px' }, // Adjust margin based on screen size
                        fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }, // Font size changes responsively
                    }}
                >
                    CardCrafter
                </Typography>
                <SignedOut>
                    <Button
                        color="inherit"
                        href="/sign-in"
                        sx={{
                            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }, // Button font size changes
                            px: { xs: 1, sm: 2, md: 3 }, // Button padding changes
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        color="inherit"
                        href="/sign-up"
                        sx={{
                            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                            px: { xs: 1, sm: 2, md: 3 },
                        }}
                    >
                        Sign Up
                    </Button>
                </SignedOut>
                <SignedIn>
                    <Button
                        variant="outlined"
                        color="inherit"
                        href="/flashcards"
                        startIcon={<FolderIcon />}
                        sx={{
                            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                            px: { xs: 1, sm: 2, md: 3 },
                            mr: { xs: '2px', sm: '3px', md: '5px' }, // Margin changes responsively
                        }}
                    >
                        Collection
                    </Button>
                    <Button
                        variant="outlined"
                        color="inherit"
                        href="/generate"
                        startIcon={<AddIcon />}
                        sx={{
                            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                            px: { xs: 1, sm: 2, md: 3 },
                            mr: { xs: '2px', sm: '3px', md: '5px' },
                        }}
                    >
                        Generate
                    </Button>
                    <UserButton 
                        sx={{
                            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                        }}
                    />
                </SignedIn>
            </Toolbar>
        </AppBar>
    );
}
