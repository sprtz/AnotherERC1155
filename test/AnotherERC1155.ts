import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { AnotherERC1155 } from "../typechain";
import { ethers, network } from "hardhat";
import { expect } from "chai";




describe("AnotherERC1155", function () {


  const amounts = [3, 1, 2];
  const ids = [1, 2, 3];

  // https://bafybeig766bxnx3kh73orr2u3qfx6zhnls7aoxay4fw2u6hc6v2zn4hr7m.ipfs.nftstorage.link/metadata
  const baseURI: string = "https://bafybeigdhdjdzf6fsuw7fu72h42vs7au5f5zlnsscjxwp4kq33c5iry7sm.ipfs.nftstorage.link/metadata/";

  const zero_address = "0x0000000000000000000000000000000000000000";

  let contract: AnotherERC1155;
  let owner: SignerWithAddress;
  let some: SignerWithAddress;

  let clean: any;


  before(async () => {

    [owner, some] = await ethers.getSigners();

    const contractFactory = await ethers.getContractFactory("AnotherERC1155");
    contract = <AnotherERC1155>( await contractFactory.deploy());
    await contract.deployed();

    clean = await network.provider.request({ method: "evm_snapshot", params: [] });
  });


  afterEach(async () => {
    await network.provider.request({ method: "evm_revert", params: [clean] });
    clean = await network.provider.request({ method: "evm_snapshot", params: [] });
  });


  describe("function name", () => {

    it("name", async () => {
      const tokenName = await contract.name();
      expect(tokenName).to.equal("PeyPey");
    });
      
  });


  describe("function symbol", () => { 
    
    it("symbol", async () => {
      const tokenSymbol = await contract.symbol();
      expect(tokenSymbol).to.equal("PP");
    });

  });

  
  describe("function setTokenURI", () => {

    it("Should revert if not owner", async () => {
      const promise = contract.connect(some).setTokenURI(baseURI); 
      await expect(promise).to.be.revertedWith('Ownable: caller is not the owner');
    });


    it("Only owner can mint", async () => {
      const promise = contract.setTokenURI(baseURI);
      await expect(promise).to.not.be.revertedWith('Ownable: caller is not the owner');
    });


    it("Should set new URI", async () => {
      await contract.setTokenURI(baseURI);
      const uri = await contract.uri(1);
      expect(uri).to.equal(baseURI);
    });

  });


  describe("function mint", () => {

    it("Should revert if not owner", async () => {
      const promise = contract.connect(some).mint(owner.address, 2); 
      await expect(promise).to.be.revertedWith('Ownable: caller is not the owner');
    });


    it("Should mint if owner", async () => {
      const promise = contract.mint(owner.address, 2); 
      await expect(promise).to.not.be.revertedWith('Ownable: caller is not the owner');
    });


    it("Should emit event", async () => {
      const promise = contract.mint(owner.address, 2);
      await expect(promise).to.emit(contract, "TransferSingle").withArgs(owner.address, zero_address, owner.address, 1, 2);
    });


    it("Should mint token to the specified account", async () => {
      await contract.mint(owner.address, 2);
      expect(await contract.balanceOf(owner.address, 1)).to.equal(2);
    });

  });



  describe("function mintBatch", () => {

    it("Should revert if not owner", async () => {
      const promise = contract.connect(some).setTokenURI(baseURI); 
      await expect(promise).to.be.revertedWith('Ownable: caller is not the owner');
    });


    it("Should emit event", async () => {
      const promise = contract.mintBatch(owner.address, amounts);
      await expect(promise).to.emit(contract, "TransferBatch").withArgs(owner.address, zero_address, owner.address, ids, amounts);
    });

  
    it("Should mint batch to the specified account", async () => {

      await contract.mintBatch(owner.address, amounts);
  
      expect(await contract.balanceOf(owner.address, 3)).to.equal(amounts[2]);
      const accounts = Array(amounts.length).fill(owner.address);
      expect(await contract.balanceOfBatch(accounts, ids)).to.equal(amounts);
    });

  });

});
