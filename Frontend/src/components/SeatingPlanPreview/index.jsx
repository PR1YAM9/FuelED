import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import table_top from "../../assets/table_top.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  maxWidth: 280,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function SeatingPlanPreview({
  handleClose,
  open,
  numberOfRows,
}) {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [seatingPlan, setSeatingPlan] = React.useState([]);

  React.useEffect(() => {
    if (open) {
      const storedSeatingPlan = localStorage.getItem("seatingPlan");
      if (storedSeatingPlan) {
        setSeatingPlan(JSON.parse(storedSeatingPlan));
      }
    }
  }, [open]);

  const handleImageClick = (rowIndex) => {
    setSelectedRow(rowIndex);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            pl: 7,
            fontFamily: "Inconsolata",
          }}
        >
          Towards the Stage
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 5,
            mt: 2,
            overflow: "auto",
            maxHeight: "400px",
            backgroundColor: "#F7E3E3",
            padding: "10px",
          }}
        >
          {Array.from({ length: numberOfRows }).map((_, index) => (
            <img
              key={index}
              src={table_top}
              alt="Table Top"
              style={{
                width: "100px",
                height: "auto",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </Box>
        {selectedRow !== null && (
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontSize: "15px",
              fontFamily: "Inconsolata",
              fontWeight: "bold",
            }}
          >
            Table No. {selectedRow + 1} <br />
            {seatingPlan[selectedRow]?.guests || "No guests"}
          </Typography>
        )}
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, fontSize: "13px", fontFamily: "Inconsolata" }}
        >
          **Scroll to view the entire seating plan. Click on a table to see the
          guests seated there
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#C3A8E1",
            color: "black",
            fontFamily: "Imprima",
            fontSize: { md: "29px", xs: "15px" },
            borderRadius: "30px",
            padding: "5px 30px",
            "&:hover": { backgroundColor: "#C3A8E1" },
            mt: { md: "30px", xs: "15px" },
            color: "white",
          }}
          onClick={handleClose}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}
