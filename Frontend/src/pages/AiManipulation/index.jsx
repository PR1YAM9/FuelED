import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import Box from "@mui/material/Box";
import {
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Paper,
  Snackbar,
  Grid,
  Tooltip,
  IconButton,
  Chip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Sample prompt suggestions
const PROMPT_SUGGESTIONS = [
  "Wedding venue with flowers",
  "Birthday party with cake",
  "Business conference room",
  "Anniversary dinner setup",
  "Outdoor music festival",
  "Graduation ceremony",
  "Baby shower decorations",
  "Christmas holiday party",
  "Beach party at sunset",
  "Children's birthday theme"
];

// Base URL for your backend API - update this to match your environment
const API_BASE_URL = "https://fuel-ed-noyz.vercel.app";

export default function AiImageGeneration() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageResult, setImageResult] = useState("");
  const [generationHistory, setGenerationHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    if (!prompt) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/generate-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to generate image.");
      }

      const data = await res.json();
      
      // Handle the image URL - ensure it has the full API_BASE_URL prefix
      // The backend returns /image/filename.png, so we need to prepend the base URL
      const fullImageUrl = data.imageUrl.startsWith('http') 
        ? data.imageUrl 
        : `${API_BASE_URL}${data.imageUrl}`;
        
      setImageResult(fullImageUrl);
      
      console.log("Image generated:", fullImageUrl); // Debug logging
      
      // Add to history
      const newItem = {
        id: Date.now(),
        prompt,
        imageUrl: fullImageUrl,
        timestamp: new Date().toLocaleString(),
      };
      
      setGenerationHistory((prev) => [newItem, ...prev.slice(0, 9)]);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to generate image. Try a different prompt.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => {
    setError("");
  };

  const handleCloseCopySuccess = () => {
    setCopySuccess(false);
  };

  const handleCopyPrompt = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setPrompt(suggestion);
  };

  const toggleFavorite = (item) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === item.id);
    
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  const isCurrentImageFavorite = imageResult && 
    favorites.some((fav) => fav.imageUrl === imageResult);

  return (
    <Box>
      <SideBar />
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={handleCloseCopySuccess}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseCopySuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          Prompt copied to clipboard!
        </Alert>
      </Snackbar>

      <Box
        sx={{
          padding: "0 20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mt: 2,
            mb: 4,
            color: "#E09BAC",
            display: "flex",
            justifyContent: "center",
            fontFamily: "Inconsolata",
          }}
        >
          AI Image Generation
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: "12px",
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: "grey" }}>
                Describe the image you want to generate
              </Typography>
              
              <TextField
                fullWidth
                label="Enter your prompt"
                variant="outlined"
                value={prompt}
                onChange={handlePromptChange}
                multiline
                rows={4}
                placeholder="Example: A 3D rendered image of a futuristic city with flying cars and neon lights"
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                <Typography variant="body2" sx={{ color: 'grey', mr: 1, alignSelf: 'center' }}>
                  Try:
                </Typography>
                {PROMPT_SUGGESTIONS.map((suggestion, index) => (
                  <Chip
                    key={index}
                    label={suggestion.slice(0, 20) + "..."}
                    onClick={() => handleSuggestionClick(suggestion)}
                    sx={{
                      backgroundColor: '#f0e6f5',
                      '&:hover': { backgroundColor: '#e1d1ec' },
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Box>

              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading || !prompt}
                sx={{
                  backgroundColor: "#C3A8E1",
                  fontFamily: "Imprima",
                  fontSize: { md: "18px", xs: "15px" },
                  borderRadius: "30px",
                  padding: "8px 30px",
                  "&:hover": { backgroundColor: "#a58cc4" },
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
                    <span style={{ visibility: "hidden" }}>Generate Image</span>
                  </>
                ) : (
                  "Generate Image"
                )}
              </Button>
            </Paper>

            {imageResult && (
              <Paper 
                elevation={3}
                sx={{ 
                  textAlign: "center", 
                  p: 3,
                  borderRadius: "12px",
                  mb: 3,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ color: "grey" }}>
                    Your Generated Image
                  </Typography>
                  <Box>
                    <Tooltip title="Copy Prompt">
                      <IconButton onClick={() => handleCopyPrompt(prompt)}>
                        <ContentCopyIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={isCurrentImageFavorite ? "Remove from Favorites" : "Add to Favorites"}>
                      <IconButton 
                        onClick={() => toggleFavorite({
                          id: Date.now(),
                          prompt,
                          imageUrl: imageResult,
                          timestamp: new Date().toLocaleString(),
                        })}
                        color={isCurrentImageFavorite ? "error" : "default"}
                      >
                        {isCurrentImageFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                
                {/* Add debug info for development */}
                {process.env.NODE_ENV === 'development' && (
                  <Typography variant="caption" sx={{ display: 'block', mb: 1, color: 'gray' }}>
                    Image URL: {imageResult}
                  </Typography>
                )}
                
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 'auto',
                    minHeight: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={imageResult}
                    alt="AI Generated"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                    onError={(e) => {
                      console.error("Image failed to load:", imageResult);
                      e.target.style.display = 'none';
                      setError("Failed to load the generated image. The image path may be incorrect.");
                    }}
                  />
                </Box>
                
                <Button
                  component="a"
                  href={imageResult}
                  download
                  target="_blank"
                  variant="contained"
                  startIcon={<FileDownloadIcon />}
                  sx={{
                    backgroundColor: "#C3A8E1",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "20px",
                    textDecoration: "none",
                    "&:hover": { backgroundColor: "#a58cc4" },
                  }}
                >
                  Download Image
                </Button>
              </Paper>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: "12px",
                mb: 3,
                maxHeight: '500px',
                overflow: 'auto'
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: "grey" }}>
                Generation History
              </Typography>

              {generationHistory.length === 0 ? (
                <Typography variant="body2" sx={{ color: "gray", textAlign: "center", py: 2 }}>
                  Your generated images will appear here
                </Typography>
              ) : (
                generationHistory.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      mb: 2,
                      pb: 2,
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: 'gray', fontSize: '0.75rem' }}>
                        {item.timestamp}
                      </Typography>
                      <IconButton 
                        size="small"
                        onClick={() => toggleFavorite(item)}
                        color={favorites.some(fav => fav.id === item.id) ? "error" : "default"}
                      >
                        {favorites.some(fav => fav.id === item.id) ? 
                          <FavoriteIcon fontSize="small" /> : 
                          <FavoriteBorderIcon fontSize="small" />
                        }
                      </IconButton>
                    </Box>
                    <img
                      src={item.imageUrl}
                      alt={`Generated from: ${item.prompt}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        marginBottom: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setImageResult(item.imageUrl);
                        setPrompt(item.prompt);
                      }}
                    />
                    <Typography 
                      variant="body2"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.prompt}
                    </Typography>
                  </Box>
                ))
              )}
            </Paper>

            {favorites.length > 0 && (
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: "12px",
                  maxHeight: '500px',
                  overflow: 'auto'
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, color: "grey" }}>
                  Favorites
                </Typography>

                {favorites.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      mb: 2,
                      pb: 2,
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: 'gray', fontSize: '0.75rem' }}>
                        {item.timestamp}
                      </Typography>
                      <IconButton 
                        size="small"
                        onClick={() => toggleFavorite(item)}
                        color="error"
                      >
                        <FavoriteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <img
                      src={item.imageUrl}
                      alt={`Generated from: ${item.prompt}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        marginBottom: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setImageResult(item.imageUrl);
                        setPrompt(item.prompt);
                      }}
                    />
                    <Typography 
                      variant="body2"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.prompt}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}