const ethers=require("ethers");
import { AlchemyProvider } from "ethers";
const API_URL="";
const PRIVATE_KEY ="";
const callerContractABI=[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "ethPrice",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "PriceUpdatedEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "ReceivedNewRequestIdEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "oracleAddress",
          "type": "address"
        }
      ],
      "name": "newOracleAddressEvent",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_ethPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "callback",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_oracleInstanceAddress",
          "type": "address"
        }
      ],
      "name": "setOracleInstanceAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "updateEthPrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
const callerContractBytecode="0x608060405234801561001057600080fd5b5033600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036100845760006040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161007b919061019e565b60405180910390fd5b6100938161009960201b60201c565b506101b9565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006101888261015d565b9050919050565b6101988161017d565b82525050565b60006020820190506101b3600083018461018f565b92915050565b61098f806101c86000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c806323c7e4a214610067578063715018a6146100715780638da5cb5b1461007b578063b5d73ba414610099578063e9e17a9e146100b5578063f2fde38b146100d1575b600080fd5b61006f6100ed565b005b6100796101ea565b005b6100836101fe565b60405161009091906106a0565b60405180910390f35b6100b360048036038101906100ae91906106f6565b610227565b005b6100cf60048036038101906100ca9190610762565b61037e565b005b6100eb60048036038101906100e69190610762565b610486565b005b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166330c0b9ec6040518163ffffffff1660e01b81526004016020604051808303816000875af115801561015e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061018291906107a4565b905060016004600083815260200190815260200160002060006101000a81548160ff0219169083151502179055507f3ed150819af981e387450beb90ec379b8b322150dbb299d492b108c59a623e4b816040516101df91906107e0565b60405180910390a150565b6101f261050c565b6101fc6000610593565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146102b7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102ae9061087e565b60405180910390fd5b6004600082815260200190815260200160002060009054906101000a900460ff16610317576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161030e90610910565b60405180910390fd5b816001819055506004600082815260200190815260200160002060006101000a81549060ff02191690557f6b69e4f2aedf7e65a79ecaf16e8869b2b99c87e341f2c51286bfd4a7fc3b99698282604051610372929190610930565b60405180910390a15050565b61038661050c565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f441e3b056b114797955165bd03bb8393fc1658a713f09225de4745a8d068bf7d600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660405161047b91906106a0565b60405180910390a150565b61048e61050c565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036105005760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016104f791906106a0565b60405180910390fd5b61050981610593565b50565b610514610657565b73ffffffffffffffffffffffffffffffffffffffff166105326101fe565b73ffffffffffffffffffffffffffffffffffffffff161461059157610555610657565b6040517f118cdaa700000000000000000000000000000000000000000000000000000000815260040161058891906106a0565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061068a8261065f565b9050919050565b61069a8161067f565b82525050565b60006020820190506106b56000830184610691565b92915050565b600080fd5b6000819050919050565b6106d3816106c0565b81146106de57600080fd5b50565b6000813590506106f0816106ca565b92915050565b6000806040838503121561070d5761070c6106bb565b5b600061071b858286016106e1565b925050602061072c858286016106e1565b9150509250929050565b61073f8161067f565b811461074a57600080fd5b50565b60008135905061075c81610736565b92915050565b600060208284031215610778576107776106bb565b5b60006107868482850161074d565b91505092915050565b60008151905061079e816106ca565b92915050565b6000602082840312156107ba576107b96106bb565b5b60006107c88482850161078f565b91505092915050565b6107da816106c0565b82525050565b60006020820190506107f560008301846107d1565b92915050565b600082825260208201905092915050565b7f596f7520617265206e6f7420617574686f72697a656420746f2063616c6c207460008201527f6869732066756e6374696f6e2e00000000000000000000000000000000000000602082015250565b6000610868602d836107fb565b91506108738261080c565b604082019050919050565b600060208201905081810360008301526108978161085b565b9050919050565b7f546869732072657175657374206973206e6f7420696e206d792070656e64696e60008201527f67206c6973742e00000000000000000000000000000000000000000000000000602082015250565b60006108fa6027836107fb565b91506109058261089e565b604082019050919050565b60006020820190508181036000830152610929816108ed565b9050919050565b600060408201905061094560008301856107d1565b61095260208301846107d1565b939250505056fea26469706673582212209fe74ae7705ed044f1c3da2b986a953ee5c89bef72a8f47ba8ca06e7517bceb064736f6c634300081c0033"

const ethPriceContractABI=[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "callerAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "GetLatestEthPriceEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "ethPrice",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "callerAddress",
          "type": "address"
        }
      ],
      "name": "SetLatestEthPriceEvent",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "getLatestEthPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_ethPrice",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_callerAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "setLatestEthPrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

