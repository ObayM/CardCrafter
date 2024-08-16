import { SignIn, SignUp } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
export default function SignUpPage () {
    return (
        <Container maxWidth="100vw">
            <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{p: 3, 
            mt: 8,}}
            >
                <Typography variant="h4">Sign Up</Typography>
                <SignUp/>
            </Box>
        </Container>
    )
}