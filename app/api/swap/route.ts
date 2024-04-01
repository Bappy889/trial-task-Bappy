// pages/api/uniswapData.ts
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import axios from "axios";

const uniswap = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

const pancake =
  "https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-eth";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { chain, page } = await req.json();
    const query = `
      query MyQuery {
        pools(orderBy: id, orderDirection: asc) {
          token0 {
            name
            symbol
          }
          token0Price
          token1Price
          token1 {
            name
            symbol
          }
          liquidity
          txCount
          volumeUSD
          volumeToken0
          volumeToken1
        }
      }
    `;

    const data1 = await axios.post(uniswap, {
      query: query,
    });
    const data2 = await axios.post(pancake, {
      query: query,
    });

    const uniswapData = data1.data.data.pools;
    const pancakeData = data2.data.data.pools;
    const swapData = uniswapData.concat(pancakeData);
    //structure to follow the universal way..
    const data = {
      data: {
        pools: swapData,
      },
    };
    return NextResponse.json({ uniswapData, pancakeData });
  } catch (error) {
    console.error("Error fetching data from Uniswap:", error);
    // res.status(500).json({ message: "Internal server error" });
    return NextResponse.json({ error });
  }
}
