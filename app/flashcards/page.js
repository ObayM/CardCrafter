'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import { Card, CardActionArea, CardContent, Container, Grid, Typography, Box } from "@mui/material";
import Navbar from "../components/navbar";

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return;
            const docRef = doc(collection(db, 'users'), user.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || [];
                setFlashcards(collections);
            } else {
                await setDoc(docRef, { flashcards: [] });
            }
        }
        getFlashcards();
    }, [user]);

    if (!isLoaded || !isSignedIn) {
        return null; // Show nothing while loading or if not signed in
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`);
    };

    return (
        <Container maxWidth="lg" sx={{ p: 3, mt: 8 }}>
            <Navbar />
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Flashcard Collections
                </Typography>
                <Grid container spacing={3}>
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6">
                                            {flashcard.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
