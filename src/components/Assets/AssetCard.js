import React from 'react';
import { Card, CardContent, Typography, ButtonBase, Chip } from '@mui/material';

function AssetCard({ asset, assetClick }) {
  const disabled = asset.disabled || false;
  return (
    <ButtonBase style={{ width: '100%', borderRadius: '4px' }}>
      <Card
        style={{ width: 275, cursor: 'pointer', 'opacity': disabled ? '0.5' : '1' }}
        onClick={() => assetClick(asset)}
        sx={{boxShadow:'none', border:'2px solid #D3D3D3'}}
      >
        <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%',alignItems:'start',gap:'12px' }}>
          <h3 className='text-xl font-medium'>
            {asset.asset_name?asset.asset_name:asset.asset_tool_name}
          </h3>
          <p className='relative text-base text-left '>
            {asset.asset_description?asset.asset_description:asset.asset_tool_short_description}
          </p>
          <Chip label={`Asset Type: ${asset.asset_class}`} variant="outlined" sx={{ fontSize:'14px'}} />
        </CardContent>
      </Card>
    </ButtonBase>
  );
}

export default AssetCard;
