import { LightTooltipProps } from "./LightTooltip.modal";
import { Tooltip } from "@mui/material";

export function LightTooltip(props: LightTooltipProps) {
  if (!props.tooltip) return <>{props.children}</>;
  return (
    <Tooltip
      componentsProps={{
        tooltip: {
          sx: {
            borderRadius: "var(---pct-radius-5",
            fontSize: "var(--rem-small-200",
          },
        },
      }}
      placement="right"
      title={<span style={{ whiteSpace: "pre-line" }}>{props.tooltip}</span>}
    >
      <>{props.children}</>
    </Tooltip>
  );
}

LightTooltip.defaultProps = {
  tooltip: "",
  children: <h1>No tooltip set!</h1>,
} satisfies LightTooltipProps;
