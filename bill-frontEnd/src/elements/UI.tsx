import { Box, TextField, Typography } from "@mui/material";
import { useField } from "formik";

import "./UI.scss";
// import { Button } from '@/components/buttons';
// import { LightTooltip } from "@/NewComponents/tooltips";
import {
  ChevronRight,
  ErrorOutline,
  ExpandMore,
  WarningAmber,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import * as _ from "lodash";
import moment from "moment";
import React, {
  Children,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { LightTooltip } from "./LightTooltip";
// import ScrollArea from "react-scrollbar";
import AutoSizer from "react-virtualized-auto-sizer";

// function AutoScroll({
//   children,
//   startPosition,
//   stickyContent,
//   native,
//   height,
//   width,
// }: any) {
//   const scrollbarRef: any = useRef();
//   const fHeight = height;
//   const fWidth = width;
//   const scrollBottom = () =>
//     setImmediate(() => {
//       if (scrollbarRef.current && startPosition === "bottom") {
//         scrollbarRef.current.scrollBottom();
//       }
//     });

//   useEffect(() => {
//     // console.log("Scrollbar changed");
//     if (startPosition === "bottom") scrollBottom();
//   }, [children]);

//   //scroll down on new Message
//   useLayoutEffect(() => {
//     if (stickyContent && stickyContent.length) {
//       setTimeout(() => {
//         if (scrollbarRef && scrollbarRef.current) {
//           scrollbarRef.current.scrollArea.scrollBottom();
//           scrollbarRef.current.scrollArea.refresh();
//         }
//       }, 100);
//     }
//   }, [stickyContent]);

//   return fHeight ? (
//     <div style={{ flex: 1 }}>
//       <ScrollArea style={{ height: fHeight, width: fWidth }} ref={scrollbarRef}>
//         {children}
//       </ScrollArea>
//     </div>
//   ) : (
//     <div style={{ flex: 1 }}>
//       <AutoSizer onResize={scrollBottom}>
//         {({ height, width }: { height: any; width: any }) => {
//           return native ? (
//             <div style={{ height: height, width: width, overflowY: "scroll" }}>
//               {children}
//             </div>
//           ) : (
//             <ScrollArea
//               style={{ height: height, width: width }}
//               ref={scrollbarRef}
//             >
//               {children}
//             </ScrollArea>
//           );
//         }}
//       </AutoSizer>
//     </div>
//   );
// }

// function LabelWithInfo({ tooltip, children }: any) {
//   return (
//     <div className="LabelWithInfo">
//       {children}
//       <InfoButton tooltip={tooltip}></InfoButton>
//     </div>
//   );
// }
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  // Button,
} from "@mui/material";

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
}

const AlertDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
}: AlertDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button onClick={onConfirm} autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function Extend({ extention, children, initOpen }: any) {
  const [extended, setExtended] = useState(initOpen || false);
  return (
    <div className="Extend">
      <div
        className="Default"
        onClick={() => {
          setExtended(!extended);
        }}
      >
        {!extended && (
          <IconButton
            tooltip={"mehr anzeigen"}
            onClick={() => {
              setExtended(true);
            }}
          >
            <ChevronRight></ChevronRight>
          </IconButton>
        )}
        {extended && (
          <IconButton
            tooltip={"weniger anzeigen"}
            onClick={() => {
              setExtended(false);
            }}
          >
            <ExpandMore></ExpandMore>
          </IconButton>
        )}
        {children}
      </div>

      {extended && extention && <div className="Extention">{extention}</div>}
    </div>
  );
}

const CustomTextField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  const showError = meta.touched && meta.error;

  return (
    <Box
      mb={2}
      style={{
        paddingTop: "16px",
        marginTop: "24px",
        paddingBottom: "8px",
      }}
    >
      {/* Label on top */}
      <Typography variant="subtitle1" align="center" component="div">
        {label}
      </Typography>
      {/* Input field below the label */}
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        {...field} // Spread Formik's field props (value, onChange, onBlur)
        {...props} // Spread remaining props
        error={showError}
        helperText={showError ? meta.error : ""}
      />
    </Box>
  );
};

// const CustomTextField = ({ label, name, ...props }: any) => {
//   return (
//     <Box mb={2}>
//       {/* Label on top */}
//       <Typography variant="subtitle1" align="center" component="div">
//         {label}
//       </Typography>
//       {/* Input field below the label */}
//       <TextField
//         fullWidth
//         name={name}
//         variant="outlined"
//         size="small"
//         {...props}
//       />
//     </Box>
//   );
// };
function Button({
  label,
  onClick,
  onContextMenu,
  className,
  children,
  mini,
  crunched,
  style,
  left,
  tooltip,
  disabled,
  translate,
}: any) {
  tooltip = crunched ? label : tooltip !== undefined ? tooltip : "";
  return (
    <LightTooltip tooltip={tooltip}>
      <div
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (!disabled && onClick) onClick();
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!disabled && onContextMenu) onContextMenu();
        }}
        className={`Button ${disabled && "disabled"} ${className} ${
          mini ? "mini" : ""
        } ${left && "left"}`}
        style={style}
      >
        {crunched ? label.charAt(crunched - 1) : label}
        {children}
      </div>
    </LightTooltip>
  );
}

