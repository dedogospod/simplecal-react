import React from 'react';
import './LineChart.scss';
import { ResponsiveLine } from '@nivo/line';

export default ({ data, x, y }) => {
    return (
        <div className="d-flex justify-content-center">
            <div className="line-chart-container">
                <ResponsiveLine
                    data={data}
                    margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: x,
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: y,
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    enableGridX={false}
                    enableGridY={false}
                    colors={{ scheme: 'nivo' }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    useMesh={true}
                    tooltip={({point: {data}}) => {
                        return `${data.x}: ${data.y}lbs`;
                    }}
                />
            </div>
        </div>
    )
}