import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

const UpdateMessage = ({ isOpen, onClose, onUpdate, dialogTitle }) => {
  const [message, setMessage] = useState("");

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          padding: "20px",
          borderRadius: "10px",
        },
      }}
    >

      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        {dialogTitle}
      </DialogTitle>

      <DialogContent>
        <TextField
          label="message"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ marginTop: "10px" }}
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", gap: "10px", paddingBottom: "15px" }}>
        <Button onClick={onClose} variant="outlined" color="error">
          Cancel
        </Button>
        <Button onClick={() => onUpdate(message)} variant="contained" color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateMessage;
