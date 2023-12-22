import React from 'react';
import { Card, CardContent, Typography, ButtonBase, Chip } from '@mui/material';

function AssetCard({ asset, assetClick }) {
  const disabled = asset.disabled || false;
  return (    
      <div className='h-full w-full border-[1px] border-gray-300 font-[Roboto] rounded-xl shadow-lg hover:shadow-xl hover:border-tailorBlue-500 bg-gray-50  '
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
      </div>
  );
}

export default AssetCard;
