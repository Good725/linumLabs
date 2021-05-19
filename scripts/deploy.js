async function main() {
    const Test = artifacts.require("TestToken");

    const TestContract = await Test.new("TestToken", "ERC721");
    console.log("Test address", TestContract.address);
  }
  
main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});