import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import Box from "@mui/material/Box";
import {
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Grid,
  Paper,
  Snackbar,
} from "@mui/material";
import One from "../../assets/ai/1.jpg";
import Two from "../../assets/ai/2.jpg";
import Three from "../../assets/ai/3.jpg";

export default function AiManipulation() {
  const [selectedImage, setSelectedImage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const images = [
    { id: "1", src: One, label: "Image 1" },
    { id: "2", src: Two, label: "Image 2" },
    { id: "3", src: Three, label: "Image 3" },
  ];

  const handleImageSelect = (id) => {
    setSelectedImage(id);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedImage || !prompt) {
      return;
    }

    setLoading(true);
    setError(false);

    setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 2000);
  };

  const handleCloseError = () => {
    setError(false);
  };

  return (
    <Box>
      <SideBar />
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          OpenAI token limit surpassed. Please try again later or use a
          different prompt.
        </Alert>
      </Snackbar>

      <Box
        sx={{
          padding: "0 20px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mt: 2,
            mb: 2,
            color: "#E09BAC",
            display: "flex",
            justifyContent: "center",
            fontFamily: "Inconsolata",
          }}
        >
          Image Manipulation
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ mt: 2, color: "grey", textAlign: "center" }}
          >
            Select an Image you wish to alter
          </Typography>

          <Grid container spacing={2}>
            {images.map((image) => (
              <Grid item xs={12} sm={4} key={image.id}>
                <Paper
                  elevation={selectedImage === image.id ? 8 : 2}
                  onClick={() => handleImageSelect(image.id)}
                  sx={{
                    cursor: "pointer",
                    p: 1,
                    border:
                      selectedImage === image.id ? "2px solid #C3A8E1" : "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <img
                      src={image.src}
                      alt={image.label}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <TextField
            fullWidth
            label="Enter your prompt"
            variant="outlined"
            value={prompt}
            onChange={handlePromptChange}
            multiline
            rows={3}
            sx={{ mt: 2 }}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || !selectedImage || !prompt}
            sx={{
              backgroundColor: "#C3A8E1",
              fontFamily: "Imprima",
              fontSize: { md: "20px", xs: "15px" },
              borderRadius: "30px",
              padding: "5px 30px",
              "&:hover": { backgroundColor: "#C3A8E1" },
              mb: { md: "30px", xs: "25px" },
              color: "white",
              position: "relative",
            }}
          >
            {loading ? (
              <>
                <CircularProgress
                  size={24}
                  sx={{
                    color: "white",
                    position: "absolute",
                    left: "calc(50% - 12px)",
                  }}
                />
                <span style={{ visibility: "hidden" }}>Generate</span>
              </>
            ) : (
              "Generate"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
