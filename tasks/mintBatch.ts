import { task } from "hardhat/config";




task("mintBatch", "Issues tokens")
  .addParam("from", "The contract address")
  .addParam("to", "The recipient address")
  .addParam("amounts", "Tokens amounts")
  .setAction(async ( taskArgs, hre ) => {


    const token = await hre.ethers.getContractAt("AnotherERC1155", taskArgs.from);
    const amountsArray = taskArgs.amounts.split(",");
    await token.mintBatch(taskArgs.to, amountsArray);


    console.log(`Address:" ${taskArgs.to}`);
    console.log(`Minted amounts: ${taskArgs.amounts}`);
  });