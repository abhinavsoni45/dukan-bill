// import "./modal.scss";
import { Close, QueuePlayNext, RemoveFromQueue } from "@mui/icons-material";
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import ReactDom from "react-dom";
import useWindowDimensions from "../useWindowDimentions";
import { IconButton } from "../elements/UI";

export const ModalContext = React.createContext<any>({
  openModal: (title: any, component: any, options: any) => {},
  closeModal: (id: any) => {},
  renameModal: (id: any, title: any) => {},
  setModalMultiScreen: (arg: any): any => {},
  toggleScreen: (id: any, state: any): any => {},
  component: null,
  title: "",
});

type State = { components: Array<any>; isModalMultiScreen: boolean };

export const ModalConsumer = ModalContext.Consumer;

let modalCounter = 0;

function modalReducer(state: State, action: any) {
  switch (action.type) {
    case "open":
      modalCounter += 1;
      return {
        ...state,
        components: [
          ...state.components,
          {
            id: modalCounter,
            modal: action.modal,
            title: action.title,
            state: "OPEN",
            options: action.options,
            isSecondScreen: state.isModalMultiScreen,
          },
        ],
      };
    case "close":
      return {
        ...state,
        components: [
          ...state.components.filter((m: any) => m.id !== action.id),
        ],
      };
    case "rename":
      return {
        ...state,
        components: [
          ...state.components.map((m: any) =>
            m.id === action.id ? { ...m, title: action.title } : m
          ),
        ],
      };
    case "setModalMultiScreen":
      return {
        ...state,
        isModalMultiScreen: action.state,
        components: [
          ...state.components.map((m: any) => ({
            ...m,
            isSecondScreen: action.state,
          })),
        ],
      };
    case "toggleScreen":
      return {
        ...state,
        components: [
          ...state.components.map((m: any) =>
            m.id === action.id ? { ...m, isSecondScreen: action.state } : m
          ),
        ],
      };
    default:
      throw new Error();
  }
}

