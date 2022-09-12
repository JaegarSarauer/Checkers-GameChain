import Button from './Button';
import * as ethUtil from 'ethereumjs-util';
import * as sigUtil from '@metamask/eth-sig-util';
import { iWeb3, Wallet } from '@cajarty/gamechain';
import game, { Team } from '../../game/GameState';
import main from '../../../main';

export default class SignWalletButton extends Button {
    button: any;
    team: Team;

    constructor(team: Team, onClick: (button: SignWalletButton) => void) {
        super();
        this.team = team;
        this.button = document.createElement('button');
        this.button.innerText = `Sign Game Team ${team}`;
        this.button.onclick = () => {
            //onClick(this);
            this.signWalletOwner();
        };
        document.body.appendChild(this.button);
    }

    async signWalletOwner() {
        const wallet = new Wallet(iWeb3.createWallet())
        wallet.assignWalletOwner(iWeb3.metaMask?.currentAccount as string);
        if (this.team == 'Red') {
            main.game!.redTeamWallet = wallet;
        } else {
            main.game!.blueTeamWallet = wallet;
        }
        this.button.innerText = `Team ${this.team} Wallet Signed by ${wallet.ownerPublicKey}`;
    }

    async sendSign() {
        const msgParams = JSON.stringify({
            domain: {
                // Defining the chain aka Rinkeby testnet or Ethereum Main Net
                chainId: 1,
                // Give a user friendly name to the specific contract you are signing for.
                name: 'Ether Mail',
                // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
                verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
                // Just let's you know the latest version. Definitely make sure the field name is correct.
                version: '1',
            },

            // Defining the message signing data content.
            message: {
                /*
                 - Anything you want. Just a JSON Blob that encodes the data you want to send
                 - No required fields
                 - This is DApp Specific
                 - Be as explicit as possible when building out the message schema.
                */
                contents: 'Hello, Bob!',
                attachedMoneyInEth: 4.2,
                from: {
                    name: 'Cow',
                    wallets: [
                        '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
                        '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
                    ],
                },
                to: [
                    {
                        name: 'Bob',
                        wallets: [
                            '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                            '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
                            '0xB0B0b0b0b0b0B000000000000000000000000000',
                        ],
                    },
                ],
            },
            // Refers to the keys of the *types* object below.
            primaryType: 'Mail',
            types: {
                // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
                EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    { name: 'verifyingContract', type: 'address' },
                ],
                // Not an EIP712Domain definition
                Group: [
                    { name: 'name', type: 'string' },
                    { name: 'members', type: 'Person[]' },
                ],
                // Refer to PrimaryType
                Mail: [
                    { name: 'from', type: 'Person' },
                    { name: 'to', type: 'Person[]' },
                    { name: 'contents', type: 'string' },
                ],
                // Not an EIP712Domain definition
                Person: [
                    { name: 'name', type: 'string' },
                    { name: 'wallets', type: 'address[]' },
                ],
            },
        });

        var from = await window.web3.eth.getAccounts();

        console.info('from', from)

        var params = [from[0], msgParams];
        var method = 'eth_signTypedData_v4';

        window.web3.currentProvider.sendAsync(
            {
                method,
                params,
                from: from[0],
            },
            function (err, result) {
                if (err) return console.dir(err);
                if (result.error) {
                    alert(result.error.message);
                }
                if (result.error) return console.error('ERROR', result);
                console.log('TYPED SIGNED:' + JSON.stringify(result.result));

                const recovered = sigUtil.recoverTypedSignature({
                    data: JSON.parse(msgParams),
                    signature: result.result,
                    version: sigUtil.SignTypedDataVersion.V4,
                });

                if (ethUtil.toChecksumAddress(recovered) === ethUtil.toChecksumAddress(from[0])) {
                    alert('Successfully recovered signer as ' + from[0]);
                } else {
                    alert('Failed to verify signer when comparing ' + result + ' to ' + from[0]);
                }
            }
        );
    }
}
