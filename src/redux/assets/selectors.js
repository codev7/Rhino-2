import { createSelector } from 'reselect';
import { forEach } from 'lodash';

const getAssetsData = state => state.assets.data;

export const getAssets = createSelector(
    [getAssetsData],
    (data) => {
      const result = {};
      forEach(data, (asset) => { result[asset.id] = asset; });
      return result;
    },
);

