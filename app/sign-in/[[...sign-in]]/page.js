import { SignIn } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import Navbar from "@/app/components/navbar";

export default function SignUpPage () {
    return (
        <Container maxWidth="100vw">
            <Navbar/>
            <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{p: 3, 
            mt: 8,}}
            >
                <Typography variant="h4">Sign In</Typography>
                <SignIn/>
            </Box>
        </Container>
    )
}