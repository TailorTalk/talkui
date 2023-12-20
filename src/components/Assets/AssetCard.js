import React from 'react';
import { Card, CardContent, Typography, ButtonBase, Chip } from '@mui/material';

function AssetCard({ asset, assetClick }) {
  const disabled = asset.disabled || false;
  return (    
      <Card
      sx={{
         borderRadius: '10px', boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",cursor:"pointer",
        height:"100%",
        width:"100%",
        border:"1px solid #A7A7A7",
        fontFamily:'Roboto',
        "&:hover":{
         boxShadow: "0px 5px 4px 0px rgba(0, 0, 0, 0.4 )",
         backgroundColor:'#FBFBFB'
        }
      }}
        onClick={() => assetClick(asset)}
      >
        <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between',alignItems:'start',gap:'12px',height:"100%" }}>
          <h3 className='text-xl font-medium'>
            {asset.asset_name?asset.asset_name:asset.asset_tool_name}
          </h3>
          <div className='overflow-y-scroll break-words whitespace-normal w-full  scrollbar-hidden '>
          <p className='relative text-base text-left '>
            {asset.asset_description?asset.asset_description:asset.asset_tool_short_description}
          </p>
          </div>
          
        <Chip label={`Asset Type: ${asset.asset_class}`} variant="outlined" sx={{ fontSize:'14px',color:"#717171"}} />
        </CardContent>
      </Card>
  );
}

export default AssetCard;
