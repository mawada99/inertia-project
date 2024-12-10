import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import * as ELG from "esri-leaflet-geocoder";
import { Snackbar } from "@mui/material";

export default function AutocompleteMap(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = React.useState(null);

  const [openSnak, setOpenSnak] = React.useState(false);

  const handleSnak = () => {
    setOpenSnak(true);
  };

  const handleCloseSnak = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnak(false);
  };

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const map = async (e) => {
    if (e.target.value === "") {
      setOptions(value ? [value] : []);

      return undefined;
    }

    await new ELG.Geocode()
      .address(e.target.value)
      .run(function (err, results) {
        if (err) {
          console.log(err);
          handleSnak();
          return;
        }
        const result = Object.keys(results.results).map(
          (key) => results.results[key]
        );
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }
        if (results) {
          newOptions = [...newOptions, ...result];
        }
        setOptions(newOptions);
      });
  };

  return (
    <div
      id="AutocompleteAddress"
      sx={{
        margin: "10px",
        width: "50%",
        display: !props.display ? "none" : null,
      }}
    >
      <Snackbar
        autoHideDuration={6000}
        open={openSnak}
        onClose={handleCloseSnak}
        message="Network error. Please try again later"
      />
      <Autocomplete
        sx={{ width: "100%", backgroundColor: "white" }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={value}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.properties.LongLabel
        }
        filterOptions={(x) => x}
        options={options}
        onChange={(option, value) => {
          setOptions(value ? [value, ...options] : options);
          setValue(value);
          value?.latlng && props.latlng(value?.latlng);
        }}
        renderInput={(params) => (
          <TextField
            onChange={map}
            {...params}
            label="address"
            variant="outlined"
            size="small"
          />
        )}
      />
    </div>
  );
}
