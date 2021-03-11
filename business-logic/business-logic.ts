import axios, {AxiosResponse} from "axios";

function findPropertyOfInterest(certs: AxiosResponse, firstLineAddress: string) {
    return certs.data.rows.find((element: any) => {
        return element.address.includes(firstLineAddress);
    });
}

function noEnergyCertificate(propertyOfInterest: any) {
    return !propertyOfInterest["current-energy-rating"];
}

async function getCertificatesByPostcode(postcode: string) {
    const url = `https://epc.opendatacommunities.org/api/v1/domestic/search?postcode=${postcode}`;
    const encodedUrl = encodeURI(url);
    const headers = {
        Authorization: `Basic ${process.env.EPC_API_KEY}`,
        Accept: `application/json`
    };
    return await axios.get(encodedUrl, {headers: headers});
}

export const filterByEPC = async (firstLineAddress: string, postcode: string): Promise<boolean> => {

    try {
        const certs = await getCertificatesByPostcode(postcode);
        const propertyOfInterest = findPropertyOfInterest(certs, firstLineAddress);
        return noEnergyCertificate(propertyOfInterest) || ['G', 'F', 'E'].includes(propertyOfInterest["current-energy-rating"]);
    } catch (e) {
        console.log(e.message);
    }
    return false;
};

export const filterByEPCWrapper = async (): Promise<boolean> => {
    const postcode = 'W9 1SE';
    const firstLineAddress = 'Maida Vale';

    return await filterByEPC(firstLineAddress, postcode);
};

