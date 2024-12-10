import React from 'react';
import IconButton from '@mui/material/IconButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';





const PhoneNumberActions = ({ mobile, phone, print }) => {
  const renderPhoneAction = (phoneNumber, key) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
      <Box
        key={key}
        display="flex"
        alignItems="center"
      >
        <span dir="ltr">
          {phoneNumber}
        </span>
        <IconButton
          component="a"
          href={whatsappUrl}
          aria-label="Message on WhatsApp"
          color="success"
          size="small"
          target='_blank'
        >
          <WhatsAppIcon fontSize="small" />
        </IconButton>

      </Box>

    );
  };

  return (
    print ?
      <Stack direction="column">
        <span span dir="ltr" style={{ display: "block" }}>
          {mobile}
        </span>
        <span dir="ltr">
          {phone}
        </span>
      </Stack> :
      <Stack direction="column">
        {mobile && renderPhoneAction(mobile, "1")}
        {phone && renderPhoneAction(phone, "2")}

      </Stack>

  );
};

export default PhoneNumberActions;
