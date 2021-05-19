const TestToken = artifacts.require("TestToken");
const { expect } = require("chai");

contract("TestToken(ERC721)", accounts => {

    let testTokenContract;
    let [ deployer, user1, user2 ] = accounts;

    before(async function () {
        testTokenContract = await TestToken.new("TestToken", "ERC721");
    });

    it("Anybody can mint this nft token", async function() {
        await testTokenContract.mint(user1, {from: user1});
        await testTokenContract.mint(user2, {from: user2});
        let balance_user1 = await testTokenContract.balanceOf(user1);
        let balance_user2 = await testTokenContract.balanceOf(user2);
        expect(balance_user1.toString()).to.equal("1");
        expect(balance_user2.toString()).to.equal("1");
    });

    it("Only nft token owner can transfer the token", async function() {
        try {
            await testTokenContract.transfer(user2, 2, {from: user1});
        } catch (err) {
            expect(err.message).to.equal("VM Exception while processing transaction: revert ERC721: transfer of token that is not own");
        }
    });

    it("Only nft token owner can approve the token to others", async function() {
        try {
            await testTokenContract.approve(user2, 2, {from: user1});
        } catch (err) {
            expect(err.message).to.equal("VM Exception while processing transaction: revert ERC721: approval to current owner");
        }
    });

    it("Approve the nft token", async function() {
        await testTokenContract.approve(user2, 1, {from: user1});
        let approved_account = await testTokenContract.getApproved(1);
        expect(approved_account).to.equal(user2);
    })

    it("Transfer nft token from user1 to user2", async function() {
        await testTokenContract.transfer(user2, 1, {from: user1});
        let balance_user1 = await testTokenContract.balanceOf(user1);
        let balance_user2 = await testTokenContract.balanceOf(user2);
        expect(balance_user1.toString()).to.equal("0");
        expect(balance_user2.toString()).to.equal("2");
    })
});