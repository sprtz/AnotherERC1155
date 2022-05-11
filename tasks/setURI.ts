import { task } from "hardhat/config";




task("setURI", "Sets new URI")
  .addParam("address", "The contract address")
  .addParam("uri", "New URI")
  .setAction(async ( taskArgs, hre ) => {

    const token = await hre.ethers.getContractAt("AnotherERC1155", taskArgs.address);
    await token.setTokenURI(taskArgs.uri);

    console.log(`Address: ${taskArgs.address}`);
    console.log(`URI set to: ${ taskArgs.uri }`);
  });