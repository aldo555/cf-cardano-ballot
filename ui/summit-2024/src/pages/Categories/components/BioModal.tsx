import React from "react";
import Modal from "../../../components/common/Modal/Modal";
import { Box, useMediaQuery } from "@mui/material";
import XIcon from "../../../assets/x.svg";
import LinkedinIcon from "../../../assets/linkedin.svg";
import ShareIcon from "../../../assets/share.svg";
import theme from "../../../common/styles/theme";
import { CustomButton } from "../../../components/common/CustomButton/CustomButton";
import { copyToClipboard } from "../../../utils/utils";
import { eventBus, EventName } from "../../../utils/EventBus";

interface BioModalProps {
  categoryId: string;
  nominee: any;
  isOpen: boolean;
  title: string | null | undefined;
  onClose: () => void;
}

const BioModal: React.FC<BioModalProps> = ({
  categoryId,
  nominee,
  isOpen,
  title,
  onClose,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const urlToCopy = `${baseUrl}/categories?category=${categoryId}&nominee=${nominee?.id}`;

  const handleCopyToClipBoard = () => {
    copyToClipboard(urlToCopy);
    eventBus.publish(EventName.ShowToast, "Copied to clipboard");
  };

  return (
    <>
      <Modal
        id="connect-wallet-modal"
        isOpen={isOpen}
        name="connect-wallet-modal"
        title={title ? title : ""}
        leftTitle
        onClose={onClose}
        width={isMobile ? "300px" : "450px"}
      >
        <Box
          component="div"
          sx={{ display: "flex", alignItems: "center", my: "24px" }}
        >
          {nominee?.x ? (
            <Box
              component="div"
              sx={{
                mr: "12px",
                padding: "15px",
                border: `1px solid ${theme.palette.text.neutralLightest}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "12px",
                cursor: "pointer",
              }}
              onClick={() => window.open(nominee.x, "_blank")}
            >
              <img src={XIcon} alt="X Icon" />
            </Box>
          ) : null}
          {nominee?.linkedin ? (
            <Box
              component="div"
              sx={{
                mr: "12px",
                padding: "15px",
                border: `1px solid ${theme.palette.text.neutralLightest}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "12px",
                cursor: "pointer",
              }}
              onClick={() => window.open(nominee.linkedin, "_blank")}
            >
              <img src={LinkedinIcon} alt="LinkedIn Icon" />
            </Box>
          ) : null}
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              borderRadius: "12px",
              cursor: "pointer",
            }}
            onClick={() => handleCopyToClipBoard()}
          >
            <img src={ShareIcon} alt="Share Icon" />
          </Box>
        </Box>
        {nominee?.url ? (
          <CustomButton
            colorVariant="secondary"
            sx={{
              width: "100%",
              mt: "12px",
            }}
            onClick={() => window.open(nominee.url, "_blank")}
          >
            Visit Website
          </CustomButton>
        ) : null}
      </Modal>
    </>
  );
};

export { BioModal };
