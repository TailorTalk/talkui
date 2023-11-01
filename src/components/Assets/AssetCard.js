import React from 'react';
import { Card, CardContent, Typography, ButtonBase } from '@mui/material';

function AssetCard({ asset, assetClick }) {
  return (
    <ButtonBase style={{ width: '100%', borderRadius: '4px' }}>
      <Card
        style={{ width: 275, height: 200, cursor: 'pointer' }}
        onClick={() => assetClick(asset)}
        elevation={2}
      >
        <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <Typography variant="h6" component="div" gutterBottom style={{ height: '25%' }}>
            {asset.asset_name}
          </Typography>
          <Typography
            style={{
              height: '48%',  // Slightly reduced to give some space
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              lineHeight: '1.2',  // Adjusted line height
              margin: 0  // Ensure no margin
            }}
            variant="body2"
            color="textSecondary"
          >
            {asset.asset_description}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" style={{ height: '25%' }}>
            Asset Type: {asset.asset_class}
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}

export default AssetCard;