const ethPriceContractBytecode="0x608060405260006001556103e860025534801561001b57600080fd5b5033600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361008f5760006040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161008691906101a9565b60405180910390fd5b61009e816100a460201b60201c565b506101c4565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061019382610168565b9050919050565b6101a381610188565b82525050565b60006020820190506101be600083018461019a565b92915050565b610931806101d36000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806330c0b9ec1461005c578063715018a61461007a5780638da5cb5b14610084578063cf642f1f146100a2578063f2fde38b146100be575b600080fd5b6100646100da565b604051610071919061050c565b60405180910390f35b6100826101a1565b005b61008c6101b5565b6040516100999190610568565b60405180910390f35b6100bc60048036038101906100b791906105e0565b6101de565b005b6100d860048036038101906100d39190610633565b61031a565b005b6000600160008154809291906100ef9061068f565b91905055506000600254423360015460405160200161011093929190610740565b6040516020818303038152906040528051906020012060001c61013391906107ac565b905060016003600083815260200190815260200160002060006101000a81548160ff0219169083151502179055507f3d50a0c24e97813f35595d2f1f37dbf421d5e97f37abd4e222853e9b9c82c8d533826040516101929291906107dd565b60405180910390a18091505090565b6101a96103a0565b6101b36000610427565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6101e66103a0565b6003600082815260200190815260200160002060009054906101000a900460ff16610246576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161023d90610889565b60405180910390fd5b6003600082815260200190815260200160002060006101000a81549060ff021916905560008290508073ffffffffffffffffffffffffffffffffffffffff1663b5d73ba485846040518363ffffffff1660e01b81526004016102a99291906108a9565b600060405180830381600087803b1580156102c357600080fd5b505af11580156102d7573d6000803e3d6000fd5b505050507f91b860381268a473101de3379abbb70abf7ea6c9d1735cf58b9816479ff3b727848460405161030c9291906108d2565b60405180910390a150505050565b6103226103a0565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036103945760006040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161038b9190610568565b60405180910390fd5b61039d81610427565b50565b6103a86104eb565b73ffffffffffffffffffffffffffffffffffffffff166103c66101b5565b73ffffffffffffffffffffffffffffffffffffffff1614610425576103e96104eb565b6040517f118cdaa700000000000000000000000000000000000000000000000000000000815260040161041c9190610568565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b6000819050919050565b610506816104f3565b82525050565b600060208201905061052160008301846104fd565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061055282610527565b9050919050565b61056281610547565b82525050565b600060208201905061057d6000830184610559565b92915050565b600080fd5b610591816104f3565b811461059c57600080fd5b50565b6000813590506105ae81610588565b92915050565b6105bd81610547565b81146105c857600080fd5b50565b6000813590506105da816105b4565b92915050565b6000806000606084860312156105f9576105f8610583565b5b60006106078682870161059f565b9350506020610618868287016105cb565b92505060406106298682870161059f565b9150509250925092565b60006020828403121561064957610648610583565b5b6000610657848285016105cb565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061069a826104f3565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036106cc576106cb610660565b5b600182019050919050565b6000819050919050565b6106f26106ed826104f3565b6106d7565b82525050565b60008160601b9050919050565b6000610710826106f8565b9050919050565b600061072282610705565b9050919050565b61073a61073582610547565b610717565b82525050565b600061074c82866106e1565b60208201915061075c8285610729565b60148201915061076c82846106e1565b602082019150819050949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006107b7826104f3565b91506107c2836104f3565b9250826107d2576107d161077d565b5b828206905092915050565b60006040820190506107f26000830185610559565b6107ff60208301846104fd565b9392505050565b600082825260208201905092915050565b7f546869732072657175657374206973206e6f7420696e206d792070656e64696e60008201527f67206c6973742e00000000000000000000000000000000000000000000000000602082015250565b6000610873602783610806565b915061087e82610817565b604082019050919050565b600060208201905081810360008301526108a281610866565b9050919050565b60006040820190506108be60008301856104fd565b6108cb60208301846104fd565b9392505050565b60006040820190506108e760008301856104fd565b6108f46020830184610559565b939250505056fea26469706673582212201861c0e97fe084710d564bd577534e0af15e577eee542f1e8055e9432113928864736f6c634300081c0033"
const callerContract="0x65B56f95cbD7e9C26531C5B4665068A1b1F654dd"
const ethPriceContract="0xc3de375488DBb2Bdf4C15c50c55FD722DA0868B0"

const deploy = async function () {
	try {

		const provider = new AlchemyProvider("sepolia", API_URL);
		const Wallet = new ethers.Wallet(PRIVATE_KEY, provider);
		// const ContractInstance = new ethers.ContractFactory(abi,bytecode,Wallet);
		// const contractInstance = await ContractInstance.deploy();
		
		// console.log("Deployed contract address - ",contractInstance.address);
        // console.log(PRIVATE_KEY);
        const contract= new ethers.Contract(ethPriceContract,ethPriceContractABI,Wallet);
        
		const getres = await contract.getLatestEthPrice();
        console.log(getres);
        contract.on("GetLatestEthPriceEvent",async (callerAddress:any,id:any)=>{
            let data={callerAddress,id};
            console.log("GetLatestEthPriceEvent",data);
            const res = await contract.setLatestEthPrice("0",callerAddress,id);
        console.log(res);
        contract.on("SetLatestEthPriceEvent",(ethPrice:any,callerAddress:any)=>{
            let data={callerAddress,ethPrice};
            console.log("SetLatestEthPriceEvent",data);
            

        })

        })
        

	} catch (err) {
		console.log("Error in deploying contract.");
		console.log(err);
	}
};

deploy();
