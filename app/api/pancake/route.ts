// pages/api/uniswapData.ts
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import axios from "axios";

const endpoint = {
  ethereum:
    "https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-eth",
  optimism:
    "https://api.thegraph.com/subgraphs/name/messari/uniswap-v3-optimism",
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { chain } = await req.json();
    if (!endpoint[chain]) throw new Error("endpoint not found");

    const query = `
      query MyQuery {
        pools(orderBy: id, first: 2, orderDirection: asc) {
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

    const data = await axios.post(endpoint.ethereum, { query: query });
    return NextResponse.json({ data: data.data });
  } catch (error) {
    console.error("Error fetching data from Uniswap:", error);
    // res.status(500).json({ message: "Internal server error" });
    return NextResponse.json({ error });
  }
}
