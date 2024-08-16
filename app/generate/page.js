'use client';

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { writeBatch } from "firebase/firestore";
import { db } from "@/firebase";
import Navbar from "../components/navbar";
import { doc, collection, setDoc, getDoc } from "firebase/firestore";
import { AppBar, Box, Button, Card, CardActionArea, CardContent, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField, Typography } from "@mui/material";

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!text.trim()) return; // Avoid empty submissions
        setLoading(true);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                body: text,
            });
            const data = await res.json();
            setFlashcards(data);
        } catch (error) {
            console.error("Error generating flashcards:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    };

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveFlashcards = async () => {
        if (!name) {
            alert('Please enter a name');
            return;
        }

        const batch = writeBatch(db);
        const userDocRef = doc(collection(db, 'users'), user.id);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || [];
            if (collections.find((f) => f.name === name)) {
                alert('Flashcard Collection with the same name already exists.');
                return;
            } else {
                collections.push({ name });
                batch.set(userDocRef, { flashcards: collections }, { merge: true });
            }
        } else {
            batch.set(userDocRef, { flashcards: [{ name }] });
        }

        const colRef = collection(userDocRef, name);
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef);
            batch.set(cardDocRef, flashcard);
        });

        await batch.commit();
        handleClose();
        router.push('/flashcards');
    };

    return (
        <Container maxWidth="md">
            <Navbar />
            <Box
                sx={{
                    mt: 4,
                    mb: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 3,
                    mt: 8,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Generate Flashcards
                </Typography>
                <Paper sx={{ p: 4, width: '100%', borderRadius: 2, boxShadow: 2 }}>
                    <TextField
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        label="Enter Text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{ mb: 2 }}
                        onKeyPress={handleKeyPress}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        fullWidth
                        disabled={loading}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Generate"}
                    </Button>
                </Paper>
            </Box>
            {flashcards.length > 0 && !loading && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" align="center" borderBottom={2} gutterBottom>
                        Flashcards Preview
                    </Typography>
                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{ boxShadow: 3 }}>
                                    <CardActionArea onClick={() => handleCardClick(index)}>
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
                                                        transform: flipped[index]
                                                            ? 'rotateY(180deg)'
                                                            : 'rotateY(0deg)',
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
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleOpen}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1.2rem',
                            }}
                        >
                            Save Collection
                        </Button>
                    </Box>
                </Box>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save Flashcards</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your flashcards collection.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Collection Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={saveFlashcards} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
