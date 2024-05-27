import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
export default function RsvpForm() {
  const [willAttendValue, setWillAttendValue] = useState("");
  const [plusOneValue, setPlusOneValue] = useState("");
  const [childrenValue, setChildrenValue] = useState("");
  const handleWillAttendChange = (event) => {
    setWillAttendValue(event.target.value);
  };

  const handlePlusOneChange = (event) => {
    setPlusOneValue(event.target.value);
  };

  const handleChildrenChange = (event) => {
    setChildrenValue(event.target.value);
  };
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          fontFamily: "Inconsolata",
        }}
      >
        RSVP Below
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontFamily: "Imprima",
          fontSize: { md: "22px", xs: "15px" },
          color: "white",
          display: "flex",
          justifyContent: "center",
        }}
      >
        we hope you can join us!
      </Typography>
      <Box
        sx={{
          border: "2px solid white",
          padding: "20px",
          fontFamily: "Imprima",
          margin: { md: "20px 30%", xs: "20px 5%" },
        }}
      >
        <Typography
          sx={{
            fontFamily: "Imprima",
            fontSize: { md: "20px", xs: "15px" },
          }}
        >
          Please enter your full name :
        </Typography>
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          sx={{
            width: "100%",
            marginBottom: "20px",
            "& .MuiOutlinedInput-root": {
              "& input": {
                height: "20px",
                padding: "10px 14px",
              },
            },
          }}
        />

        <Typography
          sx={{
            fontFamily: "Imprima",
            fontSize: { md: "20px", xs: "15px" },
          }}
        >
          Will we see you there ?
        </Typography>
        <RadioGroup
          value={willAttendValue}
          onChange={handleWillAttendChange}
          sx={{ marginBottom: "20px" }}
        >
          <FormControlLabel
            value="yes"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#FEC983",
                  },
                }}
              />
            }
            label="Yes"
          />
          <FormControlLabel
            value="no"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#FEC983",
                  },
                }}
              />
            }
            label="No"
          />
        </RadioGroup>

        <Typography
          sx={{
            fontFamily: "Imprima",
            fontSize: { md: "20px", xs: "15px" },
          }}
        >
          Will you be bringing a plus-one ?
        </Typography>
        <RadioGroup
          value={plusOneValue}
          onChange={handlePlusOneChange}
          sx={{ marginBottom: "20px" }}
        >
          <FormControlLabel
            value="yes"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#FEC983",
                  },
                }}
              />
            }
            label="Yes"
          />
          <FormControlLabel
            value="no"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#FEC983",
                  },
                }}
              />
            }
            label="No"
          />
        </RadioGroup>

        <Typography
          sx={{
            fontFamily: "Imprima",
            fontSize: { md: "20px", xs: "15px" },
          }}
        >
          Will you be bringing children ?
        </Typography>
        <RadioGroup
          value={childrenValue}
          onChange={handleChildrenChange}
          sx={{ marginBottom: "20px" }}
        >
          <FormControlLabel
            value="yes"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#FEC983",
                  },
                }}
              />
            }
            label="Yes"
          />
          <FormControlLabel
            value="no"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#FEC983",
                  },
                }}
              />
            }
            label="No"
          />
        </RadioGroup>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Imprima",
              fontSize: { md: "20px", xs: "12px" },
            }}
          >
            If yes, how many :
          </Typography>
          <TextField
            id="outlined-basic"
            label=""
            variant="outlined"
            sx={{
              width: "100%",
              marginLeft: "10px",
              marginBottom: "20px",
              "& .MuiOutlinedInput-root": {
                "& input": {
                  height: "20px",
                  padding: "10px 14px",
                },
              },
            }}
          />
        </Box>

        <Typography
          sx={{
            fontFamily: "Imprima",
            fontSize: { md: "20px", xs: "15px" },
          }}
        >
          Do you have any dietary restrictions ?
        </Typography>
        <Box
          sx={{
            display: "flex",
            marginTop: "10px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Imprima",
              fontSize: { md: "20px", xs: "12px" },
            }}
          >
            If yes, please specify :
          </Typography>

          <TextField
            id="outlined-basic"
            label=""
            variant="outlined"
            sx={{
              marginLeft: "10px",
              "& .MuiOutlinedInput-root": {
                "& input": {
                  height: "20px",
                  padding: "10px 14px",
                },
              },
            }}
          />
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#C3A8E1",
            color: "black",
            fontFamily: "Imprima",
            fontSize: { md: "25px", xs: "20px" },
            borderRadius: "30px",
            padding: "0px 40px",
            "&:hover": {
              backgroundColor: "#C3A8E1",
            },
            mt: "30px",
            color: "white",
            width: "100%",
          }}
        >
          Submit RSVP
        </Button>
      </Box>
    </Box>
  );
}
