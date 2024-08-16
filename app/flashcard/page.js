'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useSearchParams } from "next/navigation";
import { Container, Grid, Box, Typography, Card, CardActionArea, CardContent, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from "../components/navbar";

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});
    const [collectionName, setCollectionName] = useState('');

    const searchParams = useSearchParams();
    const search = searchParams.get('id');

    useEffect(() => {
        async function getFlashcards() {
            if (!user || !search) return;

            const userDocRef = doc(collection(db, 'users'), user.id);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) return;

            const colRef = collection(userDocRef, search);
            const querySnapshot = await getDocs(colRef);
            const flashcardsList = [];

            querySnapshot.forEach((doc) => {
                flashcardsList.push({ id: doc.id, ...doc.data() });
            });

            setFlashcards(flashcardsList);
            setCollectionName(search);
        }

        getFlashcards();
    }, [user, search]);

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleDelete = async (id) => {
        if (!user || !search) return;

        const userDocRef = doc(collection(db, 'users'), user.id);
        const flashcardDocRef = doc(userDocRef, search, id);

        try {
            await deleteDoc(flashcardDocRef);
            setFlashcards((prev) => prev.filter((card) => card.id !== id));
        } catch (error) {
            console.error("Error deleting flashcard:", error);
        }
    };

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <Container maxWidth="lg" sx={{ p: 3, mt: 8 }}>
            <Navbar />
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    {collectionName} Flashcards
                </Typography>
                <Grid container spacing={3}>
                    {flashcards.map((flashcard) => (
                        <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
                            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                                <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                                    <CardContent>
                                        <Box
                                            sx={{
                                                perspective: '1000px',
                                                '& > div': {
                                                    transition: 'transform 0.6s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '200px',
                                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                                    transform: flipped[flashcard.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                },
                                                '& > div > .front, & > div > .back': {
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 2,
                                                    boxSizing: 'border-box',
                                                },
                                                '& > div > .back': {
                                                    transform: 'rotateY(180deg)',
                                                },
                                            }}
                                        >
                                            <div>
                                                <div className="front">
                                                    <Typography variant="h5" component="div">
                                                        {flashcard.front}
                                                    </Typography>
                                                </div>
                                                <div className="back">
                                                    <Typography variant="h5" component="div">
                                                        {flashcard.back}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                                <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                    <IconButton onClick={() => handleDelete(flashcard.id)} color="inherit">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
