import { task } from "hardhat/config";




task("mint", "Issues erc1155 token")
  .addParam("from", "The contract address")
  .addParam("to", "The recipient address")
  .addParam("amount", "Tokens amount")
  .setAction(async ( taskArgs, hre ) => {


    const token = await hre.ethers.getContractAt("AnotherERC1155", taskArgs.from);
    await token.mint(taskArgs.to, taskArgs.amount);

    console.log(`Address: ${taskArgs.address}`);
    console.log(`Minted amount: ${taskArgs.amount}`);
  });