function ButtonList({ children, clip, color }: any) {
  const childrenArray = Children.toArray(children);
  const [show, setShow] = useState(clip ? clip : childrenArray.length);

  return (
    <div className={"ButtonList"}>
      {_.take(childrenArray, show)}
      {show < childrenArray.length && (
        <Button
          mini
          className={color}
          onClick={() => setShow(childrenArray.length)}
        >
          {`${childrenArray.length - show} ${"weitere"}`}
        </Button>
      )}
    </div>
  );
}
function IconButton({
  onClick,
  color,
  children,
  tooltip,
  disableToolTip = false,
  padding,
  rectangular,
  style,
  disabled,
}: any) {
  const iconButtonComponent = (
    <div
      className={`IconButton ${disabled ? "grey" : color} ${
        rectangular ? "rectangular" : "round"
      }`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (disabled) return;
        if (onClick) onClick();
      }}
      style={{ ...style, padding: padding }}
    >
      {children}
    </div>
  );
  if (disableToolTip) return iconButtonComponent;
  return <LightTooltip tooltip={tooltip}>{iconButtonComponent}</LightTooltip>;
}

function Canvas({ children, style, message, color, className }: any) {
  return (
    <div className={"UI_Canvas " + className} style={style}>
      {!!message && <div className={`CanvasMessage ${color}`}>{message}</div>}
      {children}
    </div>
  );
}

// still used else remove
function InputText({ onChange, style, value, label }: any) {
  return (
    <textarea
      className="UI_Input"
      style={style}
      value={value}
      placeholder={label}
      onChange={onChange}
    ></textarea>
  );
}

// still used else remove
function InputField({ onChange, style, value, placeholder }: any) {
  return (
    <input
      className="UI_Input"
      style={style}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
}

function DateComponent({
  children,
  compact,
  dateOnly,
  disableToolTip,
  extended,
}: any) {
  const format = dateOnly
    ? "DD.MM.YYYY"
    : compact
    ? "DD.MM HH:mm"
    : extended
    ? "DD.MM.YYYY HH:mm:ss"
    : "DD.MM.YYYY HH:mm";
  const date = moment(new Date(children)).format(format);
  const tooltip = `${moment(new Date(children)).fromNow()} - ${moment(
    children
  ).format("DD.MM.YYYY HH:mm")}`;
  if (disableToolTip) return <div>{date}</div>;
  return (
    <LightTooltip tooltip={tooltip}>
      <div>{date}</div>
    </LightTooltip>
  );
}
// still used else remove
function Gride({ children, two, four, three, five, six, style }: any) {
  return (
    <div
      style={style}
      className={`Gride ${two ? "two" : ""} ${three ? "three" : ""} ${
        four ? "four" : ""
      } ${five ? "five" : ""} ${six ? "six" : ""}`}
    >
      {children}
    </div>
  );
}
function Fact({
  label,
  date,
  dateabsolute,
  children,
  white,
  grey,
  darkgrey,
  style,
  className,
  onClick,
  smallmargin,
}: any) {
  return (
    <div
      className={`Fact ${className} ${label ? "labeled" : ""} ${
        white ? "white" : grey ? "lgrey" : darkgrey ? "dgrey" : ""
      } ${smallmargin ? "smallmargin" : ""}`}
      style={style}
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
    >
      {label && <div className="Label">{label}</div>}
      {children}
      {date && (
        <div className="Date">
          {dateabsolute
            ? moment(date).format("YYYY.MM.DD HH:mm:ss")
            : moment(date).fromNow()}
        </div>
      )}
    </div>
  );
}

function Spinner({ small, extrasmall }: any) {
  return (
    <div className="Spinner flex">
      {/* <LinearProgress /> */}
      <CircularProgress size={small ? 20 : extrasmall ? 14 : 60} />
      {!(small || extrasmall) && (
        <div className="Message">{"Please Wait..."}</div>
      )}
    </div>
  );
}

function Error({ small, children }: any) {
  return (
    <div className="Error flex">
      {/* <LinearProgress /> */}
      <ErrorOutline style={{ fontSize: small ? 20 : 60 }} />
      <div className="Message">
        {"Error"}: ${children}`
      </div>
    </div>
  );
}

function Warning({ small, children }: any) {
  return (
    <div className="Warning flex">
      {/* <LinearProgress /> */}
      <WarningAmber style={{ fontSize: small ? 20 : 60 }} />
      {!small && <div className="Message">{`${"Hinweis"}: ${children}`}</div>}
    </div>
  );
}

function PermissionWarning({ permission }: any) {
  return (
    <Warning>{"Kein Zugriff:" + " " + permission + " " + "fehlt"}</Warning>
  );
}

const FactLineNotMemorized =
  // FIX an object is not a react component
  ({
    config,
    tooltip,
    onClick,
    titletext,
    onMouseOver,
    onMouseOut,
    style,
  }: any) => {
    return (
      <LightTooltip tooltip={tooltip}>
        <div
          style={style}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          className="FactLine"
          onClick={(e: any) => {
            if (onClick) {
              onClick(e);
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          {!!titletext && (
            <Button style={{ backgroundColor: "grey" }}>{titletext}</Button>
          )}
          {config.map((fact: any, index: any) => {
            const style: any =
              fact.width !== undefined ? { width: fact.width } : { flex: 1 };
            return (
              <div
                key={`fl-${index}`}
                className={`FactLineFact ${fact.color ? "colored" : ""} ${
                  fact.color
                }`}
                style={{ ...style, ...fact.style }}
              >
                {fact.content}
              </div>
            );
          })}
        </div>
      </LightTooltip>
    );
  };

const FactLine = React.memo(FactLineNotMemorized);

function InfoBox({ label, children, white, grey }: any) {
  return (
    <div className={`InfoBox ${white ? "white" : grey ? "lgrey" : ""}`}>
      <div className="Label">{label}</div>
      {children}
    </div>
  );
}

export {
  // AutoScroll,
  AlertDialog,
  Button,
  Extend,
  ButtonList,
  Canvas,
  DateComponent as Date,
  Error,
  Fact,
  FactLine,
  Gride,
  IconButton,
  InfoBox,
  InputField,
  InputText,
  //   PermissionCheck,
  PermissionWarning,
  Spinner,
  Warning,
  CustomTextField,
};
