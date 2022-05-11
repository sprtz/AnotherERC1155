import { ethers } from "hardhat";



async function main() {

  const factory = await ethers.getContractFactory("AnotherERC1155");
  const token = await factory.deploy();

  await token.deployed();

  console.log("AnotherERC115 contract deployed to:", token.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});