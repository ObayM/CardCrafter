'use client'
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import { AppBar, Button, Toolbar, Typography, Container, Box, Grid } from "@mui/material";
import Navbar from "./components/navbar";

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    });

    if (error) {
      console.warn(error.message);
    }
  }

  return (
    <Container maxWidth="lg">
      <Head>
        <title>CardCrafter</title>
        <meta name="description" content="Craft Flashcards With Ease"></meta>
      </Head>

      <Navbar />

      <Box
        sx={{
          textAlign: 'center',
          my: 4,
          py: 8,
          background: 'linear-gradient(to bottom, #f0f4f8, #fff)',
          borderRadius: 2,
        }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Welcome to CardCrafter
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: '#555' }}>
          AI-powered flashcard generation and storage, all for free.
        </Typography>
        <SignedOut>
          <Button variant="contained" color="primary" sx={{ mt: 2, px: 4, py: 1.5, fontSize: '1.2rem' }} href="/sign-up">
            Get Started
          </Button>
        </SignedOut>
        <SignedIn>
          <Button variant="contained" color="primary" sx={{ mt: 2, px: 4, py: 1.5, fontSize: '1.2rem' }} href="/generate">
            Create Flashcards
          </Button>
        </SignedIn>
      </Box>

      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: '2px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                backgroundColor: '#f9f9f9',
              }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#444' }}>
                Effortless Flashcards
              </Typography>
              <Typography sx={{ color: '#666' }}>
                Just type in your content, and watch as flashcards are crafted for you with zero effort.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: '2px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                backgroundColor: '#f9f9f9',
              }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#444' }}>
                Smart & Efficient
              </Typography>
              <Typography sx={{ color: '#666' }}>
                Our AI meticulously transforms your text into precise, study-ready flashcards in seconds.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: '2px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                backgroundColor: '#f9f9f9',
              }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#444' }}>
                Global Accessibility
              </Typography>
              <Typography sx={{ color: '#666' }}>
                Study anytime, anywhere—your flashcards are accessible from any device with an internet connection.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Donations
        </Typography>
        <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: "center" }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '2px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                backgroundColor: '#f9f9f9',
              }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#444' }}>
                THE GOAT
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#888' }}>
                $5 / Month
              </Typography>
              <Typography sx={{ color: '#666' }}>
                $5 monthly donation to support the development of CardCrafter. We appreciate your support!
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2, px: 4, py: 1.5, fontSize: '1.2rem' }} onClick={handleSubmit}>
                Choose THE GOAT
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
