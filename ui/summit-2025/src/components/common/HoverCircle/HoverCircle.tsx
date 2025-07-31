import { useState } from "react";
import { Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import theme from "../../../common/styles/theme";

const HoverCircle = ({ selected }: { selected: boolean }) => {
  const [hover, setHover] = useState(false);

  return (
    <Box
      component="div"
      sx={{
        position: "relative",
        width: 48,
        height: 48,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!selected ? (
        <>
          <Box
            component="div"
            sx={{
              position: "absolute",
              width: 48,
              height: 48,
              backgroundColor: theme.palette.background.default,
              borderRadius: "50%",
              opacity: hover ? 0.5 : 0,
              transition: "opacity 0.3s",
            }}
          />
          <Box
            component="div"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            sx={{
              position: "absolute",
              zIndex: 1,
              width: "28px",
              height: "28px",
              border: `1px solid ${theme.palette.text.primary}`,
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </>
      ) : (
        <>
          <Box
            component="div"
            sx={{
              position: "absolute",
              width: 48,
              height: 48,
              backgroundColor: theme.palette.background.default,
              borderRadius: "50%",
              opacity: hover ? 0.5 : 0,
              transition: "opacity 0.3s",
            }}
          />

          <Box
            component="div"
            sx={{
              position: "absolute",
              width: 48,
              height: 48,
              backgroundColor: theme.palette.background.default,
              borderRadius: "50%",
              opacity: hover ? 0.5 : 0,
              transition: "opacity 0.3s",
            }}
          />
          <Box
            component="div"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            sx={{
              position: "absolute",
              zIndex: 1,
              width: "28px",
              height: "28px",
              backgroundColor: theme.palette.secondary.main,
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckIcon
              sx={{
                color: theme.palette.primary.main,
                width: 20,
                margin: "3px 4px",
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default HoverCircle;