export const ModalProvider = (props: any) => {
  const [ModalComponents, dispatchModalChange] = useReducer(modalReducer, {
    components: [],
    isModalMultiScreen: false,
  });

  const openModal = (title: any, modal: any, options: any) => {
    dispatchModalChange({
      type: "open",
      modal: modal,
      title: title,
      options: options,
    });
  };
  const closeModal = (id: any) => {
    dispatchModalChange({ type: "close", id: id });
  };
  const renameModal = (id: any, title: any) => {
    dispatchModalChange({ type: "rename", id: id, title: title });
  };
  const setModalMultiScreen = (state: boolean) => {
    dispatchModalChange({ type: "setModalMultiScreen", state: state });
  };
  const toggleScreen = (id: any, state: any) => {
    dispatchModalChange({ type: "toggleScreen", id, state });
  };

  return (
    <ModalContext.Provider
      value={{
        openModal: openModal,
        closeModal: closeModal,
        renameModal: renameModal,
        modals: ModalComponents,
        setModalMultiScreen: setModalMultiScreen,
        toggleScreen,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

export function Modal() {
  const { modals } = useModal();
  const modelOnFirstScreen = modals.components.filter(
    (m: any) => !m.isSecondScreen
  );
  return (
    <>
      {modelOnFirstScreen.map((c: any, idx: any) => {
        return (
          <ModalContainer
            component={c.modal}
            id={c.id}
            title={c.title}
            options={c.options}
            key={idx}
            isSecondScreen={c.isSecondScreen}
            currentDocumentObj={document}
          ></ModalContainer>
        );
      })}
    </>
  );
}

export function AllModals({ newWindow }: any) {
  const { modals } = useModal();
  const modelOnSecondScreen = modals.components.filter(
    (m: any) => m.isSecondScreen
  );
  return (
    <>
      {modelOnSecondScreen.map((c: any, idx: any) => {
        return (
          <ModalContainer
            component={c.modal}
            id={c.id}
            title={c.title}
            options={c.options}
            key={idx}
            isSecondScreen={c.isSecondScreen}
            currentDocumentObj={newWindow.document}
          ></ModalContainer>
        );
      })}
    </>
  );
}

const inlineBlock = "inline-block";

function ModalContainer({
  component,
  id,
  title,
  options,
  isSecondScreen,
  currentDocumentObj,
}: any) {
  const { closeModal, modals, toggleScreen } = useModal();
  const modalBoxRef = useRef<HTMLDivElement | null>(null);
  // const { t } = useTranslation();
  const handleCloseModal = () => {
    closeModal(id);
    if (options?.closedMethod) {
      options.closedMethod(id);
    }
  };

  const handleToggleScreen = (state: boolean) => {
    toggleScreen(id, state);
  };
  const [dragPos, setDragPos] = useState([
    modals.components.length * 20,
    modals.components.length * 20,
  ]);
  const [dragSize, setDragSize] = useState([0, 0]); //offset to modal size
  const [mouseOffset, setMouseOffset] = useState<Array<any>>([-1, -1, null]); // X, Y, Mode(Pos or Size)
  const dimension = useWindowDimensions();
  const handleMouseMove = (event: any) => {
    if (mouseOffset[2] === "pos") {
      setDragPos([
        event.clientX - mouseOffset[0] + dragPos[0],
        event.clientY - mouseOffset[1] + dragPos[1],
      ]);
    } else {
      console.log(event.clientX);
      setDragSize([
        event.clientX - mouseOffset[0],
        event.clientY - mouseOffset[1],
      ]);
    }
  };
  // console.log(dragPos);
  const handleMouseUp = () => {
    setMouseOffset([-1, -1, null]);
    currentDocumentObj.removeEventListener("mouseup", handleMouseUp);
    currentDocumentObj.removeEventListener("mousemove", handleMouseMove);
  };

  const handleMouseDownHeader = (event: any) => {
    setMouseOffset([event.clientX, event.clientY, "pos"]);
  };
  const handleMouseDownResize = (event: any) => {
    console.log("size");
    setMouseOffset([
      event.clientX - dragSize[0],
      event.clientY - dragSize[1],
      "size",
    ]);
  };
  useEffect(() => {
    if (mouseOffset[0] !== -1) {
      console.log("addlistener");
      currentDocumentObj.addEventListener("mousemove", handleMouseMove);
      currentDocumentObj.addEventListener("mouseup", handleMouseUp);
    }
  }, [mouseOffset]);

  const isCustomsized = options?.width || options?.height;

  // Conditionally assign the ref based on component type
  const modalBoxRefProp =
    component.type.name === "CallbackConfirmationModal"
      ? { ref: modalBoxRef }
      : {};
  const handleClickOutsideModal = ({ target }: MouseEvent) => {
    if (
      modalBoxRef &&
      modalBoxRef.current &&
      !modalBoxRef.current.contains(target as Node)
    ) {
      closeModal(id);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutsideModal, {
      capture: true,
    });
    return () => {
      document.removeEventListener("click", handleClickOutsideModal, {
        capture: true,
      });
    };
  }, [handleClickOutsideModal]);

  const calculateModalStyles = () => {
    const modalTop = Math.max(
      0,
      (dimension.height - (options?.height || 720)) / 2 + dragPos[1]
    );
    const modalLeft = Math.max(
      0,
      (dimension.width - (options?.width || 1400)) / 2 + dragPos[0]
    );

    let modalWidth = options?.width || 1400;
    let modalHeight = options?.height || 720;
    modalWidth += dragSize[0];
    modalHeight += dragSize[1];

    const maxWidth = dimension.width - dimension.width * 0.15;
    const maxHeight = dimension.height - dimension.height * 0.15;
    modalWidth = Math.min(modalWidth, maxWidth);
    modalHeight = Math.min(modalHeight, maxHeight);

    return {
      top: modalTop,
      left: modalLeft,
      width: modalWidth,
      height: modalHeight,
    };
  };

  const modalStyles = calculateModalStyles();

  return (
    <div
      className={`modal-box ${options?.grey && "modal-grey"} ${
        isCustomsized === undefined && options?.size
      }`}
      style={{
        top: modalStyles.top,
        left: modalStyles.left,
        width: modalStyles.width,
        height: modalStyles.height,
        maxWidth: "100%",
        maxHeight: "100%",
      }}
      onClick={(e) => e.stopPropagation()}
      {...modalBoxRefProp}
    >
      <div className="modal-header" onMouseDown={handleMouseDownHeader}>
        <h3>{title || "New Modal"}</h3>
        <div className="modal-buttons">
          {modals.isModalMultiScreen &&
            isSecondScreen != undefined &&
            (isSecondScreen ? (
              <IconButton
                onClick={() => handleToggleScreen(!isSecondScreen)}
                color="blue"
                tooltip="Switch to First Screen"
                style={{ display: inlineBlock }}
              >
                <RemoveFromQueue
                  style={{ fontSize: 15, color: "white" }}
                ></RemoveFromQueue>
              </IconButton>
            ) : (
              <IconButton
                onClick={() => handleToggleScreen(!isSecondScreen)}
                color="blue"
                tooltip="Switch to Second Screen"
                style={{ display: inlineBlock }}
              >
                <QueuePlayNext
                  style={{ fontSize: 15, color: "white" }}
                ></QueuePlayNext>
              </IconButton>
            ))}
          <IconButton
            onClick={handleCloseModal}
            color="red"
            tooltip="Schließen"
            style={{ display: inlineBlock, marginLeft: "5px" }}
          >
            <Close style={{ fontSize: 15, color: "white" }}></Close>
          </IconButton>
        </div>
      </div>

      <div className="modal-content">
        {React.cloneElement(component, {
          modalId: id,
        })}
      </div>
      <div
        className="modal-resize"
        onMouseDown={handleMouseDownResize}
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
}
