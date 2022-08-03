import React from "react";
import { FormControl, Input, InputLabel } from "@mui/material";

export const EditTrade = () => {
  return (
    <div>
      <FormControl>
        <InputLabel htmlFor="my-input">Ticker</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="my-input">Stock price</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="my-input">Strategy</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
      </FormControl>
    </div>
  );
};
