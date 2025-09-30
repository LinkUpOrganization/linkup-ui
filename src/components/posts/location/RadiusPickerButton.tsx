import { Button, Typography } from "@mui/material";

type RadiusPickerButtonProps = {
  radius: number;
  handleChangeRadius: VoidFunction;
};

export default function RadiusPickerButton({ radius, handleChangeRadius }: RadiusPickerButtonProps) {
  return (
    <Button
      variant="contained"
      onClick={handleChangeRadius}
      sx={{
        position: "absolute",
        top: 10,
        right: 10,
        minWidth: 0,
        width: 50,
        height: 50,
        borderRadius: "50%",
        p: 0,
        zIndex: 1000,
      }}
    >
      <Typography fontSize={10} noWrap>
        {radius ? (radius < 1 ? `${radius * 1000} m` : `${radius} km`) : "R"}
      </Typography>
    </Button>
  );
}
