import React from "react";
import { CardContent, Chip } from "@mui/material";
import { formatString } from "../../utils/utils";




function AssetCard({ asset, assetClick }) {
  const disabled = asset.disabled || false;

  const  cardTitle = asset.asset_name ? formatString(asset?.asset_name?asset?.asset_name:''):formatString(asset?.asset_tool_name?asset?.asset_tool_name:'');
  return (
    <div
      className="h-full w-full border-[1px] border-gray-300  rounded-xl shadow-lg hover:shadow-xl hover:border-tailorBlue-500 bg-gray-50  "
      onClick={() => assetClick(asset)}
    >
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "start",
          gap: "12px",
          height: "100%",
        }}
      >
        <h3 className="text-xl">
          {cardTitle}
        </h3>
        <div className="overflow-y-scroll break-words whitespace-normal w-full  scrollbar-hidden ">
          <p className="relative text-base text-left" style={{ color: '#717171' }}>
            {asset.asset_description
              ? asset.asset_description
              : asset.asset_tool_short_description}
          </p>
        </div>

        <Chip
          label={`Asset Type: ${asset.asset_class}`}
          variant="outlined"
          sx={{ fontSize: "14px", color: "#717171" , borderColor: "gray"}}
        />
      </CardContent>
    </div>
  );
}

export default AssetCard;
