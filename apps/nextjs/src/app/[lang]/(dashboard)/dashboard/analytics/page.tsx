"use client"

import React from "react";
// import { redirect } from "next/navigation";
// import { authOptions, getCurrentUser } from "@saasfly/auth";
import { ClientDashboardComponent } from "~/components/client-dashboard-component";
import type { Locale } from "~/config/i18n-config";
import { getDictionary } from "~/lib/get-dictionary";
import { AutocompleteSearch } from "~/components/autocompleteSearch";
import { DashboardHeader } from "~/components/header";
import { K8sCreateButton } from "~/components/k8s/cluster-create-button";
import { ClusterItem } from "~/components/k8s/cluster-item";
import { DashboardShell } from "~/components/shell";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';
import { avgBountyChartData, bountiesAwardedChartData, questionsAskedChartData, questionsAnsweredChartData } from './Data.js'; // Import Data

// Register the chart components
ChartJS.register(
  CategoryScale, 
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

// export const metadata = {
//   title: "Analytics",
// };


export default async function DashboardPage({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}) {
//   const user = await getCurrentUser(); // this has a server side env variable.
//   if (!user) {
//     redirect(authOptions?.pages?.signIn ?? "/login");
//   }


    const avgBountyGraphLabel = "Average Bounty (CAD)";
    const bountiesAwardedGraphLabel = "Awarded (CAD)";  
    const questionsAskedGraphLabel = "Questions Asked";
    const questionsAnsweredGraphLabel = "Questions Answered";

    // Define common chart options function with axis titles
    const getOptions = (dataLabel: string, xAxisTitle: string, yAxisTitle: string, isCurrency: boolean = false) => ({
    responsive: true,
    plugins: {
        legend: {
        display: false,
        labels: {
            color: 'black', // Set legend labels to black (if used)
        },
        },
        title: {
        display: false,
        },
        tooltip: {
        mode: 'nearest',
        intersect: false,
        callbacks: {
            label: function(tooltipItem) {
            return `${dataLabel}: ${isCurrency ? '$' : ''}${tooltipItem.raw}`;
            },
        },
        },
    },
    scales: {
        x: {
        grid: {
            display: false, // Disable x-axis grid lines
        },
        title: {
            display: true,
            text: xAxisTitle, // Title for the x-axis
            padding: { top: 10 }, // Add 10px space between the title and axis
            font: {
            size: 15, // Set font size
            color: 'black', // Set axis title color to black
            },
        },
        ticks: {
            maxRotation: 45, // Maximum rotation for diagonal text
            minRotation: 45, // Minimum rotation for diagonal text
            align: 'end', // Align text to the end of the tick
            padding: 10, // Add space between the labels and the graph
            font: {
            color: 'black', // Set axis title color to black
            }
        },
        },
        y: {
        grid: {
            display: false, // Disable y-axis grid lines
        },
        title: {
            display: true,
            text: yAxisTitle, // Title for the y-axis
            padding: { bottom: 10 }, // Add 10px space between the title and axis
            font: {
            size: 15, // Set font size
            color: 'black', // Set axis title color to black
            },
        },
        ticks: {
            callback: function(value) {
            return isCurrency ? `$${value}` : value;
            },
        },
        },
    },
    });

    // Chart Width and Height
    const width = 480;
    const height = 360; 


    return (

        <DashboardShell>
        <DashboardHeader heading='Analytics Data'> 
        </DashboardHeader>

            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', // Stack graphs vertically
                alignItems: 'center', 
                marginBottom: '50px', // Add space between graphs 
                }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '50px' }}>
                    <h1> </h1>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '25px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>Bounty Statistics</h1>
                <h1 style={{ fontSize: '20px' }}> ‎  </h1>
                <h1 style={{ fontSize: '20px' }}> Today, an <strong>average of ${avgBountyChartData.datasets[0].data[avgBountyChartData.datasets[0].data.length - 1]} (CAD) has been staked per question  
                </strong> and <strong>${bountiesAwardedChartData.datasets[0].data[bountiesAwardedChartData.datasets[0].data.length - 1]} (CAD) have been awarded </strong> to the BoostAid community.
                </h1>
                </div>
                
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns
                    gridRowGap: '1000px', // Increase vertical space between rows
                    gridColumnGap: '50px', // Reduce horizontal space between columns
                    justifyItems: 'center',
                    marginBottom: '50px'
                }}>
                    <div style={{ 
                    border: '2px solid black', 
                    borderRadius: '10px', 
                    padding: '20px', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
                    textAlign: 'center', 
                    width: `${width}px`, 
                    height: `${height + 50}px` 
                    }}>
                    <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Average Bounty (CAD)</h1>
                    <Line 
                        options={getOptions(avgBountyGraphLabel, "Date", "Amount Staked (CAD)", true)} 
                        data={avgBountyChartData} 
                        width={width} 
                        height={height} 
                    />
                    </div>
                    <div style={{ 
                    border: '2px solid black', 
                    borderRadius: '10px', 
                    padding: '20px', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
                    textAlign: 'center', 
                    width: `${width}px`, 
                    height: `${height + 50}px` 
                    }}>
                    <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Bounties Awarded (CAD)</h1>
                    <Line 
                        options={getOptions(bountiesAwardedGraphLabel, "Date", "Awarded (CAD)", true)} 
                        data={bountiesAwardedChartData} 
                        width={width} 
                        height={height} 
                    />
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '25px' }}>
                    <h1 style={{ fontSize: '20px' }}> ‎  </h1>
                    <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>Question Statistics</h1>
                    <h1 style={{ fontSize: '20px' }}> ‎  </h1>
                    <h1 style={{ fontSize: '20px' }}>Today, <strong>{questionsAskedChartData.datasets[0].data[questionsAskedChartData.datasets[0].data.length - 1]} questions have been asked </strong>
                    and <strong>{questionsAnsweredChartData.datasets[0].data[questionsAnsweredChartData.datasets[0].data.length - 1]} questions have been marked as answered </strong> by the BoostAid community.
                    </h1>
                </div>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns
                    gridRowGap: '100px', // Increase vertical space between rows
                    gridColumnGap: '50px', // Reduce horizontal space between columns
                    justifyItems: 'center',
                }}>
                    <div style={{ 
                    border: '2px solid black', 
                    borderRadius: '10px', 
                    padding: '20px', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
                    textAlign: 'center', 
                    width: `${width}px`, 
                    height: `${height + 50}px` 
                    }}>
                    <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Questions Asked</h1>
                    <Line 
                        options={getOptions(questionsAskedGraphLabel, "Date", "Questions Asked", false)} 
                        data={questionsAskedChartData} 
                        width={width} 
                        height={height} 
                    />
                    </div>
                    <div style={{ 
                    border: '2px solid black', 
                    borderRadius: '10px', 
                    padding: '20px', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
                    textAlign: 'center', 
                    width: `${width}px`, 
                    height: `${height + 50}px` 
                    }}>
                    <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Questions Answered</h1>
                    <Line 
                        options={getOptions(questionsAnsweredGraphLabel, "Date", "Questions Answered", false)} 
                        data={questionsAnsweredChartData} 
                        width={width} 
                        height={height} 
                    />
                    </div>
                </div>
                
                <h1> </h1>
            </div>
        
        </DashboardShell>

    );
}
