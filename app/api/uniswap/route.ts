// pages/api/uniswapData.ts
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import axios from "axios";

const endpoint = {
  ethereum: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  optimism:
    "https://api.thegraph.com/subgraphs/name/messari/uniswap-v3-optimism",
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { chain, skip } = await req.json();
    if (!endpoint[chain]) throw new Error("endpoint not found");
    const value = skip || 0;
    const query = `
      query MyQuery {
        pools(orderBy: id, first: 5, orderDirection: asc, skip: ${value}) {
          collectedFeesToken0
          collectedFeesToken1
          createdAtTimestamp
          liquidity
          liquidityProviderCount
          token0 {
            name
            symbol
            txCount
          }
          token0Price
          token1Price
          token1 {
            name
            symbol
          }
          txCount
          volumeToken0
          volumeToken1
          volumeUSD
          hourdata: poolHourData(first: 1){
            volumeToken0
            volumeToken1
            tick
          }
        }
      }
    `;

    const data = await axios.post(endpoint.ethereum, {
      query: query,
    });
    return NextResponse.json({ data: data.data });
  } catch (error) {
    console.error("Error fetching data from Uniswap:", error);
    // res.status(500).json({ message: "Internal server error" });
    return NextResponse.json({ error });
  }
}

async function fetchDataFromUniswap() {
  const query = `
      {
        pairs(first: 1) {
          id
          token0 {
            id
            symbol
          }
          token1 {
            id
            symbol
          }
          reserve0
          reserve1
          reserveUSD
          volumeUSD
          txCount
          createdAtTimestamp
          liquidityProviderCount
          token0Price
          token1Price
          createdAtTimestamp
          hour1Data : pairHourData(first : 1, orderDirection: desc){
              hourlyTxns
              hourlyVolumeUSD
          },
          sixHourData: pairHourData(first: 6, orderDirection: desc) {
              hourlyTxns
              hourlyVolumeUSD
          },
          dayData : pairHourData(first: 24, orderDirection: desc) {
              hourlyTxns
              hourlyVolumeUSD
          },
        }
    }`;

  // const data = await request(endpoint, query);
  // return data;

  return await axios.post(endpoint, { query: query });
}
