import axios from "axios";

const sendJSONtoIPFS = async (data) => {

    try {

        const resJSON = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
            data: data,
            headers: {
                'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
                'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET_KEY}`,
            },
        });

        const tokenURI = `ipfs://${resJSON.data.IpfsHash}`;
        console.log("Token URI", tokenURI);
        return tokenURI;

    } catch (error) {
        console.log("JSON to IPFS: ")
        console.log(error);
        return false;
    }


}
export default sendJSONtoIPFS;