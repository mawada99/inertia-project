import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { Fragment, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import CustomDialog from "./CustomDialog";
import ButtonLoading from "../FunctionComponents/LoadingPages/ButtonLoading";

export default function CustomExportExcel(props) {
  const { enqueueSnackbar } = useSnackbar();
  const {
    filters,
    fields,
    localStorageName,
    openExport,
    setOpenExport,
    ExportMutation,
    mutationName,
  } = props;
  const [fieldsState, setFieldsState] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (!fields[0].id)
      fields.forEach((ele, index) => {
        ele["id"] = index + 1;
        ele["checked"] = true;
      });

    const localStorageExport = localStorage.getItem(localStorageName);
    const parsedExport = localStorageExport
      ? JSON.parse(localStorageExport)
      : null;

    const notCheckedFields = fields.filter((i) => {
      if (!parsedExport?.includes(i.name) && parsedExport !== null) {
        i.checked = false;
        return true;
      }
      return false;
    });

    const checkedFields = fields.filter((i) => {
      if (parsedExport?.includes(i.name)) {
        i.checked = true;
        return true;
      }
      return false;
    });

    const sortedFields = checkedFields.sort((a, b) => {
      return parsedExport?.indexOf(a.name) > parsedExport?.indexOf(b.name)
        ? 1
        : -1;
    });

    setFieldsState(
      localStorageExport ? [...sortedFields, ...notCheckedFields] : fields
    );
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const fieldCount = fieldsState.length;
  const fieldSelected = fieldsState.filter((i) => i.checked).length;
  const onSelectAllClick = (e) => {
    const fileds = [...fieldsState];
    fileds.forEach((i) => {
      if (e.target.checked) {
        i.checked = true;
      } else {
        i.checked = false;
      }
    });
    setFieldsState(fileds);
  };

  const onCloseDialog = () => {
    setOpenExport(false);
  };

  const [mutation, { loading }] = useMutation(
    gql`
      ${ExportMutation.query}
    `,
    {
      onCompleted: (data) => {
        onCloseDialog();
        if (data[mutationName]) {
          enqueueSnackbar(t("successExport"), {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
            TransitionComponent: Collapse,
          });
        } else {
          enqueueSnackbar(t("errorExport"), {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
            TransitionComponent: Collapse,
          });
        }
      },
      onError: (error) => {
      },
    }
  );

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(fieldsState);
    const [reorderedItem] = items.splice(result.source.index, 1);
    const isNotChecked = items[result.destination.index - 1]?.checked;
    if (isNotChecked === false) return;
    items.splice(result.destination.index, 0, reorderedItem);
    setFieldsState(items);
  }

  const handelExport = () => {
    const updatedFields = fieldsState.reduce((previous, current) => {
      if (current.checked) {
        previous.push(current.name);
      }
      return previous;
    }, []);
    localStorage.setItem(localStorageName, JSON.stringify(updatedFields));
    const fields = fieldsState
      .filter((i) => i.checked)
      .map((i) => ({
        label: i.label,
        name: i.name,
      }));
    mutation({
      variables: {
        input: {
          filters,
          fields,
        },
      },
    });
  };

  return (
    <>
      <CustomDialog
        fullWidth
        maxWidth="xs"
        open={openExport}
        onClose={onCloseDialog}
        title={
          <Fragment>
            <Checkbox
              edge="start"
              indeterminate={fieldSelected > 0 && fieldSelected < fieldCount}
              checked={fieldCount > 0 && fieldSelected === fieldCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all desserts" }}
            />
            {t("exportExcel")}
          </Fragment>
        }
        actions={
          <>
            <Button color="primary" onClick={onCloseDialog}>
              {t("cancel")}
            </Button>
            <Button
              color="primary"
              disabled={loading || fieldSelected === 0}
              onClick={handelExport}
            >
              {loading ? <ButtonLoading /> : t("confirm")}
            </Button>
          </>
        }
        content={
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <List
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  component="ul"
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                  }}
                >
                  {fieldsState.map((value, index) => {
                    const labelId = `checkbox-list-label-${value.id}`;
                    return (
                      <Draggable
                        isDragDisabled={!value.checked}
                        key={value.id}
                        draggableId={value.name}
                        index={index}
                      >
                        {(provided) => (
                          <CustomeItemList
                            innerRef={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            itemDetails={value}
                            labelId={labelId}
                            state={fieldsState}
                            setState={setFieldsState}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.label}
                </List>
              )}
            </Droppable>
          </DragDropContext>
        }
      />
    </>
  );
}

const CustomeItemList = (props) => {
  const { itemDetails, labelId, state, setState, innerRef, ...restProps } =
    props;
  const { label, checked } = itemDetails;
  const handleToggle = (e) => {
    const checked = e.target.checked;
    const update = [...state];
    const checkedItemLength = update.filter((i) => i.checked).length;
    const index = update.findIndex((i) => i.name === itemDetails.name);
    const [sortItem] = update.splice(index, 1);

    sortItem["checked"] = checked;
    update.splice(checkedItemLength, 0, sortItem);
    setState(update);
  };
  return (
    <ListItem {...restProps} ref={innerRef} dense button>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={checked}
          tabIndex={-1}
          onChange={handleToggle}
          disableRipple
          inputProps={{ "aria-labelledby": labelId }}
        />
      </ListItemIcon>
      <ListItemText id={labelId} primary={label} />
    </ListItem>
  );
};
