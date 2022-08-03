import React from "react";
import {
  Grid,
  Container,
  Button,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";

export const EditTrade = () => {
  return (
    <Grid container rowSpacing={1}>
      <FormControl>
        <InputLabel htmlFor="my-input">Ticker</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="my-input">Stock price</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="my-input">DTE</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
      </FormControl>

      <Button variant="outlined">Submit</Button>
    </Grid>
  );
};
